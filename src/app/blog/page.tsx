import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
// json-ld unused on index page
import { ArrowRight, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "SPI Exam Prep Blog — Sonography Study Guides & Physics Guides",
  description: "Free guides written by RDMS sonographers on passing the ARDMS SPI exam. Doppler physics, exam strategy, study plans, and more.",
  openGraph: {
    title: "SPI Exam Prep Blog | SonoPrep",
    description: "Expert guides on ultrasound physics, SPI exam strategy, and sonography credentialing from practicing RDMS sonographers.",
    url: "https://sonoprep.com/blog",
  },
};

const POSTS = [
  {
    slug: "what-is-the-spi-exam",
    title: "What Is the ARDMS SPI Exam? Everything Sonographers Need to Know",
    excerpt: "The Sonography Principles and Instrumentation exam is an ARDMS prerequisite for all specialty credentials. Here's exactly what it tests, how it's structured, and what a passing score looks like.",
    readTime: "7 min",
    date: "April 28, 2026",
    category: "Exam Overview",
    featured: true,
  },
  {
    slug: "how-long-to-study-for-spi",
    title: "How Long Should You Study for the SPI Exam? A Realistic Timeline",
    excerpt: "Most candidates need 4–8 weeks. But the right study window depends on your clinical background, available daily hours, and whether you're using active recall or passive reading.",
    readTime: "6 min",
    date: "April 22, 2026",
    category: "Study Strategy",
  },
  {
    slug: "doppler-physics-spi-guide",
    title: "Doppler Physics for the SPI Exam: The Concepts That Actually Show Up",
    excerpt: "Doppler covers 22% of the SPI exam. This guide walks through the six Doppler principles ARDMS actually tests — with clinical applications that make them stick.",
    readTime: "9 min",
    date: "April 15, 2026",
    category: "Physics Deep-Dive",
  },
  {
    slug: "spi-exam-domains-explained",
    title: "SPI Exam Content Domains Explained: What Each Section Tests",
    excerpt: "The SPI covers six content areas with different weightings. Understanding the blueprint before you study is the difference between focused prep and wasted time.",
    readTime: "5 min",
    date: "April 8, 2026",
    category: "Exam Structure",
  },
  {
    slug: "spaced-repetition-sonography",
    title: "Why Spaced Repetition Works Better for Ultrasound Physics Than Rereading Notes",
    excerpt: "The forgetting curve is real, and passive review barely slows it. Here's the science behind spaced repetition and why it's the most effective study method for the physics-heavy SPI content.",
    readTime: "6 min",
    date: "April 1, 2026",
    category: "Study Science",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-obsidian">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(13,148,136,0.06),transparent)]" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center">
            <p className="section-label">SPI Study Resources</p>
            <h1 className="section-title">Guides Written by<br/>Practicing Sonographers</h1>
            <p className="section-subtitle">
              Free in-depth articles on SPI exam strategy, ultrasound physics, and ARDMS credentialing — 
              written by RDMS-credentialed sonographers who've passed the exam and scan patients daily.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16">
          
          {/* Featured post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-10 grid gap-6 rounded border border-border bg-slate/40 p-8 transition-all duration-300 hover:border-teal/30 hover:bg-slate/60 hover:shadow-glow lg:grid-cols-5 block"
          >
            <div className="lg:col-span-4">
              <div className="mb-4 flex items-center gap-3">
                <span className="feature-tag">{featured.category}</span>
                <span className="font-mono text-xs text-teal">Featured</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-cream transition-colors duration-200 group-hover:text-teal-glow lg:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-cream-dim leading-relaxed">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-5 font-mono text-xs text-cream-dim/50">
                <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{featured.readTime} read</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{featured.date}</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-end">
              <ArrowRight className="h-8 w-8 text-teal/40 transition-all duration-300 group-hover:translate-x-2 group-hover:text-teal" />
            </div>
          </Link>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded border border-border bg-slate/30 p-7 transition-all duration-300 hover:border-teal/30 hover:bg-slate/50 hover:shadow-glow block"
              >
                <span className="feature-tag text-[10px] mb-4 inline-block">{post.category}</span>
                <h2 className="font-display text-lg font-semibold text-cream transition-colors duration-200 group-hover:text-teal-glow leading-snug">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-cream-dim leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 font-mono text-xs text-cream-dim/40">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
