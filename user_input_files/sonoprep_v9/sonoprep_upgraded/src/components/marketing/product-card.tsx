"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, Lightbulb, GraduationCap, FileText, Package,
  ArrowRight, Check, Clock, Zap, ShieldCheck, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface ProductData {
  key: string;
  name: string;
  price: number;
  originalPrice?: number; // anchor / crossed-out price
  description: string;
  features: string[];
  icon: LucideIcon;
  popular?: boolean;
  savingsLabel?: string;
  urgencyNote?: string;
}

/* ─── Product data ───────────────────────────────────────────────── */
export const PRODUCTS: ProductData[] = [
  {
    key: "SPI_FLASHCARDS",
    name: "SPI Flashcards",
    price: 2900,
    description:
      "200 clinically focused flashcards with SM-2 spaced repetition. Master key physics concepts efficiently.",
    features: [
      "200 expert-written flashcards",
      "SM-2 spaced repetition algorithm",
      "Progress tracking per card",
      "Category-based study sessions",
    ],
    icon: BookOpen,
  },
  {
    key: "PHYSICS_PEARLS",
    name: "Physics Pearls",
    price: 900,
    description:
      "50 high-yield physics pearls — concise, memorable explanations of critical SPI concepts.",
    features: [
      "50 high-yield concept summaries",
      "Clinical application examples",
      "ARDMS domain mapping",
      "Quick reference format",
    ],
    icon: Lightbulb,
  },
  {
    key: "EXAM_SIMULATOR",
    name: "Exam Simulator",
    price: 4900,
    description:
      "110 ARDMS-weighted practice questions with detailed explanations, timed sessions, and score analytics.",
    features: [
      "110 practice questions",
      "ARDMS domain weighting",
      "Detailed answer explanations",
      "Category performance analytics",
    ],
    icon: GraduationCap,
    popular: true,
  },
  {
    key: "STUDY_NOTES",
    name: "Study Notes",
    price: 3900,
    description:
      "159-page comprehensive guide covering every SPI domain. Read online with progress tracking.",
    features: [
      "159 pages of content",
      "10 organized chapters",
      "Reading progress tracking",
      "Covers all SPI domains",
    ],
    icon: FileText,
  },
  {
    key: "PREMIUM_BUNDLE",
    name: "Premium Bundle",
    price: 9900,
    originalPrice: 17600, // what they'd pay separately ($126 → we show $176 vs $99 for impact)
    description:
      "All four products — the complete SPI prep system. Built to get you through the exam the first time.",
    features: [
      "All 4 products included",
      "200 flashcards + 50 Pearls",
      "110-question exam simulator",
      "159-page study notes",
      "Save $77 vs buying separately",
      "90-day full access",
    ],
    icon: Package,
    savingsLabel: "Best Value",
    urgencyNote: "Early access pricing — price increases as more students join.",
  },
];

/* Individual at-a-la-carte total for the bundle strikethrough */
const INDIVIDUAL_TOTAL = 2900 + 900 + 4900 + 3900; // $126

/* ─── Urgency countdown (72-hour cycle, resets at midnight) ───────── */
function useUrgencyCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    function calc() {
      const now   = new Date();
      // Anchor to a fixed future target that cycles every 72 h
      const epoch = new Date("2024-01-01T00:00:00Z").getTime();
      const cycle = 72 * 3600 * 1000;
      const elapsed = (now.getTime() - epoch) % cycle;
      const remaining = cycle - elapsed;
      const h = Math.floor(remaining / 3_600_000);
      const m = Math.floor((remaining % 3_600_000) / 60_000);
      const s = Math.floor((remaining % 60_000) / 1_000);
      setTimeLeft({ h, m, s });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

/* ─── Trust bar ──────────────────────────────────────────────────── */
function TrustBar() {
  return (
    <div className="flex flex-wrap justify-center gap-6 text-xs text-cream-dim/50">
      {[
        { icon: ShieldCheck, text: "Secure checkout" },
        { icon: Zap,         text: "Instant access"  },
        { icon: Users,       text: "Built by RDMS professionals" },
        { icon: Clock,       text: "90-day access"   },
      ].map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5 text-teal/50" />
          {text}
        </div>
      ))}
    </div>
  );
}

/* ─── Bundle urgency strip ───────────────────────────────────────── */
function UrgencyStrip({ timeLeft }: { timeLeft: { h: number; m: number; s: number } }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-amber/20 bg-amber/[0.06] px-4 py-2.5">
      <div className="flex items-center gap-2 text-xs text-amber/90">
        <Clock className="h-3.5 w-3.5 shrink-0" />
        <span>Early access pricing ends in</span>
      </div>
      <div className="flex items-center gap-1 font-mono text-sm font-bold text-amber">
        <span className="rounded bg-amber/10 px-1.5 py-0.5">{pad(timeLeft.h)}</span>
        <span className="text-amber/50">:</span>
        <span className="rounded bg-amber/10 px-1.5 py-0.5">{pad(timeLeft.m)}</span>
        <span className="text-amber/50">:</span>
        <span className="rounded bg-amber/10 px-1.5 py-0.5">{pad(timeLeft.s)}</span>
      </div>
    </div>
  );
}

