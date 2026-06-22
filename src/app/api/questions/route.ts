import { NextResponse, NextRequest } from "next/server";
import { EXAM_QUESTIONS } from "@/lib/exam/full-questions";

// ═══════════════════════════════════════════════════════════════════
// Questions API — serves paid exam simulator questions
// Source: full-questions.ts (170 licensed SPI questions)
// Free quiz/flashcards use exam-data.ts via the demo page instead.
// ═══════════════════════════════════════════════════════════════════

type ClientQuestion = {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  domain: string;
};

function getExamQuestions(): ClientQuestion[] {
  // Deduplicate by first 50 chars (3 internal dupes in full-questions.ts)
  const seen = new Set<string>();
  const questions: ClientQuestion[] = [];

  for (const q of EXAM_QUESTIONS) {
    const key = q.question.trim().slice(0, 50).toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      questions.push({
        id: `fq-${q.id}`,
        question: q.question,
        choices: [...q.options],
        answerIndex: q.correctAnswer,
        explanation: q.explanation || "",
        domain: q.domain,
      });
    }
  }

  return questions; // 167 unique questions
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
      message:
        "This question bank is coming soon. Join the waitlist to be notified.",
      slug,
    });
  }

  if (slug !== "ultrasound-physics") {
    return NextResponse.json(
      { error: "Unknown product slug" },
      { status: 400 }
    );
  }

  const questions = getExamQuestions();

  // Shuffle for variety on each load — no repeats within a session
  const shuffled = [...questions].sort(() => Math.random() - 0.5);

  return NextResponse.json(shuffled);
}
