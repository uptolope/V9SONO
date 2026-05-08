"use client";
import Link from "next/link";

const BLOG_POSTS = [
  { slug: "complete-spi-exam-guide", title: "Complete ARDMS SPI Exam Guide", excerpt: "170 questions, 3 hours, 555 passing score. Domains, study plans, and insider tips.", readTime: 22, date: "May 10, 2026", category: "GUIDE" },
  { slug: "ultrasound-physics-spi", title: "Ultrasound Physics: 6 Concepts You Must Know", excerpt: "Frequency, wavelength, propagation speed, attenuation, impedance, resolution.", readTime: 18, date: "May 8, 2026", category: "PHYSICS" },
  { slug: "doppler-principles-spi-exam", title: "Doppler Principles: Nyquist, Aliasing, and More", excerpt: "Doppler effect, Nyquist limit, aliasing, PW, CW, color Doppler.", readTime: 20, date: "May 6, 2026", category: "DOPPLER" },
  { slug: "pass-spi-first-attempt", title: "How to Pass SPI on First Attempt", excerpt: "6‑week study plan, practice exams, success metrics.", readTime: 16, date: "May 4, 2026", category: "STRATEGY" },
  { slug: "ardms-specialties-comparison", title: "RDMS, RDCS, RVT, RMSKS: Which Specialty?", excerpt: "Compare exam content, clinical focus, career paths.", readTime: 14, date: "May 2, 2026", category: "CAREER" },
  { slug: "ultrasound-artifacts-spi", title: "7 Common Ultrasound Artifacts", excerpt: "Reverberation, shadowing, enhancement, mirror image, side lobe, speed propagation, comet tail.", readTime: 15, date: "April 30, 2026", category: "ARTIFACTS" },
  { slug: "spaced-repetition-spi-exam", title: "Spaced Repetition for SPI Success", excerpt: "Science‑based learning, SM‑2 algorithm, daily flashcards.", readTime: 13, date: "April 28, 2026", category: "LEARNING" },
  { slug: "test-taking-strategies-spi", title: "SPI Exam Test‑Taking Strategies", excerpt: "Eliminate wrong answers, manage time, flag difficult questions.", readTime: 12, date: "April 26, 2026", category: "TACTICS" },
  { slug: "ardms-exam-blueprint", title: "ARDMS SPI Exam Blueprint 2026", excerpt: "Official domain weightings – physics 23%, Doppler 22%, instrumentation 22%.", readTime: 14, date: "April 24, 2026", category: "BLUEPRINT" }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <div className="mb-16 border-b border-[#f0ebe4]/10 pb-8">
          <span className="meta">SPI EXAM RESOURCES</span>
          <h1 className="display-display text-5xl sm:text-6xl mt-4 mb-4">SPI Study Journal</h1>
          <p className="body-readable text-[#b8b0a4] max-w-2xl">Free, in‑depth articles written by sonographers who passed.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="depth-border corner-arch p-6 h-full tactile-card">
                <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">{post.category}</div>
                <h3 className="display-serif text-xl font-semibold text-[#f0ebe4] mb-3 line-clamp-2">{post.title}</h3>
                <p className="body-small text-[#6b6359] text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-[11px] meta text-[#6b6359] border-t border-[#f0ebe4]/5 pt-4">
                  <span>{post.readTime} min read</span>
                  <span className="w-1 h-1 bg-[#c85b3a] rounded-full" />
                  <span>{post.date}</span>
                </div>
                <div className="mt-4"><span className="meta text-[10px] text-[#6b6359] hover:text-[#c85b3a] transition-colors">READ POST →</span></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
