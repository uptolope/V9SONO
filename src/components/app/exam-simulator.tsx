"use client";

import { useState } from "react";
import type { DemoQuestion } from "@/lib/demo/exam-data";

interface ExamSimulatorProps {
  questions: DemoQuestion[];
}

export function ExamSimulator({ questions }: ExamSimulatorProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  if (!questions.length) return null;
  const current = questions[index];
  const isComplete = index >= questions.length;

  if (isComplete) {
    return (
      <div className="text-center py-10">
        <p className="display-serif text-xl font-semibold text-white mb-2">
          Demo Complete
        </p>
        <p className="text-sm text-[#8a8279] mb-6">
          {score}/{questions.length} correct
        </p>
        <button
          onClick={() => {
            setIndex(0);
            setSelected(null);
            setShowAnswer(false);
            setScore(0);
          }}
          className="btn-industrial-outline px-5 py-2 text-[10px]"
        >
          RETRY
        </button>
      </div>
    );
  }

  function handleAnswer(i: number) {
    if (showAnswer) return;
    setSelected(i);
    setShowAnswer(true);
    if (i === current.answerIndex) setScore((s) => s + 1);
  }

  function next() {
    setSelected(null);
    setShowAnswer(false);
    setIndex((prev) => prev + 1);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="meta text-[9px] text-[#4a453f]">
          QUESTION {index + 1} OF {questions.length}
        </span>
        <span className="meta text-[9px] text-[#4a453f]">
          {current.domain}
        </span>
      </div>

      <h3 className="text-base font-medium text-white mb-6">
        {current.question}
      </h3>

      <div className="space-y-2">
        {current.choices.map((choice, i) => {
          const isCorrect = i === current.answerIndex;
          const isSelected = selected === i;

          let cls = "w-full text-left border rounded-lg p-3 text-sm transition-all ";
          if (showAnswer) {
            if (isCorrect) cls += "border-green-500/40 bg-green-500/10 text-green-300";
            else if (isSelected) cls += "border-red-500/40 bg-red-500/10 text-red-300";
            else cls += "border-white/5 text-[#4a453f]";
          } else {
            cls += "border-white/8 bg-[#111318] text-[#c2bab0] hover:border-[#c85b3a]/30 cursor-pointer";
          }

          return (
            <button key={i} onClick={() => handleAnswer(i)} disabled={showAnswer} className={cls}>
              {choice}
            </button>
          );
        })}
      </div>

      {showAnswer && (
        <div className="mt-5">
          {current.explanation && (
            <p className="text-xs text-[#8a8279] mb-4 p-3 border border-white/5 rounded bg-[#111318]">
              {current.explanation}
            </p>
          )}
          <button onClick={next} className="btn-industrial px-5 py-2 text-[10px]">
            {index < questions.length - 1 ? "NEXT →" : "SEE RESULTS"}
          </button>
        </div>
      )}
    </div>
  );
}
