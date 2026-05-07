"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function FlashcardViewer({ cards }: { cards: any[] }) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="depth-border">
      <div className="p-6 border-b border-white/5">
        <div className="flex justify-between text-xs font-mono tracking-wider text-white/30">
          <span>card {current + 1}</span>
          <span>{cards.length} total</span>
        </div>
      </div>
      <div className="p-8 min-h-[300px] flex items-center justify-center">
        <button onClick={() => setFlipped(!flipped)} className="w-full text-center group">
          <div className="transition-all duration-300">
            <p className={cn("text-white text-xl leading-relaxed transition-all", flipped ? "opacity-30" : "opacity-100")}>
              {cards[current].front}
            </p>
            <p className={cn("text-[#ff6b4a] text-lg leading-relaxed mt-4 transition-all", flipped ? "opacity-100" : "opacity-0")}>
              {flipped ? cards[current].back : "↻ click to reveal"}
            </p>
          </div>
        </button>
      </div>
      <div className="p-6 border-t border-white/5 flex justify-between gap-3">
        <button onClick={() => { setFlipped(false); setCurrent((current - 1 + cards.length) % cards.length); }} className="btn-industrial-outline flex-1">
          ← Previous
        </button>
        <button onClick={() => { setFlipped(false); setCurrent((current + 1) % cards.length); }} className="btn-industrial flex-1">
          Next →
        </button>
      </div>
    </div>
  );
}
