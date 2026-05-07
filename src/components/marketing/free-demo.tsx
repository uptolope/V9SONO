"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Eye, DollarSign, ArrowRight, Sparkles, Zap, CheckCircle2, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMO_STATS = [
  { icon: Eye, value: "10", label: "Sample Questions" },
  { icon: Zap, value: "100%", label: "Full Experience" },
  { icon: CheckCircle2, value: "Works", label: "Instant Access" },
];

export function FreeDemo() {
  return (
    <section className="py-32 bg-gradient-to-b from-transparent via-charcoal/50 to-transparent relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dots opacity-30" />

      {/* Animated gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-teal/10 via-transparent to-cobalt/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Heading with premium animation */}
        <motion.div
          className="text-center"
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
            <span className="font-mono text-xs uppercase tracking-widest text-teal">Try Before You Buy</span>
          </motion.div>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cream">
            Experience the{" "}
            <motion.span
              className="animate-text-shimmer"
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              Full Platform
            </motion.span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream-dim leading-relaxed">
            Take our 10-question exam simulator and 10-flashcard deck for a spin.
            No account, no credit card — just instant access to see if SonoPrep is right for you.
          </p>
        </motion.div>

        {/* Main CTA with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal via-teal-glow to-teal rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

            <Button size="xl" asChild className="relative btn-glow group">
              <Link href="/demo">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-3"
                >
                  <Play className="h-5 w-5" />
                </motion.div>
                <span className="text-lg font-semibold">Try Free Demo Now</span>
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-3 h-5 w-5" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <Button variant="ghost" size="lg" asChild className="text-cream-dim hover:text-cream">
              <Link href="/products" className="flex items-center gap-2">
                <MousePointer className="h-4 w-4" />
                View Pricing
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats row with premium animations */}
        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-6">
          {DEMO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.15,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group relative rounded-2xl border border-border bg-gradient-to-b from-charcoal/80 to-slate/40 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-teal/30 hover:shadow-lg hover:shadow-teal/10 cursor-default overflow-hidden"
            >
              {/* Hover glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <motion.div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 border border-teal/20 transition-all duration-300 group-hover:bg-teal/20 group-hover:scale-110"
              >
                <stat.icon className="h-6 w-6 text-teal-glow transition-transform duration-300 group-hover:scale-110" />
              </motion.div>

              <p className="font-mono text-3xl font-bold text-teal-glow group-hover:text-teal transition-colors">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-cream-dim/70 group-hover:text-cream-dim transition-colors">
                {stat.label}
              </p>

              {/* Animated border glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-teal/0 group-hover:border-teal/30"
                animate={{ boxShadow: ["inset 0 0 0 0 rgba(20,184,166,0)", "inset 0 0 30px 0 rgba(20,184,166,0.1)", "inset 0 0 0 0 rgba(20,184,166,0)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>

        {/* Trust indicators with stagger animation */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-cream-dim/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {[
            { icon: DollarSign, text: "No credit card required" },
            { icon: CheckCircle2, text: "Instant access" },
            { icon: Sparkles, text: "No account needed" },
          ].map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="flex items-center gap-2 font-mono text-sm"
            >
              <Icon className="h-4 w-4 text-teal/60" />
              {text}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}