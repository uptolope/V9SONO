import Link from "next/link";
import type { Metadata } from "next";
import { Home, ArrowRight } from "lucide-react";

/* ── 404 Not Found ────────────────────────────────────────────────
   Branded 404 page. Server Component for optimal performance.
   ──────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-obsidian px-6">
      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal/3 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-lg text-center">
        {/* 404 badge */}
        <p className="font-mono text-xs uppercase tracking-widest text-teal">
          Error 404
        </p>

        {/* Large number */}
        <h1 className="mt-4 font-display text-8xl font-bold text-cream/10 sm:text-9xl">
          404
        </h1>

        {/* Overlapping heading */}
        <h2 className="-mt-12 font-display text-2xl font-bold text-cream sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-cream-dim">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Check the URL or use the links below to find what you need.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded bg-teal px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-obsidian transition-colors hover:bg-teal-glow"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded border border-border px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-cream-dim transition-colors hover:bg-mist hover:text-cream"
          >
            View Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {[
            { href: "/demo", label: "Free Demo" },
            { href: "/about", label: "About Us" },
            { href: "/faq", label: "FAQ" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-cream-dim transition-colors hover:text-teal-glow"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
