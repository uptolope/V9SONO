#!/bin/bash

# Create all necessary directories
mkdir -p src/app/\(app\)/dashboard
mkdir -p src/components/layout
mkdir -p src/components/app

# File 1: globals.css
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --observatory-base: #03050a;
  --observatory-accent-primary: #ff6b4a;
}

.observatory-base {
  background: var(--observatory-base);
  position: relative;
}

.observatory-base::before {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at 50% 30%, rgba(255,107,74,0.08) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.arch-grid {
  position: fixed;
  inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
  z-index: 0;
  mask-image: radial-gradient(ellipse at 50% 40%, black 40%, transparent 80%);
}

.depth-border {
  position: relative;
  border: 1px solid rgba(255,255,255,0.04);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 0.5px rgba(255,255,255,0.05);
}

.depth-border:hover {
  border-color: var(--observatory-accent-primary);
  box-shadow: inset 0 1px 0 rgba(255,107,74,0.1), 0 0 20px rgba(255,107,74,0.1);
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

@import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

.display-headline {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 40%, #ff6b4a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.display-eyebrow {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ff6b4a;
}

.display-body {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255,255,255,0.65);
}

@keyframes stagger-rise {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes scan-beam {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.stagger-group > *:nth-child(1) { animation-delay: 0s; }
.stagger-group > *:nth-child(2) { animation-delay: 0.08s; }
.stagger-group > *:nth-child(3) { animation-delay: 0.16s; }
.stagger-group > *:nth-child(4) { animation-delay: 0.24s; }
.stagger-group > *:nth-child(5) { animation-delay: 0.32s; }

.scan-animate {
  position: relative;
  overflow: hidden;
}

.scan-animate::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,107,74,0.1), transparent);
  transform: translateX(-100%);
  animation: scan-beam 3s ease-in-out infinite;
  pointer-events: none;
}

.nav-link {
  position: relative;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255,255,255,0.6);
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #ff6b4a;
  transition: width 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.nav-link:hover {
  color: white;
}

.nav-link:hover::after {
  width: 100%;
}

.btn-industrial {
  position: relative;
  padding: 0.75rem 1.75rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  background: transparent;
  border: 1px solid rgba(255,107,74,0.5);
  color: white;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  overflow: hidden;
}

.btn-industrial::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #ff6b4a;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  z-index: -1;
}

.btn-industrial:hover {
  border-color: transparent;
  transform: translateY(-2px);
}

.btn-industrial:hover::before {
  transform: scaleX(1);
}

.btn-industrial-outline {
  padding: 0.75rem 1.75rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.8);
  transition: all 0.3s ease;
}

