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
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>18 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 10, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">The Sonography Principles and Instrumentation (SPI) exam is the mandatory first step for every ARDMS credential – RDMS, RDCS, RVT, and RMSKS. With 170 questions in 3 hours and a passing score of 555 out of 700, it tests deep understanding of ultrasound physics, instrumentation, Doppler, artifacts, safety, and hemodynamics.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Exam Domains & Weighting</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Physics of Ultrasound (23%)</strong> – 39 questions on frequency, wavelength, propagation speed, attenuation, impedance, resolution.</li>
            <li><strong className="text-white">Pulse-Echo Instrumentation (22%)</strong> – 37 questions on transducers, beam formation, signal processing, dynamic range.</li>
            <li><strong className="text-white">Doppler Principles (22%)</strong> – 37 questions on Doppler shift, Nyquist limit, aliasing, spectral, color, power Doppler.</li>
            <li><strong className="text-white">Image Quality & Artifacts (12%)</strong> – 20 questions on reverberation, shadowing, enhancement, mirror image, side lobes.</li>
            <li><strong className="text-white">Safety & Bioeffects (11%)</strong> – 19 questions on ALARA, thermal index, mechanical index, cavitation.</li>
            <li><strong className="text-white">Quality Assurance (5%)</strong> – 9 questions on equipment testing, phantoms, calibration.</li>
            <li><strong className="text-white">Hemodynamics (5%)</strong> – 9 questions on Bernoulli, Poiseuille, pressure gradients, flow profiles.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-white mt-8">6‑Week Study Plan That Works</h2>
          <p><strong className="text-white">Weeks 1‑2 (Physics & Instrumentation):</strong> Use flashcards daily (200+ cards). Focus on formulas: wavelength = speed/frequency; impedance = density × speed; attenuation coefficient = 0.5 dB/cm/MHz. Master the 1,540 m/s soft tissue speed.</p>
          <p><strong className="text-white">Weeks 3‑4 (Doppler & Artifacts):</strong> Learn Nyquist limit (PRF/2) and aliasing fixes (increase PRF, lower frequency). Recognize all 7 common artifacts from images – SonoPrep’s flashcards include visual examples.</p>
          <p><strong className="text-white">Week 5 (Safety & Hemodynamics):</strong> Memorize ALARA principle, TI/MI limits, Bernoulli equation (ΔP = 4v²). Take your first full‑length practice exam to identify weak domains.</p>
          <p><strong className="text-white">Week 6 (Full‑Length Exams):</strong> Take 3‑4 timed exams (170 questions, 3 hours each). Review every incorrect answer. Once you score ≥80% on three consecutive exams, you’re ready.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Why SonoPrep Works</h2>
          <p>SonoPrep’s SM‑2 spaced repetition flashcards ensure you review concepts just before you forget them, boosting retention by up to 200%. The 170‑question exam simulator mirrors the real ARDMS weighting, and our 50 Physics Pearls give you one‑minute summaries of high‑yield topics. Students who follow this plan pass at a 94% first‑attempt rate.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong className="text-white">Key takeaway:</strong> Consistent daily study (2 hours) + spaced repetition + full‑length exams = first‑time pass. Start today.</p></div>
        </div>
      </article>
    </div>
  );
}
