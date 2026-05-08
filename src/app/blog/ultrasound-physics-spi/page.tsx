"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">PHYSICS</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Ultrasound Physics: 6 Concepts You Must Know</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>12 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 3, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg">Frequency, wavelength, propagation speed, attenuation, impedance, resolution. These six concepts make up the majority of physics questions.</p>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-8 mb-4">Frequency vs. Wavelength</h2>
          <p className="body-readable text-[#b8b0a4]">Higher frequency = shorter wavelength = better resolution but less penetration.</p>
          <div className="bg-[#c85b3a]/10 p-6 my-8 border-l-[3px] border-[#c85b3a]"><p className="body-readable text-[#f0ebe4] text-sm"><strong>Remember:</strong> Soft tissue propagation speed = 1,540 m/s.</p></div>
        </div>
      </article>
    </div>
  );
}
