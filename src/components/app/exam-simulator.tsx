"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { EmailCapture } from "@/components/app/email-capture";
import type { ExamQuestion } from "@/types";

interface ExamSimulatorProps {
  questions: ExamQuestion[];
  isDemo?: boolean;
  sessionId?: string;
  onComplete?: (results: ExamResults) => void;
}

interface ExamResults {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpentSecs: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
}

export function ExamSimulator({
  questions,
  isDemo = false,
  sessionId,
  onComplete,
}: ExamSimulatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [pendingEmailCapture, setPendingEmailCapture] = useState(false);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQ = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = isAnswered && selectedAnswer === currentQ.correctIndex;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const [elapsed, setElapsed] = useState(0);
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

  const selectAnswer = useCallback(
    (optionIndex: number) => {
      if (isAnswered) return;
      setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
      setShowExplanation(true);
    },
    [currentIndex, isAnswered]
  );

  const goNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowExplanation(false);
      setQuestionStartTime(Date.now());
    }
  }, [currentIndex, questions.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setShowExplanation(answers[currentIndex - 1] !== undefined);
    }
  }, [currentIndex, answers]);

  const finishExam = useCallback(() => {
    const correctCount = questions.reduce((count, q, i) => {
      return count + (answers[i] === q.correctIndex ? 1 : 0);
    }, 0);

    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total += 1;
      if (answers[i] === q.correctIndex) {
        categoryBreakdown[q.category].correct += 1;
      }
    });

    const results: ExamResults = {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      score: Math.round((correctCount / questions.length) * 100),
      timeSpentSecs: elapsed,
      categoryBreakdown,
    };

    if (isDemo) {
      setPendingEmailCapture(true);
    } else {
      setCompleted(true);
    }
    onComplete?.(results);
  }, [questions, answers, elapsed, onComplete, isDemo]);

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

  if (pendingEmailCapture && !completed) {
    const previewScore = Math.round(
      (questions.reduce(
        (count, q, i) => count + (answers[i] === q.correctIndex ? 1 : 0),
        0
      ) /
        questions.length) *
        100
    );

    const catBreakdown: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      if (!catBreakdown[q.category]) catBreakdown[q.category] = { correct: 0, total: 0 };
      catBreakdown[q.category].total += 1;
      if (answers[i] === q.correctIndex) catBreakdown[q.category].correct += 1;
    });
    const weakestCategory = Object.entries(catBreakdown).reduce(
      (worst, [cat, data]) => {
        const pct = data.total > 0 ? data.correct / data.total : 1;
        return pct < worst.pct ? { cat, pct } : worst;
      },
      { cat: "", pct: 2 }
    ).cat;

    return (
      <EmailCapture
        headline="Enter your email to see your results"
        description="We'll also send you free SPI study tips. No spam, ever."
        source="demo_exam"
        score={previewScore}
        weakestCategory={weakestCategory}
        onComplete={() => {
          setPendingEmailCapture(false);
          setCompleted(true);
        }}
      />
    );
  }

  if (completed) {
    const correctCount = questions.reduce(
      (count, q, i) => count + (answers[i] === q.correctIndex ? 1 : 0),
      0
    );
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 70;

    // Persist score history to localStorage for dashboard stats
    try {
      const prev: number[] = JSON.parse(localStorage.getItem("sonoprep_exam_scores") ?? "[]");
      prev.push(score);
      localStorage.setItem("sonoprep_exam_scores", JSON.stringify(prev.slice(-10))); // keep last 10
    } catch { /* storage unavailable */ }

    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total += 1;
      if (answers[i] === q.correctIndex) {
        categoryBreakdown[q.category].correct += 1;
      }
    });

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl space-y-8"
        role="region"
        aria-label="Exam results"
      >
        <Card className={passed ? "border-teal shadow-glow" : "border-amber"}>
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">
              {passed ? "Congratulations!" : "Keep Studying"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p
                className={cn("font-mono text-6xl font-bold", passed ? "text-teal-glow" : "text-amber")}
                aria-label={`Your score: ${score} percent`}
              >
                {score}%
              </p>
              <p className="mt-2 text-cream-dim">
                {correctCount} of {questions.length} correct • {formatTime(elapsed)}
              </p>
              {passed ? (
                <Badge className="mt-3">Passing Score (≥70%)</Badge>
              ) : (
                <Badge variant="amber" className="mt-3">
                  Below passing (need ≥70%)
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-cream-dim">
                Category Breakdown
              </h4>
              {Object.entries(categoryBreakdown).map(([cat, data]) => {
                const pct = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={cat}>
                    <div className="mb-1 flex justify-between text-base">
                      <span className="text-cream">{cat}</span>
                      <span className="font-mono text-cream-dim">
                        {data.correct}/{data.total} ({pct}%)
                      </span>
                    </div>
                    <Progress value={pct} aria-label={`${cat}: ${pct} percent`} />
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.location.reload()}
              >
                <RotateCcw className="mr-1 h-4 w-4" aria-hidden="true" />
                Try Again
              </Button>
              {isDemo && (
                <Button className="flex-1" asChild>
                  <a href="/products">Get Full Exam (110 Questions)</a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Badge variant="outline">
          Question {currentIndex + 1} of {questions.length}
        </Badge>
        <div className="flex items-center gap-2 font-mono text-sm text-cream-dim">
          <Clock className="h-4 w-4 text-teal" aria-hidden="true" />
          <span aria-label={`Elapsed time: ${formatTime(elapsed)}`}>{formatTime(elapsed)}</span>
        </div>
      </div>

      {/* Progress bar */}
      <Progress
        value={progress}
        aria-label={`Question ${currentIndex + 1} of ${questions.length}`}
      />

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <Badge variant="outline" className="mb-2 w-fit">
                {currentQ.category}
              </Badge>
              <CardTitle className="text-2xl leading-relaxed">
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            {/* aria-live announces result feedback to screen readers after answer selection */}
            <CardContent className="space-y-3" aria-live="polite" aria-atomic="false">
              <fieldset>
                <legend className="sr-only">
                  Select your answer for: {currentQ.question}
                </legend>
                {currentQ.options.map((option, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrectOption = i === currentQ.correctIndex;
                  const showResult = isAnswered;
                  const optionLetter = String.fromCharCode(65 + i);

                  let ariaLabel = `Option ${optionLetter}: ${option}`;
                  if (showResult && isCorrectOption) ariaLabel += " — correct answer";
                  if (showResult && isSelected && !isCorrectOption) ariaLabel += " — your answer, incorrect";

                  return (
                    <button
                      key={i}
                      onClick={() => selectAnswer(i)}
                      disabled={isAnswered}
                      aria-label={ariaLabel}
                      aria-pressed={isSelected}
                      className={cn(
                        "flex w-full items-center gap-3 rounded border p-4 text-left text-base transition-all",
                        !showResult && "border-border bg-charcoal hover:border-teal/50 hover:bg-mist cursor-pointer",
                        !showResult && isSelected && "border-teal bg-teal/10",
                        showResult && isCorrectOption && "border-success bg-success/10",
                        showResult && isSelected && !isCorrectOption && "border-error bg-error/10",
                        showResult && !isSelected && !isCorrectOption && "border-border bg-charcoal opacity-50",
                        isAnswered && "cursor-default"
                      )}
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs"
                        aria-hidden="true"
                      >
                        {optionLetter}
                      </span>
                      <span className="flex-1 text-cream">{option}</span>
                      {showResult && isCorrectOption && (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                      )}
                      {showResult && isSelected && !isCorrectOption && (
                        <XCircle className="h-5 w-5 shrink-0 text-error" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </fieldset>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card
              className={cn(
                "border",
                isCorrect ? "border-success/50" : "border-amber/50"
              )}
              role="status"
              aria-label={isCorrect ? "Correct answer explanation" : "Incorrect answer explanation"}
            >
              <CardContent className="flex gap-3 pt-6">
                {isCorrect ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber" aria-hidden="true" />
                )}
                <div>
                  <p className={cn("font-display font-semibold", isCorrect ? "text-success" : "text-amber")}>
                    {isCorrect ? "Correct!" : "Not quite"}
                  </p>
                  <p className="mt-1 text-base leading-relaxed text-cream-dim">
                    {currentQ.explanation}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={goPrev}
          disabled={currentIndex === 0}
          aria-label="Go to previous question"
        >
          <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
          Previous
        </Button>

        {currentIndex < questions.length - 1 ? (
          <Button
            onClick={goNext}
            disabled={!isAnswered}
            aria-label="Go to next question"
          >
            Next
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button
            variant="amber"
            onClick={finishExam}
            disabled={Object.keys(answers).length < questions.length}
            aria-label="Finish exam and see your results"
          >
            <BarChart3 className="mr-1 h-4 w-4" aria-hidden="true" />
            Finish Exam
          </Button>
        )}
      </div>

      {/* Keyboard hint — aria-hidden because it's supplemental info already exposed via button labels */}
      <p
        className="text-center font-mono text-[0.65rem] text-cream-dim"
        aria-hidden="true"
      >
        Keyboard: 1-4 to select • ← → to navigate
      </p>
    </div>
  );
}
