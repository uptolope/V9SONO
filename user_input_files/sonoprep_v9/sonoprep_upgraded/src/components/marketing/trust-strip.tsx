"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "200+ Flashcards",
  "110-Question Simulator",
  "50 Physics Pearls",
  "ARDMS SPI Required",
  "RDMS Credential Prep",
  "RDCS Credential Prep",
  "RVT Credential Prep",
  "RMSKS Credential Prep",
  "Built by RDMS Sonographers",
  "30-Day Full Access",
  "Spaced Repetition",
  "Mobile Optimized",
  "No Subscription",
  "Domain Analytics",
  "Clinical Rationales",
];

const doubled = [...ITEMS, ...ITEMS];

export function TrustStrip() {
  return (
    <div className="relative overflow-hidden border-y border-border/40 bg-mist/50 py-4" aria-hidden="true" role="presentation">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-obsidian to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-obsidian to-transparent z-10" />

      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 shrink-0">
            <span className="h-1 w-1 rounded-full bg-teal/50" />
            <span className="font-mono text-xs uppercase tracking-widest text-cream-dim/60">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
