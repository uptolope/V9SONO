import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { TrademarkDisclaimer } from "@/components/ui/trademark-disclaimer";
import { ArrowRight, BookOpen, Zap, Shield, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "RDCS Exam Prep — Pass the SPI & Earn Your RDCS Credential | SonoPrep",
  description:
    "Prepare for the ARDMS SPI exam required for your RDCS credential. 200+ flashcards, 110-question simulator, and Physics Pearls built by credentialed cardiac sonographers. Pass the physics. Get your RDCS.",
  keywords: [
    "RDCS exam prep",
    "RDCS credential",
    "RDCS study guide",
    "RDCS SPI exam",
    "Registered Diagnostic Cardiac Sonographer",
    "ARDMS RDCS preparation",
    "cardiac sonography registry review",
    "SPI exam RDCS",
    "echocardiography registry prep",
    "ARDMS SPI cardiac",
  ],
  openGraph: {
    title: "RDCS Exam Prep — Pass the SPI & Earn Your RDCS Credential | SonoPrep",
    description:
      "The SPI is the mandatory gateway to your RDCS credential. SonoPrep gives you clinically focused flashcards, a realistic exam simulator, and Physics Pearls built by practicing cardiac sonographers.",
    url: "https://sonoprep.com/rdcs",
  },
  alternates: { canonical: "https://sonoprep.com/rdcs" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "RDCS Exam Preparation — SPI Study Materials",
  description:
    "Comprehensive SPI exam preparation for RDCS candidates. Includes 200+ flashcards, 110-question simulator, Physics Pearls, and Study Notes built by credentialed cardiac sonographers.",
  provider: { "@type": "Organization", name: "SonoPrep", url: "https://sonoprep.com" },
  url: "https://sonoprep.com/rdcs",
  educationalLevel: "Professional Certification",
  about: ["RDCS Credential", "ARDMS SPI Exam", "Cardiac Sonography", "Echocardiography"],
  teaches: [
    "Sonographic physics principles required for RDCS",
    "Doppler physics for cardiac applications",
    "Ultrasound instrumentation concepts",
    "Image artifacts recognition",
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
    title: "200+ Flashcards Covering All SPI Domains",
    desc: "Physics concepts that directly underpin cardiac imaging — Doppler, pulse-echo, transducer mechanics, artifacts — all mapped to the ARDMS blueprint.",
  },
  {
    icon: Zap,
    title: "110-Question ARDMS-Style Simulator",
    desc: "Replicate the pressure of the real exam. Detailed clinical rationales connect physics theory to the cardiac scanner room.",
  },
  {
    icon: Shield,
    title: "50 Physics Pearls",
    desc: "High-yield insights including Nyquist limit, aliasing, color Doppler, and frame rate vs. resolution tradeoffs — critical for RDCS candidates.",
  },
  {
    icon: Clock,
    title: "Spaced Repetition",
    desc: "SM-2 algorithm adapts to your weak spots. Study 30 minutes daily. Be ready in 30–60 days.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Pass the SPI First",
    desc: "ARDMS requires all RDCS candidates to pass the SPI (Sonography Principles and Instrumentation) exam before registering for the Adult Echo, Pediatric Echo, or Fetal Echo specialty exam.",
  },
  {
    num: "02",
    title: "Choose Your Cardiac Specialty",
    desc: "After passing the SPI, sit for your cardiac specialty — Adult Echocardiography (AE), Pediatric Echocardiography (PE), or Fetal Echocardiography (FE).",
  },
  {
    num: "03",
    title: "Earn Your RDCS",
    desc: "Pass both exams to earn the Registered Diagnostic Cardiac Sonographer credential — the standard for echocardiography professionals.",
  },
];

export default function RdcsPage() {
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
            <p className="section-label mb-4">RDCS Credential Prep</p>
            <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl lg:text-6xl leading-tight">
              Pass the SPI.{" "}
              <span className="gradient-text-premium">Earn Your RDCS.</span>
            </h1>
            <p className="mt-6 text-lg text-cream-dim max-w-2xl mx-auto leading-relaxed">
              The SPI exam is the mandatory ARDMS prerequisite for the{" "}
              <strong className="text-cream">Registered Diagnostic Cardiac Sonographer</strong> credential.
              SonoPrep's physics-focused study tools are built to get you through that gate.
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

        {/* What is RDCS */}
        <section className="py-20 mx-auto max-w-4xl px-6">
          <h2 className="font-display text-3xl font-bold text-cream mb-6">
            What Is the RDCS Credential?
          </h2>
          <div className="space-y-4 text-cream-dim leading-relaxed">
            <p>
              The <strong className="text-cream">Registered Diagnostic Cardiac Sonographer (RDCS)</strong>{" "}
              credential is issued by ARDMS and is the recognized professional standard for cardiac sonographers
              (echocardiographers) in clinical practice.
            </p>
            <p>
              RDCS candidates must pass the <strong className="text-cream">SPI exam first</strong>, then
              pass a cardiac specialty exam in Adult Echocardiography (AE), Pediatric Echocardiography (PE),
              or Fetal Echocardiography (FE).
            </p>
            <p>
              Cardiac sonography relies heavily on Doppler physics — continuous wave, pulsed wave, color flow,
              and tissue Doppler — all of which are tested in depth on the SPI. A strong SPI performance
              directly benefits your cardiac specialty exam performance.
            </p>
          </div>

          <div className="mt-8 rounded border border-teal/20 bg-teal/5 px-6 py-5">
            <p className="font-mono text-xs uppercase tracking-widest text-teal mb-2">Why Physics Matters for RDCS</p>
            <p className="text-sm text-cream-dim leading-relaxed">
              Doppler covers ~22% of the SPI exam — and it's the physics that powers every cardiac scan you'll
              do. SonoPrep's Doppler-specific flashcards and Physics Pearls make this the section you ace, not avoid.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 bg-charcoal/20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-display text-3xl font-bold text-cream mb-12 text-center">
              How RDCS Credentialing Works
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
              Ready to Earn Your RDCS?
            </h2>
            <p className="text-cream-dim mb-8 leading-relaxed">
              Start free — 20 flashcards and a 10-question practice quiz, no credit card needed.
              Individual products from $9 when you're ready to go deeper.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="btn-glow">
                <Link href="/products">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/demo">Try Free First</Link>
              </Button>
            </div>
            <p className="mt-12 font-mono text-xs text-cream-dim/40">
              Also preparing for{" "}
              <Link href="/rdms" className="text-teal/60 hover:text-teal transition-colors">RDMS</Link>
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
