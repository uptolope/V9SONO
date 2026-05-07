import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { calculateSM2 } from "@/lib/content/flashcard-data";

const ReviewSchema = z.object({
  cardId: z.number().int(),
  quality: z.number().int().min(0).max(5),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = ReviewSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { cardId, quality } = result.data;

    // Find existing progress or use defaults
    const existing = await prisma.flashcardProgress.findUnique({
      where: {
        userId_cardId: {
          userId: session.user.id,
          cardId,
        },
      },
    });

    const currentReps = existing?.repetitions ?? 0;
    const currentEF = existing?.easeFactor ?? 2.5;
    const currentInterval = existing?.interval ?? 1;

    // calculateSM2(quality, repetitions, easeFactor, interval)
    const sm2 = calculateSM2(quality, currentReps, currentEF, currentInterval);

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + sm2.interval);

    const progress = await prisma.flashcardProgress.upsert({
      where: {
        userId_cardId: {
          userId: session.user.id,
          cardId,
        },
      },
      create: {
        userId: session.user.id,
        cardId,
        box: quality >= 3 ? 2 : 1,
        easeFactor: sm2.easeFactor,
        interval: sm2.interval,
        repetitions: sm2.repetitions,
        nextReview,
        correctCount: quality >= 3 ? 1 : 0,
        incorrectCount: quality < 3 ? 1 : 0,
        lastReviewed: new Date(),
        reviewCount: 1,
      },
      update: {
        box: quality >= 3
          ? { increment: 1 }
          : 1,
        easeFactor: sm2.easeFactor,
        interval: sm2.interval,
        repetitions: sm2.repetitions,
        nextReview,
        correctCount: quality >= 3 ? { increment: 1 } : undefined,
        incorrectCount: quality < 3 ? { increment: 1 } : undefined,
        lastReviewed: new Date(),
        reviewCount: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error("Flashcard review error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
