import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">STRATEGY</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">How to Pass SPI Exam on First Attempt</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>13 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 4, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4]">
          <p>6‑week blueprint: weeks 1-2 physics (flashcards daily), weeks 3-4 Doppler & artifacts, week 5 safety + first full exam, week 6 targeted review. Score ≥80% on three practice exams before scheduling.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Success metric:</strong> 94% first‑attempt pass rate for those who finish all 170 simulator questions.</p></div>
        </div>
      </article>
    </div>
  );
}
