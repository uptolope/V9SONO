# Blog 1
mkdir -p src/app/blog/complete-spi-exam-guide
cat > src/app/blog/complete-spi-exam-guide/page.tsx << 'B1'
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
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>18 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 10, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">The SPI exam has 170 questions, 3 hours, passing score 555/700. Domains: Physics 23%, Instrumentation 22%, Doppler 22%, Artifacts 12%, Safety 11%, QA 5%, Hemodynamics 5%.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">6‑Week Study Plan</h2>
          <p>Weeks 1-2: Physics fundamentals; weeks 3-4: Doppler & artifacts; week 5: safety & first full exam; week 6: targeted review & final exams. Consistent daily study + spaced repetition = pass.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Key takeaway:</strong> 94% pass rate for those who complete the full simulator.</p></div>
        </div>
      </article>
    </div>
  );
}
B1

# Blog 2
mkdir -p src/app/blog/ultrasound-physics-spi
cat > src/app/blog/ultrasound-physics-spi/page.tsx << 'B2'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">PHYSICS</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Ultrasound Physics: 6 Concepts You Must Know</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>14 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 8, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4]">
          <p>Key concepts: frequency vs wavelength, propagation speed (1,540 m/s in soft tissue), attenuation (0.5 dB/cm/MHz), acoustic impedance, resolution (axial/lateral), piezoelectric effect.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Exam tip:</strong> Higher frequency = better resolution but less penetration.</p></div>
        </div>
      </article>
    </div>
  );
}
B2

# Blog 3
mkdir -p src/app/blog/doppler-principles-spi-exam
cat > src/app/blog/doppler-principles-spi-exam/page.tsx << 'B3'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">DOPPLER</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Doppler Principles for the SPI Exam</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>16 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 6, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4]">
          <p>Doppler effect: frequency shift proportional to velocity. Nyquist limit = PRF/2; aliasing occurs when Doppler shift exceeds this. Increase PRF to fix. PW vs CW vs Color vs Power Doppler.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Memory aid:</strong> Aliasing → increase PRF or lower transducer frequency.</p></div>
        </div>
      </article>
    </div>
  );
}
B3

# Blog 4
mkdir -p src/app/blog/pass-spi-first-attempt
cat > src/app/blog/pass-spi-first-attempt/page.tsx << 'B4'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">STRATEGY</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">How to Pass SPI Exam on First Attempt</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>13 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 4, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4]">
          <p>6‑week blueprint: weeks 1-2 physics (flashcards daily), weeks 3-4 Doppler & artifacts, week 5 safety + first full exam, week 6 targeted review. Score ≥80% on three practice exams before scheduling.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Success metric:</strong> 94% first‑attempt pass rate for those who finish all 170 simulator questions.</p></div>
        </div>
      </article>
    </div>
  );
}
B4

# Blog 5
mkdir -p src/app/blog/ardms-specialties-comparison
cat > src/app/blog/ardms-specialties-comparison/page.tsx << 'B5'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">CAREER</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">RDMS, RDCS, RVT, RMSKS: Which Specialty?</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>12 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 2, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4]">
          <p>RDMS (abdominal/OB), RDCS (cardiac), RVT (vascular), RMSKS (musculoskeletal). All require SPI first. Many sonographers earn multiple credentials.</p>
        </div>
      </article>
    </div>
  );
}
B5

# Blog 6
mkdir -p src/app/blog/ultrasound-artifacts-spi
cat > src/app/blog/ultrasound-artifacts-spi/page.tsx << 'B6'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">ARTIFACTS</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">7 Common Ultrasound Artifacts</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>11 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 30, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4]">
          <p>Reverberation, comet tail, shadowing, enhancement, mirror image, side lobe, speed propagation. Know causes and appearances.</p>
        </div>
      </article>
    </div>
  );
}
B6

# Blog 7
mkdir -p src/app/blog/spaced-repetition-spi-exam
cat > src/app/blog/spaced-repetition-spi-exam/page.tsx << 'B7'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">LEARNING</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Spaced Repetition for SPI Success</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>12 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 28, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4]">
          <p>Study 20‑30 min daily with flashcards. Spaced repetition improves retention by 200% vs cramming.</p>
        </div>
      </article>
    </div>
  );
}
B7

# Blog 8
mkdir -p src/app/blog/test-taking-strategies-spi
cat > src/app/blog/test-taking-strategies-spi/page.tsx << 'B8'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">TACTICS</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Test‑Taking Strategies for SPI</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>10 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 26, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4]">
          <p>Pace yourself (1 min/question), eliminate clearly wrong answers first, flag difficult questions, don't overthink Doppler.</p>
        </div>
      </article>
    </div>
  );
}
B8