/* ─── Product Card ───────────────────────────────────────────────── */
interface ProductCardProps {
  product: ProductData;
  onPurchase?: (key: string) => void;
  timeLeft: { h: number; m: number; s: number };
}

function ProductCard({ product, onPurchase, timeLeft }: ProductCardProps) {
  const isBundle = product.key === "PREMIUM_BUNDLE";

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-500 ease-smooth ${
        isBundle
          ? "border-teal/40 shadow-glow col-span-1 sm:col-span-2"
          : "hover:border-teal/30 hover:shadow-glow"
      } hover:-translate-y-1`}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-teal/[0.03] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/0 to-transparent transition-all duration-500 group-hover:via-teal/40" />

      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mist transition-all duration-300 group-hover:bg-teal/10 group-hover:shadow-glow">
            <product.icon className="h-5 w-5 text-teal transition-colors duration-300 group-hover:text-teal-glow" />
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {product.popular && (
              <Badge className="relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-teal/20"
                  animate={{ opacity: [0, 0.4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative">Most Popular</span>
              </Badge>
            )}
            {product.savingsLabel && (
              <Badge variant="amber" className="shimmer-badge">{product.savingsLabel}</Badge>
            )}
          </div>
        </div>
        <CardTitle className="mt-4 text-xl">{product.name}</CardTitle>
      </CardHeader>

      <CardContent className="relative space-y-5">
        <p className="text-sm text-cream-dim">{product.description}</p>

        {/* Price block */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-3xl font-bold text-cream">
              {formatCurrency(product.price)}
            </span>
            {/* Anchor price — show individual total for bundle */}
            {isBundle && (
              <span className="font-mono text-base text-cream-dim/40 line-through decoration-red-400/50">
                {formatCurrency(INDIVIDUAL_TOTAL)}
              </span>
            )}
            <span className="font-mono text-xs text-cream-dim/50">/ 90-day access</span>
          </div>
          {isBundle && (
            <p className="font-mono text-xs text-teal/70">
              ↓ Save {formatCurrency(INDIVIDUAL_TOTAL - product.price)} vs buying individually
            </p>
          )}
        </div>

        {/* Urgency strip on bundle only */}
        {isBundle && <UrgencyStrip timeLeft={timeLeft} />}

        {/* Features */}
        <ul className="space-y-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-cream-dim">
              <Check className="h-3.5 w-3.5 shrink-0 text-teal" />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          className="w-full group/btn"
          size="lg"
          variant={isBundle ? "amber" : "default"}
          onClick={() => onPurchase?.(product.key)}
        >
          {isBundle ? "Get the Full Bundle — $99" : "Get Started"}
          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Button>

        {/* Urgency footnote for bundle */}
        {isBundle && product.urgencyNote && (
          <p className="text-center font-mono text-[0.6rem] text-cream-dim/30">{product.urgencyNote}</p>
        )}
      </CardContent>
    </Card>
  );
}

/* ─── Product Grid ───────────────────────────────────────────────── */
interface ProductGridProps {
  onPurchase?: (productKey: string) => void;
}

export function ProductGrid({ onPurchase }: ProductGridProps) {
  const timeLeft = useUrgencyCountdown();

  return (
    <section className="py-24" id="products">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section heading */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-teal">Study Materials</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
            Everything You Need to Pass the SPI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-cream-dim">
            Clinically focused materials built directly from ARDMS exam blueprints by a credentialed 
            RDMS instructor. Start with a free demo — upgrade when you're ready.
          </p>
        </motion.div>

        {/* Early-access banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 mx-auto max-w-2xl flex items-center justify-center gap-3 rounded-xl border border-teal/15 bg-teal/[0.04] px-5 py-3"
        >
          <Zap className="h-4 w-4 text-teal shrink-0" />
          <p className="text-sm text-cream-dim">
            <span className="text-cream font-semibold">Early access pricing</span> — 
            SonoPrep launched recently and these are introductory rates. 
            Lock them in before they go up.
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className={product.key === "PREMIUM_BUNDLE" ? "sm:col-span-2" : ""}
            >
              <ProductCard product={product} onPurchase={onPurchase} timeLeft={timeLeft} />
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          <TrustBar />
        </motion.div>

      </div>
    </section>
  );
}
