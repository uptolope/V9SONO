"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, Play, Shield, Zap, Users } from "lucide-react";
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

/* ── SPI Waveform Monitor (from hero preview) ─────────────────────── */
function WaveformMonitor() {
  return (
    <div className="relative">
      {/* Ambient glow behind the card */}
      <div className="absolute -inset-6 rounded-3xl bg-teal/[0.04] blur-3xl" />
      <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-teal/[0.06] via-transparent to-cobalt/[0.04] blur-xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        className="relative rounded-xl border border-border bg-charcoal/95 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/50"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-obsidian/60">
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-teal-glow">
            SPI Waveform Monitor
          </span>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-teal-glow"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="font-mono text-[0.55rem] tracking-[0.1em] text-teal-glow">
              LIVE
            </span>
          </div>
        </div>

        {/* Waveform SVG */}
        <div className="px-4 py-3">
          <svg
            viewBox="0 0 560 160"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroWaveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
              <clipPath id="heroClip">
                <rect width="560" height="160" />
              </clipPath>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="40" x2="560" y2="40" stroke="rgba(232,228,223,0.05)" strokeWidth="1" />
            <line x1="0" y1="80" x2="560" y2="80" stroke="rgba(232,228,223,0.08)" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="0" y1="120" x2="560" y2="120" stroke="rgba(232,228,223,0.05)" strokeWidth="1" />
            <line x1="140" y1="0" x2="140" y2="160" stroke="rgba(232,228,223,0.04)" strokeWidth="1" />
            <line x1="280" y1="0" x2="280" y2="160" stroke="rgba(232,228,223,0.04)" strokeWidth="1" />
            <line x1="420" y1="0" x2="420" y2="160" stroke="rgba(232,228,223,0.04)" strokeWidth="1" />

            {/* Center baseline */}
            <line x1="0" y1="80" x2="560" y2="80" stroke="rgba(20,184,166,0.15)" strokeWidth="1" />

            {/* Scrolling wave group */}
            <g clipPath="url(#heroClip)">
              <g className="animate-wave-scroll">
                {/* Gradient fill under the wave */}
                <path
                  d="M0 80 C20 80 30 20 70 20 S110 80 140 80 S190 140 230 140 S270 80 280 80 S310 20 350 20 S390 80 420 80 S450 140 490 140 S530 80 560 80 C580 80 590 20 630 20 S670 80 700 80 S730 140 770 140 S810 80 840 80 S870 20 910 20 S950 80 980 80 S1010 140 1050 140 S1090 80 1120 80 L1120 160 L0 160 Z"
                  fill="url(#heroWaveGrad)"
                  opacity="0.5"
                />
                {/* Main wave line */}
                <motion.path
                  d="M0 80 C20 80 30 20 70 20 S110 80 140 80 S190 140 230 140 S270 80 280 80 S310 20 350 20 S390 80 420 80 S450 140 490 140 S530 80 560 80 C580 80 590 20 630 20 S670 80 700 80 S730 140 770 140 S810 80 840 80 S870 20 910 20 S950 80 980 80 S1010 140 1050 140 S1090 80 1120 80"
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2000"
                  initial={{ strokeDashoffset: 2000 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ delay: 0.8, duration: 2, ease: "easeOut" }}
                />
              </g>
            </g>

            {/* Scan line */}
            <line x1="420" y1="0" x2="420" y2="160" stroke="rgba(20,184,166,0.5)" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx="420" cy="20" r="4" fill="#14b8a6" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.2s" repeatCount="indefinite" />
            </circle>

            {/* Y-axis labels */}
            <text x="6" y="38" fontFamily="monospace" fontSize="9" fill="rgba(168,162,158,0.6)">+</text>
            <text x="6" y="78" fontFamily="monospace" fontSize="9" fill="rgba(168,162,158,0.6)">0</text>
            <text x="6" y="118" fontFamily="monospace" fontSize="9" fill="rgba(168,162,158,0.6)">−</text>
          </svg>
        </div>

        {/* Footer metrics */}
        <div className="flex justify-between px-4 py-2 border-t border-border bg-obsidian/40">
          {[
            { label: "Doppler Shift", value: "2.4 kHz" },
            { label: "MHz", value: "5.0" },
            { label: "Depth", value: "8 cm" },
            { label: "PRF", value: "4 kHz" },
          ].map((m) => (
            <div key={m.label} className="flex flex-col gap-0.5">
              <span className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-cream-dim">
                {m.label}
              </span>
              <span className="font-mono text-sm font-bold text-teal-glow">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Feature pills */}
      <motion.div
        className="flex flex-wrap gap-2 mt-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        {["Pulse-Echo Physics", "Doppler Principles", "Artifact Recognition", "Transducer Mechanics", "Image Optimization"].map((pill, i) => (
          <motion.span
            key={pill}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 + i * 0.08, duration: 0.4 }}
            className="font-mono text-[0.55rem] uppercase tracking-[0.08em] text-cream-dim border border-border px-2.5 py-1 rounded bg-mist hover:border-teal/30 hover:text-teal transition-all duration-300 cursor-default"
          >
            {pill}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Trust badges ─────────────────────────────────────────────────── */
const TRUST = [
  { icon: Shield, label: "ARDMS Aligned" },
  { icon: Zap, label: "SPI · RDMS · RDCS · RVT · RMSKS" },
  { icon: Users, label: "Sonographer-Built" },
];

/* ── Stagger animation variants ───────────────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] } },
};

/* ── Stats config ─────────────────────────────────────────────────── */
const STATS = [
  { value: 200, suffix: "+", label: "Flashcards" },
  { value: 110, suffix: "", label: "Exam Questions" },
  { value: 50, suffix: "", label: "Physics Pearls" },
  { value: 6, suffix: "", label: "SPI Domains Covered" },
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
      {/* ── Background layers ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-charcoal/50 to-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(13,148,136,0.08),transparent)]" />
        <div className="absolute inset-0 bg-grid opacity-100" />
        {/* Floating atmospheric orbs */}
        <motion.div
          className="absolute -top-60 left-1/4 h-[700px] w-[700px] rounded-full bg-teal/[0.025] blur-[140px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-cobalt/[0.06] blur-[120px]"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left column — Text */}
          <motion.div variants={container} initial="hidden" animate="visible" className="text-center lg:text-left">

            {/* Badge */}
            <motion.div variants={item}>
              <Badge className="shimmer-badge mb-8 px-4 py-1.5 text-[0.68rem] tracking-widest uppercase">
                ✦ ARDMS SPI · RDMS · RDCS · RVT · RMSKS Prep
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-display text-4xl font-bold leading-[1.1] text-cream text-shadow-glow sm:text-5xl xl:text-6xl"
            >
              Master Sonographic Physics.{" "}
              <span className="gradient-text-premium">
                Earn Your ARDMS Credential.
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={item}
              className="mt-6 text-lg leading-relaxed text-cream-dim max-w-xl lg:max-w-none"
            >
              The SPI exam is required for every ARDMS credential — RDMS, RDCS, RVT, and RMSKS.
              SonoPrep gives you clinically focused flashcards, a realistic exam simulator, and
              spaced-repetition learning built by practicing sonographers. Pass the physics. Get credentialed.
            </motion.p>

            {/* Trust badges */}
            <motion.div variants={item} className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
              {TRUST.map(({ icon: Icon, label }) => (
                <span key={label} className="feature-tag">
                  <Icon className="h-3 w-3" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button size="xl" asChild className="group btn-glow">
                <Link href="/products">
                  Get Started — From $9
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="ghost" size="xl" asChild className="group">
                <Link href="/demo">
                  <Play className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  Try Free Demo
                </Link>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.p variants={item} className="mt-4 font-mono text-xs text-cream-dim/50">
              No subscription · 90-day access · No credit card for demo
            </motion.p>
          </motion.div>

          {/* Right column — SPI Waveform Monitor */}
          <div className="hidden lg:block">
            <WaveformMonitor />
          </div>
        </div>

        {/* ── Stats row ── */}
        <div ref={ref} className="mt-20 sep-line mb-10" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="stat-card text-center"
            >
              <p className="number-highlight text-3xl lg:text-4xl">
                {inView ? <CountUp to={s.value} suffix={s.suffix} /> : `0${s.suffix}`}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-cream-dim/70">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="h-10 w-6 rounded-full border border-cream-dim/20 flex justify-center pt-2"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.div
              className="h-2 w-1 rounded-full bg-teal"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
