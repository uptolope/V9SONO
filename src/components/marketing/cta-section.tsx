"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const INCLUSIONS = [
  "200+ RDMS-written flashcards",
  "110-question exam simulator",
  "50 Physics Pearls",
  "Domain performance analytics",
  "Detailed clinical rationales",
  "90-day full access included",
];

/* ── Floating Orb Effects ─────────────────────────────────────────── */
function FloatingOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -40, 0],
        x: [0, 20, 0],
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ── Sparkle Particle ────────────────────────────────────────────── */
function Sparkle({ className }: { className: string }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      <Sparkles className="h-4 w-4 text-teal-glow" />
    </motion.div>
  );
}

/* ── Premium Counter Animation ────────────────────────────────────── */
function AnimatedPrice() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span className="font-display text-5xl font-bold text-cream">$99</span>;

  return (
    <div className="relative">
      <motion.span
        className="font-display text-5xl font-bold text-cream"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        $99
      </motion.span>
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-4 rounded-lg bg-teal/10 blur-lg"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}

export function CtaSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-charcoal/50 to-obsidian" />

      {/* Radial gradient glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(13,148,136,0.1),transparent)]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Floating orbs */}
      <FloatingOrb className="-top-40 left-1/4 h-[600px] w-[600px] bg-teal/[0.04]" delay={0} />
      <FloatingOrb className="-bottom-60 right-1/4 h-[500px] w-[500px] bg-cobalt/[0.03]" delay={2} />
      <FloatingOrb className="top-1/3 left-2/3 h-[300px] w-[300px] bg-teal/[0.02]" delay={4} />

      {/* Sparkle particles */}
      <Sparkle className="top-1/4 left-1/3" />
      <Sparkle className="top-1/3 right-1/4" />
      <Sparkle className="bottom-1/4 left-1/2" />
      <Sparkle className="top-1/2 right-1/3" />

      {/* Animated border lines */}
      <motion.div
        className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-teal/20 to-transparent"
        animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: "left" }}
      />
      <motion.div
        className="absolute left-0 bottom-1/3 h-px w-full bg-gradient-to-r from-transparent via-teal/20 to-transparent"
        animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 4, delay: 2, repeat: Infinity }}
        style={{ transformOrigin: "left" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Premium badge */}
          <motion.div
            className="inline-block mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal/20 via-teal-glow/10 to-teal/20 animate-border-glow" />
              <div className="relative flex items-center gap-2 rounded-full border border-teal/30 bg-charcoal/80 px-5 py-2 backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="h-4 w-4 text-teal-glow" />
                </motion.div>
                <span className="font-mono text-xs uppercase tracking-widest text-teal">Limited Early Access</span>
              </div>
            </div>
          </motion.div>

          {/* Headline */}
          <p className="section-label mb-6">Ready to Pass?</p>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-cream text-shadow-glow leading-tight">
            Everything You Need.
            <br />
            <motion.span
              className="animate-text-shimmer"
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              One Payment. Full Access.
            </motion.span>
          </h2>

          <motion.p
            className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cream-dim"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Every product is structured around the exact ARDMS exam blueprint.
            That's not a guess — that's by design.
          </motion.p>

          {/* What's included - Premium grid */}
          <motion.div
            className="mx-auto mt-12 grid max-w-lg grid-cols-2 gap-4 text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {INCLUSIONS.map((item, index) => (
              <motion.div
                key={item}
                className="group flex items-center gap-3 rounded-lg border border-transparent bg-mist/30 px-4 py-3 transition-all duration-300 hover:border-teal/20 hover:bg-teal/5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.08 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <motion.div
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-teal/10 transition-colors group-hover:bg-teal/20"
                  whileHover={{ rotate: [0, 180] }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle2 className="h-4 w-4 text-teal" />
                </motion.div>
                <span className="font-mono text-sm text-cream-dim group-hover:text-cream transition-colors">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Price box - Premium styling */}
          <motion.div
            className="relative mt-14 inline-flex flex-col items-center rounded-2xl border border-teal/20 bg-gradient-to-br from-charcoal via-slate/40 to-charcoal p-8 shadow-2xl shadow-black/40"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-px rounded-2xl bg-gradient-to-r from-teal/20 via-transparent to-teal/20 opacity-0"
              whileHover={{ opacity: 1 }}
            />

            {/* Badge */}
            <motion.div
              className="absolute -top-3 left-1/2 -translate-x-1/2"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2 rounded-full border border-amber/30 bg-obsidian px-4 py-1">
                <Shield className="h-3 w-3 text-amber" />
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-amber">Save $77</span>
              </div>
            </motion.div>

            <div className="relative z-10 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-teal mb-3 block">Premium Bundle</span>

              <div className="flex items-end gap-3 justify-center">
                <AnimatedPrice />
                <span className="mb-3 text-cream-dim/60 text-sm">one-time</span>
              </div>

              <div className="mt-4 flex items-center gap-2 justify-center">
                <motion.span
                  className="font-mono text-sm text-cream-dim/40 line-through"
                  animate={{ opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  $176
                </motion.span>
                <span className="font-mono text-xs text-teal/70">vs buying separately</span>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="mt-4 font-mono text-sm text-cream-dim/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Or start with individual products from $9
          </motion.p>

          {/* CTAs - Premium buttons */}
          <motion.div
            className="mt-10 flex flex-col gap-5 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-teal to-teal-glow opacity-50 blur-lg transition-opacity duration-300 hover:opacity-80" />
              <Button size="xl" asChild className="relative btn-glow bg-gradient-to-r from-teal to-teal-glow text-obsidian font-bold">
                <Link href="/products">
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center"
                  >
                    Get Full Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" size="xl" asChild className="border border-cream-dim/20 hover:border-teal/30 hover:bg-teal/5">
                <Link href="/demo">
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="h-4 w-4 text-teal" />
                    </motion.div>
                    Try Free Demo First
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            {[
              { icon: Shield, text: "Secure checkout" },
              { icon: Zap, text: "Instant access" },
              { icon: Sparkles, text: "No subscription" },
            ].map(({ icon: Icon, text }, index) => (
              <motion.div
                key={text}
                className="flex items-center gap-2 font-mono text-xs text-cream-dim/50"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1 + index * 0.1 }}
              >
                <Icon className="h-3.5 w-3.5 text-teal/50" />
                {text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}