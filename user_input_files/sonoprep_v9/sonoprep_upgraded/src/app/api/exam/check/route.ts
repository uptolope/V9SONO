// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Exam Answer Checking (SERVER-SIDE VALIDATION)
// Validates answers against correct answers stored server-side
// SECURITY: Correct answers are NEVER sent to the client
// ═══════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkContentAccess } from "@/lib/content/access-check";
import { EXAM_QUESTIONS } from "@/lib/content";
import { z } from "zod";

const checkAnswerSchema = z.object({
  questionId: z.number().int().min(1),
  selectedIndex: z.number().int().min(0).max(3),
});

const submitExamSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.number().int().min(1),
      selectedIndex: z.number().int().min(0).max(3),
      timeSpentMs: z.number().int().min(0).optional(),
    })
  ).min(1).max(111),
});

/**
 * POST /api/exam/check
 * Two modes:
 * - Single answer check: { questionId, selectedIndex }
 * - Full exam submission: { answers: [...] }
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

    // 2. Purchase check
    const access = await checkContentAccess(session.user.id, "EXAM_SIMULATOR");
    if (!access.hasAccess) {
      return NextResponse.json(
        { error: "Exam access required" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // Mode 1: Full exam submission
    if (body.answers && Array.isArray(body.answers)) {
      const parsed = submitExamSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Invalid exam submission", details: parsed.error.flatten() },
          { status: 400 }
        );
      }

      const results = parsed.data.answers.map((answer) => {
        const question = EXAM_QUESTIONS.find((q) => q.id === answer.questionId);
        if (!question) {
          return {
            questionId: answer.questionId,
            isCorrect: false,
            correctAnswer: -1,
            explanation: "Question not found",
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
      const passed = score >= 70;

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

      return NextResponse.json({
        results,
        summary: {
          correctCount,
          totalCount,
          score,
          passed,
          passingScore: 70,
          domainScores,
        },
      });
    }

    // Mode 2: Single answer check
    const parsed = checkAnswerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { questionId, selectedIndex } = parsed.data;
    const question = EXAM_QUESTIONS.find((q) => q.id === questionId);

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    const isCorrect = selectedIndex === question.correctAnswer;

    return NextResponse.json({
      questionId,
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    });
  } catch (error) {
    console.error("Exam check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
