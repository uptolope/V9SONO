import { NextResponse } from "next/server";
import { EXAM_QUESTIONS } from "@/lib/content/exam-data";

// ═══════════════════════════════════════════════════════════════════
// Free Quiz API — serves 8 random questions from exam-data.ts
// Different set every visit. Never repeats within a session.
// ═══════════════════════════════════════════════════════════════════

export const dynamic = "force-dynamic"; // No caching — fresh set each request

export async function GET() {
  // Shuffle all 111 questions
  const shuffled = [...EXAM_QUESTIONS].sort(() => Math.random() - 0.5);

  // Pick 8, spread across domains for variety
  const domains = [...new Set(EXAM_QUESTIONS.map((q) => q.domain))];
  const selected: typeof EXAM_QUESTIONS = [];
  const usedIds = new Set<number>();

  // Round-robin through domains first for variety
  for (const domain of domains) {
    if (selected.length >= 8) break;
    const domainQ = shuffled.find(
      (q) => q.domain === domain && !usedIds.has(q.id)
    );
    if (domainQ) {
      selected.push(domainQ);
      usedIds.add(domainQ.id);
    }
  }

  // Fill remaining slots randomly
  for (const q of shuffled) {
    if (selected.length >= 8) break;
    if (!usedIds.has(q.id)) {
      selected.push(q);
      usedIds.add(q.id);
    }
  }

  // Final shuffle so domains aren't in predictable order
  selected.sort(() => Math.random() - 0.5);

  // Map to client-safe format
  const questions = selected.map((q) => ({
    id: `quiz-${q.id}`,
    question: q.question,
    choices: [...q.options],
    answerIndex: q.correctAnswer,
    explanation: q.explanation,
    domain: q.domain,
  }));

  return NextResponse.json(questions);
}
