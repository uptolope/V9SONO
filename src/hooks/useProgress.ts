// ═══════════════════════════════════════════════════════════════════
// Progress tracking — localStorage-based (works without auth)
// ═══════════════════════════════════════════════════════════════════

export interface ProgressEntry {
  questionId: string;
  correct: boolean;
  createdAt: string;
}

const STORAGE_KEY = "sonoprep_progress";

export function saveProgress(questionId: string, correct: boolean): void {
  if (typeof window === "undefined") return;

  try {
    const existing: ProgressEntry[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    existing.push({
      questionId,
      correct,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Silent fail — don't break the practice flow
  }
}

export function getProgress(): ProgressEntry[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getProgressForSlug(slug: string): ProgressEntry[] {
  return getProgress().filter((p) => p.questionId.startsWith(slug));
}
