#!/bin/bash

# Create all missing blog directories and page.tsx files
mkdir -p src/app/blog/complete-spi-exam-guide
mkdir -p src/app/blog/ultrasound-physics-spi
mkdir -p src/app/blog/doppler-principles-spi-exam
mkdir -p src/app/blog/pass-spi-first-attempt
mkdir -p src/app/blog/ardms-specialties-comparison
mkdir -p src/app/blog/ultrasound-artifacts-spi
mkdir -p src/app/blog/spaced-repetition-spi-exam
mkdir -p src/app/blog/test-taking-strategies-spi
mkdir -p src/app/blog/ardms-exam-blueprint

# Blog 1
cat > src/app/blog/complete-spi-exam-guide/page.tsx << 'B1'
"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">GUIDE</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Complete ARDMS SPI Exam Guide</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>15 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 5, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg">The SPI exam has 170 questions, 3 hours, passing score 555/700. Focus on physics (23%), instrumentation (22%), Doppler (22%). Use spaced repetition and timed practice exams.</p>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-8 mb-4">Study Plan</h2>
          <p className="body-readable text-[#b8b0a4]">Weeks 1-2: Physics fundamentals. Weeks 3-4: Instrumentation and Doppler. Week 5: Artifacts and safety. Week 6: Full-length practice exams.</p>
          <div className="bg-[#c85b3a]/10 p-6 my-8 border-l-[3px] border-[#c85b3a]"><p className="body-readable text-[#f0ebe4] text-sm"><strong>Key takeaway:</strong> Consistent daily study beats cramming.</p></div>
        </div>
      </article>
    </div>
  );
}
B1

# Blog 2
cat > src/app/blog/ultrasound-physics-spi/page.tsx << 'B2'
"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">PHYSICS</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Ultrasound Physics: 6 Concepts You Must Know</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>12 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 3, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg">Frequency, wavelength, propagation speed, attenuation, impedance, resolution. These six concepts make up the majority of physics questions.</p>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-8 mb-4">Frequency vs. Wavelength</h2>
          <p className="body-readable text-[#b8b0a4]">Higher frequency = shorter wavelength = better resolution but less penetration.</p>
          <div className="bg-[#c85b3a]/10 p-6 my-8 border-l-[3px] border-[#c85b3a]"><p className="body-readable text-[#f0ebe4] text-sm"><strong>Remember:</strong> Soft tissue propagation speed = 1,540 m/s.</p></div>
        </div>
      </article>
    </div>
  );
}
B2

# Blog 3
cat > src/app/blog/doppler-principles-spi-exam/page.tsx << 'B3'
"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">DOPPLER</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Doppler Principles for the SPI Exam</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>14 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 29, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg">Doppler covers 22% of the exam. Understand the Doppler effect, Nyquist limit, aliasing, and the difference between PW, CW, color, and power Doppler.</p>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-8 mb-4">Nyquist Limit & Aliasing</h2>
          <p className="body-readable text-[#b8b0a4]">Aliasing occurs when Doppler shift exceeds half the PRF. Fix: increase PRF or use lower frequency transducer.</p>
          <div className="bg-[#c85b3a]/10 p-6 my-8 border-l-[3px] border-[#c85b3a]"><p className="body-readable text-[#f0ebe4] text-sm"><strong>Exam tip:</strong> Aliasing question → answer is always "increase PRF".</p></div>
        </div>
      </article>
    </div>
  );
}
B3

# Blog 4
cat > src/app/blog/pass-spi-first-attempt/page.tsx << 'B4'
"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">STRATEGY</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">How to Pass SPI on First Attempt</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>11 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 25, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg">6-week plan: weeks 1-2 physics, weeks 3-4 instrumentation & Doppler, week 5 artifacts & safety, week 6 full-length practice exams.</p>
          <div className="bg-[#c85b3a]/10 p-6 my-8 border-l-[3px] border-[#c85b3a]"><p className="body-readable text-[#f0ebe4] text-sm"><strong>Success metric:</strong> Score ≥80% on three consecutive practice exams before the real test.</p></div>
        </div>
      </article>
    </div>
  );
}
B4

# Blog 5
cat > src/app/blog/ardms-specialties-comparison/page.tsx << 'B5'
"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">CAREER</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">RDMS, RDCS, RVT, RMSKS: Which Specialty?</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>10 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 22, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg">RDMS (abdomen/OB), RDCS (cardiac), RVT (vascular), RMSKS (musculoskeletal). All require SPI first.</p>
        </div>
      </article>
    </div>
  );
}
B5

# Blog 6
cat > src/app/blog/ultrasound-artifacts-spi/page.tsx << 'B6'
"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">ARTIFACTS</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">7 Common Ultrasound Artifacts</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>9 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 20, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg">Reverberation, shadowing, enhancement, mirror image, side lobe, speed propagation, comet tail. Know causes and corrections.</p>
        </div>
      </article>
    </div>
  );
}
B6

# Blog 7
cat > src/app/blog/spaced-repetition-spi-exam/page.tsx << 'B7'
"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">LEARNING</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Spaced Repetition for SPI Success</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>10 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 8, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg">Study 20-30 minutes daily with flashcards. The SM-2 algorithm shows cards just before you forget them, increasing retention by up to 200%.</p>
        </div>
      </article>
    </div>
  );
}
B7

# Blog 8
cat > src/app/blog/test-taking-strategies-spi/page.tsx << 'B8'
"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">TACTICS</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Test-Taking Strategies for SPI</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>9 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 6, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg">Eliminate clearly wrong answers first, flag difficult questions, watch your pace (1 minute per question). Don't overthink Doppler.</p>
        </div>
      </article>
    </div>
  );
}
B8

# Blog 9
cat > src/app/blog/ardms-exam-blueprint/page.tsx << 'B9'
"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">BLUEPRINT</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">ARDMS SPI Exam Blueprint 2026</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>11 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 4, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg">Physics 23%, Instrumentation 22%, Doppler 22%, Artifacts 12%, Safety 11%, QA 5%, Hemodynamics 5%. Focus 60% of study on top three domains.</p>
        </div>
      </article>
    </div>
  );
}
B9

echo "✅ All 9 blog posts created successfully!"
echo "Now run: git add . && git commit -m 'Add all 9 blog posts' && git push origin main"
