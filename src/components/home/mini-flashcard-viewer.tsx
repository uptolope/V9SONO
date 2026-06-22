"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ArrowRight, ArrowLeft, ThumbsUp, ThumbsDown, Zap, Brain } from "lucide-react";
import type { Flashcard } from "@/types";

interface MiniFlashcardViewerProps {
  cards: Flashcard[];
}

const QUALITY_BUTTONS = [
  { quality: 1, label: "Again", icon: RotateCcw, color: "text-red-400" },
  { quality: 3, label: "Hard", icon: ThumbsDown, color: "text-amber-400" },
  { quality: 4, label: "Good", icon: ThumbsUp, color: "text-teal-400" },
  { quality: 5, label: "Easy", icon: Zap, color: "text-emerald-400" },
];

export function MiniFlashcardViewer({ cards }: MiniFlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [boxMap, setBoxMap] = useState<Record<number, number>>(() => {
    const init: Record<number, number> = {};
    cards.forEach((c) => { init[c.id] = 1; });
    return init;
  });

  const currentCard = cards[currentIndex];
  const mastered = Object.values(boxMap).filter((b) => b >= 4).length;
  const progress = (mastered / cards.length) * 100;

  const flipCard = useCallback(() => setIsFlipped((f) => !f), []);

  const rateCard = useCallback((quality: number) => {
    const isCorrect = quality >= 3;
    setBoxMap((prev) => ({
      ...prev,
      [currentCard.id]: isCorrect
        ? Math.min(5, prev[currentCard.id] + 1)
        : 1,
    }));
    setReviewedCount((c) => c + 1);
    if (isCorrect) setSessionCorrect((c) => c + 1);

    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % cards.length);
    }, 200);
  }, [currentCard, cards.length]);

  const goNext = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((i) => (i + 1) % cards.length), 150);
  }, [cards.length]);

  const goPrev = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((i) => (i - 1 + cards.length) % cards.length), 150);
  }, [cards.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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
    <div className="space-y-4">
      {/* Stats bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#a8a29e]">
            Card {currentIndex + 1} of {cards.length}
          </div>
          <div className="px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-mono text-teal-400 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-teal-500/20 flex items-center justify-center text-[10px]">
              <Brain className="w-3 h-3" />
            </span>
            Box {boxMap[currentCard.id]}/5
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-[#a8a29e]">
          <span className="text-teal-400">✓ {sessionCorrect}</span>
          <span className="text-white/30">•</span>
          <span>{reviewedCount} reviewed</span>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="mb-1 flex justify-between font-mono text-[10px] text-[#78716c]">
          <span>Mastered: {mastered}/{cards.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="wait">
          <motion.button
            key={`${currentIndex}-${isFlipped}`}
            initial={{ rotateY: isFlipped ? -90 : 0, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 0 : 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={flipCard}
            className="w-full cursor-pointer text-left rounded-2xl bg-gradient-to-br from-[#141a24] to-[#0a0e14] border border-white/10 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10 transition-all p-8 min-h-[200px] flex flex-col justify-center items-center text-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className={`px-3 py-1 rounded-full text-xs font-mono mb-4 ${
              isFlipped ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-white/5 text-[#a8a29e] border border-white/10"
            }`}>
              {isFlipped ? "Answer" : "Question"} • {currentCard.category}
            </div>
            <p className={isFlipped
              ? "text-base text-[#a8a29e] leading-relaxed"
              : "text-lg font-medium text-[#e8e4df] leading-relaxed"
            }>
              {isFlipped ? currentCard.back : currentCard.front}
            </p>
            {!isFlipped && (
              <p className="mt-4 font-mono text-xs text-[#78716c]">Click or press Space to reveal answer</p>
            )}
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Rating buttons */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-4 gap-2"
          >
            {QUALITY_BUTTONS.map((btn) => (
              <button
                key={btn.quality}
                onClick={() => rateCard(btn.quality)}
                className="flex flex-col items-center gap-1 p-3 border border-white/10 rounded-xl hover:border-teal-500/30 transition-all bg-white/5 hover:bg-white/10"
              >
                <btn.icon className={`w-5 h-5 ${btn.color}`} />
                <span className="font-mono text-xs text-[#a8a29e]">{btn.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={goPrev}
          className="px-4 py-2 text-sm text-[#a8a29e] hover:text-[#e8e4df] transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 text-sm text-[#a8a29e] hover:text-[#e8e4df] transition-colors flex items-center gap-1"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}