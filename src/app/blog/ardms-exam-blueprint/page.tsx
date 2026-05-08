import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">OFFICIAL BLUEPRINT</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">ARDMS SPI Exam Blueprint 2026: Domain Weightings and How to Use Them</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>14 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 24, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">The ARDMS publishes a detailed content outline that tells you exactly which topics are tested and how many questions to expect. Understanding this blueprint allows you to allocate study time efficiently and avoid wasting effort on low‑yield topics.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Official Domain Weightings</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Physics of Ultrasound – 23%</strong> (≈39 questions) – covers sound wave properties, frequency, wavelength, propagation speed, attenuation, acoustic impedance, resolution, and the piezoelectric effect.</li>
            <li><strong className="text-white">Pulse-Echo Instrumentation – 22%</strong> (≈37 questions) – transducers, beam focusing, signal processing, dynamic range, A‑mode/B‑mode/M‑mode, and image storage.</li>
            <li><strong className="text-white">Doppler Principles – 22%</strong> (≈37 questions) – Doppler effect, Nyquist limit, aliasing, spectral analysis, color flow, power Doppler, and angle correction.</li>
            <li><strong className="text-white">Image Quality & Artifacts – 12%</strong> (≈20 questions) – resolution, contrast, artifacts (reverberation, shadowing, enhancement, mirror image, side lobes, speed propagation).</li>
            <li><strong className="text-white">Safety & Bioeffects – 11%</strong> (≈19 questions) – ALARA, thermal index (TI), mechanical index (MI), acoustic output, and bioeffects studies.</li>
            <li><strong className="text-white">Quality Assurance – 5%</strong> (≈9 questions) – equipment testing (phantoms, calibration, preventive maintenance).</li>
            <li><strong className="text-white">Hemodynamics – 5%</strong> (≈9 questions) – Bernoulli equation, Poiseuille's law, pressure gradients, laminar vs. turbulent flow.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-white mt-8">How to Use This Weighting</h2>
          <p>Spend 60% of your study time on the top three domains (Physics, Instrumentation, Doppler). Use SonoPrep's exam simulator to track your performance by domain. If you are scoring 90% in Doppler but only 70% in Safety, shift your focus immediately. The worst mistake is to neglect a high‑weight domain because it seems difficult.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Strategic insight:</strong> A student scoring 90% on Physics but 50% on Doppler will likely fail because Doppler alone is 22% of the exam. Use domain‑specific practice to balance your knowledge.</p></div>
        </div>
      </article>
    </div>
  );
}
