import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { TrademarkDisclaimer } from "@/components/ui/trademark-disclaimer";
import { ArrowRight, BookOpen, Zap, Shield, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "RVT Exam Prep — Pass the SPI & Earn Your RVT Credential | SonoPrep",
  description:
    "Prepare for the ARDMS SPI exam required for your RVT credential. 200+ flashcards, 110-question simulator, and Physics Pearls built by credentialed vascular sonographers. Pass the physics. Get your RVT.",
  keywords: [
    "RVT exam prep",
    "RVT credential",
    "RVT study guide",
    "RVT SPI exam",
    "Registered Vascular Technologist",
    "ARDMS RVT preparation",
    "vascular technology registry review",
    "SPI exam RVT",
    "vascular sonography study",
    "ARDMS SPI vascular",
  ],
  openGraph: {
    title: "RVT Exam Prep — Pass the SPI & Earn Your RVT Credential | SonoPrep",
    description:
      "The SPI is the mandatory gateway to your RVT credential. SonoPrep gives you clinically focused flashcards, a realistic exam simulator, and Physics Pearls built by practicing vascular sonographers.",
    url: "https://sonoprep.com/rvt",
  },
  alternates: { canonical: "https://sonoprep.com/rvt" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "RVT Exam Preparation — SPI Study Materials",
  description:
    "Comprehensive SPI exam preparation for RVT candidates. Includes 200+ flashcards, 110-question simulator, Physics Pearls, and Study Notes built by credentialed vascular sonographers.",
  provider: { "@type": "Organization", name: "SonoPrep", url: "https://sonoprep.com" },
  url: "https://sonoprep.com/rvt",
  educationalLevel: "Professional Certification",
  about: ["RVT Credential", "ARDMS SPI Exam", "Vascular Technology", "Vascular Sonography"],
  teaches: [
    "Sonographic physics principles required for RVT",
    "Doppler physics for vascular applications",
    "Spectral waveform analysis",
    "Image artifacts recognition",
    "Transducer technology for vascular imaging",
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
    title: "200+ Flashcards Including Vascular-Relevant Physics",
    desc: "Doppler waveform analysis, aliasing, spectral broadening, and hemodynamic principles — all mapped to the SPI blueprint that gates your RVT credential.",
  },
  {
    icon: Zap,
    title: "110-Question ARDMS-Style Simulator",
    desc: "Full timed simulation with detailed rationales connecting physics to vascular imaging principles you'll use in practice.",
  },
  {
    icon: Shield,
    title: "50 Physics Pearls for Vascular Candidates",
    desc: "Nyquist limit, Doppler angle dependence, waveform characteristics, and PRF optimization — the pearls that matter most for RVT prep.",
  },
  {
    icon: Clock,
    title: "Efficient Study System",
    desc: "Spaced repetition focuses your study time on concepts you're missing. Designed for working professionals with limited prep time.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Pass the SPI First",
    desc: "ARDMS requires all RVT candidates to pass the SPI (Sonography Principles and Instrumentation) exam before sitting for the Vascular Technology (VT) specialty exam.",
  },
  {
    num: "02",
    title: "Sit for Vascular Technology Specialty",
    desc: "After passing the SPI, register for the ARDMS Vascular Technology (VT) specialty exam covering vascular anatomy, hemodynamics, and vascular pathology.",
  },
  {
    num: "03",
    title: "Earn Your RVT",
    desc: "Pass both exams to earn the Registered Vascular Technologist credential — the standard of excellence in vascular sonography.",
  },
];

export default function RvtPage() {
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
            <p className="section-label mb-4">RVT Credential Prep</p>
            <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl lg:text-6xl leading-tight">
              Pass the SPI.{" "}
              <span className="gradient-text-premium">Earn Your RVT.</span>
            </h1>
            <p className="mt-6 text-lg text-cream-dim max-w-2xl mx-auto leading-relaxed">
              The SPI exam is the mandatory ARDMS prerequisite for the{" "}
              <strong className="text-cream">Registered Vascular Technologist</strong> credential.
              SonoPrep's Doppler-heavy study tools are built specifically for the physics that drives
              vascular imaging.
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

        {/* What is RVT */}
        <section className="py-20 mx-auto max-w-4xl px-6">
          <h2 className="font-display text-3xl font-bold text-cream mb-6">
            What Is the RVT Credential?
          </h2>
          <div className="space-y-4 text-cream-dim leading-relaxed">
            <p>
              The <strong className="text-cream">Registered Vascular Technologist (RVT)</strong>{" "}
              credential is issued by ARDMS and is the professional standard for vascular sonographers
              in clinical practice — covering carotid duplex, peripheral arterial/venous, abdominal
              vascular, and transcranial Doppler studies.
            </p>
            <p>
              To earn the RVT, candidates must pass the <strong className="text-cream">SPI exam first</strong>,
              then pass the Vascular Technology (VT) specialty exam. The SPI is non-negotiable — no
              exceptions, no substitutions.
            </p>
            <p>
              Vascular sonography is among the most Doppler-intensive specialties. The SPI's Doppler section
              (~22% of the exam) directly maps to the physics you'll use in every vascular study — waveform
              analysis, angle correction, aliasing, and spectral display. Pass the SPI, and you're already
              building your vascular specialty foundation.
            </p>
          </div>

          <div className="mt-8 rounded border border-teal/20 bg-teal/5 px-6 py-5">
            <p className="font-mono text-xs uppercase tracking-widest text-teal mb-2">Doppler Is Central to the RVT Path</p>
            <p className="text-sm text-cream-dim leading-relaxed">
              Continuous wave, pulsed wave, color flow, and power Doppler are the foundation of vascular imaging.
              SonoPrep's 50 Physics Pearls include dedicated Doppler pearls that connect SPI physics directly
              to the clinical vascular lab.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 bg-charcoal/20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-display text-3xl font-bold text-cream mb-12 text-center">
              How RVT Credentialing Works
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
              Ready to Earn Your RVT?
            </h2>
            <p className="text-cream-dim mb-8 leading-relaxed">
              Start with the free demo — 20 flashcards and a 10-question practice quiz. No credit card required.
              Individual products from $9 when you're ready to commit.
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
              <Link href="/rdcs" className="text-teal/60 hover:text-teal transition-colors">RDCS</Link>
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
