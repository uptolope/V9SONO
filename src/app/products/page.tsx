import type { Metadata } from "next";
import { ProductsPageClient } from "./page-client";
import { AllProductsJsonLd, CourseJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "SPI Exam Prep Products — Flashcards, Simulator & Physics Pearls | SonoPrep",
  description:
    "SPI exam study tools for RDMS, RDCS, RVT, and RMSKS candidates. 200+ flashcards, 110-question exam simulator, Physics Pearls, and Study Notes. Individual products from $9. Built by RDMS sonographers.",
  keywords: [
    "SPI exam products",
    "SPI flashcards",
    "SPI exam simulator",
    "sonography physics pearls",
    "SPI study notes",
    "ARDMS SPI prep tools",
    "RDMS study materials",
    "SPI premium bundle",
  ],
  openGraph: {
    title: "SPI Exam Prep Products | SonoPrep",
    description:
      "Flashcards, exam simulator, Physics Pearls, and study notes for the ARDMS SPI exam. Required for RDMS, RDCS, RVT, and RMSKS. From $9.",
    url: "https://sonoprep.com/products",
  },
  alternates: { canonical: "https://sonoprep.com/products" },
};

export default function ProductsPage() {
  return (
    <>
      <AllProductsJsonLd />
      <CourseJsonLd />
      <ProductsPageClient />
    </>
  );
}
