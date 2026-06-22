"use client";

import { Activity, Waves, ScanLine, type LucideIcon } from "lucide-react";

const showcaseItems: [string, LucideIcon][] = [
  ["Real-time Motion", Activity],
  ["Wave Physics", Waves],
  ["Clinical UI", ScanLine],
];

export default function UltrasoundShowcase() {
  return (
    <section className="w-full">
      <div className="grid gap-4 sm:grid-cols-3">
        {showcaseItems.map(([label, Icon]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
          >
            <Icon className="mb-3 h-5 w-5 text-teal-400" />
            <p className="text-sm text-stone-300">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}