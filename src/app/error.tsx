"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

/* ── Root Error Boundary ──────────────────────────────────────────
   Catches unhandled runtime errors globally. Branded with
   SonoPrep design tokens. Client Component required by Next.js.
   ──────────────────────────────────────────────────────────────────── */

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error("[SonoPrep] Root error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-6">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-error/10">
          <AlertTriangle className="h-8 w-8 text-error" />
        </div>

        {/* Heading */}
        <h1 className="font-display text-2xl font-bold text-cream">
          Something Went Wrong
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-cream-dim">
          An unexpected error occurred. This has been logged and we&apos;ll look
          into it. You can try again or head back to the homepage.
        </p>

        {/* Error digest (for support reference) */}
        {error.digest && (
          <p className="mt-3 font-mono text-[0.65rem] text-cream-dim/60">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded bg-teal px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-obsidian transition-colors hover:bg-teal-glow"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded border border-border px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-cream-dim transition-colors hover:bg-mist hover:text-cream"
          >
            <Home className="h-4 w-4" />
            Go Home
          </a>
        </div>

        {/* Support link */}
        <p className="mt-8 text-xs text-cream-dim/60">
          Persistent issue?{" "}
          <a
            href="mailto:support@sonoprep.com"
            className="text-teal hover:text-teal-glow underline underline-offset-2"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
