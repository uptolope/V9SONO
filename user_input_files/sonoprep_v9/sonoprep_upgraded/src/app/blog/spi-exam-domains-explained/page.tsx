import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "SPI Exam Content Domains Explained: What Each Section Tests",
  description:
    "The ARDMS SPI covers six content domains with different weightings. Learn exactly what each domain tests and how to allocate your study time to match the exam blueprint.",
  openGraph: {
    title: "SPI Exam Content Domains Explained | SonoPrep",
    description: "A complete breakdown of the six ARDMS SPI exam domains — what each tests and how they're weighted.",
    url: "https://sonoprep.com/blog/spi-exam-domains-explained",
  },
  alternates: { canonical: "https://sonoprep.com/blog/spi-exam-domains-explained" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "SPI Exam Content Domains Explained: What Each Section Tests",
  description: "A complete breakdown of the six ARDMS SPI exam content domains and their weightings.",
  url: "https://sonoprep.com/blog/spi-exam-domains-explained",
  datePublished: "2026-04-08",
  author: { "@type": "Organization", name: "SonoPrep" },
  publisher: { "@type": "Organization", name: "SonoPrep", url: "https://sonoprep.com" },
  image: "https://sonoprep.com/og-image.png",
};

const DOMAINS = [
  { num: "01", title: "Pulse-Echo Principles (~25%)", approx: "~28 questions", body: "The largest domain. Covers the physics of sound wave generation and propagation: wave frequency, wavelength, period, amplitude, and intensity. Also tests propagation speed through tissue, the pulse-echo principle itself (how the system calculates depth from round-trip time), spatial pulse length, duty factor, and the relationship between frequency and penetration vs. resolution. A strong grasp of this domain gives you a head start on all the others, since Doppler and image formation build on these foundations." },
  { num: "02", title: "Doppler Physics & Instrumentation (~22%)", approx: "~24 questions", body: "The Doppler equation, angle dependence, PW vs. CW Doppler, the Nyquist limit, aliasing and how to correct it, spectral broadening, color flow vs. power Doppler, and wall filters. RVT and RDCS candidates will recognize these as the physics underlying every waveform they produce. See our dedicated Doppler Physics guide for a full breakdown of this domain." },
  { num: "03", title: "Transducer Mechanisms (~18%)", approx: "~20 questions", body: "Piezoelectric effect, transducer construction (matching layer, backing material, piezoelectric element), near field vs. far field (Fresnel vs. Fraunhofer zones), beam focusing (fixed vs. dynamic), transducer frequency and bandwidth, mechanical vs. electronic arrays, linear vs. curved vs. phased arrays, and the tradeoffs between them. The ARDMS tests your ability to select the appropriate transducer for a clinical scenario." },
  { num: "04", title: "Image Formation & Optimization (~17%)", approx: "~19 questions", body: "How B-mode images are formed from pulse-echo data, frame rate, line density, depth, time-gain compensation (TGC), overall gain, dynamic range, gray-scale processing, digital scan conversion, and image persistence. Also covers real-time versus compound imaging, harmonic imaging, and spatial compound imaging. The ARDMS expects you to know which controls to adjust to optimize a suboptimal image — and why." },
  { num: "05", title: "Artifact Recognition (~11%)", approx: "~12 questions", body: "Reverberation, ring-down, posterior acoustic shadowing, posterior acoustic enhancement, mirror image, refraction/side lobe artifacts, and grating lobes. The key ARDMS approach: you must recognize the artifact, understand its mechanism, and know whether it's clinically significant or can be misidentified as pathology. Artifact questions are often presented as clinical scenarios with images described in the question stem." },
  { num: "06", title: "Bioeffects & Safety (~7%)", approx: "~8 questions", body: "Thermal and mechanical bioeffects, thermal index (TI) and mechanical index (MI), ALARA principle (As Low As Reasonably Achievable), and FDA output limits. The SPI also tests acoustic output parameters: ISATA (intensity spatial average temporal average) and others. This is the smallest domain but reliably produces 7–9 questions, and candidates who skip it for larger domains consistently leave points on the table." },
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
          <div className="mb-3"><span className="feature-tag">Exam Structure</span></div>
          <h1 className="font-display text-3xl font-bold text-cream leading-tight sm:text-4xl text-shadow-glow">
            SPI Exam Content Domains Explained: What Each Section Tests
          </h1>
          <div className="mt-3 flex items-center gap-5 font-mono text-xs text-cream-dim/40">
            <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />5 min read</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />April 8, 2026</span>
          </div>
          <div className="sep-line my-8" />
          <div className="space-y-6 text-cream-dim leading-relaxed">
            <p className="text-lg text-cream">
              The ARDMS SPI exam covers <strong className="text-cream">six content domains</strong>, each weighted differently. Understanding the blueprint before you begin studying is the difference between focused preparation and wasted time. Here's exactly what each domain tests and how much of the exam it represents.
            </p>
            <div className="rounded border border-border bg-mist px-5 py-4">
              <p className="font-mono text-xs uppercase tracking-widest text-teal mb-2">SPI Exam Format</p>
              <p className="text-sm">110 multiple-choice questions (90 scored, 20 unscored pilot) · 2.5-hour time limit · Required for RDMS, RDCS, RVT, and RMSKS</p>
            </div>
            {DOMAINS.map((d) => (
              <div key={d.num} className="pt-4 border-t border-border/30">
                <div className="flex items-start gap-4 mb-2">
                  <span className="font-mono text-xl font-bold text-teal/30 shrink-0">{d.num}</span>
                  <div>
                    <h2 className="font-display text-xl font-bold text-cream">{d.title}</h2>
                    <p className="font-mono text-xs text-cream-dim/50">{d.approx}</p>
                  </div>
                </div>
                <p className="pl-10">{d.body}</p>
              </div>
            ))}
            <h2 className="font-display text-2xl font-bold text-cream pt-6">How to Use This Blueprint</h2>
            <p>Spend your study time proportionally. If you have 60 days, invest roughly 15 days on Pulse-Echo, 13 on Doppler, 11 on Transducers, 10 on Image Formation, 7 on Artifacts, and 4 on Bioeffects. SonoPrep's domain analytics track your flashcard performance by domain so you can see exactly where your gaps are and redirect your effort accordingly.</p>
          </div>
          <div className="sep-line my-10" />
          <div className="rounded border border-teal/20 bg-teal/5 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-cream mb-2">Study All Six Domains with SonoPrep</h3>
            <p className="text-cream-dim text-sm mb-6">200+ flashcards and a 110-question simulator covering every domain. Try 20 free flashcards — no credit card.</p>
            <Button asChild className="btn-glow"><Link href="/demo">Try Free Demo <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-12 flex justify-between font-mono text-xs">
            <Link href="/blog" className="text-teal/60 hover:text-teal transition-colors flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> All Articles</Link>
            <Link href="/blog/doppler-physics-spi-guide" className="text-teal/60 hover:text-teal transition-colors flex items-center gap-1">Doppler Physics Guide <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
