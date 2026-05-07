#!/bin/bash

# Create brutalist card component
mkdir -p src/components/ui
cat > src/components/ui/brutalist-card.tsx << 'EOF'
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export function BrutalistCard({ children, href, className, variant = "default" }: { children: React.ReactNode; href?: string; className?: string; variant?: "default" | "featured" | "product" }) {
  const content = (
    <div className={cn("relative group", variant === "featured" && "border-l-[3px] border-[#ff6b4a] bg-white/[0.02]", className)}>
      <div className={cn("depth-border corner-arch p-6 transition-all duration-300 h-full", variant === "product" && "flex flex-col")}>{children}</div>
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

export function BrutalistCardBadge({ children }: { children: React.ReactNode }) {
  return <div className="absolute top-0 left-0 bg-[#ff6b4a] px-3 py-1 text-[10px] font-mono tracking-wider text-black z-10">{children}</div>;
}

export function BrutalistCardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-bold tracking-tight text-white mb-3 leading-tight">{children}</h3>;
}

export function BrutalistCardDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-white/40 text-sm leading-relaxed">{children}</p>;
}

export function BrutalistCardPrice({ children }: { children: React.ReactNode }) {
  return <div className="text-2xl font-bold text-[#ff6b4a] mb-4">{children}<span className="text-xs font-normal text-white/30 ml-2">/ 90-day access</span></div>;
}

export function BrutalistCardFeature({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2 text-sm text-white/60 py-1"><span className="text-[#ff6b4a]">—</span>{children}</div>;
}

export function BrutalistCardMeta({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3 text-[11px] font-mono tracking-wider text-white/30 border-t border-white/5 pt-4 mt-4">{children}</div>;
}

export function BrutalistCardCta({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 pt-4 border-t border-white/10"><span className="text-[11px] font-mono tracking-wider text-white/40 hover:text-[#ff6b4a] transition-colors inline-flex items-center gap-2">{children}<span className="text-[#ff6b4a]">→</span></span></div>;
}
EOF

# Replace Blog Page
cat > src/app/blog/page.tsx << 'EOF'
"use client";
import Link from "next/link";

const BLOG_POSTS = [
  { slug: "what-is-the-spi-exam", title: "What Is the ARDMS SPI Exam? Everything Sonographers Need to Know", excerpt: "The Sonography Principles and Instrumentation exam is an ARDMS prerequisite for all specialty credentials. Here's exactly what it tests, how it's structured, and what a passing score looks like.", readTime: 7, date: "April 28, 2026", category: "EXAM OVERVIEW" },
  { slug: "how-long-to-study-for-spi", title: "How Long Should You Study for the SPI Exam? A Realistic Timeline", excerpt: "Most candidates need 4–8 weeks. But the right study window depends on your clinical background, available daily hours, and whether you're using active recall or passive reading.", readTime: 6, date: "April 20, 2026", category: "STUDY STRATEGY" },
  { slug: "doppler-physics-spi-guide", title: "Doppler Physics for the SPI Exam: The Concepts That Actually Show Up", excerpt: "Doppler covers 22% of the SPI exam. This guide walks through the six Doppler principles ARDMS actually tests.", readTime: 9, date: "April 15, 2026", category: "PHYSICS DEEP-DIVE" }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 border-b border-white/10 pb-8">
          <span className="display-eyebrow">SPI STUDY RESOURCES</span>
          <h1 className="display-headline text-5xl sm:text-6xl mt-4 mb-4">Guides Written by<br />Practicing Sonographers</h1>
          <p className="display-body max-w-2xl">Free in-depth articles on SPI exam strategy, ultrasound physics, and ARDMS credentialing — written by RDMS-credentialed sonographers who've passed the exam and scan patients daily.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="depth-border corner-arch p-6 h-full hover:border-[#ff6b4a] transition-all duration-300">
                <div className="inline-block bg-[#ff6b4a] px-3 py-1 text-[10px] font-mono tracking-wider text-black mb-4">{post.category}</div>
                <h3 className="text-xl font-bold tracking-tight text-white mb-3 leading-tight">{post.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-[11px] font-mono tracking-wider text-white/30 border-t border-white/5 pt-4">
                  <span>{post.readTime} min read</span>
                  <span className="w-1 h-1 bg-[#ff6b4a] rounded-full" />
                  <span>{post.date}</span>
                </div>
                <div className="mt-4"><span className="text-[11px] font-mono tracking-wider text-white/40 hover:text-[#ff6b4a] transition-colors inline-flex items-center gap-2">READ POST →</span></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
EOF

# Replace Products Page
cat > src/app/products/page.tsx << 'EOF'
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
EOF

# Add CSS improvements
cat >> src/app/globals.css << 'EOF'
.corner-arch { position: relative; }
.corner-arch::before, .corner-arch::after { content: ''; position: absolute; width: 16px; height: 16px; pointer-events: none; opacity: 0; transition: opacity 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1); }
.corner-arch::before { top: 0; left: 0; border-top: 1px solid #ff6b4a; border-left: 1px solid #ff6b4a; }
.corner-arch::after { bottom: 0; right: 0; border-bottom: 1px solid #ff6b4a; border-right: 1px solid #ff6b4a; }
.corner-arch:hover::before, .corner-arch:hover::after { opacity: 1; }
.depth-border { border-radius: 0 !important; }
.btn-industrial, .btn-industrial-outline { border-radius: 0 !important; }
EOF

echo "✅ All brutalist fixes applied!"
