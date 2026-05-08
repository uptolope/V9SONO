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
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>16 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 4, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">Based on data from hundreds of successful SonoPrep users, this week‑by‑week plan will maximize your chances of passing the SPI exam on the first try. Follow these steps exactly, and you'll walk into the exam with confidence.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Week 1‑2: Physics & Instrumentation Foundation</h2>
          <p>Spend 90 minutes daily on flashcards (SonoPrep's 200+ cards). Memorize the formulas: wavelength = speed/frequency; impedance = density × speed; attenuation coefficient = 0.5 dB/cm/MHz. Understand the clinical implications: higher frequency = better resolution but less depth; lower frequency = more depth but worse resolution. Use the spaced repetition algorithm – review cards every day, and the system will schedule them at optimal intervals. By the end of week 2, you should be able to explain these concepts without looking at notes.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Week 3‑4: Doppler & Artifacts</h2>
          <p>Doppler is 22% of the exam – treat it seriously. Learn the Nyquist limit (PRF/2) and aliasing. Memorize the three ways to fix aliasing: increase PRF, lower transducer frequency, adjust baseline. Review the seven common artifacts (reverberation, comet tail, shadowing, enhancement, mirror image, side lobe, speed propagation) – understand their causes and appearances. Use SonoPrep's 50 Physics Pearls for one‑minute reviews of each concept.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Week 5: Safety, Hemodynamics & First Full‑Length Exam</h2>
          <p>Safety and bioeffects (11% of exam) are easy points. Memorize ALARA (As Low As Reasonably Achievable), TI (thermal index), MI (mechanical index). Understand that TI and MI should be kept as low as possible, especially in fetal exams. Hemodynamics (5%): memorize the Bernoulli equation (ΔP = 4v²) and the difference between laminar (parabolic) and turbulent (chaotic) flow.</p>
          <p>Take your first full 170‑question timed exam. Do not pause. After finishing, review every question you got wrong. Note which domains had the lowest scores. Spend the rest of week 5 drilling those weak areas.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Week 6: Targeted Review & Final Exams</h2>
          <p>Focus 80% of your time on your lowest‑scoring domains from week 5. Take 2‑3 additional full‑length exams (170 questions, 3 hours each). After each exam, analyze your performance. Once you score ≥80% on three consecutive exams, you're ready. Schedule your SPI exam within the next week.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Success metric:</strong> Candidates who complete all 170 simulator questions and review explanations pass at a 94% first‑attempt rate.</p></div>
        </div>
      </article>
    </div>
  );
}
