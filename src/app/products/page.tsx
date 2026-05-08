"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type PriceIds = {
  flashcards: string | undefined;
  simulator: string | undefined;
  pearls: string | undefined;
  notes: string | undefined;
  bundle: string | undefined;
};

const PRODUCTS = [
  { key: "flashcards", name: "SPI Flashcards", price: "$29", description: "Master key physics concepts with SM-2 spaced repetition.", features: ["200+ expert-written flashcards", "SM-2 spaced repetition algorithm", "Progress tracking", "Mobile optimized"] },
  { key: "simulator", name: "Exam Simulator", price: "$49", description: "ARDMS-weighted questions that mirror the actual exam experience.", features: ["170 practice questions", "ARDMS domain weighting", "Detailed answer explanations", "Category performance analytics"], featured: true },
  { key: "pearls", name: "Physics Pearls", price: "$9", description: "50 high-yield physics principles in digestible, memorable bites.", features: ["50 concept summaries", "Clinical application examples", "ARDMS domain mapped", "Quick reference format"] },
  { key: "notes", name: "Study Notes", price: "$39", description: "159-page comprehensive guide covering all SPI domains.", features: ["159 pages", "10 organized chapters", "Progress tracking", "Covers all domains"] },
  { key: "bundle", name: "Premium Bundle", price: "$99", description: "Everything you need — all four products at a discounted price.", features: ["All 4 products included", "200+ flashcards", "170-question simulator", "159-page notes", "50 Physics Pearls", "Save $27"], featured: true, bundle: true }
];

export default function ProductsPage() {
  const [priceIds, setPriceIds] = useState<PriceIds | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/price-ids")
      .then(res => res.json())
      .then(data => setPriceIds(data))
      .finally(() => setLoading(false));
  }, []);

  const handleCheckout = async (productKey: keyof PriceIds) => {
    if (!priceIds || !priceIds[productKey]) {
      alert("Price not configured. Please contact support.");
      return;
    }
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: priceIds[productKey],
        successUrl: window.location.origin + "/dashboard?success=true",
        cancelUrl: window.location.origin + "/products?canceled=true"
      }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  if (loading) return <div className="min-h-screen pt-32 px-6 text-white/30">Loading products...</div>;

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 border-b border-[#f0ebe4]/10 pb-8">
          <span className="meta">STUDY TOOLS</span>
          <h1 className="display-display text-5xl sm:text-6xl mt-4">Pass the SPI.<br />Your way.</h1>
          <p className="body-readable text-[#b8b0a4] max-w-xl mt-4">Choose individual tools or get everything in the bundle and save.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div key={product.key} className={`depth-border corner-arch p-6 tactile-card flex flex-col ${product.featured ? "border-l-[3px] border-l-[#c85b3a]" : ""} ${product.bundle ? "bg-[#c85b3a]/5" : ""}`}>
              {product.featured && !product.bundle && <div className="absolute top-0 left-0 bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white">MOST POPULAR</div>}
              {product.bundle && <div className="absolute top-0 left-0 bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white">BEST VALUE</div>}
              <div className="pt-8 flex-grow">
                <h3 className="display-serif text-xl font-semibold text-[#f0ebe4] mb-2">{product.name}</h3>
                <div className="text-3xl font-semibold text-[#c85b3a] mb-2">{product.price}<span className="text-xs text-white/30 ml-2">/ 90-day access</span></div>
                <p className="body-small text-[#b8b0a4] text-sm mb-6">{product.description}</p>
                <div className="space-y-2 mb-8">{product.features.map((f) => (<div key={f} className="flex items-center gap-2 text-sm text-[#b8b0a4]/70"><span className="text-[#c85b3a]">—</span>{f}</div>))}</div>
              </div>
              <button onClick={() => handleCheckout(product.key as keyof PriceIds)} className={`inline-block w-full text-center py-3 transition-all duration-300 tactile-button ${product.bundle ? "bg-[#c85b3a] text-white hover:bg-[#a8452a]" : "border border-[#c85b3a]/50 text-[#f0ebe4] hover:bg-[#c85b3a]/10"}`}>GET {product.bundle ? "BUNDLE →" : "STARTED →"}</button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center"><p className="meta text-[10px] text-[#6b6359]">All products include 90-day access · Save $27 with the Premium Bundle</p></div>
      </div>
    </div>
  );
}
