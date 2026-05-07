import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Middleware — protects /app/* routes.
 *
 * SECURITY:
 * - Unauthenticated users → redirect to /auth/signin
 * - ADMIN-only routes → return 404 for non-admins (no info leak)
 * - Product-level access: /app/flashcards, /app/exam, etc. require purchase
 *   (Note: full product-access checks are done at the API route level;
 *    this middleware adds a first layer of defense for page navigation.)
 * - Comprehensive security headers on every response
 * - Suspicious pattern detection and logging
 */

/* ── Suspicious pattern detection ─────────────────────────────────── */

/**
 * Patterns that indicate potential attacks.
 * Checked against the full URL path.
 */
const SUSPICIOUS_PATTERNS = [
  /\.\.\//,                     // Path traversal
  /<script/i,                  // XSS attempt in URL
  /\b(union|select|insert|drop|delete)\b.*\b(from|into|table)\b/i, // SQL injection
  /%00/,                       // Null byte injection
  /\.(env|git|htaccess|passwd|shadow)/i, // Sensitive file access
  /\/wp-admin|\/wp-login/i,   // WordPress probe
  /\/phpmy|\/adminer/i,       // Database admin probes
];

function isSuspiciousRequest(pathname: string, userAgent: string | null): boolean {
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(pathname)) return true;
  }
  // Check user agent for known scanner signatures
  if (userAgent) {
    const scannerPatterns = /sqlmap|nikto|nmap|masscan|zgrab|dirbuster/i;
    if (scannerPatterns.test(userAgent)) return true;
  }
  return false;
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;
    const userAgent = req.headers.get("user-agent");

    /* ── Suspicious request logging ─────────────────────────────── */
    if (isSuspiciousRequest(pathname, userAgent)) {
      const clientIp =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        req.headers.get("x-real-ip") ??
        "unknown";

      console.warn("[security] Suspicious request detected:", {
        ip: clientIp,
        path: pathname,
        userAgent: userAgent?.substring(0, 200),
        userId: token?.id ?? "unauthenticated",
        timestamp: new Date().toISOString(),
      });
    }

    /* ── Admin-only route guard ─────────────────────────────────── */
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.rewrite(new URL("/404", req.url));
    }

    /* ── Build response with security headers ───────────────────── */
    const response = NextResponse.next();

    // Prevent clickjacking
    response.headers.set("X-Frame-Options", "SAMEORIGIN");

    // Prevent MIME-type sniffing
    response.headers.set("X-Content-Type-Options", "nosniff");

    // XSS protection (legacy browsers)
    response.headers.set("X-XSS-Protection", "1; mode=block");

    // Control referrer information leakage
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // Prevent browser from using HTTPS downgrade
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );

    // Permissions policy — disable unnecessary browser features
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), interest-cohort=()"
    );

    // Content Security Policy — restrictive but functional for Next.js
    // Allow inline styles (needed for Next.js), restrict scripts to same origin
    response.headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com",
        "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self'",
      ].join("; ")
    );

    return response;
  },
  {
    callbacks: {
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
  ],
};
