import { NextResponse } from "next/server";
import { EXAM_QUESTIONS } from "@/lib/content/exam-data";

// ═══════════════════════════════════════════════════════════════════
// Free Flashcards API — serves 8 random flashcards from exam-data.ts
// Converts questions into front/back flashcard format.
// Different set every visit.
// ═══════════════════════════════════════════════════════════════════

export const dynamic = "force-dynamic";

export async function GET() {
  // Shuffle all 111 questions
  const shuffled = [...EXAM_QUESTIONS].sort(() => Math.random() - 0.5);

  // Pick 8, spread across domains for variety
  const domains = [...new Set(EXAM_QUESTIONS.map((q) => q.domain))];
  const selected: typeof EXAM_QUESTIONS = [];
  const usedIds = new Set<number>();

  // Round-robin through domains
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

  // Fill remaining slots
  for (const q of shuffled) {
    if (selected.length >= 8) break;
    if (!usedIds.has(q.id)) {
      selected.push(q);
      usedIds.add(q.id);
    }
  }

  // Final shuffle
  selected.sort(() => Math.random() - 0.5);

  // Convert to flashcard format: front = question, back = correct answer + explanation
  const flashcards = selected.map((q) => ({
    id: `fc-${q.id}`,
    front: q.question,
    back: `${q.options[q.correctAnswer]}\n\n${q.explanation}`,
    domain: q.domain,
  }));

  return NextResponse.json(flashcards);
}
