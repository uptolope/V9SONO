"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-[11px] font-mono tracking-wider text-white/40 hover:text-[#ff6b4a] mb-8 inline-block">← BACK TO BLOG</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#ff6b4a] px-3 py-1 text-[10px] font-mono tracking-wider text-black mb-4">PHYSICS DEEP-DIVE</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Doppler Physics for the SPI Exam</h1>
          <div className="flex items-center gap-4 text-sm text-white/40 border-t border-white/10 pt-4">
            <span>9 min read</span><span className="w-1 h-1 bg-[#ff6b4a] rounded-full" /><span>April 15, 2026</span>
          </div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-white/70 text-lg leading-relaxed mb-6">Doppler covers 22% of the SPI exam. The Nyquist limit equals half the pulse repetition frequency (PRF).</p>
          <div className="bg-white/5 p-6 my-8 border-l-[3px] border-[#ff6b4a]">
            <p className="text-white/80 text-sm"><strong className="text-white">SPI Exam Tip:</strong> If you see aliasing, increase PRF or use a lower frequency transducer.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
