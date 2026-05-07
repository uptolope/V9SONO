"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div className="flex items-center justify-center min-h-screen"><div className="animate-pulse text-white/30">loading...</div></div>;
  if (!session) redirect("/auth/signin");

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="display-eyebrow">session active</span>
          <h1 className="display-headline text-4xl sm:text-5xl mt-2">{session.user?.name?.split(" ")[0] || "Sonographer"}</h1>
          <div className="w-12 h-px bg-[#ff6b4a] mt-4" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="depth-border p-6"><div className="text-white/40 text-xs font-mono tracking-wider mb-2">Flashcards reviewed</div><div className="text-3xl font-bold text-white mb-1">847</div><div className="text-[#ff6b4a] text-sm">+12%</div></div>
          <div className="depth-border p-6"><div className="text-white/40 text-xs font-mono tracking-wider mb-2">Exam attempts</div><div className="text-3xl font-bold text-white mb-1">4</div><div className="text-[#ff6b4a] text-sm">+2</div></div>
          <div className="depth-border p-6"><div className="text-white/40 text-xs font-mono tracking-wider mb-2">Best score</div><div className="text-3xl font-bold text-white mb-1">82%</div><div className="text-[#ff6b4a] text-sm">+5%</div></div>
          <div className="depth-border p-6"><div className="text-white/40 text-xs font-mono tracking-wider mb-2">Study streak</div><div className="text-3xl font-bold text-white mb-1">7 days</div><div className="text-[#ff6b4a] text-sm">🔥</div></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/flashcards" className="depth-border p-6 hover:border-[#ff6b4a] transition-all"><div className="text-2xl mb-2">📇</div><div className="font-bold text-white mb-1">Flashcards</div><div className="text-white/40 text-sm">2,400 cards · spaced repetition</div></Link>
          <Link href="/exam" className="depth-border p-6 hover:border-[#ff6b4a] transition-all"><div className="text-2xl mb-2">🎯</div><div className="font-bold text-white mb-1">Exam Simulator</div><div className="text-white/40 text-sm">170 questions · timed</div></Link>
          <Link href="/notes" className="depth-border p-6 hover:border-[#ff6b4a] transition-all"><div className="text-2xl mb-2">📘</div><div className="font-bold text-white mb-1">Study Notes</div><div className="text-white/40 text-sm">300 pages · annotated</div></Link>
        </div>
      </div>
    </div>
  );
}
