import { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://sonoprep.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  
  return [
    // ── Core pages (highest priority) ──────────────────────────
    { url: `${BASE}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/demo`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    
    // ── Product/feature pages ────────────────────────────────
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    
    // ── Credential-specific SEO landing pages ────────────────
    { url: `${BASE}/rdms`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/rdcs`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/rvt`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/rmsks`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // ── Blog index + articles ────────────────────────────────
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    {
      url: `${BASE}/blog/what-is-the-spi-exam`,
      lastModified: "2026-04-28T00:00:00.000Z",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/blog/how-long-to-study-for-spi`,
      lastModified: "2026-04-22T00:00:00.000Z",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/blog/doppler-physics-spi-guide`,
      lastModified: "2026-04-15T00:00:00.000Z",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/blog/spi-exam-domains-explained`,
      lastModified: "2026-04-08T00:00:00.000Z",
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE}/blog/spaced-repetition-sonography`,
      lastModified: "2026-04-01T00:00:00.000Z",
      changeFrequency: "monthly",
      priority: 0.75,
    },

    // ── Auth ─────────────────────────────────────────────────
    { url: `${BASE}/auth/signin`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/auth/signup`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },

    // ── Legal pages ──────────────────────────────────────────
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/accessibility`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];
}
