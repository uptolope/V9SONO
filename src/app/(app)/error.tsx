"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, LayoutDashboard } from "lucide-react";

/* ── App Section Error Boundary ───────────────────────────────────
   Catches errors in the authenticated (app) routes. Shows inside
   the sidebar layout so navigation remains functional.
   ──────────────────────────────────────────────────────────────────── */

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[SonoPrep] App section error:", error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-error/10">
          <AlertTriangle className="h-7 w-7 text-error" />
        </div>

        {/* Heading */}
        <h2 className="font-display text-xl font-bold text-cream">
          Something Went Wrong
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-cream-dim">
          This page encountered an error. Your study progress is safe — try
          reloading or navigate to another section.
        </p>

        {/* Error digest */}
        {error.digest && (
          <p className="mt-3 font-mono text-[0.65rem] text-cream-dim/60">
            Ref: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded bg-teal px-5 py-2 font-mono text-xs font-medium uppercase tracking-wider text-obsidian transition-colors hover:bg-teal-glow"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded border border-border px-5 py-2 font-mono text-xs font-medium uppercase tracking-wider text-cream-dim transition-colors hover:bg-mist hover:text-cream"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Dashboard
          </a>
        </div>

        <p className="mt-6 text-xs text-cream-dim/60">
          Need help?{" "}
          <a
            href="mailto:support@sonoprep.com"
            className="text-teal hover:text-teal-glow underline underline-offset-2"
          >
            support@sonoprep.com
          </a>
        </p>
      </div>
    </div>
  );
}
