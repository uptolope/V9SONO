import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How Long to Study for the SPI Exam? A Realistic Timeline",
  description:
    "Most SPI candidates need 4–8 weeks of dedicated study. The right timeline depends on your clinical background, daily study hours, and study method. Here's how to build yours.",
  openGraph: {
    title: "How Long Should You Study for the SPI Exam? | SonoPrep",
    description: "A realistic, evidence-based SPI study timeline from practicing RDMS sonographers.",
    url: "https://sonoprep.com/blog/how-long-to-study-for-spi",
  },
  alternates: { canonical: "https://sonoprep.com/blog/how-long-to-study-for-spi" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Long Should You Study for the SPI Exam? A Realistic Timeline",
  description: "A realistic SPI exam study timeline. Most candidates need 4–8 weeks.",
  url: "https://sonoprep.com/blog/how-long-to-study-for-spi",
  datePublished: "2026-04-22",
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
          <div className="mb-3"><span className="feature-tag">Study Strategy</span></div>
          <h1 className="font-display text-3xl font-bold text-cream leading-tight sm:text-4xl text-shadow-glow">
            How Long Should You Study for the SPI Exam? A Realistic Timeline
          </h1>
          <div className="mt-3 flex items-center gap-5 font-mono text-xs text-cream-dim/40">
            <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />6 min read</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />April 22, 2026</span>
          </div>
          <div className="sep-line my-8" />
          <div className="space-y-6 text-cream-dim leading-relaxed">
            <p className="text-lg text-cream">
              The most common question from SPI candidates: "how much time do I need?" The honest answer: <strong className="text-cream">most candidates need 4–8 weeks</strong>. The right timeline depends on your clinical background, available daily study hours, and whether you're using active recall or passive review.
            </p>
            <h2 className="font-display text-2xl font-bold text-cream pt-4">The 30/60/90 Framework</h2>
            <div className="rounded border border-border bg-mist p-6 space-y-4">
              {[
                { days: "30 Days", title: "Strong clinical foundation + active recall study", desc: "You graduated recently from a CAHIIM-accredited DMS program, remember your physics coursework, and can study 45–60 minutes daily. With spaced-repetition flashcards and a full-length practice exam, 30 days is realistic." },
                { days: "60 Days", title: "Moderate foundation or limited daily time", desc: "You're working clinically but haven't thought about physics since school, or can only study 20–30 minutes daily. 60 days gives enough repetitions to solidify weak domains without cramming." },
                { days: "90 Days", title: "Returning to physics after a gap", desc: "You've been out of school for several years, or physics was never a strong subject. 90 days lets you build genuine understanding — and still leaves time for thorough review." },
              ].map((t, i) => (
                <div key={t.days}>
                  {i > 0 && <div className="sep-line mb-4" />}
                  <p className="font-mono text-xs uppercase tracking-widest text-teal mb-1">{t.days}</p>
                  <p className="font-semibold text-cream">{t.title}</p>
                  <p className="text-sm mt-1">{t.desc}</p>
                </div>
              ))}
            </div>
            <h2 className="font-display text-2xl font-bold text-cream pt-4">Why Study Method Matters More Than Hours</h2>
            <p>The research on learning is clear: <strong className="text-cream">active recall beats passive review every time</strong>. Reading notes is pleasant but ineffective. Flashcards that force retrieval — even when it's hard — produce far more durable learning. 20 minutes of spaced-repetition flashcards daily will typically outperform 2 hours of textbook reading.</p>
            <h2 className="font-display text-2xl font-bold text-cream pt-4">Domain-Weighted Study Time</h2>
            <div className="rounded border border-border bg-mist overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border"><th className="text-left px-4 py-3 font-mono text-xs text-cream">Domain</th><th className="text-right px-4 py-3 font-mono text-xs text-cream">Weight</th></tr></thead>
                <tbody className="divide-y divide-border/40">
                  {[["Pulse-Echo Principles","~25%"],["Doppler Physics","~22%"],["Transducer Mechanisms","~18%"],["Image Formation","~17%"],["Artifact Recognition","~11%"],["Bioeffects & Safety","~7%"]].map(([d,w]) => (
                    <tr key={d}><td className="px-4 py-3 text-cream-dim">{d}</td><td className="px-4 py-3 text-right font-mono text-teal">{w}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h2 className="font-display text-2xl font-bold text-cream pt-4">The Week Before</h2>
            <p>Use the final week for review, not new material. Take at least one full-length timed practice exam. Avoid cramming new content in the final 48 hours — interference hurts recall of what you already know. Light review and sleep serve you better.</p>
            <p><strong className="text-cream">Bottom line:</strong> 4–8 weeks, 30–45 minutes daily, active recall focus. SonoPrep's spaced-repetition engine shows you what you're missing — so every session moves the needle.</p>
          </div>
          <div className="sep-line my-10" />
          <div className="rounded border border-teal/20 bg-teal/5 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-cream mb-2">Start Your SPI Prep Today</h3>
            <p className="text-cream-dim text-sm mb-6">20 flashcards, a 10-question quiz, no credit card required.</p>
            <Button asChild className="btn-glow"><Link href="/demo">Try Free Demo <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-12 flex justify-between font-mono text-xs">
            <Link href="/blog" className="text-teal/60 hover:text-teal transition-colors flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> All Articles</Link>
            <Link href="/blog/what-is-the-spi-exam" className="text-teal/60 hover:text-teal transition-colors flex items-center gap-1">What Is the SPI? <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
