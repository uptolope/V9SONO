"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">STRATEGY</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">How to Pass SPI on First Attempt</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>11 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 25, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg">6-week plan: weeks 1-2 physics, weeks 3-4 instrumentation & Doppler, week 5 artifacts & safety, week 6 full-length practice exams.</p>
          <div className="bg-[#c85b3a]/10 p-6 my-8 border-l-[3px] border-[#c85b3a]"><p className="body-readable text-[#f0ebe4] text-sm"><strong>Success metric:</strong> Score ≥80% on three consecutive practice exams before the real test.</p></div>
        </div>
      </article>
    </div>
  );
}
