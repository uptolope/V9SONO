// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Exam Answer Review (SERVER-SIDE)
// POST-SUBMISSION ONLY: returns answers for a completed session.
// Cannot be used to check answers before submitting.
// SECURITY: Only works for sessions the user has already completed.
// ═══════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EXAM_QUESTIONS } from "@/lib/content";
import { z } from "zod";

const reviewSchema = z.object({
  sessionId: z.string().min(1),
});

/**
 * POST /api/exam/check
 * Review answers for a COMPLETED exam session only.
 * Returns question details with correct answers and explanations.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Auth check
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = reviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request — sessionId required" },
        { status: 400 }
      );
    }

    // 2. Verify the session belongs to this user AND is completed
    const examSession = await prisma.examSession.findFirst({
      where: {
        id: parsed.data.sessionId,
        userId: session.user.id,
        completed: true,
      },
      include: {
        answers: true,
      },
    });

    if (!examSession) {
      return NextResponse.json(
        { error: "Exam session not found or not completed" },
        { status: 404 }
      );
    }

    // 3. Build detailed review from stored answers
    const review = examSession.answers.map((answer) => {
      const question = EXAM_QUESTIONS.find((q) => q.id === answer.questionId);
      return {
        questionId: answer.questionId,
        question: question?.question || "Question not found",
        options: question?.options || [],
        selectedIndex: answer.selectedIndex,
        correctAnswer: question?.correctAnswer ?? -1,
        isCorrect: answer.isCorrect,
        explanation: question?.explanation || "",
        domain: question?.domain || "Unknown",
      };
    });

    return NextResponse.json({
      sessionId: examSession.id,
      score: examSession.score,
      correctAnswers: examSession.correctAnswers,
      totalQuestions: examSession.totalQuestions,
      timeSpentSecs: examSession.timeSpentSecs,
      completedAt: examSession.completedAt,
      categoryBreakdown: examSession.categoryBreakdown,
      review,
    });
  } catch (error) {
    console.error("Exam review error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
