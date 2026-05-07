"use client";
import Link from "next/link";

const PRODUCTS = [
  { name: "SPI Flashcards", price: "$29", description: "200 clinically focused flashcards with SM-2 spaced repetition.", features: ["200 expert-written flashcards", "SM-2 spaced repetition", "Progress tracking", "Mobile optimized"] },
  { name: "Physics Pearls", price: "$9", description: "50 high-yield physics pearls — concise, memorable explanations.", features: ["50 high-yield concept summaries", "Clinical application examples", "ARDMS domain mapping", "Quick reference format"] },
  { name: "Exam Simulator", price: "$49", description: "110 ARDMS-weighted practice questions with detailed explanations.", features: ["110 practice questions", "ARDMS domain weighting", "Detailed answer explanations", "Category performance analytics"], featured: true },
  { name: "Study Notes", price: "$39", description: "159-page comprehensive guide covering every SPI domain.", features: ["159 pages of content", "10 organized chapters", "Reading progress tracking", "Covers all SPI domains"] },
  { name: "Premium Bundle", price: "$99", description: "All four products — the complete SPI prep system.", features: ["All 4 products included", "200 flashcards + 50 Pearls", "110-question exam simulator", "159-page study notes", "Save $27"], featured: true }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 border-b border-white/10 pb-8">
          <span className="display-eyebrow">THE ARCHIVE</span>
          <h1 className="display-headline text-5xl sm:text-6xl mt-4">Five tools.<br />One objective.</h1>
          <p className="display-body max-w-xl mt-4">No noise. No filler. Just what you need to pass the SPI exam.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <div key={product.name} className={`depth-border corner-arch p-6 hover:border-[#ff6b4a] transition-all duration-300 ${product.featured ? "border-l-[3px] border-l-[#ff6b4a] bg-white/[0.02]" : ""}`}>
              {product.featured && <div className="absolute top-0 left-0 bg-[#ff6b4a] px-3 py-1 text-[10px] font-mono tracking-wider text-black">FEATURED</div>}
              <div className="pt-8">
                <h3 className="text-xl font-bold tracking-tight text-white mb-2">{product.name}</h3>
                <div className="text-2xl font-bold text-[#ff6b4a] mb-4">{product.price}<span className="text-xs font-normal text-white/30 ml-2">/ 90-day access</span></div>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{product.description}</p>
                <div className="space-y-2 mb-8">{product.features.map((f) => (<div key={f} className="flex items-center gap-2 text-sm text-white/60"><span className="text-[#ff6b4a]">—</span>{f}</div>))}</div>
                <Link href="/api/checkout" className="inline-block w-full text-center btn-industrial py-3">GET STARTED →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
