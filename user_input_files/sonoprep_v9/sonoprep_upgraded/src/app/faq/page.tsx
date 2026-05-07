import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about SonoPrep SPI exam preparation materials.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-24">
        <FaqSection />

        {/* Contact */}
        <section className="py-16">
          <div className="mx-auto max-w-xl px-6">
            <Card className="text-center">
              <CardContent className="space-y-4 pt-8 pb-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mist">
                  <Mail className="h-8 w-8 text-teal" />
                </div>
                <h3 className="font-display text-xl font-semibold text-cream">
                  Still Have Questions?
                </h3>
                <p className="text-sm text-cream-dim">
                  Our team typically responds within 24 hours.
                </p>
                <a
                  href="mailto:support@sonoprep.com"
                  className="inline-flex items-center gap-2 rounded bg-teal px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-obsidian transition-colors hover:bg-teal-glow"
                >
                  <Mail className="h-4 w-4" />
                  support@sonoprep.com
                </a>
                <div className="flex justify-center gap-8 pt-4">
                  <div className="flex items-center gap-2 text-cream-dim">
                    <Clock className="h-4 w-4 text-teal" />
                    <span className="font-mono text-xs">24hr response</span>
                  </div>
                  <div className="flex items-center gap-2 text-cream-dim">
                    <ShieldCheck className="h-4 w-4 text-teal" />
                    <span className="font-mono text-xs">90-day access</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
