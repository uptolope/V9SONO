// ═══════════════════════════════════════════════════════════════════
// SonoPrep — User Stats API (Real DB Queries)
// Returns real aggregate stats from Prisma, not random numbers.
// ═══════════════════════════════════════════════════════════════════

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Run all queries in parallel
    const [
      examSessions,
      flashcardProgress,
      flashcardReviewCount,
      studyNoteProgress,
    ] = await Promise.all([
      // All completed exam sessions
      prisma.examSession.findMany({
        where: { userId, completed: true },
        select: { score: true, completedAt: true },
        orderBy: { completedAt: "desc" },
      }),

      // Flashcard progress summary
      prisma.flashcardProgress.aggregate({
        where: { userId },
        _count: true,
        _sum: { reviewCount: true, correctCount: true },
      }),

      // Total unique flashcards reviewed
      prisma.flashcardProgress.count({
        where: { userId, reviewCount: { gt: 0 } },
      }),

      // Study notes progress
      prisma.studyNoteProgress.findMany({
        where: { userId },
        select: { progress: true },
      }),
    ]);

    // Exam stats
    const examAttempts = examSessions.length;
    const bestScore = examSessions.length > 0
      ? Math.round(Math.max(...examSessions.map((s) => s.score ?? 0)))
      : null;
    const lastExamDate = examSessions[0]?.completedAt || null;

    // Flashcard stats
    const flashcardsReviewed = flashcardProgress._sum?.reviewCount ?? 0;
    const flashcardsStarted = flashcardProgress._count ?? 0;
    const flashcardAccuracy =
      flashcardProgress._sum?.reviewCount && flashcardProgress._sum?.reviewCount > 0
        ? Math.round(
            ((flashcardProgress._sum?.correctCount ?? 0) /
              flashcardProgress._sum.reviewCount) *
              100
          )
        : null;

    // Study streak — count consecutive days with flashcard reviews
    const recentActivity = await prisma.flashcardProgress.findMany({
      where: {
        userId,
        lastReviewed: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
      select: { lastReviewed: true },
      orderBy: { lastReviewed: "desc" },
    });

    let streak = 0;
    if (recentActivity.length > 0) {
      const uniqueDays = new Set(
        recentActivity.map((r) => r.lastReviewed.toISOString().slice(0, 10))
      );
      const sortedDays = [...uniqueDays].sort().reverse();
      const today = new Date().toISOString().slice(0, 10);
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);

      // Streak must include today or yesterday to be active
      if (sortedDays[0] === today || sortedDays[0] === yesterday) {
        streak = 1;
        for (let i = 1; i < sortedDays.length; i++) {
          const prev = new Date(sortedDays[i - 1]);
          const curr = new Date(sortedDays[i]);
          const diffDays = Math.round(
            (prev.getTime() - curr.getTime()) / (24 * 60 * 60 * 1000)
          );
          if (diffDays === 1) {
            streak++;
          } else {
            break;
          }
        }
      }
    }

    // Study notes progress
    const studyNotesAvgProgress =
      studyNoteProgress.length > 0
        ? Math.round(
            studyNoteProgress.reduce((sum, s) => sum + s.progress, 0) /
              studyNoteProgress.length
          )
        : 0;

    return NextResponse.json({
      exam: {
        attempts: examAttempts,
        maxAttempts: 3,
        bestScore,
        lastExamDate,
      },
      flashcards: {
        reviewed: flashcardsReviewed,
        uniqueCards: flashcardReviewCount,
        started: flashcardsStarted,
        accuracy: flashcardAccuracy,
      },
      studyNotes: {
        avgProgress: studyNotesAvgProgress,
        chaptersStarted: studyNoteProgress.length,
      },
      streak,
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
