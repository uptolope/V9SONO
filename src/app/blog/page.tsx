"use client";
import Link from "next/link";

const BLOG_POSTS = [
  { slug: "what-is-the-spi-exam", title: "What Is the ARDMS SPI Exam? Everything Sonographers Need to Know", excerpt: "The Sonography Principles and Instrumentation exam is an ARDMS prerequisite for all specialty credentials. Here's exactly what it tests, how it's structured, and what a passing score looks like.", readTime: 7, date: "April 28, 2026", category: "EXAM OVERVIEW" },
  { slug: "how-long-to-study-for-spi", title: "How Long Should You Study for the SPI Exam? A Realistic Timeline", excerpt: "Most candidates need 4–8 weeks. But the right study window depends on your clinical background, available daily hours, and whether you're using active recall or passive reading.", readTime: 6, date: "April 20, 2026", category: "STUDY STRATEGY" },
  { slug: "doppler-physics-spi-guide", title: "Doppler Physics for the SPI Exam: The Concepts That Actually Show Up", excerpt: "Doppler covers 22% of the SPI exam. This guide walks through the six Doppler principles ARDMS actually tests.", readTime: 9, date: "April 15, 2026", category: "PHYSICS DEEP-DIVE" }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 border-b border-white/10 pb-8">
          <span className="display-eyebrow">SPI STUDY RESOURCES</span>
          <h1 className="display-headline text-5xl sm:text-6xl mt-4 mb-4">Guides Written by<br />Practicing Sonographers</h1>
          <p className="display-body max-w-2xl">Free in-depth articles on SPI exam strategy, ultrasound physics, and ARDMS credentialing — written by RDMS-credentialed sonographers who've passed the exam and scan patients daily.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="depth-border corner-arch p-6 h-full hover:border-[#ff6b4a] transition-all duration-300">
                <div className="inline-block bg-[#ff6b4a] px-3 py-1 text-[10px] font-mono tracking-wider text-black mb-4">{post.category}</div>
                <h3 className="text-xl font-bold tracking-tight text-white mb-3 leading-tight">{post.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-[11px] font-mono tracking-wider text-white/30 border-t border-white/5 pt-4">
                  <span>{post.readTime} min read</span>
                  <span className="w-1 h-1 bg-[#ff6b4a] rounded-full" />
                  <span>{post.date}</span>
                </div>
                <div className="mt-4"><span className="text-[11px] font-mono tracking-wider text-white/40 hover:text-[#ff6b4a] transition-colors inline-flex items-center gap-2">READ POST →</span></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
