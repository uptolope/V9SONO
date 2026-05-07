"use client";

import { motion } from "framer-motion";
import { Brain, BarChart3, CheckCircle2, Repeat2, Sparkles } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Brain,
    title: "Start Free",
    desc: "Access 10 flashcards, 10 exam questions, and instant preview — no credit card, no commitment. See if SonoPrep clicks for you before spending a dollar.",
    tag: "Zero risk",
  },
  {
    step: "02",
    icon: Repeat2,
    title: "Drill Your Weak Spots",
    desc: "The spaced-repetition algorithm surfaces the cards you miss most. 30 minutes a day is enough. It prioritizes your gaps, not your comfort zone.",
    tag: "SM-2 Algorithm",
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Track Your Domains",
    desc: "See exactly where you stand across all 6 ARDMS exam domains. Stop guessing which areas need work — the analytics tell you precisely.",
    tag: "6 Domains Tracked",
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Simulate the Exam",
    desc: "Run the full 110-question timed simulation calibrated to real ARDMS difficulty. Every wrong answer has a clinical rationale explaining the physics behind it.",
    tag: "110 Questions",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-obsidian/50 to-obsidian" />

      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cobalt/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section heading with premium animation */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-teal/10 border border-teal/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-teal-glow" />
            <span className="font-mono text-xs uppercase tracking-widest text-teal">The Method</span>
          </motion.div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cream">
            From Zero to{" "}
            <motion.span
              className="animate-text-shimmer"
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              SPI-Ready
            </motion.span>
            <br className="hidden sm:block" />
            in 30 Days
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-cream-dim leading-relaxed">
            Most candidates need 4–8 weeks. Students who complete the full deck and simulator
            pass with confidence. The method is simple — the science behind it isn't.
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated connector line */}
          <motion.div
            className="absolute left-1/2 top-8 bottom-8 w-px hidden lg:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{ background: "linear-gradient(to bottom, transparent, #14b8a6, transparent)" }}
          />

          <div className="grid gap-8 lg:grid-cols-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-2xl border border-border bg-gradient-to-b from-charcoal/90 to-slate/50 p-8 transition-all duration-500 hover:border-teal/40 hover:shadow-lg hover:shadow-teal/10 cursor-default overflow-hidden"
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Animated corner orb */}
                  <motion.div
                    className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-teal/5 blur-2xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="flex items-start gap-6 relative z-10">
                    {/* Step number with premium styling */}
                    <div className="shrink-0">
                      <motion.span
                        className="font-mono text-sm text-teal/40 block mb-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.3 }}
                      >
                        {s.step}
                      </motion.span>

                      <motion.div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal/20 bg-teal/5 transition-all duration-500 group-hover:border-teal/40 group-hover:bg-teal/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-teal/20"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-6 w-6 text-teal transition-colors duration-300 group-hover:text-teal-glow" />
                      </motion.div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.h3
                          className="font-display text-2xl font-bold text-cream group-hover:text-teal-glow transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          {s.title}
                        </motion.h3>
                        <motion.span
                          className="feature-tag text-[10px] py-1 px-3"
                          whileHover={{ scale: 1.05 }}
                        >
                          {s.tag}
                        </motion.span>
                      </div>

                      <p className="text-base text-cream-dim leading-relaxed group-hover:text-cream-dim/90 transition-colors">
                        {s.desc}
                      </p>

                      {/* Progress indicator */}
                      <motion.div
                        className="mt-6 h-1 rounded-full bg-cream-dim/10 overflow-hidden"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.5, duration: 1, ease: "easeOut" }}
                      >
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-teal to-teal-glow"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.15 + 0.7, duration: 1.5, ease: "easeOut" }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}