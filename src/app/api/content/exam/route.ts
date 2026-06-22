// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Exam Content API (PROTECTED)
// Returns exam questions WITHOUT correct answers.
// Draws 110 random questions from the 167 question bank.
// Answer validation happens via POST /api/exam/submit
// SECURITY: Correct answers are NEVER sent to the client.
// ═══════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkContentAccess } from "@/lib/content/access-check";
import { isStaleSession } from "@/lib/session-guard";
import { prisma } from "@/lib/prisma";
import {
  EXAM_QUESTIONS,
  EXAM_DOMAINS,
  toClientQuestions,
  shuffleQuestions,
} from "@/lib/content";

const MAX_ATTEMPTS = 3;
const QUESTIONS_PER_EXAM = 110;

/**
 * GET /api/content/exam
 * Returns shuffled exam questions WITHOUT correct answers.
 * Draws 110 from the full 167 bank so every attempt is different.
 * The client never sees which option is correct.
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Auth check
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // 2. Concurrent session guard
    if (await isStaleSession(session)) {
      return NextResponse.json(
        { error: "Session expired. Please sign in again.", code: "SESSION_EXPIRED" },
        { status: 401 }
      );
    }

    // 3. Purchase access check
    const access = await checkContentAccess(session.user.id, "EXAM_SIMULATOR");
    if (!access.hasAccess) {
      return NextResponse.json(
        {
          error: "Exam Simulator access required",
          reason: access.reason,
          purchaseUrl: "/billing?product=EXAM_SIMULATOR",
        },
        { status: 403 }
      );
    }

    // 4. Attempt limit check
    const completedCount = await prisma.examSession.count({
      where: {
        userId: session.user.id,
        completed: true,
      },
    });

    if (completedCount >= MAX_ATTEMPTS) {
      return NextResponse.json(
        {
          error: "All exam attempts used",
          code: "ATTEMPTS_EXHAUSTED",
          used: completedCount,
          total: MAX_ATTEMPTS,
        },
        { status: 403 }
      );
    }

    // 5. Optional params
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");
    const countParam = searchParams.get("count");
    const count = countParam
      ? Math.min(parseInt(countParam, 10), QUESTIONS_PER_EXAM)
      : QUESTIONS_PER_EXAM;

    let questions = [...EXAM_QUESTIONS];

    // Filter by domain if specified
    if (domain) {
      questions = questions.filter((q) => q.domain === domain);
    }

    // Shuffle and draw — every attempt gets a different set
    const shuffled = shuffleQuestions(questions).slice(0, count);

    // SECURITY: Strip correct answers before sending to client
    const clientQuestions = toClientQuestions(shuffled);

    return NextResponse.json({
      questions: clientQuestions,
      total: clientQuestions.length,
      domains: EXAM_DOMAINS,
      attempts: {
        used: completedCount,
        total: MAX_ATTEMPTS,
        remaining: MAX_ATTEMPTS - completedCount,
        currentAttempt: completedCount + 1,
      },
      access: {
        expiresAt: access.expiresAt,
        daysRemaining: access.daysRemaining,
      },
    });
  } catch (error) {
    console.error("Exam content API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
