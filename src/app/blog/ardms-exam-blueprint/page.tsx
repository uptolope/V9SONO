import Link from "next/link";
export const dynamic = 'force-dynamic';

export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">ARTICLE</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">ardms exam blueprint</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>10 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg">This article provides essential SPI exam preparation tips. For full content, please visit our blog index or contact support.</p>
        </div>
      </article>
    </div>
  );
}
