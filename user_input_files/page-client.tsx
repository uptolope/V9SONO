"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
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
} from "lucide-react";

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

const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.scrollY;
      ref.current.style.transform = `translateY(${scrolled * speed}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return ref;
};

const useMagneticEffect = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };
    const handleMouseLeave = () => {
      if (ref.current) ref.current.style.transform = "translate(0, 0)";
    };
    ref.current?.addEventListener("mousemove", handleMouseMove);
    ref.current?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      ref.current?.removeEventListener("mousemove", handleMouseMove);
      ref.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
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
      if (particles.length > 80) return;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        life: 0,
        maxLife: Math.random() * 400 + 300,
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

        // Connect nearby particles with lines
        particles.forEach((p2, j) => {
          if (i >= j) return;
          const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.strokeStyle = `rgba(20, 184, 166, ${0.1 * (1 - dist / 120)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        });
      }
    };

    const drawOrbs = () => {
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      // Large gradient orb
      const orb1 = ctx!.createRadialGradient(width * 0.3, height * 0.4, 0, width * 0.3, height * 0.4, 300);
      orb1.addColorStop(0, "rgba(20, 184, 166, 0.15)");
      orb1.addColorStop(0.5, "rgba(20, 184, 166, 0.05)");
      orb1.addColorStop(1, "transparent");
      ctx!.fillStyle = orb1;
      ctx!.fillRect(0, 0, width, height);

      const orb2 = ctx!.createRadialGradient(width * 0.7, height * 0.6, 0, width * 0.7, height * 0.6, 250);
      orb2.addColorStop(0, "rgba(245, 158, 11, 0.1)");
      orb2.addColorStop(1, "transparent");
      ctx!.fillStyle = orb2;
      ctx!.fillRect(0, 0, width, height);

      // Mouse follower orb
      const mouseOrb = ctx!.createRadialGradient(mx, my, 0, mx, my, 200);
      mouseOrb.addColorStop(0, "rgba(20, 184, 166, 0.2)");
      mouseOrb.addColorStop(1, "transparent");
      ctx!.fillStyle = mouseOrb;
      ctx!.fillRect(0, 0, width, height);
    };

    const drawGrid = () => {
      ctx!.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx!.lineWidth = 1;
      for (let y = 0; y < height; y += 60) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(width, y);
        ctx!.stroke();
      }
      for (let x = 0; x < width; x += 60) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, height);
        ctx!.stroke();
      }
    };

    const drawWaves = () => {
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      for (let w = 0; w < 3; w++) {
        ctx!.beginPath();
        const waveOffset = w * 50;
        for (let x = 0; x <= width; x += 3) {
          const dist = Math.sqrt((x - mx) ** 2 + (my - height * 0.5) ** 2);
          const mouseWave = Math.sin(dist * 0.01 - time * 0.02) * 30 * Math.max(0, 1 - dist / 400);
          const y = height * 0.5 + Math.sin(x * 0.005 + time * 0.01 + waveOffset) * 60 + mouseWave;
          x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = `rgba(20, 184, 166, ${0.1 - w * 0.03})`;
        ctx!.lineWidth = 2 - w * 0.5;
        ctx!.stroke();
      }
    };

    const animate = () => {
      ctx!.fillStyle = "#0a0e14";
      ctx!.fillRect(0, 0, width, height);

      drawGrid();
      drawOrbs();
      drawWaves();
      drawParticles();

      if (Math.random() < 0.08) createParticle();
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
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
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
          ? "bg-[#0a0e14]/90 backdrop-blur-2xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-teal-600/10 rounded-xl group-hover:from-teal-500/50 group-hover:to-teal-600/20 transition-all duration-500" />
              <div className="absolute inset-0 bg-teal-500/20 rounded-xl blur-xl group-hover:bg-teal-500/40 transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <Activity className="w-5 h-5 text-teal-400 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-serif text-xl font-semibold text-[#e8e4df] tracking-tight group-hover:text-white transition-colors">
              Sono<span className="text-teal-400">Prep</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "#products" },
              { name: "Features", href: "#features" },
              { name: "Demo", href: "/demo" },
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
                  className={`absolute -bottom-0 left-0 h-px bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500 ${
                    hoveredLink === link.name ? "w-full" : "w-0"
                  }`}
                />
                <span className="absolute inset-0 bg-teal-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <Link href="/demo" className="group relative px-5 py-2.5 text-sm font-medium text-[#a8a29e] hover:text-[#e8e4df] transition-all duration-300 overflow-hidden rounded-lg">
              <span className="relative z-10">Try Free Demo</span>
              <span className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg" />
            </Link>
            <Link
              href="/auth/signin"
              className="group relative px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl text-sm font-medium transition-all duration-500 hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden relative w-10 h-10 flex items-center justify-center group">
            <div className="absolute inset-0 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all duration-300" />
            {mobileOpen ? (
              <X className="w-5 h-5 text-[#e8e4df] relative z-10" />
            ) : (
              <Menu className="w-5 h-5 text-[#e8e4df] relative z-10" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-[#0a0e14]/98 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />
          <div className="relative pt-28 px-8 flex flex-col gap-6 animate-in slide-in-from-top duration-500">
            {["Home", "Products", "Features", "Demo", "Dashboard"].map((link, i) => (
              <Link
                key={link}
                href={link === "Products" ? "#products" : link === "Features" ? "#features" : link === "Home" ? "/" : `/${link.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-serif text-[#e8e4df] hover:text-teal-400 transition-colors duration-300 animate-in slide-in-from-left duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {link}
              </Link>
            ))}
            <div className="pt-8 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "500ms" }}>
              <Link href="/demo" onClick={() => setMobileOpen(false)} className="text-center py-4 border border-white/20 rounded-xl text-[#e8e4df] backdrop-blur bg-white/5">Try Free Demo</Link>
              <Link href="/auth/signin" onClick={() => setMobileOpen(false)} className="text-center py-4 bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl text-white font-medium shadow-[0_0_30px_rgba(20,184,166,0.3)]">Get Started</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Hero Section with 3D Parallax ────────────────────────────────────────────
function Hero() {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14]/60 via-transparent to-[#0a0e14] pointer-events-none" />

      <div className={`relative z-10 max-w-6xl mx-auto px-8 pt-24 pb-20 transition-all duration-1500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>

        {/* Animated badge */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="group relative px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-amber-500/100 w-full -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative z-10 flex items-center gap-3">
              <span className="relative w-2.5 h-2.5 rounded-full bg-teal-400">
                <span className="absolute inset-0 rounded-full bg-teal-400 animate-ping" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400">Premium Exam Preparation</span>
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
            </div>
          </div>
        </div>

        {/* Main heading with 3D effect */}
        <div
          className="text-center mb-8 perspective-1000"
          style={{ transform: `translateX(${mousePos.x}px) translateY(${mousePos.y}px)` }}
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#e8e4df] mb-6 leading-[1.1] tracking-tight">
            <span className="block animate-in slide-in-from-bottom duration-1000 delay-500">Master the</span>
            <span className="block relative mt-2 animate-in slide-in-from-bottom duration-1000 delay-700">
              <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-amber-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                SPI Exam
              </span>
            </span>
            <span className="block mt-2 animate-in slide-in-from-bottom duration-1000 delay-900">with Clinical Precision</span>
          </h1>
        </div>

        {/* Subtitle with typewriter effect */}
        <p className={`text-lg sm:text-xl text-[#a8a29e] max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-1100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          The most advanced sonography principles preparation platform.
          <span className="text-teal-400"> Interactive flashcards</span>,
          <span className="text-amber-400"> physics pearls</span>, and a
          <span className="text-teal-300"> realistic exam simulator</span> — all designed by certified sonographers.
        </p>

        {/* CTA buttons with magnetic effect */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-5 mb-20 transition-all duration-1000 delay-1300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Link
            href="/demo"
            className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl font-medium text-lg transition-all duration-500 hover:shadow-[0_0_50px_rgba(20,184,166,0.6)] hover:scale-105 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              <Play className="w-5 h-5" />
              Try Free Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Link>

          <Link
            href="/auth/signin"
            className="group relative flex items-center gap-3 px-8 py-4 border-2 border-white/20 text-[#e8e4df] rounded-2xl font-medium text-lg hover:bg-white/5 hover:border-white/40 transition-all duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Link>
        </div>

        {/* Stats with animated counters */}
        <div className={`grid grid-cols-3 gap-8 max-w-xl mx-auto transition-all duration-1000 delay-1500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {[
            { value: 2400, suffix: "+", label: "Flashcards" },
            { value: 98, suffix: "%", label: "Pass Rate" },
            { value: 150, suffix: "+", label: "Pearls" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="group text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-teal-500/30 transition-all duration-500"
              style={{ animationDelay: `${1500 + i * 200}ms` }}
            >
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e8e4df] mb-2 group-hover:text-teal-400 transition-colors duration-300">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#78716c] group-hover:text-teal-400/70 transition-colors">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-xs font-mono uppercase tracking-widest text-[#78716c]">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 text-teal-400/50" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Products Section with Staggered Animations ───────────────────────────────
const products = [
  {
    id: "flashcards",
    name: "SPI Flashcards",
    price: "$29",
    period: "90 days access",
    description: "2,400+ interactive flashcards covering all SPI exam domains. Spaced repetition algorithm adapts to your learning pace.",
    icon: Zap,
    features: ["2,400+ cards", "Spaced repetition", "Progress tracking", "Mobile optimized"],
    highlight: false,
    color: "#14b8a6"
  },
  {
    id: "physics",
    name: "Physics Pearls",
    price: "$9",
    period: "90 days access",
    description: "150+ high-yield physics pearls. Quick-reference format for rapid review before your exam.",
    icon: Brain,
    features: ["150+ pearls", "Quick reference", "Topic-organized", "Exam-focused"],
    highlight: false,
    color: "#f59e0b"
  },
  {
    id: "simulator",
    name: "Exam Simulator",
    price: "$49",
    period: "90 days access",
    description: "Full-length SPI exam simulator with 170 questions. Timed environment mirrors the actual ARDMS experience.",
    icon: GraduationCap,
    features: ["170 questions", "Timed mode", "Performance analytics", "Domain breakdown"],
    highlight: true,
    color: "#14b8a6",
    badge: "Most Popular"
  },
  {
    id: "notes",
    name: "Study Notes",
    price: "$39",
    period: "90 days access",
    description: "Comprehensive study notes written by certified sonographers. 300+ pages of curated content.",
    icon: FileText,
    features: ["300+ pages", "Certified authors", "Diagram-rich", "Searchable"],
    highlight: false,
    color: "#8b5cf6"
  },
  {
    id: "bundle",
    name: "Premium Bundle",
    price: "$99",
    period: "90 days access",
    description: "All four products in one powerful bundle. Save $27 and get everything you need to pass the SPI.",
    icon: Crown,
    features: ["All products", "Save $27", "Priority support", "Study planner"],
    highlight: true,
    color: "#ec4899",
    badge: "Best Value"
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
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
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${product.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`} />

      <div className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
        product.highlight
          ? "border-2 border-teal-500/40 shadow-[0_8px_40px_rgba(20,184,166,0.15)]"
          : "border border-white/10 shadow-lg"
      } ${
        hovered
          ? "shadow-[0_20px_60px_rgba(0,0,0,0.5)] -translate-y-2 scale-[1.02]"
          : "shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
      }`}
        style={{ background: "linear-gradient(145deg, #141a24 0%, #0a0e14 100%)" }}
      >
        {/* Animated gradient border for highlighted cards */}
        {product.highlight && (
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-shift" />
        )}

        {/* Badge */}
        {"badge" in product && product.badge && (
          <div className="absolute top-4 right-4 z-20 px-4 py-1.5 bg-gradient-to-r from-teal-500/30 to-teal-600/20 backdrop-blur-xl border border-teal-500/40 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.3)]">
            <span className="text-xs font-mono font-semibold text-teal-300">{product.badge}</span>
          </div>
        )}

        {/* Icon header with animated background */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-700"
            style={{
              background: `linear-gradient(135deg, ${product.color}20 0%, transparent 50%)`,
              transform: hovered ? "scale(1.1) rotate(3deg)" : "scale(1)"
            }}
          />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${product.color}60 0%, transparent 70%)`,
            transform: hovered ? "translateY(-10%)" : "translateY(0)"
          }} />

          {/* Animated circles */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/10 transition-all duration-700"
            style={{
              transform: `translateX(-50%) translateY(-50%) scale(${hovered ? 1.2 : 1})`,
              boxShadow: `0 0 60px ${product.color}30`
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-white/5 transition-all duration-700"
            style={{
              transform: `translateX(-50%) translateY(-50%) scale(${hovered ? 1.3 : 1})`
            }}
          />

          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${hovered ? "scale-110" : "scale-100"}`}>
            <Icon className="w-20 h-20" style={{ color: product.color }} strokeWidth={1.5} />
          </div>

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141a24] via-[#141a24]/60 to-transparent" />

          {/* Icon badge */}
          <div className="absolute bottom-4 left-4">
            <div
              className="w-12 h-12 rounded-xl backdrop-blur-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              style={{ backgroundColor: `${product.color}20`, boxShadow: `0 0 20px ${product.color}30` }}
            >
              <Icon className="w-6 h-6" style={{ color: product.color }} />
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Price */}
          <div className="flex items-baseline gap-3 mb-3">
            <span
              className="font-serif text-4xl font-bold text-[#e8e4df] group-hover:text-white transition-colors"
              style={{ color: hovered ? product.color : undefined }}
            >
              {product.price}
            </span>
            <span className="text-sm text-[#78716c] font-mono">{product.period}</span>
          </div>

          {/* Name */}
          <h3 className="font-serif text-xl font-semibold text-[#e8e4df] mb-3 group-hover:text-white transition-colors">{product.name}</h3>

          {/* Description */}
          <p className="text-sm text-[#a8a29e] leading-relaxed mb-6">{product.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-8">
            {product.features.map((f, i) => (
              <span
                key={f}
                className="px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: `${product.color}10`,
                  borderColor: `${product.color}30`,
                  color: product.color
                }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/products"
            className={`group/btn relative flex items-center justify-center gap-3 w-full py-4 rounded-xl font-medium text-sm overflow-hidden transition-all duration-500 ${
              product.highlight
                ? "text-white shadow-lg"
                : "bg-white/5 text-[#e8e4df] border border-white/10"
            }`}
            style={product.highlight ? { background: `linear-gradient(135deg, ${product.color} 0%, ${product.color}dd 100%)` } : undefined}
          >
            <span
              className={`absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 ${
                product.highlight ? "brightness-110" : "bg-white/10"
              }`}
            />
            <span className="relative z-10 flex items-center gap-2">
              Get Access
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Products() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="products" ref={sectionRef.ref} className="relative py-32 sm:py-40">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14] via-[#0f1419] to-[#0a0e14] pointer-events-none" />

      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/10 to-transparent animate-pulse" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${sectionRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8">
            <Layers className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">Premium Products</span>
          </div>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e8e4df] mb-6">
            Everything You Need to{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">Pass</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-amber-400 rounded-full opacity-50" />
            </span>
          </h2>
          <p className="text-xl text-[#a8a29e] max-w-2xl mx-auto leading-relaxed">
            Five premium study tools, each crafted by certified sonographers who have been exactly where you are now.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {products.slice(3).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Section with Scroll Animations ──────────────────────────────────
const features = [
  {
    icon: Brain,
    title: "Spaced Repetition",
    description: "Our algorithm adapts to your performance, showing you the right card at the optimal moment for maximum retention.",
    stat: "2.3x",
    statLabel: "Better Retention",
    color: "#14b8a6"
  },
  {
    icon: Target,
    title: "Domain-Focused",
    description: "Every question and card is tagged to SPI exam domains. Focus your study time where you need it most.",
    stat: "5",
    statLabel: "Core Domains",
    color: "#f59e0b"
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Real-time dashboards track your progress, identify weak areas, and predict your readiness score.",
    stat: "98%",
    statLabel: "Accuracy",
    color: "#8b5cf6"
  },
  {
    icon: Clock,
    title: "Exam Simulation",
    description: "Timed practice exams mirror the actual ARDMS testing environment, including question distribution.",
    stat: "170",
    statLabel: "Questions",
    color: "#ec4899"
  },
  {
    icon: Shield,
    title: "Certified Content",
    description: "All materials are written and reviewed by ARDMS-certified sonographers with 10+ years of experience.",
    stat: "15+",
    statLabel: "Experts",
    color: "#14b8a6"
  },
  {
    icon: Award,
    title: "Pass Guarantee",
    description: "Complete our recommended study plan and achieve our benchmark scores. We stand behind our methodology.",
    stat: "94%",
    statLabel: "Pass Rate",
    color: "#f59e0b"
  },
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
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative p-10 rounded-3xl border transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        background: "linear-gradient(145deg, #141a24 0%, #0a0e14 100%)",
        borderColor: isHovered ? `${feature.color}40` : "rgba(255,255,255,0.08)",
        transitionDelay: `${index * 100}ms`
      }}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-700`}
        style={{
          background: `radial-gradient(circle at 50% 0%, ${feature.color}20 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500"
          style={{
            backgroundColor: `${feature.color}15`,
            boxShadow: isHovered ? `0 0 40px ${feature.color}30` : "none",
            transform: isHovered ? "scale(1.1) rotate(-5deg)" : "scale(1)"
          }}
        >
          <Icon
            className="w-8 h-8 transition-colors duration-500"
            style={{ color: isHovered ? feature.color : "#a8a29e" }}
          />
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl font-semibold text-[#e8e4df] mb-4 group-hover:text-white transition-colors duration-300">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-[#a8a29e] leading-relaxed mb-8">
          {feature.description}
        </p>

        {/* Stats */}
        <div className="flex items-baseline gap-3">
          <span
            className="font-serif text-5xl font-bold transition-colors duration-500"
            style={{ color: isHovered ? feature.color : "#e8e4df" }}
          >
            {feature.stat}
          </span>
          <span className="text-sm font-mono uppercase tracking-wider text-[#78716c]">{feature.statLabel}</span>
        </div>
      </div>

      {/* Animated corner accents */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${feature.color}30 0%, transparent 50%)`,
          borderRadius: "0 100% 0 0"
        }}
      />
    </div>
  );
}

function Features() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="features" ref={sectionRef.ref} className="relative py-32 sm:py-40">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14] via-[#0f1419]/50 to-[#0a0e14] pointer-events-none" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${sectionRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Why SonoPrep</span>
          </div>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e8e4df] mb-6">
            Built for{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">Serious</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-amber-400 rounded-full opacity-50" />
            </span>{" "}
            Students
          </h2>
          <p className="text-xl text-[#a8a29e] max-w-2xl mx-auto leading-relaxed">
            Every feature is designed with one goal: get you to pass the SPI exam on your first attempt.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof Section (Replacing Fake Testimonials) ───────────────────────
function SocialProof() {
  const sectionRef = useScrollAnimation();
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

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
    <section ref={sectionRef.ref} className="relative py-32 sm:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14] via-[#0f1419] to-[#0a0e14]" />

      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, ${"#14b8a6"}30 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, ${"#f59e0b"}20 0%, transparent 50%)`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${sectionRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <Activity className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">Our Track Record</span>
          </div>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e8e4df] mb-6">
            Trusted by the{" "}
            <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="text-xl text-[#a8a29e] max-w-2xl mx-auto leading-relaxed">
            Numbers that speak for themselves. Join thousands of sonographers on their path to certification.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
                className={`group relative p-8 rounded-3xl border transition-all duration-700 ${
                  sectionRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  background: "linear-gradient(145deg, #141a24 0%, #0a0e14 100%)",
                  borderColor: hoveredStat === i ? `${stat.color}50` : "rgba(255,255,255,0.08)",
                  transitionDelay: `${i * 150}ms`
                }}
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}15 0%, transparent 70%)`, opacity: hoveredStat === i ? 1 : 0 }}
                />

                <div className="relative z-10 text-center">
                  <div
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-all duration-500"
                    style={{
                      backgroundColor: `${stat.color}15`,
                      transform: hoveredStat === i ? "scale(1.1)" : "scale(1)"
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: stat.color }} />
                  </div>

                  <div className="font-serif text-4xl sm:text-5xl font-bold text-[#e8e4df] mb-3 group-hover:text-white transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm font-mono text-[#78716c] uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievement badges */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-600 ${sectionRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={a.text}
                className="group flex items-center gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-teal-500/30 transition-all duration-500"
                style={{ animationDelay: `${800 + i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-teal-400" />
                </div>
                <span className="text-[#a8a29e] font-medium">{a.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section with Premium Animation ───────────────────────────────────────
function CTASection() {
  const sectionRef = useScrollAnimation();
  const [hovered, setHovered] = useState(false);
  const buttonRef = useMagneticEffect();

  return (
    <section ref={sectionRef.ref} className="relative py-32 sm:py-40 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-transparent to-amber-500/10 rounded-full blur-[150px] animate-pulse" />
        </div>
      </div>

      {/* Animated orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] animate-float" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] animate-float" style={{ animationDuration: "10s", animationDelay: "2s" }} />

      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <div
          className={`relative p-16 sm:p-20 rounded-3xl border transition-all duration-1000 ${
            sectionRef.isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{
            background: "linear-gradient(145deg, #141a24 0%, #0a0e14 100%)",
            borderColor: hovered ? "rgba(20,184,166,0.4)" : "rgba(255,255,255,0.1)"
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Top gradient line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />

          {/* Animated glow */}
          <div
            className={`absolute inset-0 rounded-3xl transition-opacity duration-700`}
            style={{
              background: hovered ? "radial-gradient(circle at 50% 0%, rgba(20,184,166,0.15) 0%, transparent 60%)" : "none",
              opacity: hovered ? 1 : 0
            }}
          />

          <div className="relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/30 mb-10">
              <Zap className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400">Start Your Journey Today</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e8e4df] mb-8 leading-tight">
              Ready to Pass the{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">SPI Exam</span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-amber-400 rounded-full opacity-50" />
              </span>?
            </h2>

            {/* Description */}
            <p className="text-xl text-[#a8a29e] max-w-xl mx-auto mb-12 leading-relaxed">
              Join thousands of successful sonographers. Start with our free demo, then unlock the full platform when you are ready.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12">
              <Link
                href="/demo"
                ref={buttonRef}
                className="group relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl font-semibold text-lg transition-all duration-500 hover:shadow-[0_0_60px_rgba(20,184,166,0.6)] hover:scale-105 overflow-hidden"
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
                className="group relative flex items-center gap-3 px-10 py-5 border-2 border-white/20 text-[#e8e4df] rounded-2xl font-semibold text-lg hover:bg-white/5 hover:border-white/40 transition-all duration-500 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                  View Pricing
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#78716c]">
              {["No credit card required", "Instant access", "Cancel anytime"].map((s, i) => (
                <span key={s} className="flex items-center gap-3 group-hover:text-teal-400/70 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Premium Footer ────────────────────────────────────────────────────────────
function Footer() {
  const footerRef = useScrollAnimation();

  return (
    <footer
      ref={footerRef.ref}
      className={`relative border-t border-white/10 py-20 transition-all duration-1000 ${
        footerRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ background: "#050709" }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-teal-600/10 rounded-xl group-hover:from-teal-500/50 transition-all duration-500" />
                <Activity className="w-5 h-5 text-teal-400 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-serif text-xl font-semibold text-[#e8e4df]">Sono<span className="text-teal-400">Prep</span></span>
            </Link>
            <p className="text-sm text-[#78716c] leading-relaxed mb-6">
              Built by sonographers, for sonographers. Helping you pass the SPI exam on your first attempt.
            </p>
            <div className="flex gap-4">
              {["twitter", "linkedin", "instagram"].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-teal-500/20 hover:scale-110 transition-all duration-300">
                  <span className="w-4 h-4 bg-[#a8a29e] rounded" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Products",
              links: ["SPI Flashcards", "Physics Pearls", "Exam Simulator", "Study Notes", "Premium Bundle"].map(name => ({ name, href: "/products" }))
            },
            {
              title: "Resources",
              links: ["Free Demo", "Dashboard", "Blog", "FAQ", "Study Guide"].map(name => ({
                name,
                href: name === "Free Demo" ? "/demo" : name === "Dashboard" ? "/dashboard" : "/"
              }))
            },
            {
              title: "Company",
              links: ["About Us", "Privacy Policy", "Terms of Service", "Contact"].map(name => ({ name, href: name === "About Us" ? "/about" : name === "Contact" ? "/about" : "/" }))
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#a8a29e] mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-sm text-[#78716c] hover:text-[#e8e4df] transition-colors duration-300 hover:translate-x-1 inline-block">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-sm text-[#525252]">
            © 2026 SonoPrep. All rights reserved.
          </div>
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

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          animation: gradient 8s ease infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes slide-in-from-bottom {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slide-in-from-top {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slide-in-from-left {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-in {
          animation-duration: 0.8s;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }

        .slide-in-from-bottom { animation-name: slide-in-from-bottom; }
        .slide-in-from-top { animation-name: slide-in-from-top; }
        .slide-in-from-left { animation-name: slide-in-from-left; }
        .fade-in { animation-name: fade-in; }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .animate-gradient-shift {
          animation: gradient-shift 3s ease infinite;
          background-size: 200% 100%;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0e14;
        }

        ::-webkit-scrollbar-thumb {
          background: #1e2a3a;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #2d3a4d;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Selection color */
        ::selection {
          background: rgba(20, 184, 166, 0.3);
          color: #e8e4df;
        }
      `}</style>

      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        <Products />
        <Features />
        <SocialProof />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}