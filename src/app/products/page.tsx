"use client";
import Link from "next/link";

const PRODUCTS = [
  { name: "SPI Flashcards", price: "$29", description: "Master key physics concepts with SM-2 spaced repetition.", features: ["2,400 expert-written flashcards", "SM-2 spaced repetition", "Progress tracking", "Mobile optimized"] },
  { name: "Physics Pearls", price: "$9", description: "High-yield physics principles in digestible bites.", features: ["150 concept summaries", "Clinical examples", "ARDMS domain mapped", "Quick reference"] },
  { name: "Exam Simulator", price: "$49", description: "ARDMS-weighted questions that mirror the actual exam.", features: ["170 practice questions", "ARDMS domain weighting", "Detailed explanations", "Performance analytics"], featured: true },
  { name: "Study Notes", price: "$39", description: "Comprehensive guide covering all SPI domains.", features: ["159 pages", "10 chapters", "Progress tracking", "Covers all domains"] },
  { name: "Premium Bundle", price: "$99", description: "All four products at a discounted price.", features: ["All 4 products", "2,400 flashcards", "170-question simulator", "159-page notes", "Save $27"], featured: true, bundle: true }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 border-b border-white/10 pb-8">
          <span className="display-eyebrow">STUDY TOOLS</span>
          <h1 className="display-headline text-5xl sm:text-6xl mt-4">Pass the SPI.<br />Your way.</h1>
          <p className="display-body max-w-xl mt-4">Choose the tools that fit your study style. Or get everything in the bundle and save.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div key={product.name} className={`depth-border corner-arch p-6 hover:border-[#ff6b4a] transition-all duration-300 flex flex-col ${product.featured ? "border-l-[3px] border-l-[#ff6b4a] bg-white/[0.02]" : ""}`}>
              {product.featured && !product.bundle && <div className="absolute top-0 left-0 bg-[#ff6b4a] px-3 py-1 text-[10px] font-mono tracking-wider text-black">MOST POPULAR</div>}
              {product.bundle && <div className="absolute top-0 left-0 bg-[#ff6b4a] px-3 py-1 text-[10px] font-mono tracking-wider text-black">BEST VALUE</div>}
              <div className="pt-8 flex-grow">
                <h3 className="text-xl font-bold tracking-tight text-white mb-2">{product.name}</h3>
                <div className="text-3xl font-bold text-[#ff6b4a] mb-2">{product.price}<span className="text-xs font-normal text-white/30 ml-2">/ 90-day access</span></div>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{product.description}</p>
                <div className="space-y-2 mb-8">{product.features.map((f) => (<div key={f} className="flex items-center gap-2 text-sm text-white/60"><span className="text-[#ff6b4a]">—</span>{f}</div>))}</div>
              </div>
              <Link href="/api/checkout" className={`inline-block w-full text-center py-3 transition-all duration-300 ${product.bundle ? "btn-industrial" : "border border-white/20 text-white hover:border-[#ff6b4a] hover:text-[#ff6b4a]"}`}>GET {product.bundle ? "BUNDLE →" : "STARTED →"}</Link>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center"><p className="text-white/30 text-xs font-mono tracking-wider">All products include 90-day access · Save $27 with the Premium Bundle</p></div>
      </div>
    </div>
  );
}
