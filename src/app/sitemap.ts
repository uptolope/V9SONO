import { MetadataRoute } from "next";
import { questionBanks } from "@/lib/products";

const BASE = "https://sonoprep.com";

const BLOG_SLUGS = [
  "complete-spi-exam-guide",
  "ardms-exam-blueprint",
  "doppler-principles-spi-exam",
  "ultrasound-physics-spi",
  "ultrasound-artifacts-spi",
  "pass-spi-first-attempt",
  "spaced-repetition-spi-exam",
  "test-taking-strategies-spi",
  "ardms-specialties-comparison",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE,
      changeFrequency: "weekly",
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      url: `${BASE}/products`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: new Date(),
    },
    {
      url: `${BASE}/demo`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: new Date(),
    },
    {
      url: `${BASE}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${BASE}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
      lastModified: new Date(),
    },
    {
      url: `${BASE}/faq`,
      changeFrequency: "monthly",
      priority: 0.5,
      lastModified: new Date(),
    },
    {
      url: `${BASE}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
      lastModified: new Date(),
    },
    {
      url: `${BASE}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
      lastModified: new Date(),
    },
  ];

  // Specialty credential landing pages
  const credentialRoutes: MetadataRoute.Sitemap = [
    "rdcs", "rdms", "rmsks", "rvt",
  ].map((slug) => ({
    url: `${BASE}/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: new Date(),
  }));

  // SEO marketing pages + product detail pages + practice pages
  const productRoutes: MetadataRoute.Sitemap = questionBanks.flatMap((p) => [
    {
      url: `${BASE}/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      lastModified: new Date(),
    },
    {
      url: `${BASE}/products/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      lastModified: new Date(),
    },
    {
      url: `${BASE}/practice/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: new Date(),
    },
  ]);

  const blogRoutes: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...credentialRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}
