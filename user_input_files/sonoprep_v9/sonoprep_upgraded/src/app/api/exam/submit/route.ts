import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { checkContentAccess } from "@/lib/content/access-check";
import { z } from "zod";

const SubmitSchema = z.object({
  totalQuestions: z.number().int().positive(),
  correctAnswers: z.number().int().min(0),
  score: z.number().min(0).max(100),
  timeSpentSecs: z.number().int().min(0),
  categoryBreakdown: z.record(
    z.object({
      correct: z.number().int().min(0),
      total: z.number().int().positive(),
    })
  ),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Purchase access check
    const access = await checkContentAccess(session.user.id, "EXAM_SIMULATOR");
    if (!access.hasAccess) {
      return NextResponse.json(
        { error: "Exam access required", purchaseUrl: "/billing?product=EXAM_SIMULATOR" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = SubmitSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { totalQuestions, correctAnswers, score, timeSpentSecs, categoryBreakdown } =
      result.data;

    const examSession = await prisma.examSession.create({
      data: {
        userId: session.user.id,
        totalQuestions,
        correctAnswers,
        score,
        timeSpentSecs,
        categoryBreakdown,
        completed: true,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: examSession.id,
    });
  } catch (error) {
    console.error("Exam submit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
