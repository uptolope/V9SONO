"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { saveProgress } from "@/hooks/useProgress";

type Question = {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation?: string;
  domain?: string;
};

const FREE_LIMIT = 8;

export default function PracticePage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: session } = useSession();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [comingSoon, setComingSoon] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [purchasedProducts, setPurchasedProducts] = useState<string[]>([]);

  // Free preview: 8 random questions from exam-data.ts via /api/demo/quiz
  // Paid users get full exam simulator via /api/questions
  useEffect(() => {
    // First check if product is coming soon
    fetch(`/api/questions?slug=${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error === "coming_soon") {
          setComingSoon(true);
        }
      })
      .catch(() => {});

    // Load free preview questions
    fetch("/api/demo/quiz")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setQuestions(data);
      })
      .catch(() => setQuestions([]));
  }, [params.slug]);

  // Fetch user purchases (if logged in)
  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/user/purchases")
      .then((res) => res.json())
      .then((data) => {
        if (data.purchases) {
          // Map productKey to question bank slug
          const slugMap: Record<string, string> = {
            PHYSICS_QB: "ultrasound-physics",
            ABDOMEN_QB: "abdominal-ultrasound",
            VASCULAR_QB: "vascular-ultrasound",
            // Also check if they bought the old products that grant access
            PREMIUM_BUNDLE: "ultrasound-physics",
            EXAM_SIMULATOR: "ultrasound-physics",
          };
          const owned = data.purchases
            .map((p: { productKey: string }) => slugMap[p.productKey])
            .filter(Boolean);
          setPurchasedProducts(owned);
        }
      })
      .catch(() => {});
  }, [session]);

  /* ── Coming soon state ─────────────────────────────────────────── */
  if (comingSoon) {
    const title = params.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="meta text-[9px] text-[#c85b3a] mb-4">
            COMING SOON
          </div>
          <h2 className="display-serif text-2xl font-semibold text-white mb-3">
            {title} Questions
          </h2>
          <p className="body-readable text-[#8a8279] text-sm mb-8">
            We&apos;re finalizing the licensed question bank for this product.
            Check back soon or start with our physics questions.
          </p>
          <Link
            href="/practice/ultrasound-physics"
            className="btn-industrial px-8 py-4 text-[11px]"
          >
            TRY PHYSICS QUESTIONS →
          </Link>
        </div>
      </div>
    );
  }

  /* ── Loading state ─────────────────────────────────────────────── */
  if (!questions.length && !comingSoon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#4a453f] text-sm">
          Loading questions…
        </div>
      </div>
    );
  }

  const hasAccess = purchasedProducts.includes(params.slug);
  const isLocked = !hasAccess && index >= FREE_LIMIT;
  const current = questions[index];
  const isLastQuestion = index >= questions.length - 1;

  function handleAnswer(i: number) {
    if (showAnswer) return;
    setSelected(i);
    setShowAnswer(true);
    const correct = i === current.answerIndex;
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
    saveProgress(current.id, correct);
  }

  function next() {
    setSelected(null);
    setShowAnswer(false);
    setIndex((prev) => prev + 1);
  }

  /* ── Paywall gate ──────────────────────────────────────────────── */
  if (isLocked) {
    const title = params.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="meta text-[9px] text-[#c85b3a] mb-4">
            FREE PREVIEW COMPLETE
          </div>
          <h2 className="display-serif text-2xl font-semibold text-white mb-3">
            Continue with Full Access
          </h2>
          <p className="body-readable text-[#8a8279] text-sm mb-2">
            You answered {score.correct} of {score.total} correctly in the
            preview.
          </p>
          <p className="body-readable text-[#c2bab0] text-sm mb-8">
            Unlock the full {title} question bank to keep practicing with
            detailed explanations and progress tracking.
          </p>
          <Link
            href={`/products/${params.slug}`}
            className="btn-industrial px-8 py-4 text-[11px]"
          >
            UNLOCK FULL ACCESS →
          </Link>
          <p className="meta text-[9px] text-[#3a3530] mt-4">
            14-day full refund · instant access
          </p>
        </div>
      </div>
    );
  }

  /* ── Practice UI ───────────────────────────────────────────────── */
  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <Link
          href={`/products/${params.slug}`}
          className="inline-flex items-center gap-2 meta text-[10px] text-[#4a453f] hover:text-[#c85b3a] mb-8 transition-colors"
        >
          ← BACK TO PRODUCT
        </Link>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="meta text-[9px] text-[#4a453f]">
              QUESTION {index + 1}{" "}
              {!hasAccess && `OF ${FREE_LIMIT} FREE`}
            </span>
            <span className="meta text-[9px] text-[#4a453f]">
              {score.correct}/{score.total} CORRECT
            </span>
          </div>
          <div className="w-full h-0.5 bg-white/5 rounded">
            <div
              className="h-full bg-[#c85b3a]/60 rounded transition-all duration-300"
              style={{
                width: `${((index + 1) / (hasAccess ? questions.length : FREE_LIMIT)) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Domain tag */}
        {current.domain && (
          <span className="meta text-[8px] text-[#c85b3a]/60 mb-3 block">
            {current.domain}
          </span>
        )}

        {/* Question */}
        <h2 className="display-serif text-lg font-medium text-white mb-8 leading-relaxed">
          {current.question}
        </h2>

        {/* Choices */}
        <div className="space-y-3">
          {current.choices.map((choice, i) => {
            const isCorrect = i === current.answerIndex;
            const isSelected = selected === i;

            let classes =
              "w-full text-left border rounded-lg p-4 text-sm transition-all duration-200 ";

            if (showAnswer) {
              if (isCorrect) {
                classes +=
                  "border-green-500/40 bg-green-500/10 text-green-300";
              } else if (isSelected) {
                classes += "border-red-500/40 bg-red-500/10 text-red-300";
              } else {
                classes +=
                  "border-white/5 bg-transparent text-[#4a453f]";
              }
            } else {
              classes +=
                "border-white/8 bg-[#111318] text-[#c2bab0] hover:border-[#c85b3a]/30 hover:bg-[#c85b3a]/5 cursor-pointer";
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={showAnswer}
                className={classes}
              >
                <span className="meta text-[9px] text-[#4a453f] mr-3">
                  {String.fromCharCode(65 + i)}.
                </span>
                {choice}
              </button>
            );
          })}
        </div>

        {/* Explanation + Next */}
        {showAnswer && (
          <div className="mt-8">
            {current.explanation && (
              <div className="mb-6 p-4 border border-white/5 bg-[#111318] rounded-lg">
                <p className="meta text-[9px] text-[#4a453f] mb-2">
                  EXPLANATION
                </p>
                <p className="text-sm text-[#c2bab0] leading-relaxed">
                  {current.explanation}
                </p>
              </div>
            )}

            {!isLastQuestion ? (
              <button
                onClick={next}
                className="btn-industrial px-6 py-3 text-[10px]"
              >
                NEXT QUESTION →
              </button>
            ) : (
              <div className="text-center">
                <p className="display-serif text-lg font-semibold text-white mb-2">
                  Preview complete
                </p>
                <p className="text-sm text-[#8a8279] mb-6">
                  {score.correct}/{score.total} correct
                </p>
                <Link
                  href={`/products/${params.slug}`}
                  className="btn-industrial px-8 py-4 text-[11px]"
                >
                  GET FULL ACCESS →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
