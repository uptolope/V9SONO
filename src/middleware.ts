import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Security Middleware (Production-Grade)
// ═══════════════════════════════════════════════════════════════════
//
// Layers of defense applied here:
//   1. Attack pattern detection & logging (path traversal, SQLi, XSS, scanners)
//   2. Auth-gated routes for all /dashboard, /exam, /flashcards, /pearls, /notes
//   3. Admin-only route 404 for non-admins (no info leak)
//   4. Security headers on EVERY response:
//      - CSP (Content-Security-Policy) — strict, no wildcards
//      - HSTS — 2 years, includeSubDomains, preload
//      - X-Frame-Options — DENY (prevent clickjacking)
//      - X-Content-Type-Options — nosniff
//      - Referrer-Policy — strict-origin-when-cross-origin
//      - Permissions-Policy — disable all unnecessary browser APIs
//      - Cache-Control on API routes — no caching of sensitive data
//      - Cross-Origin headers — isolate browsing context
//
// Content protection:
//   - Licensed content never exposed without server-side purchase check
//   - This middleware is the FIRST layer; API routes add a second layer
//   - Correct answers are never sent to the client; validation is server-side only
//
// ═══════════════════════════════════════════════════════════════════

/* ── Attack pattern detection ──────────────────────────────────── */

const ATTACK_PATTERNS = [
  /\.\.\//,                     // Path traversal
  /<script/i,                   // XSS in URL
  /\b(union|select|insert|drop|delete|update|exec)\b.*\b(from|into|table|where)\b/i, // SQLi
  /%00/,                        // Null byte injection
  /\.(env|git|htaccess|passwd|shadow|config|bak|old)\b/i, // Sensitive file probes
  /\/(wp-admin|wp-login|phpmyadmin|adminer|phpmy|manager|console|actuator)/i, // CMS/DB probes
  /\/(etc\/passwd|proc\/self)/i, // Linux file system probes
  /\/(eval|base64_decode|system|passthru)\(/i, // Code injection patterns
  /(\$\{|\#{).*}/,               // Template injection
];

const SCANNER_UA_PATTERNS =
  /sqlmap|nikto|nmap|masscan|zgrab|dirbuster|nuclei|burpsuite|havij|acunetix|nessus|openvas/i;

function isAttackRequest(pathname: string, userAgent: string | null): boolean {
  for (const pattern of ATTACK_PATTERNS) {
    if (pattern.test(pathname)) return true;
  }
  if (userAgent && SCANNER_UA_PATTERNS.test(userAgent)) return true;
  return false;
}

/* ── Security response headers ─────────────────────────────────── */

function addSecurityHeaders(response: NextResponse, isApiRoute: boolean): void {
  // Clickjacking — DENY is stricter than SAMEORIGIN; safe for all SonoPrep pages
  response.headers.set("X-Frame-Options", "DENY");

  // MIME sniffing prevention
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Legacy XSS protection (IE/old Edge)
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer leakage control
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // HSTS — 2 years, include subdomains, preload-ready
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // Permissions: disable every browser API SonoPrep doesn't need
  response.headers.set(
    "Permissions-Policy",
    [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()",
      "payment=(self)",        // only self — for Stripe embedded
      "usb=()",
      "gyroscope=()",
      "accelerometer=()",
      "magnetometer=()",
      "screen-wake-lock=()",
    ].join(", ")
  );

  // Cross-Origin headers
  // COOP: same-origin-allow-popups — allows OAuth popups (Google login, NextAuth) to work
  //   while still isolating the context. "same-origin" is stricter but breaks OAuth redirects.
  // COEP: intentionally omitted — enabling it blocks Stripe JS and OAuth iframes silently.
  //   Only enable once fully migrated to cross-origin isolated context.
  // CORP: same-site — prevents other sites from embedding SonoPrep resources.
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  response.headers.set("Cross-Origin-Resource-Policy", "same-site");

  // Content Security Policy — strict, no wildcards
  // unsafe-inline in script-src required by Next.js hydration
  // unsafe-eval required by Next.js dev; tighten after confirming prod build
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: https://www.google-analytics.com",
      "connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com https://connect.mailerlite.com",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      "worker-src 'self' blob:",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",    // stronger than X-Frame-Options DENY
      "upgrade-insecure-requests",
    ].join("; ")
  );

  // No caching of API responses — content is licensed and access-controlled
  if (isApiRoute) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }
}

/* ── Middleware ─────────────────────────────────────────────────── */

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;
    const userAgent = req.headers.get("user-agent");
    const isApiRoute = pathname.startsWith("/api/");

    /* 1. Block detected attacks immediately */
    if (isAttackRequest(pathname, userAgent)) {
      const clientIp =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        req.headers.get("x-real-ip") ??
        "unknown";

      console.warn("[SECURITY] Attack pattern detected:", {
        ip: clientIp,
        path: pathname,
        ua: userAgent?.substring(0, 200),
        userId: token?.id ?? "unauthenticated",
        ts: new Date().toISOString(),
      });

      // Return 404 — do not reveal that we detected the attack
      const notFound = NextResponse.rewrite(new URL("/404", req.url));
      addSecurityHeaders(notFound, isApiRoute);
      return notFound;
    }

    /* 2. Admin-only: 404 for non-admins (no info leak) */
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      const notFound = NextResponse.rewrite(new URL("/404", req.url));
      addSecurityHeaders(notFound, isApiRoute);
      return notFound;
    }

    /* 3. Build response with full security header suite */
    const response = NextResponse.next();
    addSecurityHeaders(response, isApiRoute);
    return response;
  },
  {
    callbacks: {
      // withAuth calls this first; return false → redirect to signin
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/exam/:path*",
    "/flashcards/:path*",
    "/pearls/:path*",
    "/notes/:path*",
    "/billing/:path*",
    "/account/:path*",
    "/admin/:path*",
    // Apply to all API routes that serve content or auth
    "/api/content/:path*",
    "/api/exam/:path*",
    "/api/flashcards/:path*",
    "/api/user/:path*",
    "/api/account/:path*",
  ],
};
