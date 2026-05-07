/* ── Root Loading Skeleton ─────────────────────────────────────────
   Shown while the root layout resolves — matches the marketing page
   structure (header + hero area + content blocks).
   ──────────────────────────────────────────────────────────────────── */

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-obsidian">
      {/* Header skeleton */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="h-6 w-28 rounded shimmer" />
        <div className="hidden items-center gap-6 md:flex">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-3 w-14 rounded shimmer" />
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <div className="h-8 w-16 rounded shimmer" />
          <div className="h-8 w-24 rounded shimmer" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-6">
        <div className="h-6 w-48 rounded-full shimmer" />
        <div className="mt-8 h-12 w-[min(90%,38rem)] rounded shimmer" />
        <div className="mt-4 h-12 w-[min(70%,28rem)] rounded shimmer" />
        <div className="mt-6 h-5 w-[min(80%,32rem)] rounded shimmer" />
        <div className="mt-2 h-5 w-[min(60%,24rem)] rounded shimmer" />

        {/* CTA buttons skeleton */}
        <div className="mt-10 flex gap-4">
          <div className="h-12 w-36 rounded shimmer" />
          <div className="h-12 w-36 rounded shimmer" />
        </div>
      </div>
    </div>
  );
}
