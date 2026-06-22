"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { TrademarkDisclaimer } from "@/components/ui/trademark-disclaimer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CREDENTIALS = [
  {
    abbr: "RDMS",
    full: "Registered Diagnostic Medical Sonographer",
    color: "text-teal",
    border: "border-teal/30",
    bg: "bg-teal/5",
  },
  {
    abbr: "RDCS",
    full: "Registered Diagnostic Cardiac Sonographer",
    color: "text-cobalt",
    border: "border-cobalt/30",
    bg: "bg-cobalt/5",
  },
  {
    abbr: "RVT",
    full: "Registered Vascular Technologist",
    color: "text-teal-glow",
    border: "border-teal-glow/30",
    bg: "bg-teal-glow/5",
  },
  {
    abbr: "RMSKS",
    full: "Registered Musculoskeletal Sonographer",
    color: "text-amber",
    border: "border-amber/30",
    bg: "bg-amber/5",
  },
];

const ALSO_TESTS_PHYSICS = [
  {
    org: "CCI",
    full: "Cardiovascular Credentialing International",
    note: "Vascular & cardiac specialty exams include physics components",
  },
  {
    org: "ARRT",
    full: "American Registry of Radiologic Technologists",
    note: "Sonography certifications include integrated physics concepts",
  },
];

export function CredentialUrgency() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-charcoal/30 to-obsidian" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(13,148,136,0.04),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="section-label">Why It Matters</p>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="text-center mb-4"
        >
          <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl lg:text-5xl leading-tight">
            You Cannot Get Credentialed{" "}
            <span className="gradient-text-premium">Without Passing the SPI.</span>
          </h2>
        </motion.div>

        {/* Hook copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-lg text-cream-dim max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          The Sonography Principles and Instrumentation exam is the mandatory gateway exam
          administered by ARDMS. Every credential path runs through it. There are no shortcuts,
          no exemptions, no alternate routes.
        </motion.p>

        {/* Credential grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-10">
          {CREDENTIALS.map((c, i) => (
            <motion.div
              key={c.abbr}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className={`rounded border ${c.border} ${c.bg} p-5 text-center transition-all duration-300 hover:shadow-glow`}
            >
              {/* Lock icon — shows the SPI is required */}
              <Lock className={`mx-auto mb-3 h-4 w-4 ${c.color} opacity-60`} aria-hidden="true" />
              <p className={`font-display text-2xl font-bold ${c.color} mb-1`}>{c.abbr}</p>
              <p className="font-mono text-[0.6rem] text-cream-dim/70 leading-relaxed uppercase tracking-wide">
                {c.full}
              </p>
              <div className="mt-3 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal/60" aria-hidden="true" />
                <span className="font-mono text-[0.55rem] text-cream-dim/50 uppercase tracking-widest">
                  SPI Required
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded border border-teal/20 bg-teal/[0.04] px-8 py-7 mb-10 max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-teal" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-teal">
              What the SPI tests
            </span>
          </div>
          <p className="text-base text-cream-dim leading-relaxed">
            <span className="text-cream font-semibold">110 multiple-choice questions.</span>{" "}
            2.5-hour time limit. Ultrasound physics, Doppler principles, wave behavior,
            image artifacts, transducer technology, and bioeffects — everything required
            to prove you can operate clinical equipment safely.{" "}
            <span className="text-cream font-semibold">
              This is the exam standing between you and your credential.
            </span>
          </p>
        </motion.div>

        {/* Also requires physics — CCI & ARRT */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mb-14"
        >
          <p className="text-center font-mono text-xs uppercase tracking-widest text-cream-dim/50 mb-5">
            Other credentialing bodies that test physics
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            {ALSO_TESTS_PHYSICS.map((org) => (
              <div
                key={org.org}
                className="flex-1 rounded border border-border bg-slate/30 px-5 py-4"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <CheckCircle2 className="h-4 w-4 text-cream-dim/40 shrink-0" aria-hidden="true" />
                  <span className="font-mono text-sm font-bold text-cream-dim">{org.org}</span>
                </div>
                <p className="font-mono text-[0.6rem] text-cream-dim/50 leading-relaxed pl-7">
                  {org.full}
                </p>
                <p className="mt-1 text-xs text-cream-dim/60 leading-relaxed pl-7">
                  {org.note}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-center"
        >
          <p className="text-base text-cream-dim mb-6 max-w-lg mx-auto leading-relaxed">
            SonoPrep is built specifically for this exam — every flashcard, every question,
            every Physics Pearl maps directly to the ARDMS blueprint.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group btn-glow">
              <Link href="/products">
                Start Preparing — From $9
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/demo">Try Free First</Link>
            </Button>
          </div>
          <p className="mt-4 font-mono text-xs text-cream-dim/40">
            No subscription · 60-day access · No credit card for demo
          </p>
        </motion.div>

      </div>
      <div className="mx-auto max-w-4xl px-6">
        <TrademarkDisclaimer orgs={["ARDMS", "CCI", "ARRT"]} />
      </div>
    </section>
  );
}
