"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  text?: string;
  options: string[];
  correctIndex: number;
  correct?: number;
  explanation: string;
}

export function ExamSimulator({ questions }: { questions: Question[] }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentQ = questions[current];
  const questionText = currentQ.text || currentQ.question;
  const correctAnswer = currentQ.correct !== undefined ? currentQ.correct : currentQ.correctIndex;
  const selected = answers[current];
  const isAnswered = selected !== undefined;

  const handleSelect = (optionIndex: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [current]: optionIndex });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setSubmitted(true);
    }
  };

  const score = submitted ? Object.entries(answers).filter(([i, a]) => a === (questions[parseInt(i)].correct !== undefined ? questions[parseInt(i)].correct : questions[parseInt(i)].correctIndex)).length : 0;

  if (submitted) {
    return (
      <div className="depth-border p-8">
        <div className="text-center">
          <div className="text-6xl font-bold text-white mb-4">{score}/{questions.length}</div>
          <div className="text-white/50 text-sm mb-8">correct</div>
          <button onClick={() => { setCurrent(0); setAnswers({}); setSubmitted(false); }} className="btn-industrial">
            Restart →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="depth-border">
      <div className="p-6 border-b border-white/5">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono tracking-wider text-white/30">Q{current + 1}/{questions.length}</span>
          <div className="w-24 h-px bg-white/10" />
        </div>
      </div>
      <div className="p-8">
        <p className="text-white text-lg leading-relaxed mb-8">{questionText}</p>
        <div className="space-y-3 mb-12">
          {currentQ.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleSelect(idx)} className={cn(
              "w-full text-left p-4 border transition-all duration-200",
              selected === idx ? "border-[#ff6b4a] bg-[#ff6b4a]/5 text-white" : "border-white/10 hover:border-white/30 text-white/70 hover:text-white"
            )}>
              <span className="font-mono text-xs tracking-wider mr-3 opacity-50">{String.fromCharCode(65 + idx)}</span>
              {opt}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          {isAnswered && <div className="text-sm text-white/40">{selected === correctAnswer ? "✓ Correct" : "✗ Review explanation"}</div>}
          <button onClick={handleNext} disabled={!isAnswered} className={cn("btn-industrial ml-auto", !isAnswered && "opacity-30 cursor-not-allowed")}>
            {current === questions.length - 1 ? "Submit →" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
