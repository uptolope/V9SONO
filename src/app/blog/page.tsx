"use client";
import Link from "next/link";

const BLOG_POSTS = [
  { slug: "complete-spi-exam-guide", title: "The Complete ARDMS SPI Exam Guide", excerpt: "170 questions, 3 hours, 555 passing score. Domains, study plans, and insider tips.", readTime: 15, date: "May 5, 2026", category: "GUIDE" },
  { slug: "ultrasound-physics-spi", title: "Ultrasound Physics for the SPI Exam: 6 Concepts You Must Know", excerpt: "Frequency, wavelength, propagation speed, attenuation, impedance, resolution.", readTime: 12, date: "May 3, 2026", category: "PHYSICS" },
  { slug: "doppler-principles-spi-exam", title: "Doppler Principles for the SPI Exam", excerpt: "Doppler effect, Nyquist limit, aliasing, spectral, color, power Doppler.", readTime: 14, date: "April 29, 2026", category: "DOPPLER" },
  { slug: "pass-spi-first-attempt", title: "How to Pass the SPI Exam on Your First Attempt", excerpt: "Week-by-week study schedule, practice exam strategy, and success metrics.", readTime: 11, date: "April 25, 2026", category: "STRATEGY" },
  { slug: "ardms-specialties-comparison", title: "RDMS vs. RDCS vs. RVT vs. RMSKS", excerpt: "Compare exam content, clinical focus, and career paths for each credential.", readTime: 10, date: "April 22, 2026", category: "CAREER" },
  { slug: "ultrasound-artifacts-spi", title: "Ultrasound Artifacts: 7 Most Common SPI Questions", excerpt: "Reverberation, shadowing, enhancement, mirror image, side lobe, speed propagation.", readTime: 9, date: "April 20, 2026", category: "ARTIFACTS" },
  { slug: "spaced-repetition-spi-exam", title: "Spaced Repetition for SPI Exam Success", excerpt: "Why active recall beats cramming. Science-backed learning methods.", readTime: 10, date: "May 8, 2026", category: "LEARNING" },
  { slug: "test-taking-strategies-spi", title: "SPI Exam Test-Taking Strategies", excerpt: "Eliminate wrong answers, manage time, stay calm under pressure.", readTime: 9, date: "May 6, 2026", category: "TACTICS" },
  { slug: "ardms-exam-blueprint", title: "ARDMS SPI Exam Blueprint 2026", excerpt: "Official domain weightings and how to allocate study time.", readTime: 11, date: "May 4, 2026", category: "BLUEPRINT" }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back to Home button */}
        <Link href="/" className="inline-flex items-center gap-2 meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 transition-colors">
          ← BACK TO HOME
        </Link>

        <div className="mb-16 border-b border-[#f0ebe4]/10 pb-8">
          <span className="meta">SPI EXAM RESOURCES</span>
          <h1 className="display-display text-5xl sm:text-6xl mt-4 mb-4">SPI Study Journal</h1>
          <p className="body-readable text-[#b8b0a4] max-w-2xl">Free, in-depth articles written by sonographers who passed. Research-backed strategies, physics deep-dives, and exam tips.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="depth-border corner-arch p-6 h-full tactile-card">
                <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">{post.category}</div>
                <h3 className="display-serif text-xl font-semibold text-[#f0ebe4] mb-3 leading-tight line-clamp-2">{post.title}</h3>
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
