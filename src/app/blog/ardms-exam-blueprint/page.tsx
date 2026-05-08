import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    &lt;div className="min-h-screen pt-32 px-6">
      &lt;article className="max-w-4xl mx-auto">
        &lt;Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block"&gt;← BACK TO ALL ARTICLES&lt;/Link>
        &lt;div className="mb-8">
          &lt;div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4"&gt;OFFICIAL BLUEPRINT&lt;/div>
          &lt;h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4"&gt;ARDMS SPI Exam Blueprint 2026: Domain Weightings and How to Use Them&lt;/h1>
          &lt;div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"">&gt;&lt;span&gt;14 min read&lt;/spann>&gt;&lt;span className="w-1 h-1 bg-[#c85b3a] rounded-full" //>&gt;&lt;span&gt;April 24, 2026&lt;/spann>&gt;&lt;/div>
        &lt;/div>
        &lt;div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          &lt;p className="text-lg"&gt;The ARDMS publishes a detailed content outline that tells you exactly which topics are tested and how many questions to expect. Understanding this blueprint allows you to allocate study time efficiently and avoid wasting effort on low‑yield topics.&lt;/p>
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;Official Domain Weightings&lt;/h2>
          &lt;ul className="list-disc pl-6 space-y-2">
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Physics of Ultrasound – 23%&lt;/strong&gt; (≈39 questions) – covers sound wave properties, frequency, wavelength, propagation speed, attenuation, acoustic impedance, resolution, and the piezoelectric effect.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Pulse-Echo Instrumentation – 22%&lt;/strong&gt; (≈37 questions) – transducers, beam focusing, signal processing, dynamic range, A‑mode/B‑mode/M‑mode, and image storage.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Doppler Principles – 22%&lt;/strong&gt; (≈37 questions) – Doppler effect, Nyquist limit, aliasing, spectral analysis, color flow, power Doppler, and angle correction.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Image Quality & Artifacts – 12%&lt;/strong&gt; (≈20 questions) – resolution, contrast, artifacts (reverberation, shadowing, enhancement, mirror image, side lobes, speed propagation).&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Safety & Bioeffects – 11%&lt;/strong&gt; (≈19 questions) – ALARA, thermal index (TI), mechanical index (MI), acoustic output, and bioeffects studies.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Quality Assurance – 5%&lt;/strong&gt; (≈9 questions) – equipment testing (phantoms, calibration, preventive maintenance).&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Hemodynamics – 5%&lt;/strong&gt; (≈9 questions) – Bernoulli equation, Poiseuille's law, pressure gradients, laminar vs. turbulent flow.&lt;/li>
          &lt;/ul>
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;How to Use This Weighting&lt;/h2>
          &lt;p&gt;Spend 60% of your study time on the top three domains (Physics, Instrumentation, Doppler). Use SonoPrep's exam simulator to track your performance by domain. If you are scoring 90% in Doppler but only 70% in Safety, shift your focus immediately. The worst mistake is to neglect a high‑weight domain because it seems difficult.&lt;/p>
          &lt;div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"">&gt;&lt;p className="text-sm"">&gt;&lt;strong&gt;Strategic insight:&lt;/strong&gt; A student scoring 90% on Physics but 50% on Doppler will likely fail because Doppler alone is 22% of the exam. Use domain‑specific practice to balance your knowledge.&lt;/pp>&gt;&lt;/div>
        &lt;/div>
      &lt;/article>
    &lt;/div>
  );
}
