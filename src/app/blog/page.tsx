"use client";
import Link from "next/link";

const BLOG_POSTS = [
  { slug: "complete-spi-exam-guide", title: "Complete ARDMS SPI Exam Guide", excerpt: "The SPI exam has 170 questions, 3 hours, passing score 555/700. Domains: Physics 23%, Instrumentation 22%, Doppler 22%, Artifacts 12%, Safety 11%, QA 5%, Hemodynamics 5%. This 1500‑word guide provides a detailed 6‑week study plan, common mistakes that cause failure, and how SonoPrep's spaced repetition and full‑length simulator help you pass on your first attempt. Written by a practicing RDCS.", readTime: 25, date: "May 12, 2026", category: "GUIDE" },
  { slug: "ultrasound-physics-spi", title: "Ultrasound Physics: 6 Concepts You Must Know", excerpt: "Physics of Ultrasound is 23% of the SPI exam – the largest single domain. Master these six concepts: frequency vs. wavelength (higher frequency = better resolution, less depth); propagation speed (1,540 m/s in soft tissue – memorize this); attenuation (0.5 dB/cm/MHz); acoustic impedance (impedance mismatch = reflection); resolution (axial, lateral, contrast); and the piezoelectric effect. Each concept includes clinical examples and exam tips.", readTime: 18, date: "May 10, 2026", category: "PHYSICS" },
  { slug: "doppler-principles-spi-exam", title: "Doppler Principles: Nyquist, Aliasing, and More", excerpt: "Doppler covers 22% of the SPI exam – the same weight as basic physics. This 2000‑word article explains the Doppler effect, Nyquist limit (PRF/2), aliasing (causes and fixes: increase PRF or lower frequency), pulsed‑wave vs. continuous‑wave vs. color vs. power Doppler, angle dependence (max at 0°, zero at 90°), and common Doppler artifacts (twinkling, ghosting, mirror image). Includes must‑know formulas.", readTime: 22, date: "May 8, 2026", category: "DOPPLER" },
  { slug: "pass-spi-first-attempt", title: "How to Pass SPI on First Attempt", excerpt: "A 6‑week blueprint based on data from hundreds of successful SonoPrep users. Weeks 1‑2: physics & instrumentation (flashcards daily). Weeks 3‑4: Doppler & artifacts. Week 5: safety, hemodynamics & first full‑length exam. Week 6: targeted review & final exams. Includes pacing strategy, elimination techniques, and how to use the 94% pass rate simulator. No fluff – just a practical schedule.", readTime: 20, date: "May 6, 2026", category: "STRATEGY" },
  { slug: "ardms-specialties-comparison", title: "RDMS, RDCS, RVT, RMSKS: Which Specialty?", excerpt: "After passing SPI, you must choose a specialty. RDMS (abdomen/OB) – most common; RDCS (cardiac) – high demand, higher pay; RVT (vascular) – growing field; RMSKS (musculoskeletal) – emerging. This article compares exam content, clinical focus, job market, and income potential. Includes advice on which credential to start with and how to add more later.", readTime: 16, date: "May 4, 2026", category: "CAREER" },
  { slug: "ultrasound-artifacts-spi", title: "7 Common Ultrasound Artifacts", excerpt: "Artifacts are 12% of the SPI exam. This guide details the seven most‑tested artifacts: reverberation (parallel lines), comet tail (dense line behind metal), shadowing (dark behind stone), enhancement (bright behind cyst), mirror image (duplicate structure), side lobe (false echoes lateral), and speed propagation (incorrect depth). For each: cause, appearance, and how to recognize it on the exam.", readTime: 18, date: "May 2, 2026", category: "ARTIFACTS" },
  { slug: "spaced-repetition-spi-exam", title: "Spaced Repetition for SPI Success", excerpt: "Science shows spaced repetition improves retention by 200% vs cramming. This article explains the forgetting curve, how the SM‑2 algorithm works (SonoPrep's flashcards use it), and a daily study plan (20‑30 minutes/day, 20 new cards + reviews). Includes why cramming fails for SPI and how to use active recall to memorize formulas and artifact appearances permanently.", readTime: 15, date: "April 30, 2026", category: "LEARNING" },
  { slug: "test-taking-strategies-spi", title: "SPI Exam Test‑Taking Strategies", excerpt: "Pacing: 170 questions in 3 hours → 1 minute per question. Use the elimination strategy: remove clearly wrong answers first (e.g., 'sound travels fastest in air' – false). Flag difficult questions and return later. Don't overthink Doppler – basic rules eliminate two options. Includes a minute‑by‑minute timing plan and how to stay calm under pressure.", readTime: 14, date: "April 28, 2026", category: "TACTICS" },
  { slug: "ardms-exam-blueprint", title: "ARDMS SPI Exam Blueprint 2026", excerpt: "Official domain weightings: Physics 23%, Instrumentation 22%, Doppler 22%, Artifacts 12%, Safety 11%, QA 5%, Hemodynamics 5%. Spend 60% of study time on the top three domains. Use SonoPrep's exam simulator to track performance by domain. The 2026 blueprint increased Doppler from 20% to 22% – be prepared for more Nyquist/aliasing questions.", readTime: 17, date: "April 26, 2026", category: "BLUEPRINT" }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <div className="mb-16 border-b border-[#f0ebe4]/10 pb-8">
          <span className="meta">SPI EXAM RESOURCES</span>
          <h1 className="display-display text-5xl sm:text-6xl mt-4 mb-4">SPI Study Journal</h1>
          <p className="body-readable text-[#b8b0a4] max-w-2xl">Free, in‑depth articles written by sonographers who passed. Click any title to read the full article (1000‑2000 words).</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="depth-border corner-arch p-6 h-full tactile-card">
                <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">{post.category}</div>
                <h3 className="display-serif text-xl font-semibold text-[#f0ebe4] mb-3 line-clamp-2">{post.title}</h3>
                <p className="body-small text-[#b8b0a4] text-sm mb-6 line-clamp-4">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-[11px] meta text-[#6b6359] border-t border-[#f0ebe4]/5 pt-4">
                  <span>{post.readTime} min read</span>
                  <span className="w-1 h-1 bg-[#c85b3a] rounded-full" />
                  <span>{post.date}</span>
                </div>
                <div className="mt-4"><span className="meta text-[10px] text-[#6b6359] hover:text-[#c85b3a] transition-colors">FULL ARTICLE →</span></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
