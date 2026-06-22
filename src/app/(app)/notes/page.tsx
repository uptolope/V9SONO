"use client";

import { useState } from "react";
import { useContent } from "@/hooks/use-content";
import { ContentProtection } from "@/components/app/content-protection";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Lock,
  Loader2,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Formula {
  title: string;
  formula: string;
  explanation: string;
}

interface ComparisonTable {
  headers: string[];
  rows: string[][];
}

interface StudyCard {
  title: string;
  subtitle: string;
  bullets: string[];
  formulas: Formula[];
  tables: ComparisonTable[];
}

interface StudySection {
  id: number;
  title: string;
  cards: StudyCard[];
}

interface NotesResponse {
  sections: StudySection[];
  totalSections: number;
  totalCards: number;
  access: { expiresAt: string; daysRemaining: number };
}

export default function NotesPage() {
  const { data, loading, error, accessDenied, purchaseUrl } =
    useContent<NotesResponse>({ endpoint: "/api/content/notes" });
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set([1])
  );

  const toggleSection = (id: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border border-teal/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-teal/20 animate-pulse" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-cream-dim/40">Loading notes</p>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="mx-auto max-w-md py-32 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 ring-1 ring-teal/20">
          <Lock className="h-6 w-6 text-teal" aria-hidden="true" />
        </div>
        <h2 className="font-display text-xl font-bold text-cream">Study Notes Access Required</h2>
        <p className="mt-3 text-sm text-cream-dim/70 leading-relaxed">
          {error || "Purchase Study Notes for the comprehensive domain guide."}
        </p>
        <Button className="mt-8 btn-glow" asChild>
          <Link href={purchaseUrl || "/billing?product=STUDY_NOTES"}>
            <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
            Purchase Access — $34
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
      <div className="space-y-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-teal mb-1">Domain Reference</p>
            <h1 className="font-display text-3xl font-bold text-cream">Study Notes</h1>
            <p className="mt-1 text-sm text-cream-dim/60">
              {data.totalSections} sections · {data.totalCards} topic cards · {data.access.daysRemaining} days remaining
            </p>
          </div>
          <Badge>
            <BookOpen className="mr-1 h-3 w-3" />
            {data.totalSections} Sections
          </Badge>
        </div>

        <div className="space-y-3">
          {data.sections.map((section) => {
            const isExpanded = expandedSections.has(section.id);
            return (
              <Card key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-mist/50 transition-colors rounded-t-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/10 font-mono text-xs font-bold text-teal">
                      {section.id}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-cream">
                        {section.title}
                      </h3>
                      <p className="text-sm text-cream-dim">
                        {section.cards.length} topics
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-cream-dim" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-cream-dim" />
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <CardContent className="space-y-4 pt-0">
                        {section.cards.map((card, ci) => (
                          <div
                            key={ci}
                            className="rounded-lg border border-border bg-charcoal/50 p-4"
                          >
                            <h4 className="font-display text-base font-semibold text-teal">
                              {card.title}
                            </h4>
                            {card.subtitle && (
                              <p className="mt-1 text-sm text-cream-dim">
                                {card.subtitle}
                              </p>
                            )}

                            {/* Formulas */}
                            {card.formulas.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {card.formulas.map((f, fi) => (
                                  <div
                                    key={fi}
                                    className="rounded border border-amber/20 bg-amber/5 p-3"
                                  >
                                    <p className="font-mono text-sm font-bold text-amber">
                                      {f.title}
                                    </p>
                                    <p className="mt-1 font-mono text-base text-cream">
                                      {f.formula}
                                    </p>
                                    {f.explanation && (
                                      <p className="mt-1 text-base text-cream-dim">
                                        {f.explanation}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Bullet points */}
                            {card.bullets.length > 0 && (
                              <ul className="mt-3 space-y-1.5">
                                {card.bullets.map((b, bi) => (
                                  <li
                                    key={bi}
                                    className="flex items-start gap-2 text-sm text-cream/90"
                                  >
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal" />
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Tables */}
                            {card.tables.length > 0 &&
                              card.tables.map((t, ti) => (
                                <div
                                  key={ti}
                                  className="mt-3 overflow-x-auto rounded border border-border"
                                >
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="bg-mist">
                                        {t.headers.map((h, hi) => (
                                          <th
                                            key={hi}
                                            className="p-2 text-left font-mono font-semibold text-cream"
                                          >
                                            {h}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {t.rows.map((row, ri) => (
                                        <tr
                                          key={ri}
                                          className="border-t border-border"
                                        >
                                          {row.map((cell, ci2) => (
                                            <td
                                              key={ci2}
                                              className="p-2 text-cream-dim"
                                            >
                                              {cell}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ))}
                          </div>
                        ))}
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </div>
    </ContentProtection>
  );
}
