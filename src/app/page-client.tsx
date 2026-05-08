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
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden page-emerge">
      <div className="sono-atmosphere" />
      <div className="sono-scan" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className={`text-center mb-8 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="meta tracking-[0.2em]">ARDMS SPI EXAM PREP</span>
        </div>
        <div className={`text-center mb-8 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="display-display text-7xl sm:text-8xl md:text-9xl leading-[1.05]">Pass the<br /><span className="text-[#c85b3a]">SPI Exam.</span></h1>
        </div>
        <div className={`text-center mb-12 transition-all duration-1000 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="body-readable text-lg max-w-xl mx-auto text-[#b8b0a4]">The most effective SPI prep platform. Built by sonographers who passed.</p>
        </div>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Link href="#demo" className="tactile-button px-8 py-4 bg-[#c85b3a] text-white hover:bg-[#a8452a] transition-all duration-300">Try Free Demo →</Link>
          <Link href="/products" className="tactile-button px-8 py-4 border border-[#c85b3a]/50 text-[#f0ebe4] hover:bg-[#c85b3a]/10 transition-all duration-300">View Products</Link>
        </div>
        <div className={`grid grid-cols-3 gap-8 max-w-md mx-auto transition-all duration-1000 delay-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center"><div className="display-serif text-3xl font-bold text-white">200+</div><div className="meta text-[10px] mt-1">Flashcards</div></div>
          <div className="text-center"><div className="display-serif text-3xl font-bold text-white">94%</div><div className="meta text-[10px] mt-1">Pass Rate</div></div>
          <div className="text-center"><div className="display-serif text-3xl font-bold text-white">$9</div><div className="meta text-[10px] mt-1">Starting Price</div></div>
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  const [activeTab, setActiveTab] = useState<"exam" | "flashcards">("exam");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="demo" ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="meta">TRY BEFORE YOU BUY</span>
          <h2 className="display-serif text-4xl sm:text-5xl mt-4 font-semibold tracking-tight">Experience the difference</h2>
          <p className="body-readable text-[#b8b0a4] mt-4">Test our exam simulator and flashcards free. No account required.</p>
        </div>
        <div className={`flex border-b border-[#f0ebe4]/10 mb-8 transition-all duration-1000 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
          <button onClick={() => setActiveTab("exam")} className={`px-8 py-3 meta transition-all ${activeTab === "exam" ? "text-[#c85b3a] border-b border-[#c85b3a]" : "text-[#6b6359] hover:text-[#b8b0a4]"}`}>Exam Simulator</button>
          <button onClick={() => setActiveTab("flashcards")} className={`px-8 py-3 meta transition-all ${activeTab === "flashcards" ? "text-[#c85b3a] border-b border-[#c85b3a]" : "text-[#6b6359] hover:text-[#b8b0a4]"}`}>Flashcards</button>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${visible ? "opacity-100" : "opacity-0"}`}>
          {activeTab === "exam" ? <ExamSimulator questions={DEMO_QUESTIONS.slice(0, 5)} /> : <FlashcardViewer cards={DEMO_FLASHCARDS} />}
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  { name: "SPI Flashcards", price: "$29", desc: "200+ cards · SM-2 spaced repetition", tag: "Master key concepts" },
  { name: "Exam Simulator", price: "$49", desc: "170 questions · ARDMS weighted", tag: "Realistic practice", featured: true },
  { name: "Physics Pearls", price: "$9", desc: "50 pearls · High-yield physics", tag: "Quick mastery" },
  { name: "Study Notes", price: "$39", desc: "159 pages · Complete reference", tag: "Deep dive" },
  { name: "Premium Bundle", price: "$99", desc: "Save $27 · Everything included", tag: "Best value", bundle: true },
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
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="meta">CHOOSE YOUR PATH</span>
          <h2 className="display-serif text-4xl sm:text-5xl mt-4 font-semibold tracking-tight">Study your way</h2>
          <p className="body-readable text-[#b8b0a4] max-w-xl mx-auto mt-4">Pick individual tools or get the complete bundle. Either way, you pass.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {PRODUCTS.map((product, i) => (
            <div key={product.name} className={`depth-border corner-arch p-5 tactile-card transition-all hover:border-[#c85b3a]/40 ${product.featured ? "border-l-[3px] border-l-[#c85b3a]" : ""} ${product.bundle ? "bg-[#c85b3a]/5" : ""}`} style={{ transitionDelay: visible ? `${i * 50}ms` : "0ms", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}>
              {product.bundle && <div className="absolute top-0 left-0 bg-[#c85b3a] px-2 py-0.5 text-[9px] meta text-white">BEST VALUE</div>}
              {product.featured && !product.bundle && <div className="absolute top-0 left-0 bg-[#c85b3a]/80 px-2 py-0.5 text-[9px] meta text-white">POPULAR</div>}
              <div className="pt-6">
                <div className="text-[#6b6359] text-[10px] meta mb-2">{product.tag}</div>
                <h3 className="display-serif text-base font-semibold text-[#f0ebe4] mb-1">{product.name}</h3>
                <div className="text-2xl font-semibold text-[#c85b3a] mb-2">{product.price}<span className="text-[9px] text-[#6b6359] ml-1">/ 90d</span></div>
                <div className="body-small text-[#6b6359] text-[10px] mb-4">{product.desc}</div>
                <Link href="/products" className="meta text-[10px] text-[#6b6359] hover:text-[#c85b3a] transition-colors">GET STARTED →</Link>
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-8 text-center transition-all duration-1000 delay-400 ${visible ? "opacity-100" : "opacity-0"}`}>
          <p className="meta text-[10px] text-[#6b6359]">Bundle saves you $27 · All products include 90-day access</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#f0ebe4]/5 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="display-serif text-xl font-semibold text-[#f0ebe4] mb-2">SonoPrep</div>
            <div className="body-small text-[#6b6359]">Built by sonographers, for sonographers.</div>
          </div>
          <div className="flex gap-12">
            <div>
              <div className="meta text-[10px] mb-3 text-[#6b6359]">PRODUCT</div>
              <div className="space-y-2">
                <Link href="/products" className="body-small text-[#6b6359] hover:text-[#f0ebe4] text-xs block">Pricing</Link>
                <Link href="/demo" className="body-small text-[#6b6359] hover:text-[#f0ebe4] text-xs block">Demo</Link>
              </div>
            </div>
            <div>
              <div className="meta text-[10px] mb-3 text-[#6b6359]">RESOURCES</div>
              <div className="space-y-2">
                <Link href="/blog" className="body-small text-[#6b6359] hover:text-[#f0ebe4] text-xs block">Journal</Link>
                <Link href="/faq" className="body-small text-[#6b6359] hover:text-[#f0ebe4] text-xs block">FAQ</Link>
              </div>
            </div>
            <div>
              <div className="meta text-[10px] mb-3 text-[#6b6359]">LEGAL</div>
              <div className="space-y-2">
                <Link href="/privacy" className="body-small text-[#6b6359] hover:text-[#f0ebe4] text-xs block">Privacy</Link>
                <Link href="/terms" className="body-small text-[#6b6359] hover:text-[#f0ebe4] text-xs block">Terms</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-[#f0ebe4]/5 text-center meta text-[10px] text-[#4a453f]">
          SonoPrep is not affiliated with ARDMS. SPI is a registered trademark of ARDMS.
        </div>
      </div>
    </footer>
  );
}

export function HomePageClient() {
  return (
    <div className="min-h-screen bg-[#0a0c10]">
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
