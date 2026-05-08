import type { Metadata } from "next";
import { HomePageClient } from "./page-client";


export const metadata: Metadata = {
  title: "SonoPrep — ARDMS SPI Exam Prep for RDMS, RDCS, RVT & RMSKS",
  description: "Pass the ARDMS SPI exam required for RDMS, RDCS, RVT, and RMSKS credentials. 200+ flashcards, 170-question simulator, and Physics Pearls built by RDMS-credentialed sonographers. From $9.",
  keywords: ["SPI exam prep", "ARDMS SPI", "RDMS exam preparation", "RDCS exam preparation", "RVT exam preparation", "RMSKS exam preparation", "sonography physics exam", "SPI flashcards", "SPI practice test", "ARDMS registry review", "ultrasound physics study", "SPI exam study guide", "sonography principles and instrumentation", "ARDMS credential prep"],
};

export default function HomePage() {
  return <HomePageClient />;
}
export const dynamic = 'force-dynamic';
