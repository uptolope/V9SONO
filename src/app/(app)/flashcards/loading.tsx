/* ── Flashcards Loading Skeleton ───────────────────────────────────
   Matches the flashcards page layout: title, start card, progress stats.
   ──────────────────────────────────────────────────────────────────── */

export default function FlashcardsLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div>
        <div className="h-8 w-36 rounded shimmer" />
        <div className="mt-2 h-4 w-64 rounded shimmer" />
      </div>

      {/* Start card */}
      <div className="rounded border border-amber/20 bg-charcoal p-6">
        <div className="flex flex-col items-center py-10">
          <div className="h-16 w-16 rounded-full shimmer" />
          <div className="mt-4 h-6 w-48 rounded shimmer" />
          <div className="mt-3 h-4 w-80 rounded shimmer" />
          <div className="mt-2 h-4 w-72 rounded shimmer" />
          <div className="mt-6 flex gap-6">
            <div className="h-4 w-24 rounded shimmer" />
            <div className="h-4 w-28 rounded shimmer" />
          </div>
          <div className="mt-8 h-12 w-44 rounded shimmer" />
        </div>
      </div>

      {/* Progress stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded border border-border bg-charcoal p-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full shimmer" />
              <div className="space-y-2">
                <div className="h-6 w-10 rounded shimmer" />
                <div className="h-2.5 w-16 rounded shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
