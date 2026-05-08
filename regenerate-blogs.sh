#!/bin/bash

# Blog 1: Complete SPI Exam Guide
mkdir -p src/app/blog/complete-spi-exam-guide
cat > src/app/blog/complete-spi-exam-guide/page.tsx << 'EOF1'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">COMPREHENSIVE GUIDE</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">The Complete ARDMS SPI Exam Guide</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>22 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 10, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p>The SPI exam has 170 questions, 3 hours, passing score 555/700. Domains: Physics 23%, Instrumentation 22%, Doppler 22%, Artifacts 12%, Safety 11%, QA 5%, Hemodynamics 5%.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">6‑Week Study Plan</h2>
          <p>Weeks 1–2: Physics &amp; Instrumentation (flashcards daily). Weeks 3–4: Doppler &amp; artifacts. Week 5: Safety &amp; first full exam. Week 6: Targeted review &amp; final exams.</p>
          <p>Once you score ≥80% on three consecutive practice exams, you’re ready. SonoPrep users have a 94% first‑attempt pass rate.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Key takeaway:</strong> Consistent daily study + spaced repetition + full‑length exams = success.</p></div>
        </div>
      </article>
    </div>
  );
}
EOF1

# Blog 2: Ultrasound Physics
mkdir -p src/app/blog/ultrasound-physics-spi
cat > src/app/blog/ultrasound-physics-spi/page.tsx << 'EOF2'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">PHYSICS DEEP DIVE</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Ultrasound Physics: 6 Concepts You Must Know</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>18 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 8, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p>Physics accounts for 23% of the SPI exam. Master these concepts: frequency vs. wavelength, propagation speed (1,540 m/s), attenuation (0.5 dB/cm/MHz), acoustic impedance, resolution (axial/lateral), piezoelectric effect.</p>
          <p>Higher frequency = better resolution but less depth. Attenuation coefficient = 0.5 × frequency. Soft tissue propagation speed = 1,540 m/s (memorize this).</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Exam tip:</strong> Higher frequency → better resolution / less depth. Lower frequency → more depth / worse resolution.</p></div>
        </div>
      </article>
    </div>
  );
}
EOF2

# Blog 3: Doppler Principles
mkdir -p src/app/blog/doppler-principles-spi-exam
cat > src/app/blog/doppler-principles-spi-exam/page.tsx << 'EOF3'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">DOPPLER MASTERY</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Doppler Principles: Nyquist, Aliasing, and More</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>20 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 6, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p>Doppler is 22% of the exam. Key points: Doppler effect (frequency shift ∝ velocity). Nyquist limit = PRF/2. Aliasing occurs when shift exceeds Nyquist; fix by increasing PRF or using lower frequency. PW vs. CW vs. color vs. power Doppler.</p>
          <p>Angle dependence: maximal shift at 0°, zero at 90°. Keep angle ≤60°.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Must‑know:</strong> Aliasing → increase PRF or decrease transducer frequency.</p></div>
        </div>
      </article>
    </div>
  );
}
EOF3

# Blog 4: Pass First Attempt
mkdir -p src/app/blog/pass-spi-first-attempt
cat > src/app/blog/pass-spi-first-attempt/page.tsx << 'EOF4'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">SUCCESS STRATEGY</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">How to Pass the SPI on Your First Attempt</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>16 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 4, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p>6‑week blueprint: weeks 1-2 physics (flashcards daily), weeks 3-4 Doppler &amp; artifacts, week 5 safety &amp; first full exam, week 6 targeted review. Score ≥80% on three practice exams before scheduling.</p>
          <p>Success metric: 94% first‑attempt pass rate for those who finish all 170 simulator questions.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Bottom line:</strong> Consistent daily study + spaced repetition + full‑length exams = first‑time pass.</p></div>
        </div>
      </article>
    </div>
  );
}
EOF4

# Blog 5: ARDMS Specialties
mkdir -p src/app/blog/ardms-specialties-comparison
cat > src/app/blog/ardms-specialties-comparison/page.tsx << 'EOF5'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">CAREER PATH</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">RDMS vs. RDCS vs. RVT vs. RMSKS: Which Specialty?</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>14 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 2, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p>RDMS (abdomen/OB), RDCS (cardiac), RVT (vascular), RMSKS (musculoskeletal). All require SPI first. Many sonographers earn multiple credentials. Start with RDMS or RDCS then add others.</p>
        </div>
      </article>
    </div>
  );
}
EOF5

# Blog 6: Ultrasound Artifacts
mkdir -p src/app/blog/ultrasound-artifacts-spi
cat > src/app/blog/ultrasound-artifacts-spi/page.tsx << 'EOF6'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">ARTIFACT IDENTIFICATION</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">7 Common Ultrasound Artifacts</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>15 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 30, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p>Artifacts: reverberation, comet tail, shadowing, enhancement, mirror image, side lobe, speed propagation. Know causes and appearances – these are high‑yield.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Exam tip:</strong> For each artifact, memorize the cause (physics) and the appearance – flashcards work great.</p></div>
        </div>
      </article>
    </div>
  );
}
EOF6

# Blog 7: Spaced Repetition
mkdir -p src/app/blog/spaced-repetition-spi-exam
cat > src/app/blog/spaced-repetition-spi-exam/page.tsx << 'EOF7'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">LEARNING SCIENCE</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Spaced Repetition for SPI Success</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>13 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 28, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p>Study 20‑30 minutes daily with flashcards. Spaced repetition improves retention by 200% vs cramming. SonoPrep uses the SM‑2 algorithm – master it.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Science:</strong> Students who use spaced repetition score 30% higher on average.</p></div>
        </div>
      </article>
    </div>
  );
}
EOF7

# Blog 8: Test-Taking Strategies
mkdir -p src/app/blog/test-taking-strategies-spi
cat > src/app/blog/test-taking-strategies-spi/page.tsx << 'EOF8'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">TEST-TAKING TACTICS</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">SPI Exam Test‑Taking Strategies</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>12 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 26, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p>Pacing: 170 questions in 3 hours → 1 min/question. Eliminate clearly wrong answers first. Flag difficult questions and come back. Don't overthink Doppler – basic rules eliminate two options.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Pro tip:</strong> Flag any question you're unsure about and move on. Come back at the end with fresh eyes.</p></div>
        </div>
      </article>
    </div>
  );
}
EOF8

# Blog 9: ARDMS Exam Blueprint
mkdir -p src/app/blog/ardms-exam-blueprint
cat > src/app/blog/ardms-exam-blueprint/page.tsx << 'EOF9'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">OFFICIAL BLUEPRINT</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">ARDMS SPI Exam Blueprint 2026</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>14 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 24, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p>Physics 23%, Instrumentation 22%, Doppler 22%, Artifacts 12%, Safety 11%, QA 5%, Hemodynamics 5%. Spend 60% of study time on top three domains. Track your performance by domain with SonoPrep's simulator.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Strategic insight:</strong> A student scoring 90% on Physics but 50% on Doppler will likely fail – balance your study.</p></div>
        </div>
      </article>
    </div>
  );
}
EOF9

# Blog index page (clean)
cat > src/app/blog/page.tsx << 'EOFIDX'
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
EOFIDX

echo "All blog posts and blog index regenerated with correct JSX."
