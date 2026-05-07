#!/bin/bash

# Create blog post 1 - SPI Exam Overview
mkdir -p src/app/blog/what-is-the-spi-exam
cat > src/app/blog/what-is-the-spi-exam/page.tsx << 'EOF'
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
EOF

# Create blog post 2 - Study Timeline
mkdir -p src/app/blog/how-long-to-study-for-spi
cat > src/app/blog/how-long-to-study-for-spi/page.tsx << 'EOF'
"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-[11px] font-mono tracking-wider text-white/40 hover:text-[#ff6b4a] mb-8 inline-block">← BACK TO BLOG</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#ff6b4a] px-3 py-1 text-[10px] font-mono tracking-wider text-black mb-4">STUDY STRATEGY</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">How Long Should You Study for the SPI Exam?</h1>
          <div className="flex items-center gap-4 text-sm text-white/40 border-t border-white/10 pt-4">
            <span>6 min read</span><span className="w-1 h-1 bg-[#ff6b4a] rounded-full" /><span>April 20, 2026</span>
          </div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-white/70 text-lg leading-relaxed mb-6">Most candidates need 4-8 weeks. Current students: 3-4 weeks. Practicing sonographers: 4-6 weeks. New grads: 6-8 weeks.</p>
          <div className="bg-white/5 p-6 my-8 border-l-[3px] border-[#ff6b4a]">
            <p className="text-white/80 text-sm"><strong className="text-white">Key Takeaway:</strong> Consistency beats cramming. Study 2 hours daily for 6 weeks.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
EOF

# Create blog post 3 - Doppler Physics
mkdir -p src/app/blog/doppler-physics-spi-guide
cat > src/app/blog/doppler-physics-spi-guide/page.tsx << 'EOF'
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
EOF

# Create fixed Products Page
cat > src/app/products/page.tsx << 'EOF'
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
EOF

echo "✅ ALL FILES CREATED SUCCESSFULLY!"
