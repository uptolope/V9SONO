import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { TrademarkDisclaimer } from "@/components/ui/trademark-disclaimer";
import { ArrowRight, CheckCircle2, Shield, BookOpen, Zap, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "RDMS Exam Prep — Pass the SPI & Earn Your RDMS Credential | SonoPrep",
  description:
    "Prepare for the ARDMS SPI exam required for your RDMS credential. 200+ flashcards, 110-question simulator, and Physics Pearls built by RDMS-credentialed sonographers. Pass the physics. Get your RDMS.",
  keywords: [
    "RDMS exam prep",
    "RDMS credential",
    "RDMS study guide",
    "RDMS SPI exam",
    "Registered Diagnostic Medical Sonographer",
    "ARDMS RDMS preparation",
    "RDMS study materials",
    "SPI exam RDMS",
    "sonography registry review",
    "ARDMS SPI flashcards",
  ],
  openGraph: {
    title: "RDMS Exam Prep — Pass the SPI & Earn Your RDMS Credential | SonoPrep",
    description:
      "The SPI is the mandatory gateway to your RDMS credential. SonoPrep gives you clinically focused flashcards, a realistic exam simulator, and Physics Pearls built by practicing RDMS sonographers.",
    url: "https://sonoprep.com/rdms",
  },
  alternates: { canonical: "https://sonoprep.com/rdms" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "RDMS Exam Preparation — SPI Study Materials",
  description:
    "Comprehensive SPI exam preparation for RDMS candidates. Includes 200+ flashcards, 110-question simulator, Physics Pearls, and Study Notes built by RDMS-credentialed sonographers.",
  provider: { "@type": "Organization", name: "SonoPrep", url: "https://sonoprep.com" },
  url: "https://sonoprep.com/rdms",
  educationalLevel: "Professional Certification",
  about: ["RDMS Credential", "ARDMS SPI Exam", "Sonographic Physics", "Diagnostic Medical Sonography"],
  teaches: [
    "Sonographic physics principles required for RDMS",
    "Ultrasound instrumentation concepts",
    "Image artifacts recognition",
    "Doppler physics",
    "Transducer technology",
    "Bioeffects and patient safety",
  ],
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "9",
    highPrice: "99",
    priceCurrency: "USD",
    offerCount: "5",
  },
};

const FEATURES = [
  {
    icon: BookOpen,
    title: "200+ RDMS-Focused Flashcards",
    desc: "Every card maps to the ARDMS SPI blueprint — the exam you must pass before sitting for your RDMS specialty test.",
  },
  {
    icon: Zap,
    title: "110-Question Exam Simulator",
    desc: "Timed simulation calibrated to ARDMS difficulty. Detailed rationales for every answer, so you understand — not just memorize.",
  },
  {
    icon: Shield,
    title: "50 Physics Pearls",
    desc: "High-yield clinical insights that bridge ultrasound physics to the scanner room. Built by RDMS-credentialed practicing sonographers.",
  },
  {
    icon: Clock,
    title: "Spaced Repetition Engine",
    desc: "SM-2 algorithm surfaces the cards you miss most. 30 minutes daily can prepare you in as few as 30 days.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Pass the SPI First",
    desc: "The SPI (Sonography Principles and Instrumentation) exam is the mandatory ARDMS prerequisite — you must pass it before registering for any RDMS specialty exam.",
  },
  {
    num: "02",
    title: "Choose Your RDMS Specialty",
    desc: "After passing the SPI, you sit for your specialty exam in Abdomen, OB/GYN, Adult Echo, Breast, Pediatric Echo, or Vascular.",
  },
  {
    num: "03",
    title: "Earn Your RDMS",
    desc: "Pass both exams to earn the Registered Diagnostic Medical Sonographer credential — recognized nationwide as the gold standard in diagnostic sonography.",
  },
];

