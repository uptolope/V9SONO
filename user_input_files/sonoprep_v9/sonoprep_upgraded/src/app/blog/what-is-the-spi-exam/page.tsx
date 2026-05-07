import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "What Is the ARDMS SPI Exam? Everything Sonographers Need to Know",
  description: "The SPI (Sonography Principles and Instrumentation) is the ARDMS prerequisite exam for all specialty credentials. Learn the format, domains, passing score, and how to prepare.",
  openGraph: {
    title: "What Is the ARDMS SPI Exam? | SonoPrep",
    description: "Complete guide to the ARDMS SPI exam — format, content, passing score, and study strategy from practicing RDMS sonographers.",
    url: "https://sonoprep.com/blog/what-is-the-spi-exam",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is the ARDMS SPI Exam? Everything Sonographers Need to Know",
  description: "Complete guide to the ARDMS SPI exam format, content domains, passing score, and study strategy.",
  url: "https://sonoprep.com/blog/what-is-the-spi-exam",
  author: { "@type": "Organization", name: "SonoPrep" },
  publisher: { "@type": "Organization", name: "SonoPrep", url: "https://sonoprep.com" },
  datePublished: "2026-04-28",
  image: "https://sonoprep.com/og-image.png",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many questions are on the ARDMS SPI exam?",
      acceptedAnswer: { "@type": "Answer", text: "The SPI contains 110 multiple-choice questions with a 2.5-hour time limit. Approximately 90 questions are scored; 20 are unscored pilot questions." },
    },
    {
      "@type": "Question",
      name: "What is a passing score on the SPI exam?",
      acceptedAnswer: { "@type": "Answer", text: "ARDMS uses a scaled scoring system. The passing score is 700 on a scale of 300–770. Scores are not directly percentage-based." },
    },
    {
      "@type": "Question",
      name: "What does SPI stand for in sonography?",
      acceptedAnswer: { "@type": "Answer", text: "SPI stands for Sonography Principles and Instrumentation. It tests knowledge of ultrasound physics, transducer technology, image formation, Doppler, artifacts, and bioeffects." },
    },
  ],
};

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main id="main-content" className="min-h-screen bg-obsidian">
        <div className="mx-auto max-w-3xl px-6 py-16">
          
          {/* Breadcrumb */}
          <Link href="/blog" className="mb-10 inline-flex items-center gap-2 font-mono text-xs text-teal/70 hover:text-teal transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Blog
          </Link>

          {/* Header */}
          <div className="mb-3 flex items-center gap-3">
            <span className="feature-tag">Exam Overview</span>
            <span className="font-mono text-xs text-cream-dim/40 flex items-center gap-1.5"><Clock className="h-3 w-3" />7 min read</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-cream leading-tight sm:text-4xl text-shadow-glow">
            What Is the ARDMS SPI Exam? Everything Sonographers Need to Know
          </h1>
          <p className="mt-2 font-mono text-xs text-cream-dim/40">April 28, 2026 · Written by SonoPrep (RDMS)</p>

          <div className="sep-line my-8" />

          {/* Article body */}
          <article className="prose-sonoprep">
            <p>
              If you're pursuing any ARDMS specialty credential — Abdominal (AB), Obstetrics & Gynecology (OB/GYN), 
              Vascular Technology (VT), Pediatric Sonography (PS), or others — you'll need to pass the 
              <strong> Sonography Principles and Instrumentation (SPI) exam</strong> first. 
              It's a prerequisite, not a specialty. And a lot of candidates underestimate it.
            </p>
            <p>
              This guide covers everything you need to know: what the SPI tests, how it's structured, 
              what ARDMS considers a passing score, and how to approach studying it effectively.
            </p>

            <h2>What Does the SPI Exam Test?</h2>
            <p>
              The SPI is a physics and instrumentation exam. It doesn't test your clinical scanning skills or 
              your anatomy knowledge. It tests whether you understand how ultrasound works — 
              the principles that govern sound propagation, how transducers generate and receive signals, 
              how the machine forms an image, and how Doppler measures flow.
            </p>
            <p>Six content domains are covered:</p>
            <ul>
              <li><strong>Pulse-Echo Principles</strong> — ~25% of exam. Acoustic physics, propagation speed, attenuation, impedance, reflection.</li>
              <li><strong>Doppler Physics & Instrumentation</strong> — ~22%. Doppler equation, aliasing, spectral analysis, color flow, power Doppler.</li>
              <li><strong>Transducer Mechanisms</strong> — ~18%. Piezoelectric effect, transducer types, frequencies, focusing, beam formation.</li>
              <li><strong>Image Formation & Optimization</strong> — ~17%. Dynamic range, TGC, gain, spatial resolution, frame rate tradeoffs.</li>
              <li><strong>Artifact Recognition</strong> — ~11%. Shadowing, enhancement, reverberation, mirror image, side lobe, grating lobe.</li>
              <li><strong>Bioeffects & Safety</strong> — ~7%. ALARA, thermal and mechanical indices, biological effects of ultrasound.</li>
            </ul>

            <h2>Exam Format and Logistics</h2>
            <p>
              The SPI is administered as a computer-based exam at Pearson VUE testing centers. 
              Key logistics:
            </p>
            <ul>
              <li>110 multiple-choice questions total (90 scored, 20 pilot)</li>
              <li>2.5-hour time limit</li>
              <li>You won't know which questions are pilot (unscored) — treat every question equally</li>
              <li>Questions are generally not flaggable for return, so maintain your pace</li>
              <li>Scaled scoring: passing is 700 on a 300–770 scale</li>
            </ul>
            <p>
              The pilot questions are ARDMS's mechanism for testing new questions before they go live 
              in the scored pool. They look identical to scored questions. There's no way to identify them, 
              so the only correct approach is to treat all 110 questions as if they count.
            </p>

            <h2>Who Needs to Pass the SPI?</h2>
            <p>
              The SPI is required for ARDMS initial certification in all sonography specialties. 
              Specifically, you'll need it to sit for:
            </p>
            <ul>
              <li>RDMS (Registered Diagnostic Medical Sonographer) in any specialty</li>
              <li>RVT (Registered Vascular Technologist)</li>
              <li>RMSKS (Registered Musculoskeletal Sonographer)</li>
              <li>Any additional specialty credential added after initial RDMS certification</li>
            </ul>
            <p>
              If you already hold an RDMS in one specialty and are adding another, you've already passed the SPI. 
              You don't need to retake it. The SPI is a one-time prerequisite.
            </p>

            <h2>How Hard Is the SPI Exam?</h2>
            <p>
              First-attempt pass rates for the SPI are not publicly published by ARDMS, but among SonoPrep students 
              who consistently complete the full flashcard deck and exam simulator, 
              <strong>thorough preparation is key to first-attempt success</strong>. 
              Candidates who rely on textbook reading alone, or who only skim practice questions, 
              tend to struggle with the applied physics questions that make up the majority of the exam.
            </p>
            <p>
              The difficulty isn't in memorizing formulas — ARDMS doesn't require you to calculate exact values. 
              The difficulty is in understanding the relationships between variables well enough to reason through 
              clinical scenarios. A question might describe an artifact seen on a patient's gallbladder study 
              and ask you to identify its acoustic cause. That requires applied understanding, not rote recall.
            </p>

            <h2>How to Register for the SPI Exam</h2>
            <p>
              Registration is through ARDMS directly at ardms.org. You'll need to meet eligibility 
              requirements, which typically include completion of a CAAHEP-accredited DMS program 
              or equivalent clinical experience. ARDMS publishes detailed eligibility tables 
              on their website — check the current requirements before applying, as they update periodically.
            </p>
            <p>
              Once your application is approved, you'll receive a scheduling authorization from Pearson VUE 
              and can book your exam at a testing center near you.
            </p>

            <h2>How to Study for the SPI Effectively</h2>
            <p>
              The most effective SPI study strategy is active recall over passive reading. 
              Here's what the research and our pass-rate data both support:
            </p>
            <ul>
              <li><strong>Flashcard-based spaced repetition</strong> outperforms re-reading textbooks by a significant margin for retention</li>
              <li><strong>Practice questions with explanations</strong> — not just right/wrong feedback, but understanding why the answer is what it is</li>
              <li><strong>Domain-weighted study</strong> — spend more time on Pulse-Echo and Doppler (47% of exam combined) than on Bioeffects (7%)</li>
              <li><strong>Clinical framing</strong> — physics concepts that are tied to scanner-room scenarios are retained much better than abstract equations</li>
            </ul>
            <p>
              Most candidates who commit to 30 minutes of daily focused study are exam-ready in 4–6 weeks. 
              Candidates with strong clinical physics backgrounds from their DMS program often need less.
            </p>
          </article>

          <div className="sep-line my-10" />

          {/* CTA */}
          <div className="rounded border border-teal/20 bg-teal/5 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-cream mb-2">Ready to Start Preparing?</h3>
            <p className="text-cream-dim text-sm mb-6">Try SonoPrep free — 20 flashcards, 10 practice questions, 5 Physics Pearls. No credit card.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button asChild size="lg">
                <Link href="/demo">Try Free Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="ghost" asChild size="lg">
                <Link href="/products">View Pricing</Link>
              </Button>
            </div>
          </div>

          {/* More articles */}
          <div className="mt-12">
            <p className="section-label mb-4">Keep Reading</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { href: "/blog/doppler-physics-spi-guide", title: "Doppler Physics for the SPI Exam", label: "Physics Deep-Dive" },
                { href: "/blog/spi-exam-domains-explained", title: "SPI Exam Content Domains Explained", label: "Exam Structure" },
              ].map((p) => (
                <Link key={p.href} href={p.href}
                  className="group rounded border border-border bg-slate/30 p-5 transition-all duration-200 hover:border-teal/30 hover:bg-slate/50"
                >
                  <span className="feature-tag text-[10px] mb-2 inline-block">{p.label}</span>
                  <p className="font-display text-sm font-semibold text-cream group-hover:text-teal-glow transition-colors">{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
