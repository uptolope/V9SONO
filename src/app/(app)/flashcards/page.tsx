"use client";

import { useState } from "react";
import { useContent } from "@/hooks/use-content";
import { ContentProtection } from "@/components/app/content-protection";
import { FlashcardViewer } from "@/components/app/flashcard-viewer";
import { Lock, Loader2, ShoppingCart, BookOpen, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FlashcardsResponse {
  cards: { id: number; question: string; answer: string; category: string }[];
  total: number;
  categories: { value: string; label: string; count: number }[];
  access: { expiresAt: string; daysRemaining: number };
}

export default function FlashcardsPage() {
  const [category, setCategory] = useState("all");
  const { data, loading, error, accessDenied, purchaseUrl } =
    useContent<FlashcardsResponse>({
      endpoint: "/api/content/flashcards",
      params: category !== "all" ? { category, limit: "300" } : { limit: "300" },
    });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border border-teal/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-teal/20 animate-pulse" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-cream-dim/40">Loading flashcards</p>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="mx-auto max-w-md py-32 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 ring-1 ring-teal/20">
          <Lock className="h-6 w-6 text-teal" aria-hidden="true" />
        </div>
        <h2 className="font-display text-xl font-bold text-cream">Flashcard Access Required</h2>
        <p className="mt-3 text-sm text-cream-dim/70 leading-relaxed">
          {error || "Purchase Flashcards to access 200 spaced-repetition cards across all 6 SPI domains."}
        </p>
        <Button className="mt-8 btn-glow" asChild>
          <Link href={purchaseUrl || "/billing?product=FLASHCARDS"}>
            <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
            Purchase Access — $24
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
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-teal mb-1">Spaced Repetition</p>
            <h1 className="font-display text-3xl font-bold text-cream">Flashcards</h1>
            <p className="mt-1 text-sm text-cream-dim/60">
              {data.total} cards · SM-2 algorithm · {data.access.daysRemaining} days remaining
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-teal/10 px-4 py-2 ring-1 ring-teal/20">
            <BookOpen className="h-4 w-4 text-teal" aria-hidden="true" />
            <span className="font-mono text-sm font-bold text-teal">{data.total}</span>
          </div>
        </div>

        {/* Category filters */}
        <div>
          <p className="font-mono text-[0.55rem] uppercase tracking-widest text-cream-dim/30 mb-3">Filter by domain</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter flashcards by category">
            <button
              onClick={() => setCategory("all")}
              aria-pressed={category === "all"}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-mono transition-all duration-200",
                category === "all"
                  ? "bg-teal text-obsidian font-bold shadow-[0_0_12px_rgba(13,148,136,0.3)]"
                  : "bg-white/[0.04] text-cream-dim/60 hover:bg-white/[0.07] hover:text-cream border border-border/40"
              )}
            >
              All ({data.categories.reduce((s, c) => s + c.count, 0)})
            </button>
            {data.categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                aria-pressed={category === cat.value}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-mono transition-all duration-200",
                  category === cat.value
                    ? "bg-teal text-obsidian font-bold shadow-[0_0_12px_rgba(13,148,136,0.3)]"
                    : "bg-white/[0.04] text-cream-dim/60 hover:bg-white/[0.07] hover:text-cream border border-border/40"
                )}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

        {/* Flashcard Viewer */}
        <FlashcardViewer
          cards={data.cards.map((c) => ({
            id: c.id,
            front: c.question,
            back: c.answer,
            category: c.category,
          }))}
        />
      </div>
    </ContentProtection>
  );
}
