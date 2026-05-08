import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">COMPREHENSIVE GUIDE</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">The Complete ARDMS SPI Exam Guide</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>22 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 10, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p>The SPI exam has 170 questions, 3 hours, passing score 555/700. Domains: Physics 23%, Instrumentation 22%, Doppler 22%, Artifacts 12%, Safety 11%, QA 5%, Hemodynamics 5%.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">6‑Week Study Plan</h2>
          <p>Weeks 1–2: Physics &amp; Instrumentation (flashcards daily). Weeks 3–4: Doppler &amp; artifacts. Week 5: Safety &amp; first full exam. Week 6: Targeted review &amp; final exams.</p>
          <p>Once you score ≥80% on three consecutive practice exams, you’re ready. SonoPrep users have a 94% first‑attempt pass rate.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Key takeaway:</strong> Consistent daily study + spaced repetition + full‑length exams = success.</p></div>
        </div>
      </article>
    </div>
  );
}
