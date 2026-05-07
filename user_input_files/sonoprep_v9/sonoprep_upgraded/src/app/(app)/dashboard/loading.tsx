/* ── Dashboard Loading Skeleton ────────────────────────────────────
   Matches the dashboard layout: welcome header, stats grid,
   study tools grid, and activity card.
   ──────────────────────────────────────────────────────────────────── */

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome header */}
      <div>
        <div className="h-8 w-64 rounded shimmer" />
        <div className="mt-2 h-4 w-80 rounded shimmer" />
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded border border-border bg-charcoal p-5"
          >
            <div className="h-8 w-12 rounded shimmer" />
            <div className="mt-2 h-3 w-20 rounded shimmer" />
          </div>
        ))}
      </div>

      {/* Study tools label */}
      <div>
        <div className="mb-4 h-3 w-28 rounded shimmer" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded border border-border bg-charcoal p-6"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 rounded-full shimmer" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-28 rounded shimmer" />
                  <div className="h-3 w-44 rounded shimmer" />
                </div>
                <div className="h-4 w-4 rounded shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded border border-border bg-charcoal p-6">
        <div className="h-5 w-32 rounded shimmer" />
        <div className="mt-8 flex flex-col items-center py-6">
          <div className="h-8 w-8 rounded-full shimmer" />
          <div className="mt-3 h-4 w-64 rounded shimmer" />
          <div className="mt-4 h-9 w-40 rounded shimmer" />
        </div>
      </div>
    </div>
  );
}
