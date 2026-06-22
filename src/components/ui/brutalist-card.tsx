"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export function BrutalistCard({ children, href, className, variant = "default" }: { children: React.ReactNode; href?: string; className?: string; variant?: "default" | "featured" | "product" }) {
  const content = (
    <div className={cn("relative group", variant === "featured" && "border-l-[3px] border-[#ff6b4a] bg-white/[0.02]", className)}>
      <div className={cn("depth-border corner-arch p-6 transition-all duration-300 h-full", variant === "product" && "flex flex-col")}>{children}</div>
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

export function BrutalistCardBadge({ children }: { children: React.ReactNode }) {
  return <div className="absolute top-0 left-0 bg-[#ff6b4a] px-3 py-1 text-[10px] font-mono tracking-wider text-black z-10">{children}</div>;
}

export function BrutalistCardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-bold tracking-tight text-white mb-3 leading-tight">{children}</h3>;
}

export function BrutalistCardDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-white/40 text-sm leading-relaxed">{children}</p>;
}

export function BrutalistCardPrice({ children }: { children: React.ReactNode }) {
  return <div className="text-2xl font-bold text-[#ff6b4a] mb-4">{children}<span className="text-xs font-normal text-white/30 ml-2">/ 60-day access</span></div>;
}

export function BrutalistCardFeature({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2 text-sm text-white/60 py-1"><span className="text-[#ff6b4a]">—</span>{children}</div>;
}

export function BrutalistCardMeta({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3 text-[11px] font-mono tracking-wider text-white/30 border-t border-white/5 pt-4 mt-4">{children}</div>;
}

export function BrutalistCardCta({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 pt-4 border-t border-white/10"><span className="text-[11px] font-mono tracking-wider text-white/40 hover:text-[#ff6b4a] transition-colors inline-flex items-center gap-2">{children}<span className="text-[#ff6b4a]">→</span></span></div>;
}
