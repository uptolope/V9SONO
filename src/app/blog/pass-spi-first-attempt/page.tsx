import SimpleCTA from "@/components/ui/cta-simple";
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
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>20 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 6, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">Based on data from hundreds of successful SonoPrep users, this week‑by‑week plan will maximize your chances of passing on the first try. Follow it exactly, and you will walk into the exam with confidence.</p>
          <div className="border-l-[3px] border-[#c85b3a] pl-4 my-4"><strong className="text-white">Week 1‑2: Physics &amp; Instrumentation</strong><br />Spend 90 minutes daily on flashcards (SonoPrep’s 200+ cards). Memorize formulas: wavelength = speed/frequency, impedance = density × speed, attenuation coefficient = 0.5 dB/cm/MHz. Understand the clinical implications: higher frequency = better resolution but less depth. Use the spaced repetition algorithm – it schedules reviews at optimal intervals.</div>
          <div className="border-l-[3px] border-[#c85b3a] pl-4 my-4"><strong className="text-white">Week 3‑4: Doppler &amp; Artifacts</strong><br />Doppler is 22% of the exam. Learn the Nyquist limit (PRF/2) and aliasing. Memorize the three ways to fix aliasing: increase PRF, lower transducer frequency, or shift baseline. Review the seven common artifacts – know their causes and appearances. Use SonoPrep’s 50 Physics Pearls for one‑minute reviews.</div>
          <div className="border-l-[3px] border-[#c85b3a] pl-4 my-4"><strong className="text-white">Week 5: Safety, Hemodynamics &amp; First Full‑Length Exam</strong><br />Safety and bioeffects (11%) are easy points. Memorize ALARA, TI, MI. Hemodynamics: Bernoulli equation (ΔP = 4v²). Take your first full 170‑question timed exam. Review every mistake and note your weak domains.</div>
          <div className="border-l-[3px] border-[#c85b3a] pl-4 my-4"><strong className="text-white">Week 6: Targeted Review &amp; Final Exams</strong><br />Focus 80% of your time on your two lowest‑scoring domains. Take 2‑3 more full exams. Once you score ≥80% on three consecutive practice exams, schedule your SPI. You are ready.</div>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8">
            <p className="text-sm"><strong className="text-white">Bottom line:</strong> Students who complete all 170 simulator questions and review explanations pass at a 94% first‑attempt rate.</p>
          </div>
        </div>
        <SimpleCTA />
      </article>
    </div>
  );
}
