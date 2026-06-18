import { MetadataRoute } from "next";

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
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...blogRoutes];
}
