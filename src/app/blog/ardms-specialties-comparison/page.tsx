import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">CAREER PATH</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">RDMS vs. RDCS vs. RVT vs. RMSKS: Which ARDMS Specialty Is Right for You?</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>12 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 2, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">After passing SPI, you must choose a specialty. Each has different exam content, clinical focus, and job market. Here's what you need to know.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">RDMS – Diagnostic Medical Sonography</h2>
          <p>The most common credential. Subspecialties: abdomen (liver, kidneys, pancreas), obstetrics/gynecology (pregnancy, female reproductive system), breast sonography. High demand in hospitals and imaging centers. Exam includes physics review plus specialty‑specific questions.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">RDCS – Cardiac Sonography</h2>
          <p>Focuses on the heart. Tracks: adult echo (transthoracic and TEE), pediatric echo, fetal echo. Requires strong understanding of cardiac anatomy, valves, and Doppler quantification. Growing demand due to aging population.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">RVT – Vascular Technology</h2>
          <p>Examines blood vessels – carotid, venous insufficiency, DVT, arterial disease. High demand in vascular labs and vein clinics. Exam emphasizes Doppler hemodynamics and waveform analysis.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">RMSKS – Musculoskeletal Sonography</h2>
          <p>Emerging specialty focusing on tendons, ligaments, muscles, and joints. Often used in sports medicine and rheumatology. Smaller but growing field.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong className="text-white">Tip:</strong> Many sonographers hold multiple credentials. Start with RDMS (abdomen) or RDCS (adult echo), then add others as you gain experience.</p></div>
        </div>
      </article>
    </div>
  );
}
