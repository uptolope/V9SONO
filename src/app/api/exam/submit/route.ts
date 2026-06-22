// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Exam Submission (SERVER-SIDE VALIDATION + RECORDING)
// Validates all answers server-side, records the attempt, returns results.
// This is the ONLY way to complete an exam — ensures atomic tracking.
// SECURITY: Correct answers only revealed AFTER submission.
// ═══════════════════════════════════════════════════════════════════

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { checkContentAccess } from "@/lib/content/access-check";
import { isStaleSession } from "@/lib/session-guard";
import { EXAM_QUESTIONS } from "@/lib/content";
import { z } from "zod";

const MAX_ATTEMPTS = 3;

const SubmitSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.number().int().min(1),
        selectedIndex: z.number().int().min(0).max(3),
        timeSpentMs: z.number().int().min(0).optional(),
      })
    )
    .min(1)
    .max(170),
  timeSpentSecs: z.number().int().min(0),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Concurrent session guard
    if (await isStaleSession(session)) {
      return NextResponse.json(
        { error: "Session expired. Please sign in again.", code: "SESSION_EXPIRED" },
        { status: 401 }
      );
    }

    // Purchase access check
    const access = await checkContentAccess(session.user.id, "EXAM_SIMULATOR");
    if (!access.hasAccess) {
      return NextResponse.json(
        {
          error: "Exam access required",
          purchaseUrl: "/billing?product=EXAM_SIMULATOR",
        },
        { status: 403 }
      );
    }

    // Attempt limit check — BEFORE processing
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

    // Validate request body
    const body = await req.json();
    const parsed = SubmitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { answers, timeSpentSecs } = parsed.data;

    // ── Server-side answer validation ────────────────────────────
    const results = answers.map((answer) => {
      const question = EXAM_QUESTIONS.find((q) => q.id === answer.questionId);
      if (!question) {
        return {
          questionId: answer.questionId,
          isCorrect: false,
          correctAnswer: -1,
          explanation: "Question not found",
          selectedIndex: answer.selectedIndex,
        };
      }

      const isCorrect = answer.selectedIndex === question.correctAnswer;
      return {
        questionId: answer.questionId,
        isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        selectedIndex: answer.selectedIndex,
      };
    });

    const correctCount = results.filter((r) => r.isCorrect).length;
    const totalCount = results.length;
    const score = Math.round((correctCount / totalCount) * 100);
    const passed = score >= 79; // ARDMS passing threshold

    // Domain breakdown
    const domainScores: Record<string, { correct: number; total: number }> = {};
    for (const result of results) {
      const question = EXAM_QUESTIONS.find((q) => q.id === result.questionId);
      const domain = question?.domain || "Unknown";
      if (!domainScores[domain]) {
        domainScores[domain] = { correct: 0, total: 0 };
      }
      domainScores[domain].total++;
      if (result.isCorrect) domainScores[domain].correct++;
    }

    // ── Record the attempt in a transaction (race-condition safe) ─
    // Re-check count INSIDE the transaction so two concurrent submits
    // can't both pass the guard and exceed MAX_ATTEMPTS.
    const { examSession, newUsed } = await prisma.$transaction(async (tx) => {
      const recheck = await tx.examSession.count({
        where: { userId: session.user.id, completed: true },
      });

      if (recheck >= MAX_ATTEMPTS) {
        throw new Error("ATTEMPTS_EXHAUSTED");
      }

      const created = await tx.examSession.create({
        data: {
          userId: session.user.id,
          totalQuestions: totalCount,
          correctAnswers: correctCount,
          score,
          timeSpentSecs,
          categoryBreakdown: domainScores,
          completed: true,
          completedAt: new Date(),
          answers: {
            create: answers.map((a) => {
              const question = EXAM_QUESTIONS.find((q) => q.id === a.questionId);
              return {
                questionId: a.questionId,
                selectedIndex: a.selectedIndex,
                isCorrect: a.selectedIndex === (question?.correctAnswer ?? -1),
                timeSpentMs: a.timeSpentMs ?? 0,
              };
            }),
          },
        },
      });

      await tx.auditLog.create({
        data: {
          userId: session.user.id,
          action: "exam_submit",
          details: {
            sessionId: created.id,
            score,
            passed,
            attempt: recheck + 1,
            totalQuestions: totalCount,
            correctAnswers: correctCount,
          },
        },
      });

      return { examSession: created, newUsed: recheck + 1 };
    });

    return NextResponse.json({
      success: true,
      sessionId: examSession.id,
      results,
      summary: {
        correctCount,
        totalCount,
        score,
        passed,
        passingScore: 79,
        domainScores,
      },
      attempts: {
        used: newUsed,
        total: MAX_ATTEMPTS,
        remaining: MAX_ATTEMPTS - newUsed,
      },
    });
  } catch (error: any) {
    // Transaction threw because of race-condition re-check
    if (error?.message === "ATTEMPTS_EXHAUSTED") {
      return NextResponse.json(
        {
          error: "All exam attempts used",
          code: "ATTEMPTS_EXHAUSTED",
          used: MAX_ATTEMPTS,
          total: MAX_ATTEMPTS,
        },
        { status: 403 }
      );
    }

    console.error("Exam submit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
