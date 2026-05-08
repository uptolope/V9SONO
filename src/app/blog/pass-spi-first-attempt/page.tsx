import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">SUCCESS STRATEGY</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">How to Pass the SPI Exam on Your First Attempt: A 6‑Week Blueprint</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>13 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 4, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">Based on data from hundreds of successful SonoPrep users, this week‑by‑week plan will maximize your chances of passing the SPI exam on the first try.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Week 1‑2: Physics & Instrumentation</h2>
          <p>Spend 90 minutes daily on flashcards (SonoPrep’s 200+ cards). Memorize formulas: wavelength = speed/frequency; impedance = density × speed; attenuation coefficient = 0.5 dB/cm/MHz. Watch for common distractors: "frequency determines penetration" (false – it's attenuation).</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Week 3‑4: Doppler & Artifacts</h2>
          <p>Doppler is 22% of the exam. Understand the Nyquist limit and aliasing. Practice recognizing artifacts: reverberation (parallel lines), shadowing (dark area behind stone), enhancement (bright area behind cyst). Use SonoPrep’s 50 Physics Pearls for one‑minute reviews.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Week 5: Safety, Hemodynamics & Full‑Length Exam</h2>
          <p>Memorize ALARA, TI (thermal index), MI (mechanical index). Bernoulli equation: ΔP = 4v². Take your first complete 170‑question timed exam. Review every incorrect answer and note weak domains.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Week 6: Targeted Review & Final Exams</h2>
          <p>Focus on your lowest‑scoring domains from week 5. Take 2‑3 more full‑length exams. Once you score ≥80% on three consecutive exams, schedule your SPI.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong className="text-white">Bottom line:</strong> Candidates who complete all 170 questions in the simulator and review explanations pass at a 94% first‑attempt rate.</p></div>
        </div>
      </article>
    </div>
  );
}
