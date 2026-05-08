import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "SonoPrep — SPI Exam Prep for Sonographers",
  description: "Pass the ARDMS SPI exam with flashcards, simulator, and physics pearls.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230a0c10' stroke='%23c85b3a' stroke-width='2' /%3E%3Ctext x='50' y='68' font-family='Fraunces, Georgia, serif' font-size='52' font-weight='600' fill='%23c85b3a' text-anchor='middle'%3ESP%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,450;8..60,500;8..60,600;8..60,700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0a0c10]">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
