import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Turbopack configuration for proper build
  turbopack: {
    root: "/workspace",
  },
  
  // Security headers + AI crawler headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // Serve .md files as plain text for AI crawlers (markdown mirrors)
      {
        source: "/(.*)\.md",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "X-Robots-Tag", value: "index, follow" },
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=600" },
        ],
      },
      // llms.txt must be accessible and cached
      {
        source: "/llms.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=3600" },
        ],
      },
    ];
  },

  // Redirect old routes if any
  async redirects() {
    return [];
  },
};

export default nextConfig;
