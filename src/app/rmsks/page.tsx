import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { TrademarkDisclaimer } from "@/components/ui/trademark-disclaimer";
import { ArrowRight, BookOpen, Zap, Shield, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "RMSKS Exam Prep — Pass the SPI & Earn Your RMSKS Credential | SonoPrep",
  description:
    "Prepare for the ARDMS SPI exam required for your RMSKS credential. 200+ flashcards, 110-question simulator, and Physics Pearls built by credentialed sonographers. Pass the physics. Get your RMSKS.",
  keywords: [
    "RMSKS exam prep",
    "RMSKS credential",
    "RMSKS study guide",
    "RMSKS SPI exam",
    "Registered Musculoskeletal Sonographer",
    "ARDMS RMSKS preparation",
    "musculoskeletal sonography registry review",
    "SPI exam RMSKS",
    "MSK ultrasound registry",
    "ARDMS SPI musculoskeletal",
  ],
  openGraph: {
    title: "RMSKS Exam Prep — Pass the SPI & Earn Your RMSKS Credential | SonoPrep",
    description:
      "The SPI is the mandatory gateway to your RMSKS credential. SonoPrep gives you clinically focused flashcards, a realistic exam simulator, and Physics Pearls built by practicing sonographers.",
    url: "https://sonoprep.com/rmsks",
  },
  alternates: { canonical: "https://sonoprep.com/rmsks" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "RMSKS Exam Preparation — SPI Study Materials",
  description:
    "Comprehensive SPI exam preparation for RMSKS candidates. Includes 200+ flashcards, 110-question simulator, Physics Pearls, and Study Notes built by credentialed sonographers.",
  provider: { "@type": "Organization", name: "SonoPrep", url: "https://sonoprep.com" },
  url: "https://sonoprep.com/rmsks",
  educationalLevel: "Professional Certification",
  about: ["RMSKS Credential", "ARDMS SPI Exam", "Musculoskeletal Sonography", "MSK Ultrasound"],
  teaches: [
    "Sonographic physics principles required for RMSKS",
    "High-frequency transducer physics for MSK imaging",
    "Image artifacts recognition",
    "Spatial resolution and frequency tradeoffs",
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
    title: "200+ Flashcards Covering SPI Physics",
    desc: "High-frequency transducer physics, spatial resolution, near-field vs. far-field imaging, and artifacts — the physics concepts that matter most for MSK imaging.",
  },
  {
    icon: Zap,
    title: "110-Question ARDMS-Style Simulator",
    desc: "Full timed simulation with detailed clinical rationales. Understand the physics behind the images you produce in the MSK lab.",
  },
  {
    icon: Shield,
    title: "50 Physics Pearls",
    desc: "Concise, high-yield pearls on resolution, frequency selection, artifact recognition, and image optimization — directly applicable to MSK ultrasound practice.",
  },
  {
    icon: Clock,
    title: "Efficient Spaced Repetition",
    desc: "Study 30 minutes daily. The SM-2 algorithm focuses your time on weak spots, so you're ready faster regardless of your clinical background.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Pass the SPI First",
    desc: "ARDMS requires all RMSKS candidates to pass the SPI (Sonography Principles and Instrumentation) exam before registering for the Musculoskeletal (MSK) specialty exam.",
  },
  {
    num: "02",
    title: "Sit for the MSK Specialty Exam",
    desc: "After passing the SPI, register for the ARDMS Musculoskeletal (MSK) specialty exam covering MSK anatomy, pathology, and ultrasound-guided procedures.",
  },
  {
    num: "03",
    title: "Earn Your RMSKS",
    desc: "Pass both exams to earn the Registered Musculoskeletal Sonographer credential — the emerging standard for MSK ultrasound specialists.",
  },
];

export default function RmsksPage() {
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
            <p className="section-label mb-4">RMSKS Credential Prep</p>
            <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl lg:text-6xl leading-tight">
              Pass the SPI.{" "}
              <span className="gradient-text-premium">Earn Your RMSKS.</span>
            </h1>
            <p className="mt-6 text-lg text-cream-dim max-w-2xl mx-auto leading-relaxed">
              The SPI exam is the mandatory ARDMS prerequisite for the{" "}
              <strong className="text-cream">Registered Musculoskeletal Sonographer</strong> credential.
              SonoPrep's physics-focused study tools are built for candidates who need to pass the gateway
              and get into the MSK specialty exam.
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

        {/* What is RMSKS */}
        <section className="py-20 mx-auto max-w-4xl px-6">
          <h2 className="font-display text-3xl font-bold text-cream mb-6">
            What Is the RMSKS Credential?
          </h2>
          <div className="space-y-4 text-cream-dim leading-relaxed">
            <p>
              The <strong className="text-cream">Registered Musculoskeletal Sonographer (RMSKS)</strong>{" "}
              credential is issued by ARDMS and certifies advanced competency in musculoskeletal ultrasound —
              covering tendons, ligaments, muscles, nerves, joints, and ultrasound-guided procedures.
            </p>
            <p>
              Like all ARDMS credentials, the RMSKS requires passing the <strong className="text-cream">SPI exam first</strong>.
              The SPI tests the foundational physics that underlies every MSK study — transducer selection,
              resolution, artifact recognition, and image optimization. There are no exemptions.
            </p>
            <p>
              MSK ultrasound relies particularly on high-frequency linear transducers and a strong understanding
              of resolution tradeoffs, anisotropy artifacts, and near-field imaging — all topics tested on the SPI.
            </p>
          </div>

          <div className="mt-8 rounded border border-teal/20 bg-teal/5 px-6 py-5">
            <p className="font-mono text-xs uppercase tracking-widest text-teal mb-2">Physics Concepts Critical for MSK Candidates</p>
            <p className="text-sm text-cream-dim leading-relaxed">
              Anisotropy, spatial resolution, frequency vs. penetration tradeoffs, and near-field artifacts
              are central to MSK imaging. SonoPrep covers all of these in the flashcard deck and Physics Pearls
              — so the physics you study for the SPI directly applies to your MSK specialty practice.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 bg-charcoal/20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-display text-3xl font-bold text-cream mb-12 text-center">
              How RMSKS Credentialing Works
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
              Ready to Earn Your RMSKS?
            </h2>
            <p className="text-cream-dim mb-8 leading-relaxed">
              Start free — 20 flashcards and a 10-question quiz, no credit card needed.
              Individual products from $9 when you're ready to go all in.
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
              <Link href="/rvt" className="text-teal/60 hover:text-teal transition-colors">RVT</Link>
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
