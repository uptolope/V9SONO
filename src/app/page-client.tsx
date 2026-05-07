"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/layout/header";
import { ExamSimulator } from "@/components/app/exam-simulator";
import { FlashcardViewer } from "@/components/app/flashcard-viewer";
import { DEMO_QUESTIONS } from "@/lib/demo/exam-data";
import { DEMO_FLASHCARDS } from "@/lib/demo/flashcard-data";

function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 observatory-base" />
      <div className="arch-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#03050a]/50 to-[#03050a]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className={`text-center mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="display-eyebrow">ARDMS SPI · CERTIFICATION ARCHIVE</span>
        </div>
        <div className={`text-center mb-8 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="display-headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1.1]">
            Pass the<br /><span className="text-white">SPI Exam.</span>
          </h1>
        </div>
        <div className={`text-center mb-12 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="display-body text-lg max-w-xl mx-auto">The most effective SPI prep platform. Built by sonographers who passed.</p>
        </div>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Link href="#demo" className="btn-industrial px-8 py-4 text-base">Try Free Demo →</Link>
          <Link href="/products" className="btn-industrial-outline px-8 py-4 text-base">View Products</Link>
        </div>
        <div className={`grid grid-cols-3 gap-8 max-w-md mx-auto transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center"><div className="text-2xl font-bold text-white">2,400+</div><div className="text-[10px] font-mono tracking-wider text-white/40">Flashcards</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-white">94%</div><div className="text-[10px] font-mono tracking-wider text-white/40">Pass Rate</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-white">$9</div><div className="text-[10px] font-mono tracking-wider text-white/40">Starting Price</div></div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff6b4a]/30 to-transparent scan-animate" />
    </section>
  );
}

function DemoSection() {
  const [activeTab, setActiveTab] = useState<"exam" | "flashcards">("exam");

  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="display-eyebrow">TRY BEFORE YOU BUY</span>
          <h2 className="display-headline text-3xl sm:text-4xl mt-2">See why students pass with SonoPrep</h2>
        </div>
        <div className="flex border-b border-white/10 mb-8">
          <button onClick={() => setActiveTab("exam")} className={`px-8 py-3 text-sm font-mono tracking-wider transition-all ${activeTab === "exam" ? "text-[#ff6b4a] border-b border-[#ff6b4a]" : "text-white/40 hover:text-white/60"}`}>Exam Simulator</button>
          <button onClick={() => setActiveTab("flashcards")} className={`px-8 py-3 text-sm font-mono tracking-wider transition-all ${activeTab === "flashcards" ? "text-[#ff6b4a] border-b border-[#ff6b4a]" : "text-white/40 hover:text-white/60"}`}>Flashcards</button>
        </div>
        {activeTab === "exam" ? <ExamSimulator questions={DEMO_QUESTIONS.slice(0, 5)} /> : <FlashcardViewer cards={DEMO_FLASHCARDS} />}
      </div>
    </section>
  );
}

const PRODUCTS = [
  { name: "SPI Flashcards", price: "$29", desc: "2,400 cards · SM-2 spaced repetition", tag: "200 expert-written" },
  { name: "Exam Simulator", price: "$49", desc: "170 questions · ARDMS weighted", tag: "Full-length practice" },
  { name: "Physics Pearls", price: "$9", desc: "50 concepts · high-yield physics", tag: "Essential principles" },
  { name: "Study Notes", price: "$39", desc: "159 pages · diagram-rich", tag: "Complete reference" },
  { name: "Premium Bundle", price: "$99", desc: "Save $27 · Everything included", tag: "Best value", featured: true },
];

function ProductsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="display-eyebrow">CHOOSE YOUR TOOLS</span>
          <h2 className="display-headline text-4xl sm:text-5xl mt-2">Everything you need to pass</h2>
          <p className="display-body max-w-xl mx-auto mt-4">Individual tools or the complete bundle — pick what works for your study style.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 stagger-group">
          {PRODUCTS.map((product, i) => (
            <div key={product.name} className={`depth-border corner-arch p-5 transition-all hover:border-[#ff6b4a] ${product.featured ? "bg-white/[0.02] border-l-[3px] border-l-[#ff6b4a]" : ""}`} style={{ animation: visible ? "stagger-rise 0.4s forwards" : "none", animationDelay: `${i * 0.07}s`, opacity: 0 }}>
              {product.featured && <div className="absolute top-0 left-0 bg-[#ff6b4a] px-2 py-0.5 text-[9px] font-mono tracking-wider text-black">BEST VALUE</div>}
              <div className="pt-6">
                <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">{product.tag}</div>
                <h3 className="text-base font-bold tracking-tight text-white mb-1">{product.name}</h3>
                <div className="text-2xl font-bold text-[#ff6b4a] mb-2">{product.price}<span className="text-[9px] font-normal text-white/30 ml-1">/ 90d</span></div>
                <div className="text-white/30 text-[10px] mb-4">{product.desc}</div>
                <Link href="/products" className="text-[10px] font-mono tracking-wider text-white/50 hover:text-[#ff6b4a] transition-colors">GET STARTED →</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-white/30 text-[10px] font-mono tracking-wider">Save $27 with the Premium Bundle · All products include 90-day access</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div><div className="text-white font-bold tracking-tighter mb-2">SonoPrep</div><div className="text-white/30 text-sm">Built by sonographers, for sonographers.</div></div>
          <div className="flex gap-12">
            <div><div className="text-white/40 text-[10px] font-mono tracking-wider mb-3">PRODUCT</div><div className="space-y-2"><Link href="/products" className="block text-white/50 hover:text-white text-xs">Pricing</Link><Link href="/demo" className="block text-white/50 hover:text-white text-xs">Demo</Link></div></div>
            <div><div className="text-white/40 text-[10px] font-mono tracking-wider mb-3">RESOURCES</div><div className="space-y-2"><Link href="/blog" className="block text-white/50 hover:text-white text-xs">Blog</Link><Link href="/faq" className="block text-white/50 hover:text-white text-xs">FAQ</Link></div></div>
            <div><div className="text-white/40 text-[10px] font-mono tracking-wider mb-3">LEGAL</div><div className="space-y-2"><Link href="/privacy" className="block text-white/50 hover:text-white text-xs">Privacy</Link><Link href="/terms" className="block text-white/50 hover:text-white text-xs">Terms</Link></div></div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 text-center text-white/20 text-[10px] font-mono">SonoPrep is not affiliated with ARDMS. SPI is a registered trademark of ARDMS.</div>
      </div>
    </footer>
  );
}

export function HomePageClient() {
  return (
    <div className="min-h-screen observatory-base">
      <Header />
      <main>
        <Hero />
        <DemoSection />
        <ProductsSection />
        <Footer />
      </main>
    </div>
  );
}
