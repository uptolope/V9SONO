"use client";

import { useState } from "react";
import type { DemoFlashcard } from "@/lib/demo/flashcard-data";

interface FlashcardViewerProps {
  flashcards: DemoFlashcard[];
}

export function FlashcardViewer({ flashcards }: FlashcardViewerProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!flashcards.length) return null;
  const current = flashcards[index];

  function next() {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % flashcards.length);
  }

  function prev() {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="meta text-[9px] text-[#4a453f]">
          CARD {index + 1} OF {flashcards.length}
        </span>
        <span className="meta text-[9px] text-[#4a453f]">
          {current.domain}
        </span>
      </div>

      <button
        onClick={() => setFlipped(!flipped)}
        className="w-full min-h-[200px] depth-border corner-arch p-8 text-left transition-all hover:border-[#c85b3a]/20 cursor-pointer"
      >
        {!flipped ? (
          <div>
            <p className="meta text-[9px] text-[#c85b3a] mb-3">QUESTION</p>
            <p className="text-base text-white leading-relaxed">
              {current.front}
            </p>
            <p className="meta text-[9px] text-[#4a453f] mt-6">
              TAP TO REVEAL ANSWER
            </p>
          </div>
        ) : (
          <div>
            <p className="meta text-[9px] text-green-500/70 mb-3">ANSWER</p>
            <p className="text-sm text-[#c2bab0] leading-relaxed">
              {current.back}
            </p>
          </div>
        )}
      </button>

      <div className="flex justify-between mt-4">
        <button
          onClick={prev}
          className="btn-industrial-outline px-4 py-2 text-[10px]"
        >
          ← PREV
        </button>
        <button
          onClick={next}
          className="btn-industrial-outline px-4 py-2 text-[10px]"
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
