import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://sonoprep.com"),
  title: {
    default: "SonoPrep — ARDMS SPI Exam Preparation by Practicing Sonographers",
    template: "%s | SonoPrep",
  },
  description:
    "Prepare for the ARDMS SPI exam with 200+ flashcards, a 110-question simulator, and Physics Pearls built by RDMS-credentialed sonographers. Required for RDMS, RDCS, RVT, and RMSKS credentials.",
  keywords: [
    "SPI exam",
    "ARDMS SPI",
    "SPI exam prep",
    "sonography principles and instrumentation",
    "ultrasound physics study",
    "RDMS exam preparation",
    "SPI flashcards",
    "SPI practice test",
    "sonography exam simulator",
    "ultrasound physics review",
    "ARDMS registry review",
    "SPI exam study guide",
    "sonography physics pearls",
  ],
  authors: [{ name: "SonoPrep" }],
  creator: "SonoPrep",
  publisher: "SonoPrep",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sonoprep.com",
    siteName: "SonoPrep",
    title: "SonoPrep — ARDMS SPI Exam Preparation",
    description: "Prepare for the ARDMS SPI — required for RDMS, RDCS, RVT, and RMSKS credentials. Built by practicing RDMS sonographers.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SonoPrep — ARDMS SPI Exam Preparation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SonoPrep — ARDMS SPI Exam Preparation",
    description: "Built around the exact ARDMS exam blueprint. Built by practicing sonographers. Individual products from $9.",
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://sonoprep.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-screen bg-obsidian text-cream antialiased">
        {/* Skip navigation — WCAG 2.4.1 Bypass Blocks */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded focus:bg-teal focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-medium focus:text-obsidian focus:outline-none focus:ring-2 focus:ring-teal-glow"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
