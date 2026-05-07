"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Shield, Zap, Users, ChevronDown, Sparkles, Layers, Activity, Brain, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";

/* ── Animated number counter ──────────────────────────────────────── */
function CountUp({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: "easeOut" });
    return controls.stop;
  }, [to, duration, count]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (nodeRef.current) nodeRef.current.textContent = v + suffix;
    });
  }, [rounded, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

/* ── Premium Particle System ─────────────────────────────────────────── */
function ParticleSystem() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-teal/60 to-teal-glow/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-20, -200, -400],
            x: [0, 30, -20],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ── Interactive Magnetic Button ─────────────────────────────────────── */
function MagneticButton({ children, href, variant = "primary", className = "" }: { children: React.ReactNode; href: string; variant?: "primary" | "secondary"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { duration: 0.5, ease: "easeOut" });
    animate(y, 0, { duration: 0.5, ease: "easeOut" });
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button size="xl" asChild className={`group btn-glow ${className}`}>
        <Link href={href}>
          {children}
        </Link>
      </Button>
    </motion.div>
  );
}

/* ── 3D Tilt Card Effect ──────────────────────────────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { duration: 0.5 });
    animate(y, 0, { duration: 0.5 });
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── Premium Waveform Animation ─────────────────────────────────────── */
function WaveformAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Glowing background */}
      <div className="absolute -inset-8 bg-gradient-to-r from-teal/10 via-transparent to-cobalt/10 rounded-full blur-3xl animate-pulse" />

      {/* Waveform container */}
      <div className="relative rounded-3xl border border-teal/20 bg-gradient-to-b from-charcoal/95 to-obsidian/95 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/60 p-8">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(20,184,166,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Waveform visualization */}
        <svg viewBox="0 0 800 200" className="w-full h-auto relative z-10">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="50%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
            <filter id="waveGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Animated wave lines */}
          {[1, 2, 3].map((i) => (
            <motion.path
              key={i}
              d={`M0 ${100 + i * 10} Q50 ${80 - i * 20} 100 ${100 + i * 5} T200 ${90 + i * 10} T300 ${100 - i * 5} T400 ${110 + i * 10} T500 ${95 + i * 5} T600 ${105 + i * 10} T700 ${100 - i * 5} T800 ${100 + i * 5}`}
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth={2 + i * 0.5}
              filter="url(#waveGlow)"
              opacity={1 - i * 0.2}
              strokeDasharray="1000"
              initial={{ strokeDashoffset: 1000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3, delay: i * 0.3, ease: "easeOut" }}
            />
          ))}

          {/* Scanning line effect */}
          <motion.line
            x1="0"
            y1="0"
            x2="0"
            y2="200"
            stroke="rgba(20,184,166,0.8)"
            strokeWidth="2"
            filter="url(#waveGlow)"
            animate={{ x1: [0, 800], x2: [0, 800] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Live indicator */}
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/20"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-2 h-2 rounded-full bg-teal-glow" />
          <span className="font-mono text-xs text-teal-glow uppercase tracking-wider">Live Scan</span>
        </motion.div>

        {/* Metrics */}
        <div className="flex justify-around mt-6 pt-4 border-t border-teal/10 relative z-10">
          {[
            { label: "Frequency", value: "5.0 MHz" },
            { label: "Depth", value: "8 cm" },
            { label: "PRF", value: "4 kHz" },
            { label: "Doppler", value: "2.4 kHz" },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="text-center group cursor-default"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-cream-dim/50 group-hover:text-cream-dim/70 transition-colors">
                {metric.label}
              </p>
              <p className="font-mono text-sm font-bold text-teal-glow group-hover:text-teal transition-colors mt-1">
                {metric.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Stagger Animation Variants ─────────────────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Stats ─────────────────────────────────────────────────────────── */
const STATS = [
  { value: 200, suffix: "+", label: "Flashcards" },
  { value: 110, suffix: "", label: "Exam Questions" },
  { value: 50, suffix: "", label: "Physics Pearls" },
  { value: 6, suffix: "", label: "SPI Domains" },
];

/* ── Feature Pills ─────────────────────────────────────────────────── */
const FEATURES = [
  { icon: Brain, text: "Spaced Repetition" },
  { icon: Target, text: "Domain-Focused" },
  { icon: Activity, text: "Real Exam Simulation" },
  { icon: Layers, text: "Certified Content" },
  { icon: Sparkles, text: "Pass Guarantee" },
];

/* ── Main Hero Component ──────────────────────────────────────────── */
export function Hero() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Dynamic Background ── */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-charcoal/80 to-obsidian" />

        {/* Animated radial glows */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(13,148,136,0.15),transparent)]"
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(20,184,166,0.08),transparent)]"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />

        {/* Animated grid */}
        <div className="absolute inset-0 bg-grid opacity-100" />

        {/* Particle system */}
        <ParticleSystem />

        {/* Floating orbs */}
        {[0, 2, 4].map((delay) => (
          <motion.div
            key={delay}
            className="absolute rounded-full blur-3xl"
            style={{
              left: `${20 + delay * 20}%`,
              top: `${10 + delay * 15}%`,
              width: 400 + delay * 100,
              height: 400 + delay * 100,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + delay,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className={`w-full h-full rounded-full ${delay === 0 ? 'bg-teal/[0.03]' : delay === 2 ? 'bg-cobalt/[0.04]' : 'bg-teal/[0.02]'}`} />
          </motion.div>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left column — Text */}
          <motion.div variants={container} initial="hidden" animate="visible" className="text-center lg:text-left">

            {/* Premium badge */}
            <motion.div variants={item}>
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <Badge className="shimmer-badge mb-8 px-6 py-3 text-[0.65rem] tracking-widest uppercase animate-border-glow">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-block mr-2"
                  >
                    ✦
                  </motion.span>
                  ARDMS SPI · RDMS · RDCS · RVT · RMSKS
                </Badge>
              </motion.div>
            </motion.div>

            {/* Headline with premium animation */}
            <motion.h1
              variants={item}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-cream text-shadow-glow"
            >
              Master Sonographic Physics.{" "}
              <motion.span
                className="animate-text-shimmer"
                animate={{
                  backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                Earn Your ARDMS Credential.
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={item}
              className="mt-8 text-lg sm:text-xl leading-relaxed text-cream-dim max-w-xl"
            >
              The SPI exam is required for every ARDMS credential — RDMS, RDCS, RVT, and RMSKS.
              SonoPrep gives you clinically focused flashcards, a realistic exam simulator, and
              spaced-repetition learning built by practicing sonographers.
            </motion.p>

            {/* Feature pills */}
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              {FEATURES.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(20,184,166,0.4)", color: "#14b8a6" }}
                  className="feature-tag cursor-default"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {text}
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-12 flex flex-col gap-5 sm:flex-row sm:justify-center lg:justify-start"
            >
              <MagneticButton href="/products" variant="primary">
                <span>Get Started — From $9</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </MagneticButton>
              <MagneticButton href="/demo" variant="secondary">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="mr-2 h-4 w-4" />
                </motion.div>
                <span>Try Free Demo</span>
              </MagneticButton>
            </motion.div>

            {/* Trust line */}
            <motion.p variants={item} className="mt-6 font-mono text-xs text-cream-dim/40">
              No subscription · 90-day access · No credit card for demo
            </motion.p>
          </motion.div>

          {/* Right column — Waveform Animation */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <TiltCard className="hover:shadow-2xl hover:shadow-teal/20">
              <WaveformAnimation />
            </TiltCard>
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <div ref={ref} className="mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal/[0.03] to-transparent animate-shimmer-sweep" />
          <div className="sep-line mb-12" />

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.12, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="stat-card text-center group cursor-default"
              >
                <div className="relative">
                  <p className="number-highlight text-4xl lg:text-5xl font-bold text-teal-glow group-hover:text-teal transition-colors">
                    {inView ? <CountUp to={s.value} suffix={s.suffix} /> : `0${s.suffix}`}
                  </p>
                  <motion.div
                    className="absolute -inset-4 rounded-lg bg-teal/[0.08] opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                </div>
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-cream-dim/60 group-hover:text-cream-dim/80 transition-colors">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="relative cursor-pointer"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-16 w-9 rounded-full border-2 border-teal/40 flex justify-center pt-3 bg-obsidian/30 backdrop-blur-sm">
              <motion.div
                className="h-4 w-1.5 rounded-full bg-gradient-to-b from-teal to-teal-glow"
                animate={{ y: [0, 24, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.55rem] uppercase tracking-widest text-teal/50"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to explore
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}