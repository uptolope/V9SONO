/* ── Products Page Loading Skeleton ────────────────────────────────
   Matches the products page: header + product grid.
   ──────────────────────────────────────────────────────────────────── */

export default function ProductsLoading() {
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

      {/* Products section */}
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section header */}
          <div className="flex flex-col items-center">
            <div className="h-3 w-28 rounded shimmer" />
            <div className="mt-4 h-10 w-80 rounded shimmer" />
            <div className="mt-4 h-5 w-96 rounded shimmer" />
          </div>

          {/* Product grid */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`rounded border border-border bg-charcoal p-6 space-y-4 ${
                  i === 4 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-full shimmer" />
                  <div className="h-5 w-20 rounded-full shimmer" />
                </div>
                <div className="h-6 w-40 rounded shimmer" />
                <div className="h-4 w-full rounded shimmer" />
                <div className="h-8 w-24 rounded shimmer" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-3 w-48 rounded shimmer" />
                  ))}
                </div>
                <div className="h-10 w-full rounded shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
