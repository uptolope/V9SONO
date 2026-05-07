"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Brain,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { calculateSM2 } from "@/lib/content/flashcard-data";
import type { Flashcard } from "@/types";

interface CardProgress {
  box: number;
  easeFactor: number;
  interval: number;
  repetitions: number;
  correctCount: number;
  incorrectCount: number;
}

interface FlashcardViewerProps {
  cards: Flashcard[];
  isDemo?: boolean;
  onReview?: (cardId: number, quality: number) => void;
}

const QUALITY_BUTTONS = [
  { quality: 1, label: "Again", icon: RotateCcw, color: "text-error", ariaDescription: "I didn't know this — show it again soon" },
  { quality: 3, label: "Hard", icon: ThumbsDown, color: "text-amber", ariaDescription: "I got it but it was difficult" },
  { quality: 4, label: "Good", icon: ThumbsUp, color: "text-teal", ariaDescription: "I got it with some effort" },
  { quality: 5, label: "Easy", icon: Zap, color: "text-success", ariaDescription: "I knew this instantly" },
];

export function FlashcardViewer({
  cards,
  isDemo = false,
  onReview,
}: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);

  const [progressMap, setProgressMap] = useState<Record<number, CardProgress>>(
    () => {
      const init: Record<number, CardProgress> = {};
      cards.forEach((c) => {
        init[c.id] = {
          box: 1,
          easeFactor: 2.5,
          interval: 1,
          repetitions: 0,
          correctCount: 0,
          incorrectCount: 0,
        };
      });
      return init;
    }
  );

  const currentCard = cards[currentIndex];
  const currentProgress = progressMap[currentCard.id];
  const totalReviewed = Object.values(progressMap).filter(
    (p) => p.correctCount + p.incorrectCount > 0
  ).length;
  const mastered = Object.values(progressMap).filter((p) => p.box >= 4).length;

  const flipCard = useCallback(() => setIsFlipped((f) => !f), []);

  const rateCard = useCallback(
    (quality: number) => {
      const prog = progressMap[currentCard.id];
      const { easeFactor, interval, repetitions } = calculateSM2(
        quality,
        prog.repetitions,
        prog.easeFactor,
        prog.interval
      );

      const isCorrect = quality >= 3;

      setProgressMap((prev) => ({
        ...prev,
        [currentCard.id]: {
          ...prev[currentCard.id],
          easeFactor,
          interval,
          repetitions,
          box: isCorrect
            ? Math.min(5, prev[currentCard.id].box + 1)
            : 1,
          correctCount:
            prev[currentCard.id].correctCount + (isCorrect ? 1 : 0),
          incorrectCount:
            prev[currentCard.id].incorrectCount + (isCorrect ? 0 : 1),
        },
      }));

      setReviewedCount((c) => {
        const next = c + 1;
        // Persist cumulative cards seen to localStorage for dashboard stats
        try {
          const prev = parseInt(localStorage.getItem("sonoprep_cards_seen") ?? "0", 10);
          localStorage.setItem("sonoprep_cards_seen", String(prev + 1));
        } catch { /* storage unavailable */ }
        return next;
      });
      if (isCorrect) setSessionCorrect((c) => c + 1);

      onReview?.(currentCard.id, quality);

      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % cards.length);
      }, 200);
    },
    [currentCard, cards.length, progressMap, onReview]
  );

  const goNext = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((i) => (i + 1) % cards.length), 150);
  }, [cards.length]);

  const goPrev = useCallback(() => {
    setIsFlipped(false);
    setTimeout(
      () => setCurrentIndex((i) => (i - 1 + cards.length) % cards.length),
      150
    );
  }, [cards.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't intercept Space/Enter if a button or link is focused — let native click fire
      const tag = (e.target as HTMLElement)?.tagName;
      if ((e.key === " " || e.key === "Enter") && (tag === "BUTTON" || tag === "A")) return;

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        flipCard();
      }
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (isFlipped && e.key >= "1" && e.key <= "4") {
        const mapping = [1, 3, 4, 5];
        rateCard(mapping[parseInt(e.key) - 1]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [flipCard, goNext, goPrev, isFlipped, rateCard]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Stats bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            Card {currentIndex + 1} of {cards.length}
          </Badge>
          <Badge>
            <Brain className="mr-1 h-3 w-3" aria-hidden="true" />
            Box {currentProgress.box}/5
          </Badge>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-cream-dim" aria-live="polite">
          <span className="text-success" aria-label={`${sessionCorrect} correct this session`}>✓ {sessionCorrect}</span>
          <span aria-hidden="true">•</span>
          <span>{reviewedCount} reviewed</span>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="mb-1 flex justify-between font-mono text-[0.65rem] text-cream-dim">
          <span>Mastered: {mastered}/{cards.length}</span>
          <span>{Math.round((mastered / cards.length) * 100)}%</span>
        </div>
        <Progress
          value={(mastered / cards.length) * 100}
          aria-label={`${mastered} of ${cards.length} cards mastered`}
        />
      </div>

      {/* Flashcard — wrapped in a button for keyboard and screen reader accessibility */}
      <div className="perspective-1000" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="wait">
          <motion.button
            key={`${currentIndex}-${isFlipped}`}
            initial={{ rotateY: isFlipped ? -90 : 0, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 0 : 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={flipCard}
            className="w-full cursor-pointer text-left"
            style={{ transformStyle: "preserve-3d" }}
            aria-label={
              isFlipped
                ? `Answer: ${currentCard.back}. Press Space or Enter to flip back to the question.`
                : `Question: ${currentCard.front}. Press Space or Enter to reveal the answer.`
            }
            aria-pressed={isFlipped}
          >
            <Card className="min-h-[280px] flex flex-col justify-center border-border hover:border-teal/40 hover:shadow-glow transition-all">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <Badge variant={isFlipped ? "amber" : "outline"} className="mb-4" aria-hidden="true">
                  {isFlipped ? "Answer" : "Question"} • {currentCard.category}
                </Badge>
                <p className={cn(
                  "leading-relaxed",
                  isFlipped
                    ? "text-xl text-cream-dim"
                    : "font-display text-2xl font-semibold text-cream"
                )}
                  aria-hidden="true"
                >
                  {isFlipped ? currentCard.back : currentCard.front}
                </p>
                {!isFlipped && (
                  <p className="mt-6 font-mono text-sm text-cream-dim" aria-hidden="true">
                    Click or press Space to reveal answer
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Rating buttons — appear after card is flipped */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-4 gap-3"
            role="group"
            aria-label="Rate how well you knew this card"
          >
            {QUALITY_BUTTONS.map((btn) => (
              <Button
                key={btn.quality}
                variant="ghost"
                className="flex flex-col gap-1 border border-border py-6 hover:border-teal/40"
                onClick={() => rateCard(btn.quality)}
                aria-label={`${btn.label}: ${btn.ariaDescription}`}
              >
                <btn.icon className={cn("h-5 w-5", btn.color)} aria-hidden="true" />
                <span className="font-mono text-sm">{btn.label}</span>
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={goPrev} aria-label="Go to previous card">
          <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
          Previous
        </Button>
        <Button variant="ghost" onClick={goNext} aria-label="Go to next card">
          Next
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      {/* Demo CTA */}
      {isDemo && (
        <Card className="border-teal/30 bg-teal/5 text-center">
          <CardContent className="pt-6">
            <BookOpen className="mx-auto mb-2 h-6 w-6 text-teal" aria-hidden="true" />
            <p className="text-base text-cream-dim">
              Enjoying the demo? Get the full 200-card deck with SM-2 progress tracking.
            </p>
            <Button className="mt-3" size="sm" asChild>
              <a href="/products">Get Full Flashcards — $29</a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Keyboard hint — supplemental, hidden from screen readers since all actions already have labels */}
      <p
        className="text-center font-mono text-[0.65rem] text-cream-dim"
        aria-hidden="true"
      >
        Keyboard: Space to flip • ← → to navigate • 1-4 to rate
      </p>
    </div>
  );
}
