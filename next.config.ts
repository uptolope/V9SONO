import type { NextConfig } from "next";

// ═══════════════════════════════════════════════════════════════════
// SonoPrep — next.config.ts (Production)
// Security headers here are the FIRST layer for public routes.
// Middleware adds headers to auth-gated routes as a second layer.
// Licensed content routes have a third layer in API route handlers.
// ═══════════════════════════════════════════════════════════════════

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Disable powered-by header — don't advertise the framework
  poweredByHeader: false,

  // Serve modern image formats & cache aggressively
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
  },

  async headers() {
    return [
      /* ── All routes: baseline security headers ── */
      {
        source: "/:path*",
        headers: [
          // Prevent clickjacking on every page
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-XSS-Protection",          value: "1; mode=block" },
          { key: "X-DNS-Prefetch-Control",    value: "on" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          // HSTS — 2 years, preload-ready
          {
            key:   "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Disable unused browser APIs
          {
            key:   "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Cross-origin isolation
          { key: "Cross-Origin-Opener-Policy",   value: "same-origin-allow-popups" }, // allow OAuth popup flows
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          // Tailored CSP for Next.js + Stripe + Google Fonts
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com https://connect.mailerlite.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
              "worker-src 'self' blob:",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },

      /* ── Licensed content API routes: never cache ── */
      {
        source: "/api/content/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, private" },
          { key: "Pragma",        value: "no-cache" },
          { key: "Expires",       value: "0" },
          // Prevent content from being stored anywhere
          { key: "Surrogate-Control", value: "no-store" },
        ],
      },

      /* ── Auth API routes: never cache ── */
      {
        source: "/api/auth/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, private" },
          { key: "Pragma",        value: "no-cache" },
        ],
      },

      /* ── User/account API routes: never cache ── */
      {
        source: "/api/user/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, private" },
        ],
      },

      /* ── Public static assets: long cache ── */
      {
        source: "/icons/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.ico",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      /* ── llms.txt / robots: short cache, allow indexing ── */
      {
        source: "/llms.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=3600" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },

      /* ── Markdown routes: readable in browser ── */
      {
        source: "/:path*.md",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "X-Robots-Tag", value: "index, follow" },
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=600" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Redirect any attempt to access raw content files to 404
      {
        source: "/api/content/:path*",
        missing: [{ type: "header", key: "authorization" }],
        destination: "/404",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
