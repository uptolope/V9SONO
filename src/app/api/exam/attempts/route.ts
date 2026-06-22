// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Exam Attempt Tracking (SERVER-SIDE)
// Returns how many attempts the user has used and how many remain.
// ═══════════════════════════════════════════════════════════════════

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkContentAccess } from "@/lib/content/access-check";

const MAX_ATTEMPTS = 3;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check purchase access
    const access = await checkContentAccess(session.user.id, "EXAM_SIMULATOR");
    if (!access.hasAccess) {
      return NextResponse.json(
        {
          error: "Exam access required",
          purchaseUrl: "/billing?product=EXAM_SIMULATOR",
          hasAccess: false,
        },
        { status: 403 }
      );
    }

    // Count completed exam sessions
    const completedCount = await prisma.examSession.count({
      where: {
        userId: session.user.id,
        completed: true,
      },
    });

    const remaining = Math.max(0, MAX_ATTEMPTS - completedCount);

    // Get history for display
    const history = await prisma.examSession.findMany({
      where: {
        userId: session.user.id,
        completed: true,
      },
      orderBy: { completedAt: "desc" },
      select: {
        id: true,
        score: true,
        correctAnswers: true,
        totalQuestions: true,
        timeSpentSecs: true,
        completedAt: true,
      },
    });

    return NextResponse.json({
      used: completedCount,
      total: MAX_ATTEMPTS,
      remaining,
      canStart: remaining > 0,
      currentAttempt: completedCount + 1,
      access: {
        expiresAt: access.expiresAt,
        daysRemaining: access.daysRemaining,
      },
      history,
    });
  } catch (error) {
    console.error("Exam attempts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
