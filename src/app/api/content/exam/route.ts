// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Exam Content API (PROTECTED)
// Returns exam questions WITHOUT correct answers
// Answer validation happens via separate POST endpoint
// ═══════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkContentAccess } from "@/lib/content/access-check";
import { checkSessionValid } from "@/lib/session-guard";
import {
  EXAM_QUESTIONS,
  EXAM_DOMAINS,
  toClientQuestions,
  shuffleQuestions,
} from "@/lib/content";

/**
 * GET /api/content/exam
 * Returns shuffled exam questions WITHOUT correct answers.
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

    // 2. Concurrent session check
    const sessionCheck = await checkSessionValid(session.user.id, session.user.sessionId);
    if (!sessionCheck.valid) {
      return NextResponse.json(
        { error: sessionCheck.reason, code: "CONCURRENT_SESSION" },
        { status: 403 }
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

    // 3. Optional params
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");
    const countParam = searchParams.get("count");
    const count = countParam ? Math.min(parseInt(countParam, 10), 111) : 111;

    let questions = [...EXAM_QUESTIONS];

    // Filter by domain if specified
    if (domain) {
      questions = questions.filter((q) => q.domain === domain);
    }

    // Shuffle and limit
    const shuffled = shuffleQuestions(questions).slice(0, count);

    // Questions include answers — access is gated by auth + purchase check
    return NextResponse.json({
      questions: shuffled,
      total: shuffled.length,
      domains: EXAM_DOMAINS,
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
