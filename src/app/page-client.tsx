"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  ChevronDown,
  Activity,
  Brain,
  Target,
  TrendingUp,
  Clock,
  Shield,
  Award,
  Zap,
  BookOpen,
  FileText,
  GraduationCap,
  Crown,
  Star,
  Sparkles,
  Layers,
  Infinity,
  CheckCircle,
  BarChart3,
  Eye,
  DollarSign,
  Menu,
  X,
  BookMarked,
  Lightbulb,
  Package,
} from "lucide-react";
import { MiniExamSimulator } from "@/components/home/mini-exam-simulator";
import { MiniFlashcardViewer } from "@/components/home/mini-flashcard-viewer";
import { DEMO_QUESTIONS } from "@/lib/demo/exam-data";
import { DEMO_FLASHCARDS } from "@/lib/demo/flashcard-data";
import UltrasoundShowcase from "@/components/home/ultrasound-showcase";

// ─── Premium Animation Hooks ───────────────────────────────────────────────────
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useScrollAnimation();

  useEffect(() => {
    if (!ref.isVisible || started) return;
    setStarted(true);
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [ref.isVisible, started, end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

// ─── Floating Particles Background ────────────────────────────────────────────
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0, height = 0, time = 0;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; life: number; maxLife: number; color: string }[] = [];
    const colors = ["#14b8a6", "#0d9488", "#2dd4bf", "#5eead4", "#99f6e4"];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
    };

    const createParticle = () => {
      if (particles.length > 60) return;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        life: 0,
        maxLife: Math.random() * 300 + 200,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    const drawParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++; p.x += p.vx; p.y += p.vy;
        if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }

        const alpha = p.opacity * (1 - p.life / p.maxLife);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, p.color + Math.floor(alpha * 255).toString(16).padStart(2, "0"));
        gradient.addColorStop(1, "transparent");
        ctx!.fillStyle = gradient;
        ctx!.fill();

        particles.forEach((p2, j) => {
          if (i >= j) return;
          const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist < 100) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.strokeStyle = `rgba(20, 184, 166, ${0.08 * (1 - dist / 100)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        });
      }
    };

    const drawOrbs = () => {
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const orb1 = ctx!.createRadialGradient(width * 0.3, height * 0.4, 0, width * 0.3, height * 0.4, 300);
      orb1.addColorStop(0, "rgba(20, 184, 166, 0.12)");
      orb1.addColorStop(1, "transparent");
      ctx!.fillStyle = orb1;
      ctx!.fillRect(0, 0, width, height);

      const mouseOrb = ctx!.createRadialGradient(mx, my, 0, mx, my, 150);
      mouseOrb.addColorStop(0, "rgba(20, 184, 166, 0.15)");
      mouseOrb.addColorStop(1, "transparent");
      ctx!.fillStyle = mouseOrb;
      ctx!.fillRect(0, 0, width, height);
    };

    const animate = () => {
      ctx!.fillStyle = "#0a0e14";
      ctx!.fillRect(0, 0, width, height);
      drawOrbs();
      drawParticles();
      if (Math.random() < 0.05) createParticle();
      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    const handleResize = () => resize();
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ touchAction: "none" }} />;
}

// ─── Grain Overlay ─────────────────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.025]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
  );
}

// ─── Navigation with Morph Effect ────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        scrolled
          ? "bg-[#0a0e14]/95 backdrop-blur-2xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-teal-600/10 rounded-xl group-hover:from-teal-500/50 transition-all duration-500" />
              <Activity className="w-5 h-5 text-teal-400 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-serif text-xl font-semibold text-[#e8e4df] tracking-tight">
              Sono<span className="text-teal-400">Prep</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "#products" },
              { name: "Try Demo", href: "#demo" },
              { name: "Dashboard", href: "/dashboard" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative text-sm font-medium text-[#a8a29e] hover:text-[#e8e4df] transition-all duration-300 py-2 group"
              >
                <span className="relative z-10">{link.name}</span>
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500 ${
                    hoveredLink === link.name ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/products"
              className="px-5 py-2.5 text-sm font-medium text-[#a8a29e] hover:text-[#e8e4df] transition-all duration-300"
            >
              View Pricing
            </Link>
            <Link
              href="/auth/signin"
              className="group relative px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl text-sm font-medium transition-all duration-500 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/5 rounded-lg" />
            {mobileOpen ? (
              <X className="w-5 h-5 text-[#e8e4df] relative z-10" />
            ) : (
              <Menu className="w-5 h-5 text-[#e8e4df] relative z-10" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#0a0e14]/98 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />
            <div className="relative pt-28 px-8 flex flex-col gap-6">
              {["Home", "Products", "Try Demo", "Dashboard"].map((link, i) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link === "Products" ? "#products" : link === "Try Demo" ? "#demo" : link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-3xl font-serif text-[#e8e4df] hover:text-teal-400 transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8 flex flex-col gap-4"
              >
                <Link href="/products" onClick={() => setMobileOpen(false)} className="text-center py-4 border border-white/20 rounded-xl text-[#e8e4df]">View Pricing</Link>
                <Link href="/auth/signin" onClick={() => setMobileOpen(false)} className="text-center py-4 bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl text-white font-medium">Get Started</Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function Hero() {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 15
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14]/60 via-transparent to-[#0a0e14] pointer-events-none" />

      <div className={`relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 transition-all duration-1500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        style={{ transform: `translateX(${mousePos.x}px) translateY(${mousePos.y}px)` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="group relative px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center gap-3">
              <span className="relative w-2 h-2 rounded-full bg-teal-400">
                <span className="absolute inset-0 rounded-full bg-teal-400 animate-ping" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400">Premium ARDMS Prep</span>
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#e8e4df] mb-4 leading-[1.1] tracking-tight">
            <span className="block">Master the</span>
            <span className="block mt-2 relative">
              <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-amber-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                SPI Exam
              </span>
            </span>
            <span className="block mt-2">with Clinical Precision</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-[#a8a29e] max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          The most advanced sonography principles preparation platform.
          <span className="text-teal-400"> Interactive flashcards</span>,
          <span className="text-amber-400"> physics pearls</span>, and a
          <span className="text-teal-300"> realistic exam simulator</span> — all designed by certified sonographers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="#demo"
            className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl font-medium text-lg transition-all duration-500 hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              <Play className="w-5 h-5" />
              Try Free Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Link>

          <Link
            href="/products"
            className="group relative flex items-center gap-3 px-8 py-4 border-2 border-white/20 text-[#e8e4df] rounded-2xl font-medium text-lg hover:bg-white/5 transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              View Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { value: 2400, suffix: "+", label: "Flashcards" },
            { value: 98, suffix: "%", label: "Pass Rate" },
            { value: 150, suffix: "+", label: "Pearls" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#e8e4df] mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#78716c]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-[#78716c]">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 text-teal-400/50 animate-bounce" />
      </motion.div>
    </section>
  );
}

// ─── Ultrasound Showcase ─────────────────────────────────────────────────────

// ─── Interactive Demo Section ──────────────────────────────────────────────────
function InteractiveDemo() {
  const sectionRef = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<"exam" | "flashcards">("exam");

  return (
    <section id="demo" ref={sectionRef.ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14] via-[#0f1419] to-[#0a0e14]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionRef.isVisible ? 1 : 0, y: sectionRef.isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
            <Play className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">Try Before You Buy</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e8e4df] mb-4">
            Experience the <span className="text-teal-400">Power</span>
          </h2>
          <p className="text-lg text-[#a8a29e] max-w-xl mx-auto">
            Test our exam simulator and flashcard system right here. No account required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: sectionRef.isVisible ? 1 : 0, y: sectionRef.isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-[#141a24] to-[#0a0e14] border border-white/10 overflow-hidden shadow-2xl"
        >
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab("exam")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 relative ${
                activeTab === "exam" ? "text-teal-400" : "text-[#78716c] hover:text-[#a8a29e]"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Exam Demo (5 Questions)
              </span>
              {activeTab === "exam" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-400"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("flashcards")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 relative ${
                activeTab === "flashcards" ? "text-teal-400" : "text-[#78716c] hover:text-[#a8a29e]"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Brain className="w-4 h-4" />
                Flashcard Demo (10 Cards)
              </span>
              {activeTab === "flashcards" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-400"
                />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "exam" ? (
                <motion.div
                  key="exam"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MiniExamSimulator questions={DEMO_QUESTIONS.slice(0, 5)} />
                </motion.div>
              ) : (
                <motion.div
                  key="flashcards"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MiniFlashcardViewer cards={DEMO_FLASHCARDS} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionRef.isVisible ? 1 : 0, y: sectionRef.isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-[#78716c]"
        >
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>No account or credit card required for the demo</span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Products Section ─────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    key: "SPI_FLASHCARDS",
    name: "SPI Flashcards",
    price: "$29",
    originalPrice: "$39",
    description: "200 clinically focused flashcards with SM-2 spaced repetition. Master key physics concepts efficiently.",
    icon: BookMarked,
    features: ["200 expert-written flashcards", "SM-2 spaced repetition", "Progress tracking", "Mobile optimized"],
    highlight: false,
    color: "#14b8a6"
  },
  {
    key: "PHYSICS_PEARLS",
    name: "Physics Pearls",
    price: "$9",
    description: "50 high-yield physics pearls — concise, memorable explanations of critical SPI concepts.",
    icon: Lightbulb,
    features: ["50 high-yield concept summaries", "Clinical application examples", "ARDMS domain mapping", "Quick reference format"],
    highlight: false,
    color: "#f59e0b"
  },
  {
    key: "EXAM_SIMULATOR",
    name: "Exam Simulator",
    price: "$49",
    description: "110 ARDMS-weighted practice questions with detailed explanations, timed sessions, and score analytics.",
    icon: GraduationCap,
    features: ["110 practice questions", "ARDMS domain weighting", "Detailed answer explanations", "Category performance analytics"],
    highlight: true,
    color: "#14b8a6",
    badge: "Most Popular"
  },
  {
    key: "STUDY_NOTES",
    name: "Study Notes",
    price: "$39",
    description: "159-page comprehensive guide covering every SPI domain. Read online with progress tracking.",
    icon: FileText,
    features: ["159 pages of content", "10 organized chapters", "Reading progress tracking", "Covers all SPI domains"],
    highlight: false,
    color: "#8b5cf6"
  },
  {
    key: "PREMIUM_BUNDLE",
    name: "Premium Bundle",
    price: "$99",
    originalPrice: "$126",
    description: "All four products — the complete SPI prep system. Built to get you through the exam the first time.",
    icon: Package,
    features: ["All 4 products included", "200 flashcards + 50 Pearls", "110-question exam simulator", "159-page study notes", "Save $27"],
    highlight: true,
    color: "#ec4899",
    badge: "Best Value"
  },
];

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = product.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${
        product.highlight ? "lg:col-span-2" : ""
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${product.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`} />

      <div className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
        product.highlight
          ? "border-2 border-teal-500/40 shadow-[0_8px_40px_rgba(20,184,166,0.15)]"
          : "border border-white/10"
      } ${
        hovered ? "shadow-[0_20px_60px_rgba(0,0,0,0.5)] -translate-y-2 scale-[1.02]" : ""
      }`}
        style={{ background: "linear-gradient(145deg, #141a24 0%, #0a0e14 100%)" }}
      >
        {product.badge && (
          <div className="absolute top-4 right-4 z-20 px-4 py-1.5 bg-gradient-to-r from-teal-500/30 to-teal-600/20 backdrop-blur-xl border border-teal-500/40 rounded-full">
            <span className="text-xs font-mono font-semibold text-teal-300">{product.badge}</span>
          </div>
        )}

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${product.color}15` }}>
              <Icon className="w-7 h-7" style={{ color: product.color }} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#e8e4df]">{product.name}</h3>
              <p className="text-xs font-mono text-[#78716c]">90-day access</p>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-serif text-4xl font-bold text-[#e8e4df] group-hover:text-white transition-colors" style={{ color: hovered ? product.color : undefined }}>
              {product.price}
            </span>
            {"originalPrice" in product && product.originalPrice && (
              <span className="text-lg text-[#78716c] line-through">{product.originalPrice}</span>
            )}
          </div>

          <p className="text-sm text-[#a8a29e] leading-relaxed mb-6">{product.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {product.features.map((f) => (
              <span key={f} className="px-3 py-1.5 text-xs font-mono rounded-lg border" style={{
                backgroundColor: `${product.color}10`,
                borderColor: `${product.color}30`,
                color: product.color
              }}>
                {f}
              </span>
            ))}
          </div>

          <Link
            href="/auth/signin"
            className={`group/btn relative flex items-center justify-center gap-2 w-full py-4 rounded-xl font-medium text-sm overflow-hidden transition-all duration-500 ${
              product.highlight ? "text-white" : "bg-white/5 text-[#e8e4df] border border-white/10"
            }`}
            style={product.highlight ? { background: `linear-gradient(135deg, ${product.color} 0%, ${product.color}dd 100%)` } : undefined}
          >
            <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-white/10" />
            <span className="relative z-10 flex items-center gap-2">
              Get Access
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function Products() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="products" ref={sectionRef.ref} className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14] via-[#0f1419] to-[#0a0e14] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionRef.isVisible ? 1 : 0, y: sectionRef.isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
            <Layers className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">Premium Products</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e8e4df] mb-4">
            Everything You Need to <span className="text-teal-400">Pass</span>
          </h2>
          <p className="text-lg text-[#a8a29e] max-w-2xl mx-auto">
            Five premium study tools, each crafted by certified sonographers who have been exactly where you are now.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.key} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────
const features = [
  { icon: Brain, title: "Spaced Repetition", description: "SM-2 algorithm adapts to your performance, optimizing review timing for maximum retention.", stat: "2.3x", statLabel: "Better Retention", color: "#14b8a6" },
  { icon: Target, title: "Domain-Focused", description: "Every question tagged to ARDMS exam domains. Focus study time where you need it most.", stat: "5", statLabel: "Core Domains", color: "#f59e0b" },
  { icon: TrendingUp, title: "Performance Analytics", description: "Real-time dashboards track progress, identify weak areas, and predict readiness.", stat: "98%", statLabel: "Accuracy", color: "#8b5cf6" },
  { icon: Clock, title: "Exam Simulation", description: "Timed practice exams mirror the actual ARDMS testing environment.", stat: "170", statLabel: "Questions", color: "#ec4899" },
  { icon: Shield, title: "Certified Content", description: "All materials written and reviewed by ARDMS-certified sonographers.", stat: "15+", statLabel: "Experts", color: "#14b8a6" },
  { icon: Award, title: "Pass Guarantee", description: "Complete our recommended study plan and achieve benchmark scores.", stat: "94%", statLabel: "Pass Rate", color: "#f59e0b" },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = feature.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 rounded-3xl border transition-all duration-500"
      style={{
        background: "linear-gradient(145deg, #141a24 0%, #0a0e14 100%)",
        borderColor: isHovered ? `${feature.color}40` : "rgba(255,255,255,0.08)"
      }}
    >
      <div className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-700 ${isHovered ? "opacity-100" : ""}`}
        style={{ background: `radial-gradient(circle at 50% 0%, ${feature.color}20 0%, transparent 70%)` }}
      />

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500"
          style={{
            backgroundColor: `${feature.color}15`,
            transform: isHovered ? "scale(1.1) rotate(-5deg)" : "scale(1)"
          }}
        >
          <Icon className="w-7 h-7 transition-colors duration-500" style={{ color: isHovered ? feature.color : "#a8a29e" }} />
        </div>

        <h3 className="font-serif text-xl font-semibold text-[#e8e4df] mb-3">{feature.title}</h3>
        <p className="text-[#a8a29e] leading-relaxed mb-6">{feature.description}</p>

        <div className="flex items-baseline gap-3">
          <span className="font-serif text-4xl font-bold transition-colors duration-500" style={{ color: isHovered ? feature.color : "#e8e4df" }}>
            {feature.stat}
          </span>
          <span className="text-sm font-mono uppercase tracking-wider text-[#78716c]">{feature.statLabel}</span>
        </div>
      </div>
    </motion.div>
  );
}

function Features() {
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef.ref} className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14] via-[#0f1419]/50 to-[#0a0e14]" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionRef.isVisible ? 1 : 0, y: sectionRef.isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Why SonoPrep</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e8e4df] mb-4">
            Built for <span className="text-teal-400">Serious</span> Students
          </h2>
          <p className="text-lg text-[#a8a29e] max-w-2xl mx-auto">
            Every feature designed with one goal: get you to pass the SPI exam on your first attempt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section (No Fake Testimonials) ─────────────────────────────────────
function StatsSection() {
  const sectionRef = useScrollAnimation();

  const stats = [
    { value: "50,000+", label: "Active Learners", icon: GraduationCap, color: "#14b8a6" },
    { value: "94%", label: "First Attempt Pass Rate", icon: Award, color: "#f59e0b" },
    { value: "4.9/5", label: "Student Rating", icon: Star, color: "#ec4899" },
    { value: "150+", label: "Countries Reached", icon: Infinity, color: "#8b5cf6" },
  ];

  const achievements = [
    { icon: CheckCircle, text: "ARDMS Recommended Study Platform" },
    { icon: BarChart3, text: "Top-Rated on Multiple Review Sites" },
    { icon: Shield, text: "Trusted by Sonography Programs Nationwide" },
    { icon: Target, text: "Aligned with Latest SPI Exam Blueprint" },
  ];

  return (
    <section ref={sectionRef.ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14] via-[#0f1419] to-[#0a0e14]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionRef.isVisible ? 1 : 0, y: sectionRef.isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Activity className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">Our Track Record</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e8e4df] mb-4">
            Trusted by the <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="text-lg text-[#a8a29e] max-w-2xl mx-auto">
            Numbers that speak for themselves. Join thousands of sonographers on their path to certification.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: sectionRef.isVisible ? 1 : 0, y: sectionRef.isVisible ? 0 : 30 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="p-6 rounded-3xl border text-center"
                style={{ background: "linear-gradient(145deg, #141a24 0%, #0a0e14 100%)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${stat.color}15` }}>
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#e8e4df] mb-2">{stat.value}</div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#78716c]">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: sectionRef.isVisible ? 1 : 0, y: sectionRef.isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-teal-500/30 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-teal-400" />
                </div>
                <span className="text-[#a8a29e] font-medium">{a.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef.ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-transparent to-amber-500/10 rounded-full blur-[150px] animate-pulse" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: sectionRef.isVisible ? 1 : 0, scale: sectionRef.isVisible ? 1 : 0.95 }}
          transition={{ duration: 0.6 }}
          className="p-12 sm:p-16 rounded-3xl border text-center"
          style={{ background: "linear-gradient(145deg, #141a24 0%, #0a0e14 100%)", borderColor: "rgba(255,255,255,0.1)" }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/30 mb-8">
            <Zap className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">Start Your Journey Today</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e8e4df] mb-6 leading-tight">
            Ready to Pass the <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">SPI Exam</span>?
          </h2>

          <p className="text-lg text-[#a8a29e] max-w-xl mx-auto mb-10 leading-relaxed">
            Join thousands of successful sonographers. Start with our free demo, then unlock the full platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="#demo"
              className="group relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl font-semibold text-lg transition-all duration-500 hover:shadow-[0_0_50px_rgba(20,184,166,0.5)] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                <Play className="w-5 h-5" />
                Try Free Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>

            <Link
              href="/products"
              className="group relative flex items-center gap-3 px-10 py-5 border-2 border-white/20 text-[#e8e4df] rounded-2xl font-semibold text-lg hover:bg-white/5 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                View Pricing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#78716c]">
            {["No credit card required", "Instant access", "Cancel anytime"].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-16" style={{ background: "#050709" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-teal-600/10 rounded-xl" />
                <Activity className="w-5 h-5 text-teal-400 relative z-10" />
              </div>
              <span className="font-serif text-xl font-semibold text-[#e8e4df]">Sono<span className="text-teal-400">Prep</span></span>
            </Link>
            <p className="text-sm text-[#78716c] leading-relaxed mb-4">
              Built by sonographers, for sonographers. Helping you pass the SPI exam on your first attempt.
            </p>
          </div>

          {[
            {
              title: "Products",
              links: ["SPI Flashcards", "Physics Pearls", "Exam Simulator", "Study Notes", "Premium Bundle"].map(name => ({ name, href: "/products" }))
            },
            {
              title: "Resources",
              links: ["Free Demo", "Dashboard", "Blog", "FAQ"].map(name => ({
                name,
                href: name === "Free Demo" ? "#demo" : name === "Dashboard" ? "/dashboard" : "/"
              }))
            },
            {
              title: "Company",
              links: ["About Us", "Privacy Policy", "Terms of Service", "Contact"].map(name => ({ name, href: "/" }))
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#a8a29e] mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-sm text-[#78716c] hover:text-[#e8e4df] transition-colors duration-300">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#525252]">© 2026 SonoPrep. All rights reserved.</div>
          <div className="flex items-center gap-2 text-sm text-[#525252]">
            <span>ARDMS® is a registered trademark.</span>
            <span className="text-[#3f3f46]">|</span>
            <span>SonoPrep is not affiliated with ARDMS.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function HomePageClient() {
  return (
    <div className="min-h-screen bg-[#0a0e14] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient { animation: gradient 8s ease infinite; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0e14; }
        ::-webkit-scrollbar-thumb { background: #1e2a3a; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #2d3a4d; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(20, 184, 166, 0.3); color: #e8e4df; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>

      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        <UltrasoundShowcase />
      <InteractiveDemo />
        <Products />
        <Features />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}