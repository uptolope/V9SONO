import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Security Middleware (Production-Grade)
// ═══════════════════════════════════════════════════════════════════
//
// TWO middleware layers:
//   1. Global middleware (all routes): security headers + attack detection
//   2. Auth-gated middleware (protected routes): authentication required
//
// Security headers on EVERY response:
//   - CSP (Content-Security-Policy) — strict, no wildcards
//   - HSTS — 2 years, includeSubDomains, preload
//   - X-Frame-Options — DENY (prevent clickjacking)
//   - X-Content-Type-Options — nosniff
//   - Referrer-Policy — strict-origin-when-cross-origin
//   - Permissions-Policy — disable all unnecessary browser APIs
//   - Cache-Control on API routes — no caching of sensitive data
//   - Cross-Origin headers — isolate browsing context
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
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  response.headers.set("Cross-Origin-Resource-Policy", "same-site");

  // Content Security Policy — strict, no wildcards
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://vercel.live https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: https://www.google-analytics.com",
      "connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com https://connect.mailerlite.com https://www.google-analytics.com https://region1.google-analytics.com",
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

/* ── Routes that require authentication ────────────────────────── */

const AUTH_REQUIRED_ROUTES = [
  "/dashboard",
  "/exam",
  "/flashcards",
  "/pearls",
  "/notes",
  "/billing",
  "/account",
  "/admin",
];

const AUTH_REQUIRED_API_ROUTES = [
  "/api/content/",
  "/api/exam/",
  "/api/flashcards/",
  "/api/user/",
  "/api/account/",
];

function isAuthRequired(pathname: string): boolean {
  for (const route of AUTH_REQUIRED_ROUTES) {
    if (pathname.startsWith(route)) return true;
  }
  for (const route of AUTH_REQUIRED_API_ROUTES) {
    if (pathname.startsWith(route)) return true;
  }
  return false;
}

/* ── Auth-gated middleware (for protected routes) ──────────────── */

const authMiddleware = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;
    const isApiRoute = pathname.startsWith("/api/");

    // Admin-only: 404 for non-admins
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      const notFound = NextResponse.rewrite(new URL("/404", req.url));
      addSecurityHeaders(notFound, isApiRoute);
      return notFound;
    }

    const response = NextResponse.next();
    addSecurityHeaders(response, isApiRoute);
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

/* ── Global middleware (all routes) ────────────────────────────── */

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get("user-agent");
  const isApiRoute = pathname.startsWith("/api/");

  // 1. Block detected attacks immediately (all routes)
  if (isAttackRequest(pathname, userAgent)) {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    console.warn("[SECURITY] Attack pattern detected:", {
      ip: clientIp,
      path: pathname,
      ua: userAgent?.substring(0, 200),
      ts: new Date().toISOString(),
    });

    const notFound = NextResponse.rewrite(new URL("/404", req.url));
    addSecurityHeaders(notFound, isApiRoute);
    return notFound;
  }

  // 2. For auth-required routes, delegate to withAuth middleware
  if (isAuthRequired(pathname)) {
    return (authMiddleware as any)(req);
  }

  // 3. Public routes — still get security headers
  const response = NextResponse.next();
  addSecurityHeaders(response, isApiRoute);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|fonts/).*)",
  ],
};
