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
          <p className="display-body text-lg max-w-xl mx-auto">Clinical simulation. Spaced retention. Built by sonographers who passed.</p>
        </div>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Link href="#demo" className="btn-industrial px-8 py-4 text-base">Try the simulator →</Link>
          <Link href="/products" className="btn-industrial-outline px-8 py-4 text-base">View the archive</Link>
        </div>
        <div className={`grid grid-cols-3 gap-8 max-w-md mx-auto transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center"><div className="text-2xl font-bold text-white">2,400+</div><div className="text-[10px] font-mono tracking-wider text-white/40">Flashcards</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-white">94%</div><div className="text-[10px] font-mono tracking-wider text-white/40">Pass rate</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-white">$9</div><div className="text-[10px] font-mono tracking-wider text-white/40">Starting price</div></div>
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
          <span className="display-eyebrow">try before you buy</span>
          <h2 className="display-headline text-3xl sm:text-4xl mt-2">No account. No noise.</h2>
        </div>
        <div className="flex border-b border-white/10 mb-8">
          <button onClick={() => setActiveTab("exam")} className={`px-8 py-3 text-sm font-mono tracking-wider transition-all ${activeTab === "exam" ? "text-[#ff6b4a] border-b border-[#ff6b4a]" : "text-white/40 hover:text-white/60"}`}>Simulator</button>
          <button onClick={() => setActiveTab("flashcards")} className={`px-8 py-3 text-sm font-mono tracking-wider transition-all ${activeTab === "flashcards" ? "text-[#ff6b4a] border-b border-[#ff6b4a]" : "text-white/40 hover:text-white/60"}`}>Flashcards</button>
        </div>
        {activeTab === "exam" ? <ExamSimulator questions={DEMO_QUESTIONS.slice(0, 5)} /> : <FlashcardViewer cards={DEMO_FLASHCARDS} />}
      </div>
    </section>
  );
}

const PRODUCTS = [
  { name: "Flashcards", price: "$29", desc: "2,400 cards · SM-2 spaced repetition" },
  { name: "Simulator", price: "$49", desc: "170 questions · ARDMS weighted" },
  { name: "Pearls", price: "$9", desc: "150 concepts · high-yield physics" },
  { name: "Notes", price: "$39", desc: "300 pages · diagram-rich" },
  { name: "Bundle", price: "$99", desc: "Complete archive · save $27", featured: true },
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
          <span className="display-eyebrow">the archive</span>
          <h2 className="display-headline text-4xl sm:text-5xl mt-2">Five tools. One objective.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 stagger-group">
          {PRODUCTS.map((product, i) => (
            <div key={product.name} className={`depth-border p-6 transition-all hover:border-[#ff6b4a] ${product.featured ? "bg-white/5" : ""}`} style={{ animation: visible ? "stagger-rise 0.4s forwards" : "none", animationDelay: `${i * 0.07}s`, opacity: 0 }}>
              <div className="text-white/40 text-xs font-mono tracking-wider mb-4">{product.desc.split("·")[0].trim()}</div>
              <div className="text-xl font-bold text-white mb-1">{product.name}</div>
              <div className="text-2xl font-bold text-[#ff6b4a] mb-4">{product.price}</div>
              <div className="text-white/30 text-xs mb-6">{product.desc}</div>
              <Link href="/products" className="text-sm text-white/50 hover:text-white transition-colors">Access →</Link>
            </div>
          ))}
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
          <div><div className="text-white font-bold tracking-tighter mb-2">SonoPrep</div><div className="text-white/30 text-sm">Built by sonographers.</div></div>
          <div className="flex gap-12">
            <div><div className="text-white/40 text-xs font-mono tracking-wider mb-3">Product</div><div className="space-y-2"><Link href="/products" className="block text-white/50 hover:text-white text-sm">Pricing</Link><Link href="/demo" className="block text-white/50 hover:text-white text-sm">Demo</Link></div></div>
            <div><div className="text-white/40 text-xs font-mono tracking-wider mb-3">Legal</div><div className="space-y-2"><Link href="/privacy" className="block text-white/50 hover:text-white text-sm">Privacy</Link><Link href="/terms" className="block text-white/50 hover:text-white text-sm">Terms</Link></div></div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 text-center text-white/20 text-xs">SonoPrep is not affiliated with ARDMS.</div>
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
