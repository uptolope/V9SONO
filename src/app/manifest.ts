import type { MetadataRoute } from "next";

/* ── Web App Manifest ─────────────────────────────────────────────
   PWA-ready manifest with SonoPrep branding.
   - Standalone display for "Add to Home Screen" on mobile
   - Brand colors: obsidian background, teal theme
   - Icon sizes for all common platforms
   ──────────────────────────────────────────────────────────────────── */

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SonoPrep — SPI Exam Preparation",
    short_name: "SonoPrep",
    description:
      "Master sonographic physics and pass your ARDMS SPI exam with flashcards, exam simulation, and spaced-repetition learning.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e14", // obsidian
    theme_color: "#0d9488",      // teal
    orientation: "portrait-primary",
    categories: ["education", "medical"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
