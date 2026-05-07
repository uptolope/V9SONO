"use client";

import { motion } from "framer-motion";
import { Brain, BarChart3, CheckCircle2, Repeat2 } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Brain,
    title: "Start Free",
    desc: "Access 20 flashcards, a 10-question quiz, and 5 Physics Pearls instantly — no credit card, no commitment. See if SonoPrep clicks for you before spending a dollar.",
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
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 to-obsidian" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <p className="section-label">The Method</p>
          <h2 className="section-title">From Zero to SPI-Ready<br className="hidden sm:block" /> in 30 Days</h2>
          <p className="section-subtitle">
            Most candidates need 4–8 weeks. Students who complete the full deck and simulator
            pass with confidence. The method is simple — the science behind it isn't.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-teal/20 to-transparent hidden lg:block" />

          <div className="grid gap-8 lg:grid-cols-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="group relative rounded border border-border bg-slate/50 p-7 transition-all duration-300 hover:border-teal/25 hover:shadow-glow hover:bg-slate/70"
                >
                  <div className="flex items-start gap-5">
                    {/* Step number */}
                    <div className="shrink-0">
                      <span className="font-mono text-xs text-teal/40 block mb-2">{s.step}</span>
                      <div className="flex h-11 w-11 items-center justify-center rounded border border-teal/20 bg-teal/5 transition-all duration-300 group-hover:border-teal/40 group-hover:bg-teal/10">
                        <Icon className="h-5 w-5 text-teal" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-lg font-semibold text-cream">{s.title}</h3>
                        <span className="feature-tag text-[10px] py-0.5">{s.tag}</span>
                      </div>
                      <p className="text-sm text-cream-dim leading-relaxed">{s.desc}</p>
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
