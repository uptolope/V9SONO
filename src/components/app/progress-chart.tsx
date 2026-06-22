"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────── */
/* Category Performance Bar Chart                                      */
/* ─────────────────────────────────────────────────────────────────── */

interface CategoryData {
  name: string;
  correct: number;
  total: number;
  color?: string;
}

interface ProgressChartProps {
  data: CategoryData[];
  title?: string;
}

export function ProgressChart({
  data,
  title = "Performance by Category",
}: ProgressChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((cat, i) => {
          const pct = cat.total > 0 ? Math.round((cat.correct / cat.total) * 100) : 0;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="text-cream">{cat.name}</span>
                <span className="font-mono text-cream-dim">
                  {cat.correct}/{cat.total} ({pct}%)
                </span>
              </div>
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-charcoal">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={cn(
                    "h-full rounded-full",
                    pct >= 80
                      ? "bg-success"
                      : pct >= 60
                        ? "bg-teal"
                        : pct >= 40
                          ? "bg-amber"
                          : "bg-error"
                  )}
                />
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* Study Streak / Stats Grid                                           */
/* ─────────────────────────────────────────────────────────────────── */

interface StatItem {
  label: string;
  value: string | number;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
}

interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <p className="font-mono text-2xl font-bold text-teal-glow">
                {stat.value}
                {stat.suffix && (
                  <span className="text-sm text-cream-dim">{stat.suffix}</span>
                )}
              </p>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-cream-dim">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
