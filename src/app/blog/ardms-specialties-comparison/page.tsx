import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    &lt;div className="min-h-screen pt-32 px-6">
      &lt;article className="max-w-4xl mx-auto">
        &lt;Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block"&gt;← BACK TO ALL ARTICLES&lt;/Link>
        &lt;div className="mb-8">
          &lt;div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4"&gt;CAREER PATH&lt;/div>
          &lt;h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4"&gt;RDMS vs. RDCS vs. RVT vs. RMSKS: Which ARDMS Specialty Is Right for You?&lt;/h1>
          &lt;div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"">&gt;&lt;span&gt;14 min read&lt;/spann>&gt;&lt;span className="w-1 h-1 bg-[#c85b3a] rounded-full" //>&gt;&lt;span&gt;May 2, 2026&lt;/spann>&gt;&lt;/div>
        &lt;/div>
        &lt;div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          &lt;p className="text-lg"&gt;After passing the SPI exam, you must choose a specialty credential. Each has different exam content, clinical focus, job market, and income potential. Here's a detailed breakdown to help you decide.&lt;/p>
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;RDMS – Diagnostic Medical Sonography&lt;/h2>
          &lt;p&gt;The most common and versatile credential. Subspecialties include abdomen (liver, kidneys, pancreas, spleen), obstetrics/gynecology (pregnancy, female reproductive system), and breast sonography. RDMS holders work in hospitals, outpatient imaging centers, and physicians' offices. The exam includes SPI plus a specialty‑specific exam (e.g., abdomen, OB/GYN, breast). Demand is high, especially in general imaging and women's health.&lt;/p>
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;RDCS – Cardiac Sonography&lt;/h2>
          &lt;p&gt;Focuses on the heart. Tracks: adult echo (transthoracic and TEE), pediatric echo, fetal echo. Requires strong understanding of cardiac anatomy, valvular function, and Doppler quantification. RCDS sonographers work in cardiology clinics, hospitals, and cardiac imaging centers. High demand due to aging population and increasing heart disease. Income potential is often higher than general sonography.&lt;/p>
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;RVT – Vascular Technology&lt;/h2>
          &lt;p&gt;Examines blood vessels: carotid (stroke risk), venous (DVT), arterial (peripheral artery disease), and abdominal vessels (aorta, renal). RVTs work in vascular labs, vein clinics, and imaging centers. The exam emphasizes Doppler hemodynamics, waveform analysis, and stenosis quantification. Growing field with strong demand.&lt;/p>
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;RMSKS – Musculoskeletal Sonography&lt;/h2>
          &lt;p&gt;Emerging specialty focusing on tendons, ligaments, muscles, and joints. Often used in sports medicine and rheumatology (e.g., rotator cuff tears, carpal tunnel, Achilles tendon). Smaller but rapidly growing field. Many RMSKS sonographers work in orthopedics and sports medicine clinics.&lt;/p>
          &lt;div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"">&gt;&lt;p className="text-sm"">&gt;&lt;strong&gt;Tip:&lt;/strong&gt; Many sonographers hold multiple credentials. Start with RDMS (abdomen) or RDCS (adult echo), then add others as you gain experience.&lt;/pp>&gt;&lt;/div>
        &lt;/div>
      &lt;/article>
    &lt;/div>
  );
}
