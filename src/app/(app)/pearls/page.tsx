"use client";

import { useContent } from "@/hooks/use-content";
import { ContentProtection } from "@/components/app/content-protection";
import { motion } from "framer-motion";
import { Lightbulb, Lock, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PearlsResponse {
  pearls: { id: number; text: string }[];
  total: number;
  access: { expiresAt: string; daysRemaining: number };
}

export default function PearlsPage() {
  const { data, loading, error, accessDenied, purchaseUrl } =
    useContent<PearlsResponse>({ endpoint: "/api/content/pearls" });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border border-teal/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-teal/20 animate-pulse" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-cream-dim/40">Loading pearls</p>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="mx-auto max-w-md py-32 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 ring-1 ring-teal/20">
          <Lock className="h-6 w-6 text-teal" aria-hidden="true" />
        </div>
        <h2 className="font-display text-xl font-bold text-cream">Physics Pearls Access Required</h2>
        <p className="mt-3 text-sm text-cream-dim/70 leading-relaxed">
          {error || "Purchase Physics Pearls to access 50 high-yield clinical insights."}
        </p>
        <Button className="mt-8 btn-glow" asChild>
          <Link href={purchaseUrl || "/billing?product=PHYSICS_PEARLS"}>
            <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
            Purchase Access — $9
          </Link>
        </Button>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-32 text-center">
        <p className="text-cream-dim/60 text-sm">{error || "Failed to load content."}</p>
      </div>
    );
  }

  return (
    <ContentProtection>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-teal mb-1">High-Yield Concepts</p>
            <h1 className="font-display text-3xl font-bold text-cream">Physics Pearls</h1>
            <p className="mt-1 text-sm text-cream-dim/60">
              {data.total} clinical insights · Written by RDMS-credentialed sonographers · {data.access.daysRemaining} days remaining
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-teal/10 px-4 py-2 ring-1 ring-teal/20">
            <Lightbulb className="h-4 w-4 text-teal" aria-hidden="true" />
            <span className="font-mono text-sm font-bold text-teal">{data.total}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

        {/* Pearls grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {data.pearls.map((pearl, i) => (
            <motion.div
              key={pearl.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.025, duration: 0.4 }}
              className="group rounded-xl border border-border/40 bg-white/[0.02] p-5 transition-all duration-300 hover:border-teal/30 hover:bg-teal/[0.02] hover:shadow-[0_0_20px_rgba(13,148,136,0.05)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal/10 ring-1 ring-teal/20 group-hover:bg-teal/15 transition-colors">
                  <span className="font-mono text-xs font-bold text-teal">{pearl.id}</span>
                </div>
                <p className="text-sm leading-relaxed text-cream/80 group-hover:text-cream transition-colors">
                  {pearl.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ContentProtection>
  );
}
