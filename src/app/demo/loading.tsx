/* ── Demo Page Loading Skeleton ────────────────────────────────────
   Matches the demo page: header + badge + tabs + content area.
   ──────────────────────────────────────────────────────────────────── */

export default function DemoLoading() {
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

      {/* Content */}
      <div className="pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Page header */}
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="mb-4 h-6 w-44 rounded-full shimmer" />
            <div className="h-10 w-64 rounded shimmer" />
            <div className="mt-4 h-5 w-96 rounded shimmer" />
          </div>

          {/* Tabs skeleton */}
          <div className="mx-auto mb-8 flex w-fit gap-2">
            <div className="h-9 w-44 rounded shimmer" />
            <div className="h-9 w-44 rounded shimmer" />
          </div>

          {/* Exam content area skeleton */}
          <div className="rounded border border-border bg-charcoal p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-4 w-32 rounded shimmer" />
              <div className="h-4 w-20 rounded shimmer" />
            </div>
            <div className="space-y-3">
              <div className="h-5 w-full rounded shimmer" />
              <div className="h-5 w-3/4 rounded shimmer" />
            </div>
            <div className="space-y-3 pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-full rounded border border-border shimmer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
