"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EmailCaptureProps {
  /** Short headline above the form */
  headline?: string;
  /** Subtext below the headline */
  description?: string;
  /** Where the lead came from — sent to the API */
  source: "demo_exam" | "demo_flashcards";
  /** Optional score (for exam demos) */
  score?: number;
  /** Weakest topic category from the exam */
  weakestCategory?: string;
  /** Called after successful capture */
  onComplete: () => void;
}

export function EmailCapture({
  headline = "Enter your email to see your results",
  description = "We'll also send you free SPI study tips. No spam, ever.",
  source,
  score,
  weakestCategory,
  onComplete,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/demo/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source, score, weakestCategory }),
      });
      // Always proceed even if capture fails — don't block the UX
      onComplete();
    } catch {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-md"
    >
      <Card className="border-teal/40 shadow-glow">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal/10">
            <Mail className="h-6 w-6 text-teal-glow" />
          </div>
          <CardTitle className="font-display text-xl">{headline}</CardTitle>
          <p className="mt-2 text-sm text-cream-dim">{description}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email-capture-input" className="sr-only">
                Email address
              </label>
              <input
                id="email-capture-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoFocus
                autoComplete="email"
                required
                aria-required="true"
                aria-describedby={error ? "email-capture-error" : undefined}
                className="w-full rounded border border-border bg-charcoal px-4 py-3 text-sm text-cream placeholder:text-cream-dim/50 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              />
              {error && (
                <p id="email-capture-error" role="alert" className="mt-1.5 text-xs text-error">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-4 w-4" />
              )}
              See My Results
            </Button>
          </form>
          <p className="mt-4 text-center font-mono text-[0.6rem] text-cream-dim/60">
            By submitting you agree to receive occasional SPI study tips. Unsubscribe at any time.{" "}
            <a href="/privacy" className="underline hover:text-cream-dim transition-colors">Privacy Policy</a>.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
