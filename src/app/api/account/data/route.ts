import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createRateLimiter, rateLimitResponse } from "@/lib/rate-limit";

/* ── Rate limiter: 3 data exports per user per hour ──────────────── */
const dataExportLimiter = createRateLimiter("data_export", {
  maxRequests: 3,
  windowMs: 60 * 60 * 1000,
});

/**
 * GET /api/account/data
 * Returns all user data in JSON format for data portability (CCPA/GDPR).
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rl = dataExportLimiter.check(session.user.id);
    if (!rl.success) return rateLimitResponse(rl);

    const userId = session.user.id;

    // Fetch all user data in parallel
    const [user, purchases, examSessions, flashcardProgress, studyNoteProgress, auditLogs] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          examDate: true,
          institution: true,
          createdAt: true,
          updatedAt: true,
          lastLoginAt: true,
          // Exclude: password, activeSessionId, failedLoginAttempts, lockedUntil, stripeCustomerId
        },
      }),
      prisma.purchase.findMany({
        where: { userId },
        select: {
          id: true,
          productName: true,
          productKey: true,
          amount: true,
          purchasedAt: true,
          expiresAt: true,
          status: true,
        },
        orderBy: { purchasedAt: "desc" },
      }),
      prisma.examSession.findMany({
        where: { userId },
        select: {
          id: true,
          examType: true,
          totalQuestions: true,
          correctAnswers: true,
          score: true,
          timeSpentSecs: true,
          completed: true,
          categoryBreakdown: true,
          startedAt: true,
          completedAt: true,
        },
        orderBy: { startedAt: "desc" },
      }),
      prisma.flashcardProgress.findMany({
        where: { userId },
        select: {
          cardId: true,
          box: true,
          easeFactor: true,
          interval: true,
          repetitions: true,
          isMastered: true,
          reviewCount: true,
          correctCount: true,
          incorrectCount: true,
          lastReviewed: true,
          nextReview: true,
        },
        orderBy: { lastReviewed: "desc" },
      }),
      prisma.studyNoteProgress.findMany({
        where: { userId },
        select: {
          chapterId: true,
          progress: true,
          bookmarks: true,
        },
      }),
      prisma.auditLog.findMany({
        where: { userId },
        select: {
          action: true,
          createdAt: true,
          // Exclude: ipAddress, userAgent, details (internal)
        },
        orderBy: { createdAt: "desc" },
        take: 100, // Last 100 actions
      }),
    ]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const exportData = {
      exportedAt: new Date().toISOString(),
      format: "SonoPrep User Data Export v1",
      profile: user,
      purchases,
      examSessions,
      flashcardProgress,
      studyNoteProgress,
      recentActivity: auditLogs,
    };

    // Audit the export
    await prisma.auditLog.create({
      data: {
        userId,
        action: "DATA_EXPORT",
        details: { format: "json" },
      },
    });

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="sonoprep-data-export-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    });
  } catch (error) {
    console.error("Data export error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
