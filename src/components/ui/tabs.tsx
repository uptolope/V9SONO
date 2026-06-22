"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/* ── Tabs context ────────────────────────────────────────────────── */
const TabsContext = createContext<{
  value: string;
  onChange: (v: string) => void;
}>({ value: "", onChange: () => {} });

/* ── Tabs root ───────────────────────────────────────────────────── */
export function Tabs({
  defaultValue,
  className = "",
  children,
}: {
  defaultValue: string;
  className?: string;
  children: ReactNode;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, onChange: setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

/* ── TabsList ────────────────────────────────────────────────────── */
export function TabsList({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`inline-flex items-center gap-1 p-1 bg-[#111318] border border-white/5 rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}

/* ── TabsTrigger ─────────────────────────────────────────────────── */
export function TabsTrigger({
  value,
  className = "",
  children,
}: {
  value: string;
  className?: string;
  children: ReactNode;
}) {
  const ctx = useContext(TabsContext);
  const active = ctx.value === value;

  return (
    <button
      onClick={() => ctx.onChange(value)}
      className={`px-4 py-2 text-xs font-medium rounded transition-all ${
        active
          ? "bg-[#c85b3a]/15 text-[#c85b3a]"
          : "text-[#8a8279] hover:text-white"
      } ${className}`}
    >
      {children}
    </button>
  );
}

/* ── TabsContent ─────────────────────────────────────────────────── */
export function TabsContent({
  value,
  className = "",
  children,
}: {
  value: string;
  className?: string;
  children: ReactNode;
}) {
  const ctx = useContext(TabsContext);
  if (ctx.value !== value) return null;

  return <div className={className}>{children}</div>;
}
