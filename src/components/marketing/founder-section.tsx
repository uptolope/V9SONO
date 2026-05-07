"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Target, Sparkles, MapPin, GraduationCap, Clock } from "lucide-react";

const CREDENTIALS = [
  { icon: GraduationCap, text: "ARDMS RDMS credentialed — retired sonographer" },
  { icon: MapPin,         text: "Former instructor, Houston International Cardiotech Ultrasound School" },
  { icon: Clock,         text: "Decades of clinical & classroom teaching experience" },
];

const VALUES = [
  {
    icon: Target,
    title: "ARDMS-Aligned",
    desc: "Every question and concept is mapped to the official SPI exam blueprint, weighted by domain importance — no filler, no guesswork.",
  },
  {
    icon: Shield,
    title: "Evidence-Based Learning",
    desc: "Built on the SM-2 spaced-repetition algorithm. The same system used by medical students worldwide to retain high-volume information efficiently.",
  },
  {
    icon: Sparkles,
    title: "Clinically Grounded",
    desc: "Physics theory explained through real scanning scenarios. If you can't apply it to a patient, it doesn't belong in your study materials.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, delay: 0.2 + i * 0.15, ease: [0.4, 0, 0.2, 1] },
  }),
};

export function FounderSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left — Instructor story ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-teal">The Instructor</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
              Built by Sonographers,
              <br />
              <span className="gradient-text">for Sonographers</span>
            </h2>

            {/* Photo + name card */}
            <div className="mt-8 flex items-center gap-5">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-teal/20 ring-2 ring-teal/10">
                <Image
                  src="/instructor.jpg"
                  alt="SonoPrep instructor — credentialed RDMS sonographer"
                  fill
                  className="object-cover"
                  sizes="80px"
                  priority
                />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-cream">Your SonoPrep Instructor</p>
                <p className="text-sm text-teal mt-0.5">RDMS — Diagnostic Medical Sonographer</p>
                <p className="text-xs text-cream-dim/50 mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Houston International Cardiotech Ultrasound School
                </p>
              </div>
            </div>

            {/* Credentials list */}
            <div className="mt-6 space-y-2.5">
              {CREDENTIALS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-cream-dim">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10">
                    <Icon className="h-3 w-3 text-teal" />
                  </div>
                  {text}
                </div>
              ))}
            </div>

            {/* Story */}
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-cream-dim">
              <p>
                SonoPrep was built out of frustration with what was available. As a retired 
                RDMS sonographer and former instructor at Houston International Cardiotech 
                Ultrasound School, I watched students struggle with the SPI — not because the 
                physics is impossible, but because the study resources treat it like a textbook 
                test instead of a clinical one.
              </p>
              <p>
                These materials started as classroom notes. Over years of teaching, I refined 
                what stuck, what didn't, and what actually showed up on the exam. SonoPrep is 
                those notes — built into a structured, spaced-repetition system so you retain 
                the right things at the right time.
              </p>
              <p>
                I'm retired now, but the students still need to pass. If you're preparing for 
                your SPI as part of your RDMS, RVT, or RDCS pathway, this was made specifically 
                for you — by someone who's been on both sides of that exam.
              </p>
            </div>
          </motion.div>

          {/* Right — Values ───────────────────────────────────────── */}
          <div className="space-y-6">
            {VALUES.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="group flex gap-4 rounded border border-border bg-slate p-5 transition-all duration-300 hover:border-teal/40 hover:shadow-glow hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist transition-all duration-300 group-hover:bg-teal/10 group-hover:shadow-glow">
                  <item.icon className="h-5 w-5 text-teal transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-cream">{item.title}</h3>
                  <p className="mt-1 text-sm text-cream-dim">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