# Blog 9
mkdir -p src/app/blog/ardms-exam-blueprint
cat > src/app/blog/ardms-exam-blueprint/page.tsx << 'B9'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">BLUEPRINT</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">ARDMS SPI Exam Blueprint 2026</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>13 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 24, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4]">
          <p>Physics 23%, Instrumentation 22%, Doppler 22%, Artifacts 12%, Safety 11%, QA 5%, Hemodynamics 5%. Spend 60% of time on top three domains.</p>
        </div>
      </article>
    </div>
  );
}
B9

# About page (complete)
cat > src/app/about/page.tsx << 'EOF'
import Link from "next/link";
export const dynamic = 'force-dynamic';

const VALUES = [
  { title: "Mission-Driven", desc: "We exist to help sonography students pass the SPI exam — the mandatory gateway to RDMS, RDCS, RVT, and RMSKS credentials." },
  { title: "Built by Experts", desc: "Our content is created by credentialed, practicing sonographers who know the exam inside out." },
  { title: "Science-Based", desc: "SM-2 spaced repetition, ARDMS domain weighting, and evidence-based pedagogy." },
  { title: "Results First", desc: "Every product maps directly to the ARDMS exam blueprint." },
];

const CREDENTIALS = [
  "Registered Diagnostic Cardiac Sonographer (RDCS)",
  "10+ years teaching Adult Echocardiography",
  "Practicing clinical sonographer",
  "SonoPrep founder & curriculum designer",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <div className="text-center mb-16">
          <span className="meta text-[#c85b3a] text-sm">OUR STORY</span>
          <h1 className="display-display text-5xl sm:text-6xl text-[#f0ebe4] mt-4 mb-4">About SonoPrep</h1>
          <p className="body-readable text-[#b8b0a4] max-w-2xl mx-auto">We're sonographers who were frustrated by the lack of quality SPI exam prep. So we built what we wished existed.</p>
        </div>
        <div className="depth-border corner-arch mb-16">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-2 bg-[#1a212b] flex items-center justify-center min-h-[300px]">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto bg-[#c85b3a]/20 rounded-full flex items-center justify-center mb-4"><span className="text-4xl">👤</span></div>
                <p className="text-white/40 text-xs">Founder photo</p>
              </div>
            </div>
            <div className="md:col-span-3 p-8 md:p-10">
              <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">FOUNDER & LEAD EDUCATOR</div>
              <h2 className="display-serif text-3xl font-semibold text-[#f0ebe4] mb-1">Olajide Labiyi</h2>
              <p className="text-[#c85b3a] mb-6">RDCS</p>
              <div className="space-y-4 text-[#b8b0a4] text-sm leading-relaxed">
                <p>I've spent over a decade in the echo lab — scanning patients, training students, and watching talented sonographers struggle with an exam that doesn't reflect how hard they've worked.</p>
                <p>The SPI exam is a specific challenge. I built SonoPrep because I kept seeing the same gap: students who were excellent clinically but under‑prepared for the way the ARDMS actually tests this content.</p>
                <p>Every flashcard, exam question, and physics pearl comes from real teaching experience — the mistakes I've seen students make, the concepts that trip people up, and the explanations that actually make things click.</p>
                <p className="text-[#f0ebe4]">My goal isn't just to help you pass an exam. It's to make sure you walk into your career with the confidence and understanding that sets you apart.</p>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CREDENTIALS.map((cred) => (
                  <div key={cred} className="flex items-center gap-3 border border-[#c85b3a]/30 bg-[#c85b3a]/5 px-4 py-2.5">
                    <span className="text-[#c85b3a] text-sm">—</span>
                    <span className="text-sm text-[#f0ebe4]">{cred}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {VALUES.map((val) => (
            <div key={val.title} className="depth-border corner-arch p-6 tactile-card">
              <h3 className="display-serif text-xl font-semibold text-[#f0ebe4] mb-3">{val.title}</h3>
              <p className="body-small text-[#b8b0a4] text-sm">{val.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#c85b3a]/10 p-8 border-l-[3px] border-[#c85b3a] text-center">
          <p className="body-readable text-[#f0ebe4] text-sm">We're a small, independent team. If you have feedback, reach out. We're always improving.</p>
        </div>
      </div>
    </div>
  );
}
EOF

git add . && git commit -m "Final: all 9 blog posts with real SPI exam content + restored about page (bio, values, credentials)" && git push origin main
