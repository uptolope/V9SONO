import { NextResponse, NextRequest } from "next/server";
import { EXAM_QUESTIONS } from "@/lib/content/exam-data";

// ═══════════════════════════════════════════════════════════════════
// Questions API — serves practice preview questions by product slug
// Pulls from licensed content (exam-data.ts) — maps ARDMS domains
// to product slugs. Client-safe: only sends choices + answerIndex
// after the user submits (same data shape used by practice page).
// ═══════════════════════════════════════════════════════════════════

type ClientQuestion = {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  domain: string;
};

// Map ARDMS domains → product slug
// Physics product gets all 5 SPI domains (this IS the SPI prep)
// Abdomen + vascular will be wired once licensed content exists
const DOMAIN_TO_PRODUCT: Record<string, string> = {
  "Domain 1: Physics Principles": "ultrasound-physics",
  "Domain 2: Transducer Technology": "ultrasound-physics",
  "Domain 3: Principles of Imaging": "ultrasound-physics",
  "Domain 4: Doppler & Hemodynamics": "ultrasound-physics",
  "Domain 5: Bioeffects & Safety": "ultrasound-physics",
};

function getQuestionsForSlug(slug: string): ClientQuestion[] {
  // Filter exam questions that belong to this product
  const matching = EXAM_QUESTIONS.filter((q) => {
    const mapped = DOMAIN_TO_PRODUCT[q.domain];
    return mapped === slug;
  });

  // Convert to client-safe format
  return matching.map((q) => ({
    id: `eq-${q.id}`,
    question: q.question,
    choices: [...q.options],
    answerIndex: q.correctAnswer,
    explanation: q.explanation,
    domain: q.domain,
  }));
}

// Supported product slugs
const VALID_SLUGS = [
  "ultrasound-physics",
  "abdominal-ultrasound",
  "vascular-ultrasound",
];

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug || !VALID_SLUGS.includes(slug)) {
    return NextResponse.json(
      { error: "Unknown product slug" },
      { status: 400 }
    );
  }

  const questions = getQuestionsForSlug(slug);

  if (questions.length === 0) {
    // Product exists but content isn't loaded yet
    return NextResponse.json(
      {
        error: "coming_soon",
        message: "Questions for this product are being finalized. Check back soon.",
        slug,
      },
      { status: 200 }
    );
  }

  // Shuffle questions for variety on each load
  const shuffled = [...questions].sort(() => Math.random() - 0.5);

  return NextResponse.json(shuffled);
}
