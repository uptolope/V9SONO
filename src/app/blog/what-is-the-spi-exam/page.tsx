"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-[11px] font-mono tracking-wider text-white/40 hover:text-[#ff6b4a] mb-8 inline-block">← BACK TO BLOG</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#ff6b4a] px-3 py-1 text-[10px] font-mono tracking-wider text-black mb-4">EXAM OVERVIEW</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">What Is the ARDMS SPI Exam? Everything Sonographers Need to Know</h1>
          <div className="flex items-center gap-4 text-sm text-white/40 border-t border-white/10 pt-4">
            <span>7 min read</span>
            <span className="w-1 h-1 bg-[#ff6b4a] rounded-full" /><span>April 28, 2026</span>
          </div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-white/70 text-lg leading-relaxed mb-6">The SPI exam is the foundational prerequisite for every major ARDMS credential. You cannot sit for a specialty exam without passing SPI first.</p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">What the SPI Exam Tests</h2>
          <p className="text-white/60 leading-relaxed mb-4">Physics of Ultrasound (23%), Pulse-Echo Instrumentation (22%), Doppler Principles (22%), Image Quality & Artifacts (12%), Safety & Bioeffects (11%).</p>
          <div className="bg-white/5 p-6 my-8 border-l-[3px] border-[#ff6b4a]">
            <p className="text-white/80 text-sm"><strong className="text-white">Key Takeaway:</strong> Focus on understanding core physics — not memorizing random facts.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
