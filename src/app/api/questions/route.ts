import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkContentAccess } from "@/lib/content/access-check";
import { isStaleSession } from "@/lib/session-guard";
import { EXAM_QUESTIONS } from "@/lib/exam/full-questions";

// ═══════════════════════════════════════════════════════════════════
// Questions API — serves paid exam simulator questions (PROTECTED)
// Source: full-questions.ts (170 licensed SPI questions)
// Free quiz/flashcards use exam-data.ts via the demo routes instead.
//
// SECURITY:
//   - Requires authenticated session
//   - Requires valid EXAM_SIMULATOR purchase
//   - Correct answers are NEVER sent to the client
//   - Questions are shuffled per request
// ═══════════════════════════════════════════════════════════════════

type ClientQuestion = {
  id: string;
  question: string;
  choices: string[];
  domain: string;
  // answerIndex is intentionally excluded — grading is server-side only
};

function getExamQuestions(): { id: string; question: string; choices: string[]; domain: string }[] {
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
        domain: q.domain,
        // NO answerIndex — correct answers stay on server
      });
    }
  }

  return questions; // 167 unique questions
}

// Supported slugs
const COMING_SOON_SLUGS = ["abdominal-ultrasound", "vascular-ultrasound"];

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

    // 2. Stale session check
    if (await isStaleSession(session)) {
      return NextResponse.json(
        { error: "Session expired. Please sign in again.", code: "SESSION_EXPIRED" },
        { status: 401 }
      );
    }

    // 3. Slug validation
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

    // 4. Purchase access check
    const access = await checkContentAccess(session.user.id, "EXAM_SIMULATOR");
    if (!access.hasAccess) {
      return NextResponse.json(
        {
          error: "Purchase required to access questions",
          purchaseUrl: "/billing?product=EXAM_SIMULATOR",
          hasAccess: false,
        },
        { status: 403 }
      );
    }

    // 5. Return questions WITHOUT correct answers
    const questions = getExamQuestions();
    const shuffled = [...questions].sort(() => Math.random() - 0.5);

    return NextResponse.json(shuffled);
  } catch (error) {
    console.error("Questions API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
