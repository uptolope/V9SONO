"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const DOMAINS = [
  { name: "Pulse-Echo Principles", pct: 25, color: "#14b8a6", questions: "~28 questions" },
  { name: "Doppler Physics & Instrumentation", pct: 22, color: "#0d9488", questions: "~24 questions" },
  { name: "Transducer Mechanisms", pct: 18, color: "#0f766e", questions: "~20 questions" },
  { name: "Image Formation & Optimization", pct: 17, color: "#14b8a6", questions: "~19 questions" },
  { name: "Artifact Recognition", pct: 11, color: "#0d9488", questions: "~12 questions" },
  { name: "Bioeffects & Safety", pct: 7, color: "#0f766e", questions: "~8 questions" },
];

export function DomainCoverage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-charcoal/30 to-obsidian" />
      <div className="absolute inset-0 bg-dots opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="section-label">Complete Coverage</p>
            <h2 className="section-title">Every SPI Domain.<br />Zero Gaps.</h2>
            <p className="section-subtitle text-left mt-4">
              The ARDMS SPI exam tests six content domains. SonoPrep covers all of them — 
              weighted to match the exact exam blueprint so you study what matters most.
            </p>

            {/* Credential callout */}
            <div className="mt-6 rounded border border-teal/20 bg-teal/5 px-5 py-4">
              <p className="font-mono text-xs uppercase tracking-widest text-teal mb-2">Required for Every ARDMS Credential</p>
              <p className="text-sm text-cream-dim leading-relaxed">
                The SPI is a mandatory prerequisite for <span className="text-cream font-semibold">RDMS, RDCS, RVT, and RMSKS</span> — no matter which specialty you're pursuing. Pass the physics once. Unlock every credential path.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["RDMS", "RDCS", "RVT", "RMSKS"].map((cred) => (
                  <span key={cred} className="font-mono text-[0.6rem] uppercase tracking-widest border border-teal/30 text-teal px-2 py-0.5 rounded">
                    {cred}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { num: "200+", label: "Flashcards built by RDMS sonographers" },
                { num: "110", label: "Questions calibrated to ARDMS difficulty" },
                { num: "50", label: "Physics Pearls for clinical application" },
                { num: "100%", label: "ARDMS blueprint coverage" },
              ].map((s) => (
                <div key={s.num} className="rounded border border-border/60 bg-mist p-4">
                  <p className="number-highlight text-2xl">{s.num}</p>
                  <p className="mt-1 text-xs text-cream-dim/70 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: domain bars */}
          <div ref={ref} className="space-y-5">
            {DOMAINS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="mb-1.5 flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-cream-dim/80">{d.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-xs text-cream-dim/40">{d.questions}</span>
                    <span className="number-highlight text-sm">{d.pct}%</span>
                  </div>
                </div>
                <div className="domain-bar">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    style={{ transformOrigin: "left", width: `${d.pct * 4}%`, background: `linear-gradient(90deg, ${d.color}88, ${d.color})` }}
                  />
                </div>
              </motion.div>
            ))}

            <p className="pt-3 font-mono text-xs text-cream-dim/40">
              Distribution based on ARDMS published SPI exam blueprint
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
