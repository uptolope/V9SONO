import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Doppler Physics for the SPI Exam: The Concepts That Actually Show Up",
  description:
    "Doppler covers 22% of the ARDMS SPI exam. This guide walks through the six Doppler principles ARDMS tests — with clinical applications that make them stick.",
  openGraph: {
    title: "Doppler Physics for the SPI Exam | SonoPrep",
    description: "The six Doppler concepts tested on the ARDMS SPI exam, explained by practicing RDMS sonographers with clinical context.",
    url: "https://sonoprep.com/blog/doppler-physics-spi-guide",
  },
  alternates: { canonical: "https://sonoprep.com/blog/doppler-physics-spi-guide" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Doppler Physics for the SPI Exam: The Concepts That Actually Show Up",
  description: "Doppler covers 22% of the SPI. This guide covers the six principles ARDMS actually tests.",
  url: "https://sonoprep.com/blog/doppler-physics-spi-guide",
  datePublished: "2026-04-15",
  author: { "@type": "Organization", name: "SonoPrep" },
  publisher: { "@type": "Organization", name: "SonoPrep", url: "https://sonoprep.com" },
  image: "https://sonoprep.com/og-image.png",
};

const DOPPLER_CONCEPTS = [
  { num: "01", title: "The Doppler Effect & Doppler Equation", body: "The Doppler equation states that the frequency shift equals 2 × fo × v × cos(θ) / c, where fo is the transmitted frequency, v is the reflector velocity, θ is the Doppler angle, and c is the speed of sound. The key takeaway the SPI tests: the frequency shift is proportional to the cosine of the Doppler angle. At 0° (beam parallel to flow), you get maximum shift. At 90° (beam perpendicular), cos(90°) = 0 — so you detect no shift at all." },
  { num: "02", title: "Doppler Angle Dependence", body: "Angle correction is necessary when the beam cannot be aligned parallel to flow. Accuracy degrades significantly at angles above 60°. The SPI tests the concept that at large angles, small angle errors cause large velocity errors. Clinical implication: ARDMS expects you to know that 60° is the maximum clinically acceptable Doppler angle." },
  { num: "03", title: "Pulse Repetition Frequency & the Nyquist Limit", body: "Pulsed-wave (PW) Doppler can only accurately measure frequency shifts up to half the pulse repetition frequency (PRF). This limit is the Nyquist limit. When a frequency shift exceeds the Nyquist limit, aliasing occurs — the displayed waveform wraps around and appears on the opposite side of the baseline. The SPI asks you to recognize aliasing and know how to correct it: increase PRF, lower frequency, increase Doppler angle, or use CW Doppler." },
  { num: "04", title: "Continuous Wave vs. Pulsed Wave Doppler", body: "CW Doppler uses two crystals — one continuously transmitting, one receiving — which eliminates the Nyquist limit and allows measurement of any velocity. The tradeoff is range ambiguity: CW cannot localize where along the beam the signal originates. PW Doppler uses a single crystal with a sample volume gate, allowing precise depth selection at the cost of the Nyquist velocity limit." },
  { num: "05", title: "Spectral Broadening", body: "Normal laminar flow produces a narrow spectral line with a clear spectral window. Turbulent flow causes a wide range of velocities at the sample site, broadening the spectral display and filling in the spectral window. The SPI expects you to recognize spectral broadening as an indicator of disturbed or turbulent flow — and to distinguish it from sample volume size effects." },
  { num: "06", title: "Color Flow & Power Doppler", body: "Color Doppler assigns color to mean Doppler frequency shift — red toward the transducer, blue away (by convention). It is angle-dependent. Power Doppler displays the amplitude (power) of the Doppler signal rather than frequency shift — making it sensitive to slow flow and angle-independent, at the cost of directional information. The SPI tests when to use each mode." },
];

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main-content" className="min-h-screen bg-obsidian">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link href="/blog" className="mb-10 inline-flex items-center gap-2 font-mono text-xs text-teal/70 hover:text-teal transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Blog
          </Link>
          <div className="mb-3"><span className="feature-tag">Physics Deep-Dive</span></div>
          <h1 className="font-display text-3xl font-bold text-cream leading-tight sm:text-4xl text-shadow-glow">
            Doppler Physics for the SPI Exam: The Concepts That Actually Show Up
          </h1>
          <div className="mt-3 flex items-center gap-5 font-mono text-xs text-cream-dim/40">
            <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />9 min read</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />April 15, 2026</span>
          </div>
          <div className="sep-line my-8" />
          <div className="space-y-6 text-cream-dim leading-relaxed">
            <p className="text-lg text-cream">
              Doppler Physics and Instrumentation accounts for approximately <strong className="text-cream">22% of the ARDMS SPI exam</strong> — roughly 24 questions. It's the second-largest domain and the one that catches the most candidates off guard. Here are the six concepts ARDMS actually tests, explained with the clinical context that makes them stick.
            </p>
            <div className="rounded border border-teal/20 bg-teal/5 px-5 py-4">
              <p className="font-mono text-xs uppercase tracking-widest text-teal mb-2">Required for RDMS, RDCS, RVT & RMSKS</p>
              <p className="text-sm">Every ARDMS credential candidate must pass the SPI — including this Doppler section. For RVT and RDCS candidates especially, Doppler physics is foundational to your specialty practice.</p>
            </div>
            {DOPPLER_CONCEPTS.map((c) => (
              <div key={c.num} className="pt-4">
                <div className="flex items-start gap-4 mb-3">
                  <span className="font-mono text-2xl font-bold text-teal/30 shrink-0">{c.num}</span>
                  <h2 className="font-display text-xl font-bold text-cream">{c.title}</h2>
                </div>
                <p className="pl-12">{c.body}</p>
              </div>
            ))}
            <h2 className="font-display text-2xl font-bold text-cream pt-4">How to Study Doppler for the SPI</h2>
            <p>Doppler physics is most effectively learned through active recall — not rereading. Use flashcards that prompt you to recall the Doppler equation, the Nyquist limit formula, and the aliasing correction strategies. Understand the tradeoffs (CW vs. PW, color vs. power) rather than memorizing tables.</p>
            <p>SonoPrep's flashcard deck includes dedicated Doppler cards built by practicing RDCS and RVT sonographers who use these principles in the clinical lab daily.</p>
          </div>
          <div className="sep-line my-10" />
          <div className="rounded border border-teal/20 bg-teal/5 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-cream mb-2">Study Doppler With Flashcards Built by Sonographers</h3>
            <p className="text-cream-dim text-sm mb-6">Try 20 free flashcards — no credit card required.</p>
            <Button asChild className="btn-glow"><Link href="/demo">Try Free Demo <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-12 flex justify-between font-mono text-xs">
            <Link href="/blog" className="text-teal/60 hover:text-teal transition-colors flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> All Articles</Link>
            <Link href="/blog/spi-exam-domains-explained" className="text-teal/60 hover:text-teal transition-colors flex items-center gap-1">SPI Domains Explained <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
