import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import SessionProviderWrapper from "@/components/providers/session-provider";
import { AnalyticsProvider } from "@/components/providers/analytics-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://sonoprep.com"),
  title: {
    default: "SonoPrep — Pass the ARDMS SPI Exam on Your First Attempt",
    template: "%s | SonoPrep",
  },
  description:
    "The focused SPI exam prep system built around the official ARDMS content outline. Question bank, flashcards, physics notes, and a full exam simulator.",
  openGraph: {
    siteName: "SonoPrep",
    type: "website",
    locale: "en_US",
    title: "SonoPrep — Pass the ARDMS SPI Exam on Your First Attempt",
    description:
      "Pass the ARDMS SPI exam. Flashcards · Simulator · Physics Pearls · Study Notes.",
    url: "https://sonoprep.com",
    images: [
      {
        url: "/images/og-sonoprep.png",
        width: 1200,
        height: 630,
        alt: "SonoPrep — SPI Exam Prep",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SonoPrep — Pass the ARDMS SPI Exam on Your First Attempt",
    description:
      "Pass the ARDMS SPI exam. Flashcards · Simulator · Physics Pearls · Study Notes.",
    images: ["/images/og-sonoprep.png"],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230a0c10' stroke='%23c85b3a' stroke-width='2' /%3E%3Ctext x='50' y='68' font-family='Fraunces, Georgia, serif' font-size='52' font-weight='600' fill='%23c85b3a' text-anchor='middle'%3ESP%3C/text%3E%3C/svg%3E",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SonoPrep",
  url: "https://sonoprep.com",
  description:
    "ARDMS SPI exam prep platform — question bank, flashcards, physics study notes, and exam simulator built around the official ARDMS content outline.",
  foundingLocation: {
    "@type": "Place",
    name: "Houston, TX",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SonoPrep",
  url: "https://sonoprep.com",
  description: "ARDMS SPI exam prep — pass on your first attempt.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://sonoprep.com/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,800;9..144,900&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,450;8..60,500;8..60,600;8..60,700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body style={{ background: "#0B0D10" }}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SD4LQYV442"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SD4LQYV442');
          `}
        </Script>

        <SessionProviderWrapper>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
