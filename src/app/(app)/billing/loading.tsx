/* ── Billing Loading Skeleton ──────────────────────────────────────
   Matches the billing page: title, active purchases card,
   available products grid.
   ──────────────────────────────────────────────────────────────────── */

export default function BillingLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div>
        <div className="h-8 w-44 rounded shimmer" />
        <div className="mt-2 h-4 w-72 rounded shimmer" />
      </div>

      {/* Active purchases card */}
      <div className="rounded border border-border bg-charcoal p-6">
        <div className="h-5 w-36 rounded shimmer" />
        <div className="mt-6 flex justify-center py-4">
          <div className="h-4 w-64 rounded shimmer" />
        </div>
      </div>

      {/* Section label */}
      <div className="h-3 w-36 rounded shimmer" />

      {/* Product grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded border border-border bg-charcoal p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full shimmer" />
                <div className="space-y-1.5">
                  <div className="h-4 w-28 rounded shimmer" />
                  <div className="h-3 w-36 rounded shimmer" />
                </div>
              </div>
            </div>
            <div className="h-3 w-full rounded shimmer" />
            <div className="h-9 w-full rounded shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
