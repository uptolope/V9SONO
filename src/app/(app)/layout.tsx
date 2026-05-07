"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap, BookOpen, Lightbulb, FileText,
  LayoutDashboard, User, CreditCard, LogOut, Menu, X
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/exam",      label: "Exam",      icon: GraduationCap },
  { href: "/flashcards",label: "Flashcards",icon: BookOpen },
  { href: "/pearls",    label: "Pearls",    icon: Lightbulb },
  { href: "/notes",     label: "Notes",     icon: FileText },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-obsidian">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border border-teal/20 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-teal/10 animate-pulse" />
            <div className="absolute inset-4 rounded-full bg-teal/30" />
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-cream-dim/40">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-obsidian">
      {/* ── Sidebar ───────────────────────────────────────────── */}
      {/* Mobile overlay */}
      {sideOpen && (
        <div
          className="fixed inset-0 z-30 bg-obsidian/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSideOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border/40 bg-obsidian transition-transform duration-300 lg:static lg:translate-x-0",
        sideOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border/40 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 ring-1 ring-teal/20">
            <span className="font-display text-sm font-bold text-teal">SP</span>
          </div>
          <div>
            <p className="font-display text-sm font-bold text-cream">SonoPrep</p>
            <p className="font-mono text-[0.55rem] uppercase tracking-widest text-cream-dim/40">Study Portal</p>
          </div>
          <button
            className="ml-auto lg:hidden text-cream-dim/50 hover:text-cream"
            onClick={() => setSideOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-6 px-3" aria-label="Study navigation">
          <p className="mb-3 px-3 font-mono text-[0.55rem] uppercase tracking-widest text-cream-dim/30">Study Tools</p>
          <ul className="space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setSideOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                      active
                        ? "bg-teal/10 text-teal ring-1 ring-teal/20 font-medium"
                        : "text-cream-dim hover:bg-white/[0.04] hover:text-cream"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", active ? "text-teal" : "text-cream-dim/50")} aria-hidden="true" />
                    {label}
                    {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 border-t border-border/30 pt-6">
            <p className="mb-3 px-3 font-mono text-[0.55rem] uppercase tracking-widest text-cream-dim/30">Account</p>
            <ul className="space-y-1">
              <li>
                <Link href="/account" onClick={() => setSideOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream-dim hover:bg-white/[0.04] hover:text-cream transition-colors">
                  <User className="h-4 w-4 shrink-0 text-cream-dim/50" aria-hidden="true" />
                  Account
                </Link>
              </li>
              <li>
                <Link href="/billing" onClick={() => setSideOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream-dim hover:bg-white/[0.04] hover:text-cream transition-colors">
                  <CreditCard className="h-4 w-4 shrink-0 text-cream-dim/50" aria-hidden="true" />
                  Billing
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream-dim hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* User pill */}
        <div className="border-t border-border/40 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2.5 ring-1 ring-border/20">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal/20 ring-1 ring-teal/30">
              <span className="font-mono text-xs font-bold text-teal">
                {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-cream">{session?.user?.name ?? "User"}</p>
              <p className="truncate font-mono text-[0.55rem] text-cream-dim/40">{session?.user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar - mobile only */}
        <header className="flex h-16 items-center border-b border-border/40 bg-obsidian/80 px-4 backdrop-blur-sm lg:hidden">
          <button
            onClick={() => setSideOpen(true)}
            className="rounded-lg p-2 text-cream-dim hover:bg-white/[0.04] hover:text-cream"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-3 flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-teal/10 ring-1 ring-teal/20 flex items-center justify-center">
              <span className="font-display text-[0.6rem] font-bold text-teal">SP</span>
            </div>
            <span className="font-display text-sm font-bold text-cream">SonoPrep</span>
          </div>
        </header>

        {/* Scrollable page content */}
        <main id="main-content" className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
