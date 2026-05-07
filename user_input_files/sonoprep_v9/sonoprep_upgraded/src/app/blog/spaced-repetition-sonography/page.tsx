import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Why Spaced Repetition Works Better for Ultrasound Physics Than Rereading Notes",
  description:
    "The forgetting curve is real, and passive review barely slows it. Here's the science behind spaced repetition and why it's the most effective study method for SPI exam physics.",
  openGraph: {
    title: "Spaced Repetition for Ultrasound Physics & the SPI Exam | SonoPrep",
    description: "Why spaced repetition outperforms passive review for SPI exam prep — the science and the practice.",
    url: "https://sonoprep.com/blog/spaced-repetition-sonography",
  },
  alternates: { canonical: "https://sonoprep.com/blog/spaced-repetition-sonography" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Spaced Repetition Works Better for Ultrasound Physics Than Rereading Notes",
  description: "The science behind spaced repetition and its application to SPI exam preparation.",
  url: "https://sonoprep.com/blog/spaced-repetition-sonography",
  datePublished: "2026-04-01",
  author: { "@type": "Organization", name: "SonoPrep" },
  publisher: { "@type": "Organization", name: "SonoPrep", url: "https://sonoprep.com" },
  image: "https://sonoprep.com/og-image.png",
};

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
          <div className="mb-3"><span className="feature-tag">Study Science</span></div>
          <h1 className="font-display text-3xl font-bold text-cream leading-tight sm:text-4xl text-shadow-glow">
            Why Spaced Repetition Works Better for Ultrasound Physics Than Rereading Notes
          </h1>
          <div className="mt-3 flex items-center gap-5 font-mono text-xs text-cream-dim/40">
            <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />6 min read</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />April 1, 2026</span>
          </div>
          <div className="sep-line my-8" />
          <div className="space-y-6 text-cream-dim leading-relaxed">
            <p className="text-lg text-cream">
              Hermann Ebbinghaus mapped the forgetting curve in the 1880s: without review, we forget roughly 50% of new material within an hour, 70% within 24 hours, and most of the rest within a week. Passive rereading slows this curve marginally. <strong className="text-cream">Spaced repetition eliminates it</strong>.
            </p>
            <h2 className="font-display text-2xl font-bold text-cream pt-4">What Spaced Repetition Actually Is</h2>
            <p>Spaced repetition is a study method that schedules reviews based on how well you know each piece of information. Material you know well gets shown less frequently. Material you struggle with gets shown more often, at precisely the intervals that maximize retention before you forget it again.</p>
            <p>The SM-2 algorithm — developed by Piotr Wozniak in 1987 and still widely used today — calculates the optimal review interval for each card based on your response quality. If you rate a card "easy," it won't appear again for several days. If you rate it "hard," you'll see it again in minutes.</p>
            <h2 className="font-display text-2xl font-bold text-cream pt-4">Why This Matters Specifically for SPI Physics</h2>
            <p>The SPI tests six physics domains across 110 questions. The material is conceptual, interconnected, and — for many candidates — unfamiliar. Memorizing the Doppler equation is not enough; you need to understand what happens to frequency shift when you change the angle, the velocity, or the transmitted frequency.</p>
            <p>This kind of deep, flexible understanding only develops through repeated retrieval with variation. Rereading a formula produces familiarity — which feels like knowledge but isn't. Active recall, forced under exam conditions, produces the retrievable memory you need on test day.</p>
            <h2 className="font-display text-2xl font-bold text-cream pt-4">The Testing Effect</h2>
            <p>The "testing effect" (or retrieval practice effect) is one of the most replicated findings in cognitive psychology: the act of retrieving information from memory strengthens that memory more than any other study technique, including elaborative studying, concept mapping, or rereading.</p>
            <p>A landmark 2006 study by Roediger and Karpicke showed that students who studied by self-testing retained 50% more information one week later than students who reread the material — even when the rereading group studied longer.</p>
            <div className="rounded border border-border bg-mist px-5 py-4">
              <p className="font-mono text-xs uppercase tracking-widest text-teal mb-2">For SPI Candidates</p>
              <p className="text-sm">30 minutes of daily spaced-repetition flashcards will outperform 2 hours of passive review — and produce recall that holds up under the pressure of a 110-question timed exam.</p>
            </div>
            <h2 className="font-display text-2xl font-bold text-cream pt-4">How SonoPrep Implements Spaced Repetition</h2>
            <p>SonoPrep's flashcard system uses the SM-2 algorithm adapted for SPI content. When you rate a card, the system calculates when to show it again to maximize retention with minimum study time. Cards you know well drop out of rotation. Cards you miss repeatedly surface more often — and first.</p>
            <p>The result is a study session that always focuses on your current weakest areas — not what you already know, and not random coverage of the full deck. Over 30–60 days of consistent use, the algorithm builds a comprehensive, durable physics foundation across all six SPI domains.</p>
            <h2 className="font-display text-2xl font-bold text-cream pt-4">How to Get the Most Out of It</h2>
            <p>Study daily, even if only for 20–30 minutes. Consistency matters more than session length for spaced repetition to work. Rate cards honestly — marking easy cards as hard slows your progress, and marking hard cards as easy means you'll forget them before the next review arrives. Trust the algorithm to surface what you need when you need it.</p>
          </div>
          <div className="sep-line my-10" />
          <div className="rounded border border-teal/20 bg-teal/5 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-cream mb-2">Try Spaced Repetition for the SPI — Free</h3>
            <p className="text-cream-dim text-sm mb-6">20 free flashcards with SM-2 spaced repetition. No credit card required.</p>
            <Button asChild className="btn-glow"><Link href="/demo">Try Free Demo <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-12 flex justify-between font-mono text-xs">
            <Link href="/blog" className="text-teal/60 hover:text-teal transition-colors flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> All Articles</Link>
            <Link href="/blog/how-long-to-study-for-spi" className="text-teal/60 hover:text-teal transition-colors flex items-center gap-1">Study Timeline Guide <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
