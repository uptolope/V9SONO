/* ── Exam Loading Skeleton ─────────────────────────────────────────
   Matches the exam page layout: title, start-exam card, past attempts.
   ──────────────────────────────────────────────────────────────────── */

export default function ExamLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div>
        <div className="h-8 w-40 rounded shimmer" />
        <div className="mt-2 h-4 w-72 rounded shimmer" />
      </div>

      {/* Start exam card */}
      <div className="rounded border border-teal/20 bg-charcoal p-6">
        <div className="flex flex-col items-center py-10">
          <div className="h-16 w-16 rounded-full shimmer" />
          <div className="mt-4 h-6 w-40 rounded shimmer" />
          <div className="mt-3 h-4 w-80 rounded shimmer" />
          <div className="mt-2 h-4 w-64 rounded shimmer" />
          <div className="mt-6 flex gap-6">
            <div className="h-4 w-28 rounded shimmer" />
            <div className="h-4 w-20 rounded shimmer" />
          </div>
          <div className="mt-8 h-12 w-48 rounded shimmer" />
        </div>
      </div>

      {/* Past attempts card */}
      <div className="rounded border border-border bg-charcoal p-6">
        <div className="h-5 w-28 rounded shimmer" />
        <div className="mt-6 flex justify-center py-4">
          <div className="h-4 w-64 rounded shimmer" />
        </div>
      </div>
    </div>
  );
}