export default function RdmsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-obsidian">

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(13,148,136,0.07),transparent)]" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center">
            <p className="section-label mb-4">RDMS Credential Prep</p>
            <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl lg:text-6xl leading-tight">
              Pass the SPI.{" "}
              <span className="gradient-text-premium">Earn Your RDMS.</span>
            </h1>
            <p className="mt-6 text-lg text-cream-dim max-w-2xl mx-auto leading-relaxed">
              The Sonography Principles and Instrumentation exam is the mandatory ARDMS gateway to the{" "}
              <strong className="text-cream">Registered Diagnostic Medical Sonographer</strong> credential.
              SonoPrep gives you everything you need to pass it — built by RDMS sonographers who've been there.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" asChild className="group btn-glow">
                <Link href="/products">
                  Start Preparing — From $9
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="ghost" size="xl" asChild>
                <Link href="/demo">Try Free Demo</Link>
              </Button>
            </div>
            <p className="mt-4 font-mono text-xs text-cream-dim/40">
              No subscription · 90-day access · No credit card for demo
            </p>
          </div>
        </section>

        {/* What is RDMS */}
        <section className="py-20 mx-auto max-w-4xl px-6">
          <h2 className="font-display text-3xl font-bold text-cream mb-6">
            What Is the RDMS Credential?
          </h2>
          <div className="space-y-4 text-cream-dim leading-relaxed">
            <p>
              The <strong className="text-cream">Registered Diagnostic Medical Sonographer (RDMS)</strong> credential,
              issued by ARDMS (American Registry for Diagnostic Medical Sonography), is the industry-standard
              professional certification for diagnostic medical sonographers in the United States.
            </p>
            <p>
              To earn the RDMS, candidates must pass <strong className="text-cream">two examinations</strong>:{" "}
              the SPI (Sonography Principles and Instrumentation) exam, followed by a specialty exam in their
              chosen clinical area — Abdomen (AB), OB/GYN, Adult Echocardiography, Breast, Pediatric
              Echocardiography, Fetal Echocardiography, or Musculoskeletal.
            </p>
            <p>
              The SPI is the prerequisite. You cannot register for any RDMS specialty exam until you pass it.
              That makes passing the SPI the single most important step on your path to the RDMS.
            </p>
          </div>

          {/* SPI gate callout */}
          <div className="mt-8 rounded border border-teal/20 bg-teal/5 px-6 py-5">
            <p className="font-mono text-xs uppercase tracking-widest text-teal mb-2">The SPI — RDMS Gateway Exam</p>
            <p className="text-sm text-cream-dim leading-relaxed">
              110 multiple-choice questions · 2.5-hour time limit · Ultrasound physics, Doppler principles,
              transducer technology, image artifacts, bioeffects & safety · No exemptions, no shortcuts.
            </p>
          </div>
        </section>

        {/* How RDMS Credentialing Works */}
        <section className="py-16 bg-charcoal/20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-display text-3xl font-bold text-cream mb-12 text-center">
              How RDMS Credentialing Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {STEPS.map((step) => (
                <div key={step.num} className="rounded border border-border bg-mist p-6">
                  <p className="font-mono text-3xl font-bold text-teal/30 mb-3">{step.num}</p>
                  <h3 className="font-display text-lg font-semibold text-cream mb-2">{step.title}</h3>
                  <p className="text-sm text-cream-dim leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <p className="section-label mb-3">What SonoPrep Gives You</p>
            <h2 className="font-display text-3xl font-bold text-cream">
              Every Tool You Need to Pass the SPI
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded border border-border bg-slate/30 p-6">
                  <Icon className="h-5 w-5 text-teal mb-4" />
                  <h3 className="font-display text-lg font-semibold text-cream mb-2">{f.title}</h3>
                  <p className="text-sm text-cream-dim leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-border">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="font-display text-3xl font-bold text-cream mb-4">
              Ready to Earn Your RDMS?
            </h2>
            <p className="text-cream-dim mb-8 leading-relaxed">
              Start with the free demo — 20 flashcards and a 10-question practice quiz. No credit card required.
              When you're ready, individual products start at $9.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="btn-glow">
                <Link href="/products">
                  View All Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/demo">Try Free First</Link>
              </Button>
            </div>

            {/* Also links to other credentials */}
            <p className="mt-12 font-mono text-xs text-cream-dim/40">
              Also preparing for{" "}
              <Link href="/rdcs" className="text-teal/60 hover:text-teal transition-colors">RDCS</Link>
              {" · "}
              <Link href="/rvt" className="text-teal/60 hover:text-teal transition-colors">RVT</Link>
              {" · "}
              <Link href="/rmsks" className="text-teal/60 hover:text-teal transition-colors">RMSKS</Link>
              ? The SPI is required for all four credentials.
            </p>
          </div>
        </section>

      </main>
      <div className="pb-8 border-t border-border/30 mx-auto max-w-3xl px-6"><TrademarkDisclaimer orgs={["ARDMS", "CCI", "ARRT"]} /></div>
      <Footer />
    </>
  );
}
