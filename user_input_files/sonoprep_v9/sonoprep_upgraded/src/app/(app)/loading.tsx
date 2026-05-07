/* ── App Section Loading Skeleton ──────────────────────────────────
   Shown inside the (app) layout while a child page resolves.
   Matches the sidebar + content layout.
   ──────────────────────────────────────────────────────────────────── */

export default function AppSectionLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page title skeleton */}
      <div>
        <div className="h-8 w-48 rounded shimmer" />
        <div className="mt-2 h-4 w-72 rounded shimmer" />
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded border border-border bg-charcoal p-5"
          >
            <div className="h-8 w-16 rounded shimmer" />
            <div className="mt-2 h-3 w-24 rounded shimmer" />
          </div>
        ))}
      </div>

      {/* Content cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded border border-border bg-charcoal p-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 shrink-0 rounded-full shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded shimmer" />
                <div className="h-3 w-48 rounded shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity card skeleton */}
      <div className="rounded border border-border bg-charcoal p-6">
        <div className="h-5 w-36 rounded shimmer" />
        <div className="mt-6 flex flex-col items-center py-8">
          <div className="h-10 w-10 rounded-full shimmer" />
          <div className="mt-4 h-4 w-56 rounded shimmer" />
        </div>
      </div>
    </div>
  );
}
