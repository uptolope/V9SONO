import { z } from "zod";

/* ── Sanitization Helpers ─────────────────────────────────────────── */

/**
 * Strip HTML tags from text input to prevent stored XSS.
 * Uses a conservative approach — removes anything that looks like a tag.
 */
function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

/** Zod transform that strips HTML and trims whitespace */
const sanitizedString = (schema: z.ZodString) =>
  schema.transform((val) => stripHtml(val));

/* ── Auth Schemas ─────────────────────────────────────────────────── */

export const signUpSchema = z.object({
  name: sanitizedString(
    z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be under 100 characters")
      .regex(/^[a-zA-Z\s.\-']+$/, "Name contains invalid characters")
  ),
  email: z
    .string()
    .max(255, "Email must be under 255 characters")
    .transform((val) => val.trim().toLowerCase())
    .pipe(z.string().email("Please enter a valid email address")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be under 128 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
      "Password must contain a special character"
    ),
});

export const signInSchema = z.object({
  email: z
    .string()
    .max(255)
    .transform((val) => val.trim().toLowerCase())
    .pipe(z.string().email()),
  password: z.string().min(1, "Password is required").max(128),
});

/* ── Checkout Schema ──────────────────────────────────────────────── */

export const checkoutSchema = z.object({
  productKey: z.enum([
    "FLASHCARDS",
    "PHYSICS_PEARLS",
    "EXAM_SIMULATOR",
    "STUDY_NOTES",
    "PREMIUM_BUNDLE",
  ]),
});

/* ── Exam Answer Schema ───────────────────────────────────────────── */

export const examAnswerSchema = z.object({
  sessionId: z.string().cuid().max(40),
  questionId: z.number().int().min(0).max(10_000),
  selectedIndex: z.number().int().min(0).max(3),
  timeSpentMs: z.number().int().min(0).max(600_000), // max 10 min per question
});

/* ── Exam Submit Schema ───────────────────────────────────────────── */

export const examSubmitSchema = z
  .object({
    totalQuestions: z.number().int().min(1).max(500),
    correctAnswers: z.number().int().min(0),
    score: z.number().min(0).max(100),
    timeSpentSecs: z.number().int().min(0).max(36_000), // max 10 hours
    categoryBreakdown: z.record(
      z.string().max(100),
      z.object({
        correct: z.number().int().min(0).max(500),
        total: z.number().int().min(1).max(500),
      })
    ),
  })
  .refine((data) => data.correctAnswers <= data.totalQuestions, {
    message: "correctAnswers cannot exceed totalQuestions",
    path: ["correctAnswers"],
  })
  .refine(
    (data) => {
      const expectedScore =
        Math.round((data.correctAnswers / data.totalQuestions) * 10000) / 100;
      return Math.abs(data.score - expectedScore) < 1; // allow rounding tolerance
    },
    {
      message: "Score does not match correctAnswers / totalQuestions",
      path: ["score"],
    }
  );

/* ── Flashcard Review Schema ──────────────────────────────────────── */

export const flashcardReviewSchema = z.object({
  cardId: z.number().int().min(0).max(100_000),
  quality: z.number().int().min(0).max(5), // SM-2 quality rating
});

/* ── Account Update Schema ────────────────────────────────────────── */

export const accountUpdateSchema = z.object({
  name: sanitizedString(
    z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be under 100 characters")
      .regex(/^[a-zA-Z\s.\-']+$/, "Name contains invalid characters")
  ).optional(),
  examDate: z
    .string()
    .max(30)
    .datetime()
    .optional(),
  institution: sanitizedString(
    z.string().max(200, "Institution must be under 200 characters")
  ).optional(),
});
