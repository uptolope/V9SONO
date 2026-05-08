"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex?: number;
  correctAnswer?: number;
  domain?: string;
  explanation?: string;
}

export function ExamSimulator({ questions }: { questions: Question[] }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (!quizStarted || submitted) return;
    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [quizStarted, submitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQ = questions[current];
  const selected = answers[current] !== undefined;
  const userAnswer = answers[current];
  const correctIdx = currentQ.correctIndex ?? currentQ.correctAnswer;
  const isCorrect = selected && userAnswer === correctIdx;

  const handleSelect = (optionIndex: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [current]: optionIndex });
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setShowExplanation(false);
    } else {
      setSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
    setShowExplanation(false);
  };

  const score = submitted
    ? Object.entries(answers).filter(([i, a]) => {
        const q = questions[parseInt(i)];
        const idx = q.correctIndex ?? q.correctAnswer;
        return a === idx;
      }).length
    : 0;
  const percentage = Math.round((score / questions.length) * 100);
  const passingScore = Math.ceil(questions.length * 0.79);
  const passed = score >= passingScore;

  if (!quizStarted && !submitted) {
    return (
      <div className="depth-border p-8 text-center">
        <h2 className="display-serif text-2xl text-white mb-4">SPI Exam Simulator</h2>
        <p className="text-[#b8b0a4] mb-6">
          {questions.length} questions · 3‑hour limit · Passing score: {passingScore}/{questions.length} (79%)
        </p>
        <p className="text-[#b8b0a4] mb-8">Review and change answers. Auto‑submit when time runs out.</p>
        <button onClick={() => setQuizStarted(true)} className="btn-industrial">Start Exam →</button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="depth-border p-8">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-white mb-2">{score}/{questions.length}</div>
          <div className="text-xl font-semibold mb-2">{percentage}%</div>
          <div className={`text-lg ${passed ? "text-green-500" : "text-red-500"} mb-4`}>
            {passed ? "✓ PASSING SCORE" : "✗ BELOW PASSING SCORE"}
          </div>
          <button onClick={() => { setCurrent(0); setAnswers({}); setSubmitted(false); setQuizStarted(false); setTimeLeft(3*60*60); }} className="btn-industrial mt-4">Restart Exam →</button>
        </div>
      </div>
    );
  }

  // Safe guard in case correctIdx is undefined
  const explanationText = () => {
    if (correctIdx === undefined) return "Explanation not available.";
    if (currentQ.explanation) return currentQ.explanation;
    if (isCorrect) return `Correct: ${currentQ.options[correctIdx]}`;
    return `Correct answer: ${currentQ.options[correctIdx]}`;
  };

  return (
    <div className="depth-border">
      <div className="p-4 border-b border-white/5 flex justify-between items-center text-sm">
        <span className="meta text-[#c85b3a]">Question {current + 1} of {questions.length}</span>
        <span className="font-mono text-white/60">Time remaining: {formatTime(timeLeft)}</span>
      </div>
      <div className="p-6">
        <p className="text-white text-lg leading-relaxed mb-8">{currentQ.question}</p>
        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleSelect(idx)} className={cn(
              "w-full text-left p-4 border transition-all duration-200",
              answers[current] === idx ? "border-[#ff6b4a] bg-[#ff6b4a]/5 text-white" : "border-white/10 hover:border-white/30 text-white/70 hover:text-white"
            )}>
              <span className="font-mono text-xs tracking-wider mr-3 opacity-50">{String.fromCharCode(65 + idx)}</span>
              {opt}
            </button>
          ))}
        </div>
        {selected && (
          <div className="mb-6">
            <button onClick={() => setShowExplanation(!showExplanation)} className="meta text-sm text-[#c85b3a] hover:underline">Review explanation</button>
            {showExplanation && (
              <div className="mt-3 p-4 bg-[#1a212b] border-l-[3px] border-[#c85b3a] text-sm text-[#b8b0a4]">
                {explanationText()}
              </div>
            )}
          </div>
        )}
        <div className="flex justify-between gap-4">
          <button onClick={handlePrev} disabled={current === 0} className={cn("btn-industrial-outline px-4 py-2", current === 0 && "opacity-30 cursor-not-allowed")}>← Previous</button>
          <button onClick={handleNext} className="btn-industrial px-4 py-2">{current === questions.length - 1 ? "Submit Exam →" : "Next →"}</button>
        </div>
      </div>
    </div>
  );
}
