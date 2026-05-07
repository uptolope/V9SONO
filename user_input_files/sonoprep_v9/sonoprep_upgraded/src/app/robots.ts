import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://sonoprep.com";
  const protectedRoutes = [
    "/api/",
    "/auth/",
    "/dashboard",
    "/exam",
    "/flashcards",
    "/notes",
    "/pearls",
    "/account",
    "/billing",
  ];

  const rule = {
    allow: "/",
    disallow: protectedRoutes,
  };

  return {
    rules: [
      { userAgent: "*", ...rule },
      { userAgent: "GPTBot", ...rule },
      { userAgent: "ClaudeBot", ...rule },
      { userAgent: "PerplexityBot", ...rule },
      { userAgent: "Google-Extended", ...rule },
      { userAgent: "CCBot", ...rule },
      { userAgent: "FacebookBot", ...rule },
      { userAgent: "cohere-ai", ...rule },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
