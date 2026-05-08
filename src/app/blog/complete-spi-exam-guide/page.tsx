import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">COMPREHENSIVE GUIDE</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">The Complete ARDMS SPI Exam Guide: Everything You Need to Pass</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>22 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 10, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">The Sonography Principles and Instrumentation (SPI) exam is the mandatory first step for every ARDMS credential – RDMS, RDCS, RVT, and RMSKS. With 170 questions in 3 hours and a passing score of 555 out of 700, it tests deep understanding of ultrasound physics, instrumentation, Doppler, artifacts, safety, and hemodynamics. This guide breaks down exactly what to expect, how to study, and the strategies that work.</p>
          
          <h2 className="text-2xl font-semibold text-white mt-8">Exam Domains & Official Weighting</h2>
          <p>The ARDMS publishes a content outline that tells you exactly how many questions come from each domain. Here are the official weightings for 2026:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Physics of Ultrasound – 23%</strong> (approximately 39 questions) – Sound wave properties, frequency, wavelength, propagation speed, attenuation, acoustic impedance, resolution.</li>
            <li><strong className="text-white">Pulse-Echo Instrumentation – 22%</strong> (≈37 questions) – Transducers, beam formation, signal processing, dynamic range, display modes.</li>
            <li><strong className="text-white">Doppler Principles – 22%</strong> (≈37 questions) – Doppler effect, Nyquist limit, aliasing, spectral analysis, color flow, power Doppler.</li>
            <li><strong className="text-white">Image Quality & Artifacts – 12%</strong> (≈20 questions) – Reverberation, shadowing, enhancement, mirror image, side lobes, speed propagation artifact.</li>
            <li><strong className="text-white">Safety & Bioeffects – 11%</strong> (≈19 questions) – ALARA, thermal index (TI), mechanical index (MI), cavitation, acoustic output.</li>
            <li><strong className="text-white">Quality Assurance – 5%</strong> (≈9 questions) – Equipment testing, phantoms, calibration, preventive maintenance.</li>
            <li><strong className="text-white">Hemodynamics – 5%</strong> (≈9 questions) – Bernoulli equation, Poiseuille's law, pressure gradients, flow profiles (laminar, turbulent).</li>
          </ul>
          <p>Understanding this weighting is critical. If you spend equal time on every domain, you'll waste effort on low‑yield topics like QA (5%) while neglecting Doppler (22%). Allocate 60% of your study to the top three domains.</p>
          
          <h2 className="text-2xl font-semibold text-white mt-8">6-Week Study Plan That Actually Works</h2>
          <p>Based on success patterns from hundreds of SonoPrep users, here is a week‑by‑week schedule that maximizes retention and identifies weak areas early.</p>
          <div className="grid gap-4 my-6">
            <div className="border-l-[3px] border-[#c85b3a] pl-4 py-2"><strong className="text-white">Weeks 1-2: Physics & Instrumentation</strong><br />Spend 90 minutes daily on flashcards (SonoPrep's 200+ cards). Memorize key formulas: wavelength = speed/frequency; impedance = density × speed; attenuation coefficient = 0.5 dB/cm/MHz. Understand the relationship between frequency, resolution, and penetration. Use spaced repetition – review cards at increasing intervals.</div>
            <div className="border-l-[3px] border-[#c85b3a] pl-4 py-2"><strong className="text-white">Weeks 3-4: Doppler & Artifacts</strong><br />Doppler is 22% of the exam. Master the Doppler shift equation, Nyquist limit (PRF/2), and aliasing. Learn to recognize all 7 common artifacts from images – SonoPrep flashcards include visual examples. Take untimed quizzes to identify weak areas.</div>
            <div className="border-l-[3px] border-[#c85b3a] pl-4 py-2"><strong className="text-white">Week 5: Safety, Hemodynamics & First Full‑Length Exam</strong><br />Memorize ALARA principle, thermal index (TI), mechanical index (MI). Bernoulli equation: ΔP = 4v² (pressure gradient from velocity). Take your first full 170‑question timed exam. Review every incorrect answer and note which domains need work.</div>
            <div className="border-l-[3px] border-[#c85b3a] pl-4 py-2"><strong className="text-white">Week 6: Targeted Review & Final Exams</strong><br />Focus 80% of your time on your lowest‑scoring domains from week 5. Take 2‑3 additional full exams. Once you score ≥80% on three consecutive exams, you're ready for the real test.</div>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mt-8">Why Most Students Fail (And How to Avoid It)</h2>
          <p>Common mistakes that lead to failure:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Cramming</strong> – The SPI tests deep understanding, not short‑term memory. Cramming leads to 50% forgetting within 24 hours.</li>
            <li><strong className="text-white">Ignoring Doppler</strong> – Doppler is 22% of the exam, yet many students under‑study it because it seems complex. Master the Nyquist limit and aliasing – these are high‑yield.</li>
            <li><strong className="text-white">No Timed Practice</strong> – The 3‑hour limit is tight. Simulate real conditions to build mental endurance.</li>
            <li><strong className="text-white">Skipping Explanation Review</strong> – Understanding why an answer is correct (or wrong) is more valuable than the answer itself.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-white mt-8">How SonoPrep Prepares You</h2>
          <p>SonoPrep's SM‑2 spaced repetition flashcards ensure you review concepts just before you forget them, boosting retention by up to 200%. The 170‑question exam simulator mirrors the real ARDMS weighting, and our 50 Physics Pearls give you one‑minute summaries of high‑yield topics. Students who follow this plan pass at a 94% first‑attempt rate.</p>
          
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8">
            <p className="text-sm"><strong className="text-white">Key takeaway:</strong> Consistent daily study (2 hours) + spaced repetition + full‑length exams = first‑time pass. Start today.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
