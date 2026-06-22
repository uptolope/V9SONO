"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Clock, ArrowRight, ArrowLeft, RotateCcw, AlertTriangle, Brain } from "lucide-react";
import type { ExamQuestion } from "@/types";

interface MiniExamSimulatorProps {
  questions: ExamQuestion[];
}

export function MiniExamSimulator({ questions }: MiniExamSimulatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  const currentQ = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = isAnswered && selectedAnswer === currentQ.correctIndex;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (completed) return;
    const t = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [completed, startTime]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const selectAnswer = useCallback((optionIndex: number) => {
    if (isAnswered) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
    setShowExplanation(true);
  }, [currentIndex, isAnswered]);

  const goNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowExplanation(false);
    }
  }, [currentIndex, questions.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setShowExplanation(answers[currentIndex - 1] !== undefined);
    }
  }, [currentIndex, answers]);

  const finishExam = useCallback(() => {
    setCompleted(true);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (completed) return;
      if (e.key >= "1" && e.key <= "4" && !isAnswered) {
        selectAnswer(parseInt(e.key) - 1);
      }
      if (e.key === "ArrowRight" && isAnswered) goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [completed, isAnswered, selectAnswer, goNext, goPrev]);

  if (completed) {
    const correctCount = questions.reduce(
      (count, q, i) => count + (answers[i] === q.correctIndex ? 1 : 0),
      0
    );
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 70;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#141a24] to-[#0a0e14] border border-teal-500/30"
      >
        <div className="text-6xl font-bold mb-2" style={{ color: passed ? "#14b8a6" : "#f59e0b" }}>
          {score}%
        </div>
        <p className="text-[#a8a29e] mb-4">
          {correctCount} of {questions.length} correct • {formatTime(elapsed)}
        </p>
        <div className={`inline-block px-4 py-2 rounded-full text-sm font-mono ${
          passed ? "bg-teal-500/20 text-teal-400" : "bg-amber-500/20 text-amber-400"
        }`}>
          {passed ? "Passing Score (≥70%)" : "Below passing (need ≥70%)"}
        </div>
        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[#e8e4df] transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#a8a29e]">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div className="flex items-center gap-2 font-mono text-sm text-[#a8a29e]">
          <Clock className="w-4 h-4 text-teal-400" />
          {formatTime(elapsed)}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-gradient-to-br from-[#141a24] to-[#0a0e14] border border-white/10 p-6"
        >
          <div className="text-xs font-mono text-teal-400 mb-3">{currentQ.category}</div>
          <h3 className="text-lg font-medium text-[#e8e4df] mb-6 leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, i) => {
              const isSelected = selectedAnswer === i;
              const isCorrectOption = i === currentQ.correctIndex;
              const showResult = isAnswered;
              const optionLetter = String.fromCharCode(65 + i);

              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  disabled={isAnswered}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                    !showResult && "border border-white/10 bg-white/5 hover:border-teal-500/50 hover:bg-white/10"
                  } ${
                    showResult && isCorrectOption && "border-teal-500/50 bg-teal-500/10"
                  } ${
                    showResult && isSelected && !isCorrectOption && "border-red-500/50 bg-red-500/10"
                  } ${
                    showResult && !isSelected && !isCorrectOption && "opacity-50"
                  } ${isAnswered && "cursor-default"}`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 font-mono text-xs">
                    {optionLetter}
                  </span>
                  <span className="flex-1 text-sm text-[#e8e4df]">{option}</span>
                  {showResult && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  )}
                  {showResult && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-xl border p-4 ${
              isCorrect ? "border-teal-500/30 bg-teal-500/5" : "border-amber-500/30 bg-amber-500/5"
            }`}
          >
            <div className="flex gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`font-semibold ${isCorrect ? "text-teal-400" : "text-amber-400"}`}>
                  {isCorrect ? "Correct!" : "Not quite"}
                </p>
                <p className="text-sm text-[#a8a29e] mt-1 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-sm text-[#a8a29e] hover:text-[#e8e4df] disabled:opacity-30 transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={goNext}
            disabled={!isAnswered}
            className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-teal-500/25 flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={finishExam}
            disabled={Object.keys(answers).length < questions.length}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-black rounded-xl text-sm font-semibold disabled:opacity-30 transition-all flex items-center gap-2"
          >
            Finish Exam
          </button>
        )}
      </div>
    </div>
  );
}