"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Eye, DollarSign, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMO_STATS = [
  { icon: Eye, value: "5", label: "Sample Questions" },
  { icon: Play, value: "100%", label: "Clinical Focus" },
  { icon: DollarSign, value: "Free", label: "No Payment Required" },
];

export function FreeDemo() {
  return (
    <section className="py-24 bg-gradient-to-b from-transparent via-charcoal/50 to-transparent relative overflow-hidden">
      {/* Background dots */}
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-teal">
            Try Before You Buy
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
            Free Demo Exam
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-cream-dim">
            Try 5 sample questions with detailed explanations. See the clarity
            of our approach before committing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button size="xl" asChild className="group">
              <Link href="/demo">
                <Play className="mr-1 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Try Free Demo (5 Questions)
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
          <Button variant="ghost" size="xl" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </motion.div>

        {/* Stats row — animated cards */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6">
          {DEMO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="group relative rounded border border-border bg-slate p-5 text-center transition-all duration-300 hover:border-teal/30 hover:shadow-glow hover:-translate-y-1"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-teal/[0.03] to-transparent" />

              <div className="relative">
                <motion.div
                  className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-mist transition-all duration-300 group-hover:bg-teal/10"
                >
                  <stat.icon className="h-4 w-4 text-teal transition-transform duration-300 group-hover:scale-110" />
                </motion.div>
                <p className="font-mono text-2xl font-bold text-teal-glow">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-cream-dim">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust line */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-2 text-cream-dim"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <Sparkles className="h-3.5 w-3.5 text-teal" />
          <p className="font-mono text-xs">
            No account or credit card required for the demo
          </p>
        </motion.div>
      </div>
    </section>
  );
}
