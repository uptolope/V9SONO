"use client";

import { useContent } from "@/hooks/use-content";
import { ContentProtection } from "@/components/app/content-protection";
import { ExamSimulator } from "@/components/app/exam-simulator";
import { Lock, ShoppingCart, GraduationCap, Clock, Target, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ExamResponse {
  questions: {
    id: number;
    question: string;
    options: string[];
    domain: string;
  }[];
  total: number;
  domains: { value: string; label: string; count: number }[];
  attempts: {
    used: number;
    total: number;
    remaining: number;
    currentAttempt: number;
  };
  access: { expiresAt: string; daysRemaining: number };
}

export default function ExamPage() {
  const { data, loading, error, accessDenied, purchaseUrl } =
    useContent<ExamResponse>({ endpoint: "/api/content/exam" });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border border-teal/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-teal/20 animate-pulse" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-cream-dim/40">Loading exam</p>
      </div>
    );
  }

  if (accessDenied) {
    // Check if it's an attempts-exhausted error vs purchase-required
    const isExhausted = error?.includes("All exam attempts used");

    if (isExhausted) {
      return (
        <div className="mx-auto max-w-md py-32 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/20">
            <XCircle className="h-6 w-6 text-red-400" aria-hidden="true" />
          </div>
          <h2 className="font-display text-xl font-bold text-cream">All Attempts Used</h2>
          <p className="mt-3 text-sm text-cream-dim/70 leading-relaxed">
            You&apos;ve completed all 3 exam attempts included with your purchase. 
            Your scores and detailed analytics are available on your dashboard.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="btn-glow" asChild>
              <Link href="/dashboard">
                <GraduationCap className="mr-2 h-4 w-4" aria-hidden="true" />
                View Results
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="mailto:support@sonoprep.com">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-md py-32 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 ring-1 ring-teal/20">
          <Lock className="h-6 w-6 text-teal" aria-hidden="true" />
        </div>
        <h2 className="font-display text-xl font-bold text-cream">Exam Access Required</h2>
        <p className="mt-3 text-sm text-cream-dim/70 leading-relaxed">
          {error || "Purchase Exam Simulator to access 110 full ARDMS-weighted practice questions."}
        </p>
        <Button className="mt-8 btn-glow" asChild>
          <Link href={purchaseUrl || "/billing?product=EXAM_SIMULATOR"}>
            <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
            Purchase Access — $49.99
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
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-teal mb-1">ARDMS Simulation</p>
            <h1 className="font-display text-3xl font-bold text-cream">Exam Simulator</h1>
            <p className="mt-1 text-sm text-cream-dim/60">
              {data.total} questions · Timed · {data.access.daysRemaining} days remaining
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-teal/10 px-4 py-2 ring-1 ring-teal/20">
            <GraduationCap className="h-4 w-4 text-teal" aria-hidden="true" />
            <span className="font-mono text-sm font-bold text-teal">
              {data.attempts.remaining}/{data.attempts.total} left
            </span>
          </div>
        </div>

        {/* Exam info bar */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Target, label: "Questions", value: `${data.total}` },
            { icon: Clock, label: "Time limit", value: "2 hours" },
            { icon: AlertTriangle, label: "Passing score", value: "≥79%" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl border border-border/40 bg-white/[0.02] p-4 text-center">
              <Icon className="mx-auto mb-2 h-4 w-4 text-teal/60" aria-hidden="true" />
              <p className="font-mono text-lg font-bold text-cream">{value}</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-wide text-cream-dim/40">{label}</p>
            </div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

        {/* Exam Simulator — no correctIndex passed, no answers leak */}
        <ExamSimulator
          questions={data.questions.map((q) => ({
            id: q.id,
            question: q.question,
            options: q.options,
            domain: q.domain,
          }))}
          attempts={data.attempts}
        />
      </div>
    </ContentProtection>
  );
}
