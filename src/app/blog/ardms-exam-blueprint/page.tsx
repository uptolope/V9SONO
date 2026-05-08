import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">OFFICIAL BLUEPRINT</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">ARDMS SPI Exam Blueprint 2026: Domain Weightings and How to Use Them</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>13 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 24, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">The ARDMS updates its content outline periodically. Understanding the exact weighting of each domain helps you allocate study time efficiently.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Official Domain Weightings</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-white">Physics of Ultrasound:</strong> 23% (≈39 questions)</li>
            <li><strong className="text-white">Pulse-Echo Instrumentation:</strong> 22% (≈37 questions)</li>
            <li><strong className="text-white">Doppler Principles:</strong> 22% (≈37 questions)</li>
            <li><strong className="text-white">Image Quality & Artifacts:</strong> 12% (≈20 questions)</li>
            <li><strong className="text-white">Safety & Bioeffects:</strong> 11% (≈19 questions)</li>
            <li><strong className="text-white">Quality Assurance:</strong> 5% (≈9 questions)</li>
            <li><strong className="text-white">Hemodynamics:</strong> 5% (≈9 questions)</li>
          </ul>
          <h2 className="text-2xl font-semibold text-white mt-8">How to Use This Weighting</h2>
          <p>Spend 60% of your study time on the top three domains (Physics, Instrumentation, Doppler). Use SonoPrep's exam simulator to track your performance by domain – if you're scoring 90% in Doppler but only 70% in Safety, shift your focus immediately.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Changes from Previous Years</h2>
          <p>The 2026 blueprint has slightly increased emphasis on Doppler (from 20% to 22%) and reduced Quality Assurance (from 7% to 5%). This matches clinical practice – Doppler is more relevant today than ever.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong className="text-white">Strategic insight:</strong> A student scoring 90% on Physics but 50% on Doppler will likely fail because Doppler alone is 22% of the exam. Use domain‑specific practice to balance your knowledge.</p></div>
        </div>
      </article>
    </div>
  );
}
