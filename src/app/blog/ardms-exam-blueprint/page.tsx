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
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>17 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 26, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">The ARDMS publishes a detailed content outline that tells you exactly which topics are tested and how many questions to expect. Understanding this blueprint allows you to allocate study time efficiently.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Official Weightings (2026)</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Physics of Ultrasound – 23%</strong> (≈39 questions) – sound wave properties, frequency, wavelength, propagation speed, attenuation, acoustic impedance, resolution, piezoelectric effect.</li>
            <li><strong className="text-white">Pulse‑Echo Instrumentation – 22%</strong> (≈37 questions) – transducers, beam focusing, signal processing, dynamic range, A‑mode/B‑mode/M‑mode.</li>
            <li><strong className="text-white">Doppler Principles – 22%</strong> (≈37 questions) – Doppler effect, Nyquist limit, aliasing, PW, CW, color Doppler, power Doppler, angle correction.</li>
            <li><strong className="text-white">Image Quality &amp; Artifacts – 12%</strong> (≈20 questions) – resolution, contrast, the seven common artifacts.</li>
            <li><strong className="text-white">Safety &amp; Bioeffects – 11%</strong> (≈19 questions) – ALARA, TI, MI, cavitation.</li>
            <li><strong className="text-white">Quality Assurance – 5%</strong> (≈9 questions) – equipment testing, phantoms, calibration.</li>
            <li><strong className="text-white">Hemodynamics – 5%</strong> (≈9 questions) – Bernoulli, Poiseuille, pressure gradients, laminar/turbulent flow.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-white mt-8">How to Use This Weighting</h2>
          <p>Spend 60% of your study time on the top three domains (Physics, Instrumentation, Doppler). Use SonoPrep’s exam simulator to track your performance by domain. If you are scoring 90% in Doppler but only 70% in Safety, shift your focus immediately. Neglecting a high‑weight domain because it seems difficult is the fastest way to fail.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Changes from Previous Years</h2>
          <p>The 2026 blueprint slightly increased Doppler (from 20% to 22%) and reduced QA (from 7% to 5%). Doppler is more clinically relevant than ever, so it makes sense. Be prepared for slightly more questions on Nyquist and aliasing.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong className="text-white">Strategic insight:</strong> A student scoring 90% on Physics but 50% on Doppler will likely fail because Doppler alone is 22% of the exam. Balance your study across all high‑weight domains.</p></div>
        </div>
      </article>
    </div>
  );
}
