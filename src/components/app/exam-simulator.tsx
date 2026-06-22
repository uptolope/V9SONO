"use client";

import { useState } from "react";

interface SimulatorQuestion {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation?: string;
  domain?: string;
}

interface ExamSimulatorProps {
  questions: SimulatorQuestion[];
}

export function ExamSimulator({ questions }: ExamSimulatorProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [domainScores, setDomainScores] = useState<
    Record<string, { correct: number; total: number }>
  >({});

  if (!questions.length) return null;

  const isComplete = index >= questions.length;

  /* ── Results screen with domain breakdown ───────────────────── */
  if (isComplete) {
    const domains = Object.entries(domainScores).sort(
      ([, a], [, b]) => a.correct / a.total - b.correct / b.total
    );

    return (
      <div className="py-10">
        <div className="text-center mb-8">
          <p className="display-serif text-xl font-semibold text-white mb-2">
            Quiz Complete
          </p>
          <p className="text-sm text-[#8a8279] mb-1">
            {score}/{questions.length} correct (
            {Math.round((score / questions.length) * 100)}%)
          </p>
        </div>

        {/* Domain breakdown */}
        {domains.length > 0 && (
          <div className="mb-8">
            <p className="meta text-[9px] text-[#4a453f] mb-4">
              PERFORMANCE BY DOMAIN
            </p>
            <div className="space-y-3">
              {domains.map(([domain, { correct, total }]) => {
                const pct = Math.round((correct / total) * 100);
                const color =
                  pct >= 80
                    ? "bg-green-500/60"
                    : pct >= 60
                    ? "bg-yellow-500/60"
                    : "bg-red-500/60";
                return (
                  <div key={domain}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-[#c2bab0]">{domain}</span>
                      <span className="meta text-[9px] text-[#8a8279]">
                        {correct}/{total} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded">
                      <div
                        className={`h-full rounded ${color} transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => {
              setIndex(0);
              setSelected(null);
              setShowAnswer(false);
              setScore(0);
              setDomainScores({});
            }}
            className="btn-industrial-outline px-5 py-2 text-[10px]"
          >
            TRY AGAIN →
          </button>
        </div>
      </div>
    );
  }

  const current = questions[index];

  function handleAnswer(i: number) {
    if (showAnswer) return;
    setSelected(i);
    setShowAnswer(true);
    const correct = i === current.answerIndex;
    if (correct) setScore((s) => s + 1);

    // Track per-domain
    const domain = current.domain || "General";
    setDomainScores((prev) => ({
      ...prev,
      [domain]: {
        correct: (prev[domain]?.correct || 0) + (correct ? 1 : 0),
        total: (prev[domain]?.total || 0) + 1,
      },
    }));
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
        {current.domain && (
          <span className="meta text-[9px] text-[#c85b3a]/70">
            {current.domain}
          </span>
        )}
      </div>

      {/* Score tracker */}
      <div className="w-full h-0.5 bg-white/5 rounded mb-6">
        <div
          className="h-full bg-[#c85b3a]/60 rounded transition-all duration-300"
          style={{
            width: `${((index + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <h3 className="text-base font-medium text-white mb-6 leading-relaxed">
        {current.question}
      </h3>

      <div className="space-y-2">
        {current.choices.map((choice, i) => {
          const isCorrect = i === current.answerIndex;
          const isSelected = selected === i;

          let cls =
            "w-full text-left border rounded-lg p-3 text-sm transition-all ";
          if (showAnswer) {
            if (isCorrect)
              cls +=
                "border-green-500/40 bg-green-500/10 text-green-300";
            else if (isSelected)
              cls += "border-red-500/40 bg-red-500/10 text-red-300";
            else cls += "border-white/5 text-[#4a453f]";
          } else {
            cls +=
              "border-white/8 bg-[#111318] text-[#c2bab0] hover:border-[#c85b3a]/30 cursor-pointer";
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showAnswer}
              className={cls}
            >
              <span className="meta text-[9px] text-[#4a453f] mr-3">
                {String.fromCharCode(65 + i)}.
              </span>
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
          <button
            onClick={next}
            className="btn-industrial px-5 py-2 text-[10px]"
          >
            {index < questions.length - 1 ? "NEXT →" : "SEE RESULTS"}
          </button>
        </div>
      )}
    </div>
  );
}
