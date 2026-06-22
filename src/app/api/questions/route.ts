import { NextResponse, NextRequest } from "next/server";
import { EXAM_QUESTIONS as CONTENT_QUESTIONS } from "@/lib/content/exam-data";
import { EXAM_QUESTIONS as FULL_QUESTIONS } from "@/lib/exam/full-questions";

// ═══════════════════════════════════════════════════════════════════
// Questions API — serves SPI practice preview questions
// Combines both question sources (281 total) for the physics product.
// Abdomen + vascular return coming_soon until content is added.
// ═══════════════════════════════════════════════════════════════════

type ClientQuestion = {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  domain: string;
};

function getAllPhysicsQuestions(): ClientQuestion[] {
  // Source 1: content/exam-data.ts (111 questions, 5 ARDMS domains)
  const fromContent: ClientQuestion[] = CONTENT_QUESTIONS.map((q) => ({
    id: `ce-${q.id}`,
    question: q.question,
    choices: [...q.options],
    answerIndex: q.correctAnswer,
    explanation: q.explanation,
    domain: q.domain,
  }));

  // Source 2: exam/full-questions.ts (170 questions)
  const fromFull: ClientQuestion[] = FULL_QUESTIONS.map((q) => ({
    id: `fq-${q.id}`,
    question: q.question,
    choices: [...q.options],
    answerIndex: q.correctAnswer,
    explanation: q.explanation || "",
    domain: q.domain,
  }));

  // Deduplicate by first 50 chars of question text (case-insensitive)
  const seen = new Set<string>();
  const combined: ClientQuestion[] = [];

  // Prefer content questions (they have better domain labels)
  for (const q of fromContent) {
    const key = q.question.trim().slice(0, 50).toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(q);
    }
  }
  for (const q of fromFull) {
    const key = q.question.trim().slice(0, 50).toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(q);
    }
  }

  return combined;
}

// Supported slugs
const COMING_SOON_SLUGS = ["abdominal-ultrasound", "vascular-ultrasound"];

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug parameter" },
      { status: 400 }
    );
  }

  // Coming soon products
  if (COMING_SOON_SLUGS.includes(slug)) {
    return NextResponse.json({
      error: "coming_soon",
      message: "This question bank is coming soon. Join the waitlist to be notified.",
      slug,
    });
  }

  if (slug !== "ultrasound-physics") {
    return NextResponse.json(
      { error: "Unknown product slug" },
      { status: 400 }
    );
  }

  const questions = getAllPhysicsQuestions();

  // Shuffle for variety on each load
  const shuffled = [...questions].sort(() => Math.random() - 0.5);

  return NextResponse.json(shuffled);
}
