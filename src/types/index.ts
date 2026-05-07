import { type ProductType } from "@prisma/client";

/* ── Extend NextAuth types ────────────────────────────────────────── */

declare module "next-auth" {
  interface User {
    role?: string;
    sessionId?: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      sessionId: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    sessionId: string;
  }
}

/* ── Product display info ─────────────────────────────────────────── */

export interface ProductInfo {
  key: string;
  type: ProductType;
  name: string;
  description: string;
  price: number; // cents
  priceLabel: string;
  features: string[];
  icon: string; // Lucide icon name
  popular?: boolean;
  savingsLabel?: string;
}

/* ── Exam types ───────────────────────────────────────────────────── */

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface ExamState {
  sessionId: string | null;
  currentIndex: number;
  answers: Record<number, number>;
  showExplanation: boolean;
  completed: boolean;
  startTime: number;
}

/* ── Flashcard types ──────────────────────────────────────────────── */

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
}

export interface FlashcardState {
  currentIndex: number;
  isFlipped: boolean;
  box: number;
  easeFactor: number;
  interval: number;
}
