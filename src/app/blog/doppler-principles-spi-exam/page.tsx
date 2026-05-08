import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">DOPPLER MASTERY</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Doppler Principles: Nyquist, Aliasing, and More</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>20 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 6, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p>Doppler is 22% of the exam. Key points: Doppler effect (frequency shift ∝ velocity). Nyquist limit = PRF/2. Aliasing occurs when shift exceeds Nyquist; fix by increasing PRF or using lower frequency. PW vs. CW vs. color vs. power Doppler.</p>
          <p>Angle dependence: maximal shift at 0°, zero at 90°. Keep angle ≤60°.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Must‑know:</strong> Aliasing → increase PRF or decrease transducer frequency.</p></div>
        </div>
      </article>
    </div>
  );
}
