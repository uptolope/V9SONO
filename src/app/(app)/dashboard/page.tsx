"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { trackPurchase } from "@/lib/analytics";

interface Stats {
  exam: {
    attempts: number;
    maxAttempts: number;
    bestScore: number | null;
    lastExamDate: string | null;
  };
  flashcards: {
    reviewed: number;
    uniqueCards: number;
    started: number;
    accuracy: number | null;
  };
  studyNotes: {
    avgProgress: number;
    chaptersStarted: number;
  };
  streak: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  // Fire purchase event on Stripe success redirect
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      trackPurchase();
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/user/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {
        // Graceful degradation — show zeros
      } finally {
        setLoading(false);
      }
    }
    if (session?.user?.id) {
      fetchStats();
    }
  }, [session?.user?.id]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-white/30">loading...</div>
      </div>
    );
  }
  if (!session) redirect("/auth/signin");

  const flashcardsReviewed = stats?.flashcards?.reviewed ?? 0;
  const examAttempts = stats?.exam?.attempts ?? 0;
  const maxAttempts = stats?.exam?.maxAttempts ?? 3;
  const bestScore = stats?.exam?.bestScore;
  const streak = stats?.streak ?? 0;

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="display-eyebrow">session active</span>
          <h1 className="display-headline text-4xl sm:text-5xl mt-2">
            {session.user?.name?.split(" ")[0] || "Sonographer"}
          </h1>
          <div className="w-12 h-px bg-[#ff6b4a] mt-4" />
        </div>

        {/* Stats grid — real data from API */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="depth-border p-6">
            <div className="text-white/40 text-xs font-mono tracking-wider mb-2">
              Flashcards reviewed
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {loading ? (
                <span className="animate-pulse text-white/20">—</span>
              ) : (
                flashcardsReviewed.toLocaleString()
              )}
            </div>
            {stats?.flashcards?.accuracy !== null && stats?.flashcards?.accuracy !== undefined && (
              <div className="text-[#ff6b4a] text-sm">{stats.flashcards.accuracy}% accuracy</div>
            )}
          </div>

          <div className="depth-border p-6">
            <div className="text-white/40 text-xs font-mono tracking-wider mb-2">
              Exam attempts
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {loading ? (
                <span className="animate-pulse text-white/20">—</span>
              ) : (
                `${examAttempts}/${maxAttempts}`
              )}
            </div>
            <div className="text-[#ff6b4a] text-sm">
              {maxAttempts - examAttempts} remaining
            </div>
          </div>

          <div className="depth-border p-6">
            <div className="text-white/40 text-xs font-mono tracking-wider mb-2">
              Best score
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {loading ? (
                <span className="animate-pulse text-white/20">—</span>
              ) : bestScore !== null && bestScore !== undefined ? (
                `${bestScore}%`
              ) : (
                "—"
              )}
            </div>
            {bestScore !== null && bestScore !== undefined && bestScore >= 79 && (
              <div className="text-emerald-500 text-sm">✓ passing</div>
            )}
            {bestScore !== null && bestScore !== undefined && bestScore < 79 && (
              <div className="text-red-400 text-sm">{79 - bestScore}% to pass</div>
            )}
          </div>

          <div className="depth-border p-6">
            <div className="text-white/40 text-xs font-mono tracking-wider mb-2">
              Study streak
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {loading ? (
                <span className="animate-pulse text-white/20">—</span>
              ) : streak > 0 ? (
                `${streak} day${streak !== 1 ? "s" : ""}`
              ) : (
                "—"
              )}
            </div>
            {streak > 0 && <div className="text-[#ff6b4a] text-sm">🔥</div>}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/flashcards"
            className="depth-border p-6 hover:border-[#ff6b4a] transition-all"
          >
            <div className="text-2xl mb-2">📇</div>
            <div className="font-bold text-white mb-1">Flashcards</div>
            <div className="text-white/40 text-sm">
              {stats?.flashcards?.uniqueCards
                ? `${stats.flashcards.uniqueCards} cards studied`
                : "Spaced repetition"}
            </div>
          </Link>
          <Link
            href="/exam"
            className="depth-border p-6 hover:border-[#ff6b4a] transition-all"
          >
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-bold text-white mb-1">Exam Simulator</div>
            <div className="text-white/40 text-sm">
              {maxAttempts - examAttempts} attempts · 110 Qs from 170+ bank · 2-hour timer
            </div>
          </Link>
          <Link
            href="/notes"
            className="depth-border p-6 hover:border-[#ff6b4a] transition-all"
          >
            <div className="text-2xl mb-2">📘</div>
            <div className="font-bold text-white mb-1">Study Notes</div>
            <div className="text-white/40 text-sm">
              {stats?.studyNotes?.chaptersStarted
                ? `${stats.studyNotes.chaptersStarted} chapters · ${stats.studyNotes.avgProgress}% avg`
                : "159 pages · annotated"}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic";