.btn-industrial-outline:hover {
  border-color: rgba(255,255,255,0.3);
  color: white;
  transform: translateY(-1px);
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #03050a; }
::-webkit-scrollbar-thumb { background: #ff6b4a; }
::selection { background: #ff6b4a; color: black; }
EOF

# File 2: header.tsx
cat > src/components/layout/header.tsx << 'EOF'
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/demo", label: "Demo" },
    { href: "/products", label: "Pricing" },
    { href: "/blog", label: "Writing" },
    { href: "/about", label: "Studio" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-[#03050a]/80 border-b border-white/5" : "bg-transparent"
      }`}>
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="group relative">
            <span className="text-xl font-bold tracking-tighter text-white">
              Sono<span className="text-[#ff6b4a]">Prep</span>
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ff6b4a] group-hover:w-full transition-all duration-300" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? "text-white after:w-full" : ""}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <>
                <Link href="/dashboard" className="nav-link text-sm">Dashboard</Link>
                <button onClick={() => signOut()} className="nav-link text-sm">Exit</button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="nav-link text-sm">Sign in</Link>
                <Link href="/products" className="btn-industrial">Start →</Link>
              </>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 flex items-center justify-center border border-white/10">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#03050a] pt-24 px-6">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-2xl font-light tracking-tight text-white/70 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="pt-8 flex flex-col gap-4">
              {!session && (
                <>
                  <Link href="/auth/signin" className="text-white/70">Sign in</Link>
                  <Link href="/products" className="btn-industrial text-center">Start →</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
EOF

# File 3: exam-simulator.tsx
cat > src/components/app/exam-simulator.tsx << 'EOF'
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

export function ExamSimulator({ questions }: { questions: Question[] }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentQ = questions[current];
  const selected = answers[current];
  const isAnswered = selected !== undefined;

  const handleSelect = (optionIndex: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [current]: optionIndex });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setSubmitted(true);
    }
  };

  const score = submitted ? Object.entries(answers).filter(([i, a]) => a === questions[parseInt(i)].correct).length : 0;

  if (submitted) {
    return (
      <div className="depth-border p-8">
        <div className="text-center">
          <div className="text-6xl font-bold text-white mb-4">{score}/{questions.length}</div>
          <div className="text-white/50 text-sm mb-8">correct</div>
          <button onClick={() => { setCurrent(0); setAnswers({}); setSubmitted(false); }} className="btn-industrial">
            Restart →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="depth-border">
      <div className="p-6 border-b border-white/5">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono tracking-wider text-white/30">Q{current + 1}/{questions.length}</span>
          <div className="w-24 h-px bg-white/10" />
        </div>
      </div>
      <div className="p-8">
        <p className="text-white text-lg leading-relaxed mb-8">{currentQ.text}</p>
        <div className="space-y-3 mb-12">
          {currentQ.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleSelect(idx)} className={cn(
              "w-full text-left p-4 border transition-all duration-200",
              selected === idx ? "border-[#ff6b4a] bg-[#ff6b4a]/5 text-white" : "border-white/10 hover:border-white/30 text-white/70 hover:text-white"
            )}>
              <span className="font-mono text-xs tracking-wider mr-3 opacity-50">{String.fromCharCode(65 + idx)}</span>
              {opt}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          {isAnswered && <div className="text-sm text-white/40">{selected === currentQ.correct ? "✓ Correct" : "✗ Review explanation"}</div>}
          <button onClick={handleNext} disabled={!isAnswered} className={cn("btn-industrial ml-auto", !isAnswered && "opacity-30 cursor-not-allowed")}>
            {current === questions.length - 1 ? "Submit →" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
EOF

# File 4: flashcard-viewer.tsx
cat > src/components/app/flashcard-viewer.tsx << 'EOF'
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function FlashcardViewer({ cards }: { cards: any[] }) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="depth-border">
      <div className="p-6 border-b border-white/5">
        <div className="flex justify-between text-xs font-mono tracking-wider text-white/30">
          <span>card {current + 1}</span>
          <span>{cards.length} total</span>
        </div>
      </div>
      <div className="p-8 min-h-[300px] flex items-center justify-center">
        <button onClick={() => setFlipped(!flipped)} className="w-full text-center group">
          <div className="transition-all duration-300">
            <p className={cn("text-white text-xl leading-relaxed transition-all", flipped ? "opacity-30" : "opacity-100")}>
              {cards[current].front}
            </p>
            <p className={cn("text-[#ff6b4a] text-lg leading-relaxed mt-4 transition-all", flipped ? "opacity-100" : "opacity-0")}>
              {flipped ? cards[current].back : "↻ click to reveal"}
            </p>
          </div>
        </button>
      </div>
      <div className="p-6 border-t border-white/5 flex justify-between gap-3">
        <button onClick={() => { setFlipped(false); setCurrent((current - 1 + cards.length) % cards.length); }} className="btn-industrial-outline flex-1">
          ← Previous
        </button>
        <button onClick={() => { setFlipped(false); setCurrent((current + 1) % cards.length); }} className="btn-industrial flex-1">
          Next →
        </button>
      </div>
    </div>
  );
}
EOF

# File 5: dashboard/page.tsx
cat > src/app/\(app\)/dashboard/page.tsx << 'EOF'
"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div className="flex items-center justify-center min-h-screen"><div className="animate-pulse text-white/30">loading...</div></div>;
  if (!session) redirect("/auth/signin");

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="display-eyebrow">session active</span>
          <h1 className="display-headline text-4xl sm:text-5xl mt-2">{session.user?.name?.split(" ")[0] || "Sonographer"}</h1>
          <div className="w-12 h-px bg-[#ff6b4a] mt-4" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="depth-border p-6"><div className="text-white/40 text-xs font-mono tracking-wider mb-2">Flashcards reviewed</div><div className="text-3xl font-bold text-white mb-1">847</div><div className="text-[#ff6b4a] text-sm">+12%</div></div>
          <div className="depth-border p-6"><div className="text-white/40 text-xs font-mono tracking-wider mb-2">Exam attempts</div><div className="text-3xl font-bold text-white mb-1">4</div><div className="text-[#ff6b4a] text-sm">+2</div></div>
          <div className="depth-border p-6"><div className="text-white/40 text-xs font-mono tracking-wider mb-2">Best score</div><div className="text-3xl font-bold text-white mb-1">82%</div><div className="text-[#ff6b4a] text-sm">+5%</div></div>
          <div className="depth-border p-6"><div className="text-white/40 text-xs font-mono tracking-wider mb-2">Study streak</div><div className="text-3xl font-bold text-white mb-1">7 days</div><div className="text-[#ff6b4a] text-sm">🔥</div></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/flashcards" className="depth-border p-6 hover:border-[#ff6b4a] transition-all"><div className="text-2xl mb-2">📇</div><div className="font-bold text-white mb-1">Flashcards</div><div className="text-white/40 text-sm">2,400 cards · spaced repetition</div></Link>
          <Link href="/exam" className="depth-border p-6 hover:border-[#ff6b4a] transition-all"><div className="text-2xl mb-2">🎯</div><div className="font-bold text-white mb-1">Exam Simulator</div><div className="text-white/40 text-sm">170 questions · timed</div></Link>
          <Link href="/notes" className="depth-border p-6 hover:border-[#ff6b4a] transition-all"><div className="text-2xl mb-2">📘</div><div className="font-bold text-white mb-1">Study Notes</div><div className="text-white/40 text-sm">300 pages · annotated</div></Link>
        </div>
      </div>
    </div>
  );
}
EOF

# File 6: page-client.tsx (Main homepage)
cat > src/app/page-client.tsx << 'EOF'
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
EOF

echo "✅ All files created successfully!"
