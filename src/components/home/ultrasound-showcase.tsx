"use client";

import { motion } from "framer-motion";
import { Activity, Radio, Waves, ScanLine } from "lucide-react";

export function UltrasoundShowcase() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-[#0b1017] border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.16),transparent_45%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 mb-6">
            <Radio className="w-4 h-4 text-teal-400" />
            <span className="text-xs uppercase tracking-[0.2em] text-teal-300 font-medium">
              Interactive Ultrasound Experience
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#f5f5f4] leading-tight mb-6">
            Study with visuals that feel like a modern
            <span className="text-teal-400"> ultrasound workstation</span>
          </h2>

          <p className="text-lg text-stone-400 leading-relaxed mb-8 max-w-xl">
            We upgraded the SonoPrep demo experience with animated ultrasound waveforms,
            responsive scan motion, and a cleaner premium UI system so every interaction feels cohesive across the platform.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ["Real-time Motion", Activity],
              ["Wave Physics", Waves],
              ["Clinical UI", ScanLine],
            ].map(([label, Icon]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
              >
                <Icon className="w-5 h-5 text-teal-400 mb-3" />
                <p className="text-sm text-stone-300">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-r from-teal-500/20 to-cyan-500/10 blur-3xl" />

          <div className="relative rounded-[2rem] border border-white/10 bg-[#050816] p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-2">SonoPrep Live Demo</p>
                <h3 className="text-2xl font-semibold text-stone-100">Ultrasound Beam Simulation</h3>
              </div>

              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <span className="w-3 h-3 rounded-full bg-teal-400/80" />
              </div>
            </div>

            <div className="relative h-[420px] rounded-[1.5rem] border border-teal-500/10 bg-gradient-to-b from-[#07111c] to-[#02040a] overflow-hidden">
              <motion.div
                animate={{ y: [0, 260, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-teal-400/25 via-teal-400/10 to-transparent"
              />

              {[...Array(10)].map((_, index) => (
                <motion.div
                  key={index}
                  animate={{ opacity: [0.15, 0.5, 0.15] }}
                  transition={{ repeat: Infinity, duration: 1.8 + index * 0.15, delay: index * 0.1 }}
                  className="absolute left-0 right-0 border-t border-teal-400/10"
                  style={{ top: `${index * 10}%` }}
                />
              ))}

              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={`wave-${index}`}
                  animate={{
                    x: ["-10%", "110%"],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    delay: index * 0.8,
                    ease: "linear",
                  }}
                  className="absolute top-[15%] h-[2px] w-40 bg-gradient-to-r from-transparent via-teal-300 to-transparent"
                  style={{ top: `${18 + index * 15}%` }}
                />
              ))}

              <div className="absolute left-1/2 top-6 -translate-x-1/2">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-24 h-8 rounded-full bg-gradient-to-r from-stone-100 to-stone-300 shadow-lg"
                />
                <div className="w-10 h-16 mx-auto rounded-b-3xl bg-stone-200" />
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-4">
                {[
                  ["Depth", "12cm"],
                  ["Frequency", "5.2MHz"],
                  ["Gain", "82%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/5 bg-black/30 p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500 mb-1">{label}</p>
                    <p className="text-lg font-semibold text-teal-300">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
