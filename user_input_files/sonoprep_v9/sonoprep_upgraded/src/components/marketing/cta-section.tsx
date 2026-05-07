"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const INCLUSIONS = [
  "200+ RDMS-written flashcards",
  "110-question exam simulator",
  "50 Physics Pearls",
  "Domain performance analytics",
  "Detailed clinical rationales",
  "90-day full access included",
];

export function CtaSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-charcoal/40 to-obsidian" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(13,148,136,0.07),transparent)]" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-4">Ready to Pass?</p>
          <h2 className="font-display text-4xl font-bold text-cream text-shadow-glow sm:text-5xl leading-tight">
            Everything You Need.<br />
            <span className="gradient-text-premium">One Payment. Full Access.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-cream-dim leading-relaxed">
            Every product is structured around the exact ARDMS exam blueprint. 
            That's not a guess — that's by design.
          </p>

          {/* What's included */}
          <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-x-8 gap-y-3 text-left">
            {INCLUSIONS.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" />
                <span className="font-mono text-xs text-cream-dim">{item}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="mt-10 inline-flex flex-col items-center rounded border border-teal/20 bg-teal/5 px-10 py-6">
            <span className="font-mono text-xs uppercase tracking-widest text-teal mb-1">Premium Bundle — Save $27</span>
            <div className="flex items-end gap-2">
              <span className="font-display text-5xl font-bold text-cream">$99</span>
              <span className="mb-2 text-cream-dim/60 text-sm">one-time</span>
            </div>
            <span className="font-mono text-xs text-cream-dim/40 mt-1">All 4 products · 90-day access · No subscription</span>
          </div>
          <p className="mt-3 font-mono text-xs text-cream-dim/50">
            Or start with individual products from $9
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="xl" asChild className="group">
              <Link href="/products">
                Get Full Access
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="ghost" size="xl" asChild>
              <Link href="/demo">Try Free Demo First</Link>
            </Button>
          </div>

          <p className="mt-5 font-mono text-xs text-cream-dim/40">
            No credit card required for demo · Secure checkout · Instant access after purchase
          </p>
        </motion.div>
      </div>
    </section>
  );
}
