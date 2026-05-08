You are an expert full‑stack developer. Review the following codebase and suggest improvements, bug fixes, or optimizations.


// FILE: src/app/page-client.tsx
"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/layout/header";
import { ExamSimulator } from "@/components/app/exam-simulator";
import { FlashcardViewer } from "@/components/app/flashcard-viewer";
import { DEMO_QUESTIONS } from "@/lib/demo/exam-data";
import { DEMO_FLASHCARDS } from "@/lib/demo/flashcard-data";

function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden page-emerge">
      <div className="sono-atmosphere" />
      <div className="sono-scan" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className={`text-center mb-8 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="meta tracking-[0.2em]">ARDMS SPI EXAM PREP</span>
        </div>
        <div className={`text-center mb-8 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="display-display text-7xl sm:text-8xl md:text-9xl leading-[1.05]">
            Pass the<br /><span className="text-[#c85b3a]">SPI Exam.</span>
          </h1>
        </div>
        <div className={`text-center mb-12 transition-all duration-1000 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="body-readable text-lg max-w-xl mx-auto text-[#b8b0a4]">Master the SPI exam with spaced repetition flashcards, a 170‑question simulator, 50 physics pearls, and 159 pages of study notes – all created by sonographers who passed.</p>
        </div>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Link href="#demo" className="tactile-button px-8 py-4 bg-[#c85b3a] text-white hover:bg-[#a8452a] transition-all duration-300">Try Free Demo →</Link>
          <Link href="/products" className="tactile-button px-8 py-4 border border-[#c85b3a]/50 text-[#f0ebe4] hover:bg-[#c85b3a]/10 transition-all duration-300">View Products</Link>
        </div>
        <div className={`grid grid-cols-3 gap-8 max-w-md mx-auto transition-all duration-1000 delay-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center"><div className="display-serif text-3xl font-bold text-white">200+</div><div className="meta text-[10px] mt-1">Expert Flashcards</div></div>
          <div className="text-center"><div className="display-serif text-3xl font-bold text-white">170</div><div className="meta text-[10px] mt-1">Questions</div></div>
          <div className="text-center"><div className="display-serif text-3xl font-bold text-white">$9</div><div className="meta text-[10px] mt-1">Starting Price</div></div>
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  const [activeTab, setActiveTab] = useState<"exam" | "flashcards">("exam");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="demo" ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="meta">TRY BEFORE YOU BUY</span>
          <h2 className="display-serif text-4xl sm:text-5xl mt-4 font-semibold tracking-tight">Experience the difference</h2>
          <p className="body-readable text-[#b8b0a4] mt-4">Test the exam simulator and flashcards free. No account required.</p>
        </div>
        <div className={`flex border-b border-[#f0ebe4]/10 mb-8 transition-all duration-1000 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
          <button onClick={() => setActiveTab("exam")} className={`px-8 py-3 meta transition-all ${activeTab === "exam" ? "text-[#c85b3a] border-b border-[#c85b3a]" : "text-[#6b6359] hover:text-[#b8b0a4]"}`}>Exam Simulator</button>
          <button onClick={() => setActiveTab("flashcards")} className={`px-8 py-3 meta transition-all ${activeTab === "flashcards" ? "text-[#c85b3a] border-b border-[#c85b3a]" : "text-[#6b6359] hover:text-[#b8b0a4]"}`}>Flashcards</button>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${visible ? "opacity-100" : "opacity-0"}`}>
          {activeTab === "exam" ? <ExamSimulator questions={DEMO_QUESTIONS.slice(0, 5)} /> : <FlashcardViewer cards={DEMO_FLASHCARDS} />}
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  { name: "SPI Flashcards", price: "$29", desc: "200+ cards · SM-2 spaced repetition algorithm", tag: "Master key concepts" },
  { name: "Exam Simulator", price: "$49", desc: "170 questions · ARDMS domain weighting", tag: "Realistic practice", featured: true },
  { name: "Physics Pearls", price: "$9", desc: "50 pearls · high‑yield physics summaries", tag: "Quick mastery" },
  { name: "Study Notes", price: "$39", desc: "159 pages · complete reference", tag: "Deep dive" },
  { name: "Premium Bundle", price: "$99", desc: "Save $27 · all four products", tag: "Best value", bundle: true },
];

function ProductsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="meta">CHOOSE YOUR PATH</span>
          <h2 className="display-serif text-4xl sm:text-5xl mt-4 font-semibold tracking-tight">Everything you need to pass</h2>
          <p className="body-readable text-[#b8b0a4] max-w-xl mx-auto mt-4">Pick individual tools or save $27 with the full bundle. All products include 90‑day access.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {PRODUCTS.map((product, i) => (
            <div key={product.name} className={`depth-border corner-arch p-5 tactile-card transition-all hover:border-[#c85b3a]/40 ${product.featured ? "border-l-[3px] border-l-[#c85b3a]" : ""} ${product.bundle ? "bg-[#c85b3a]/5" : ""}`} style={{ transitionDelay: visible ? `${i * 50}ms` : "0ms", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}>
              {product.bundle && <div className="absolute top-0 left-0 bg-[#c85b3a] px-2 py-0.5 text-[9px] meta text-white">BEST VALUE</div>}
              {product.featured && !product.bundle && <div className="absolute top-0 left-0 bg-[#c85b3a]/80 px-2 py-0.5 text-[9px] meta text-white">POPULAR</div>}
              <div className="pt-6">
                <div className="text-[#6b6359] text-[10px] meta mb-2">{product.tag}</div>
                <h3 className="display-serif text-base font-semibold text-[#f0ebe4] mb-1">{product.name}</h3>
                <div className="text-2xl font-semibold text-[#c85b3a] mb-2">{product.price}<span className="text-[9px] text-[#6b6359] ml-1">/ 90d</span></div>
                <div className="body-small text-[#6b6359] text-[10px] mb-4">{product.desc}</div>
                <Link href="/products" className="meta text-[10px] text-[#6b6359] hover:text-[#c85b3a] transition-colors">GET STARTED →</Link>
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-8 text-center transition-all duration-1000 delay-400 ${visible ? "opacity-100" : "opacity-0"}`}>
          <p className="meta text-[10px] text-[#6b6359]">Bundle saves you $27 · All products include 90‑day access</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#f0ebe4]/5 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div><div className="display-serif text-xl font-semibold text-[#f0ebe4] mb-2">SonoPrep</div><div className="body-small text-[#6b6359]">Built by sonographers, for sonographers.</div></div>
          <div className="flex gap-12">
            <div><div className="meta text-[10px] mb-3 text-[#6b6359]">PRODUCT</div><div className="space-y-2"><Link href="/products" className="body-small text-[#6b6359] hover:text-[#f0ebe4] text-xs block">Pricing</Link><Link href="/demo" className="body-small text-[#6b6359] hover:text-[#f0ebe4] text-xs block">Demo</Link></div></div>
            <div><div className="meta text-[10px] mb-3 text-[#6b6359]">RESOURCES</div><div className="space-y-2"><Link href="/blog" className="body-small text-[#6b6359] hover:text-[#f0ebe4] text-xs block">Journal</Link><Link href="/faq" className="body-small text-[#6b6359] hover:text-[#f0ebe4] text-xs block">FAQ</Link></div></div>
            <div><div className="meta text-[10px] mb-3 text-[#6b6359]">LEGAL</div><div className="space-y-2"><Link href="/privacy" className="body-small text-[#6b6359] hover:text-[#f0ebe4] text-xs block">Privacy</Link><Link href="/terms" className="body-small text-[#6b6359] hover:text-[#f0ebe4] text-xs block">Terms</Link></div></div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-[#f0ebe4]/5 text-center meta text-[10px] text-[#4a453f]">SonoPrep is not affiliated with ARDMS. SPI is a registered trademark of ARDMS.</div>
      </div>
    </footer>
  );
}

export function HomePageClient() {
  return (
    <div className="min-h-screen bg-[#0a0c10]">
      <Header />
      <main>
        <Hero />
        <DemoSection />
        <ProductsSection />
        <Footer />
      </main>
    </div>
  );
}


// FILE: src/components/app/exam-simulator.tsx
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


// FILE: src/lib/exam/full-questions.ts
// Auto-generated from your exact question bank
export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  domain: string;
  explanation: string;
}

export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    "id": 1,
    "question": "Ultrasound wave propagation causes displacement of particles in a medium. The regions of greatest particle concentration are called __________ while the regions of lowest particle concentration are called ________",
    "options": [
      "Compressions, rarefactions",
      "Rarefactions, compressions",
      "Elevation, depression",
      "Depression, elevation"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 2,
    "question": "The effects of ultrasound on living tissue are called",
    "options": [
      "Hazardous effects",
      "Chemical effects",
      "Tissue effects",
      "Bio-effects"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 3,
    "question": "The acoustic variables that change as sound propagates through a medium",
    "options": [
      "Pressure",
      "Density",
      "Particle motion",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 4,
    "question": "The properties that describe the effects of the medium on the sound wave travelling through it are called",
    "options": [
      "Mechanical properties",
      "Travelling properties",
      "Acoustic propagation properties",
      "Variable properties"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 5,
    "question": "Destructive interference results",
    "options": [
      "when a pair of in-phase waves interferes with each other",
      "when a pair of conjugal waves interferes with each other",
      "when a pair of out-of-phase waves interferes with each other",
      "when a pair of transverse waves interferes with each other"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 6,
    "question": "Transverse waves travel_________ to the motion of the particle in the wave, while longitudinal waves travel ___________ to the particle motion",
    "options": [
      "incidental",
      "Perpendicular",
      "Parallel",
      "a & b"
    ],
    "correctAnswer": 4,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 7,
    "question": "Waves that are in-phase interfere constructively with each other. The single wave resulting from the interference will always have a _________ amplitude than either of the original waves",
    "options": [
      "Smaller",
      "Higher",
      "Longer",
      "The same"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 8,
    "question": "The acoustic parameters include:",
    "options": [
      "Period",
      "Wavelength",
      "Intensity",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 9,
    "question": "Ultrasound frequency is defined as sound wave at least",
    "options": [
      "10,000Hz",
      "5000Hz",
      "20,000Hz",
      "15,000Hz"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 10,
    "question": "Infrasound has frequency less than",
    "options": [
      "20Hz",
      "40Hz",
      "10Hz",
      "100Hz"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 11,
    "question": "Frequency is _________ to period",
    "options": [
      "Directly related",
      "Equal",
      "Reciprocal",
      "Proportional"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 12,
    "question": "The strength of the amplitude diminishes as sound wave travels within the body. This process is known as",
    "options": [
      "attenuation",
      "propagation",
      "intensity",
      "amplification"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 13,
    "question": "The units of power are",
    "options": [
      "Centimeters",
      "kilogram",
      "Watts",
      "Micrometer"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 14,
    "question": "Power is proportional to",
    "options": [
      "Wavelength",
      "Imaging depth",
      "Amplitude",
      "Amplitude2"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 15,
    "question": "The wavelength is determined by",
    "options": [
      "The source",
      "The medium",
      "The source and the medium",
      "The monitor"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 16,
    "question": "Higher frequencies generally produce",
    "options": [
      "higher quality images",
      "greater details",
      "lower quality images",
      "shallow imaging depth"
    ],
    "correctAnswer": 4,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 17,
    "question": "The propagation speed of ultrasound in soft tissue is",
    "options": [
      "300 m/s",
      "1,540 m/s",
      "3300 m/s",
      "500 m/s"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 18,
    "question": "The property(ies) that establish the propagation speed of sound in a medium are",
    "options": [
      "Density",
      "Elasticity",
      "a & b",
      "None of the above"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 19,
    "question": "The pulse duration is the actual time that a transducer is creating one pulse. Pulse duration is determined by",
    "options": [
      "The sound source(transducer)",
      "The sonographer",
      "The medium",
      "The patient"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 20,
    "question": "Both the period and pulse duration are measured in units of",
    "options": [
      "Density",
      "Volume",
      "Distance",
      "Time"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 21,
    "question": "Spatial pulse length is the distance that a pulse occupies in space. Spatial pulse length, like wavelength depends on",
    "options": [
      "The imaging depth",
      "The source",
      "The medium",
      "Both the source and the medium"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 22,
    "question": "Pulse repetition period(PRP) and pulse repetition frequency(PRF) are",
    "options": [
      "Directly related",
      "Reciprocals",
      "Affected by the depth of view",
      "b & c"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 23,
    "question": "The Duty factor is the amount of time that the transducer is transmitting sound energy. The value of the duty factor is",
    "options": [
      "Unitless",
      "Expressed as percentages or decimal",
      "Expressed in units of distance",
      "a & b"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 24,
    "question": "The duty factor of a continuous wave is",
    "options": [
      "Between 50 & 60 %",
      "100%",
      "Less than 100%",
      "More than 100%"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 25,
    "question": "The duty factor of a pulsed wave is",
    "options": [
      "Between 50 & 60 %",
      "100%",
      "Less than 100%",
      "More than 100%"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 26,
    "question": "In diagnostic pulsed ultrasound, the duty factor is usually",
    "options": [
      "Less than 1%",
      "100%",
      "Between 50 & 60%",
      "More than 1%"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 27,
    "question": "The parameters that describe a pulsed wave are:",
    "options": [
      "Pulse duration",
      "Pulse repetition period",
      "Pulse repetition frequency",
      "Spatial pulse length"
    ],
    "correctAnswer": 5,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 28,
    "question": "A substance applied on the face of the transducer and used to avoid diminished quality of sound signal transmitted between the transducer and the body tissue is known as",
    "options": [
      "Ultraviolet agent",
      "Contrast agent",
      "Bubble agent",
      "Gel or coupling agent"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 29,
    "question": "Attenuation is the process by which the power of sound wave diminishes as it propagates through a medium. The following factors contribute to attenuation",
    "options": [
      "Reflection",
      "Scattering",
      "Absorption",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 30,
    "question": "Axial resolution depends on_________ while lateral resolution depends on __________",
    "options": [
      "Spatial pulse length, beam width",
      "Beam width, spatial pulse length",
      "Attenuation",
      "Intensity"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 31,
    "question": "Axial resolution is also known as",
    "options": [
      "Azimuthal",
      "Longitudinal",
      "Radial",
      "Range"
    ],
    "correctAnswer": 6,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 32,
    "question": "Lateral resolution is also known as",
    "options": [
      "Radial",
      "Angular",
      "Azimuthal",
      "Transverse"
    ],
    "correctAnswer": 5,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 33,
    "question": "The Principle which states that all points on a wave-front can be considered as point sources for the production of spherical secondary wavelets is called",
    "options": [
      "Bernoulli principle",
      "Huygens Principle",
      "Ohm Principle",
      "Pythagorean principle"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 34,
    "question": "Ultrasound waves in tissues are",
    "options": [
      "Longitudinal",
      "Lateral",
      "Transverse",
      "Vertical"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 35,
    "question": "The term Hertz(Hz) denotes",
    "options": [
      "Cycles per second",
      "Cycles per day",
      "Cycles per hour",
      "Cycles per minute"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 36,
    "question": "The damping material in the transducer housing does not affect lateral resolution. However it:",
    "options": [
      "Reduces pulse duration",
      "Improves axial resolution",
      "Reduces Spatial pulse length (SPL)",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 37,
    "question": "In ultrasound physics, the time taken to complete one cycle is called",
    "options": [
      "Wavelength",
      "Frequency",
      "Amplitude",
      "Period"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 38,
    "question": "Longitudinal waves are characterized by",
    "options": [
      "Motion of particles parallel to the axis of wave propagation",
      "Motion of particles perpendicular to the axis of wave propagation",
      "Motion of particles above the axis of wave propagation",
      "Motion of particles below the axis of wave propagation"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 39,
    "question": "Transverse waves are characterized by",
    "options": [
      "Motion of particles parallel to the axis of wave propagation",
      "Motion of particles perpendicular to the axis of wave propagation",
      "Motion of particles above the axis of wave propagation",
      "Motion of particles below the axis of wave propagation"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 40,
    "question": "Wavelength will ________ if frequency _________",
    "options": [
      "Decrease, decreases",
      "Decrease, increases",
      "Increase, decreases",
      "Increase, increases"
    ],
    "correctAnswer": 4,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 41,
    "question": "Penetration will _________ as frequency __________",
    "options": [
      "Decrease, decreases",
      "Decrease, increases",
      "Increase, decreases",
      "Increase, increases"
    ],
    "correctAnswer": 4,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 42,
    "question": "Resolution __________ as frequency _____________",
    "options": [
      "Decrease, decreases",
      "Decrease, increases",
      "Increase, decreases",
      "Increase, increases"
    ],
    "correctAnswer": 4,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 43,
    "question": "Attenuation may be a result of",
    "options": [
      "Reflection",
      "Absorption",
      "Transmission",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 44,
    "question": "Acoustic impedance(Z) may be defined as",
    "options": [
      "Intensity X density",
      "Density X wavelength",
      "Wavelength X propagation speed",
      "Density X propagation speed"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 45,
    "question": "Acoustic impedance depends on:",
    "options": [
      "Density of tissue",
      "Stiffness of tissue",
      "Elasticity of the tissue",
      "Compressibility of the tissue"
    ],
    "correctAnswer": 4,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 46,
    "question": "The number of pulses emitted per second is called",
    "options": [
      "Pulse repetition period (PRP)",
      "Pulse repetition frequency (PRF)",
      "Pulse duration (PD)",
      "Spatial pulse length (SPL)"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 47,
    "question": "The time from the beginning of one pulse to the beginning of the next",
    "options": [
      "Pulse repetition period (PRP)",
      "Pulse repetition frequency (PRF)",
      "Pulse duration (PD)",
      "Spatial pulse length (SPL)"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 48,
    "question": "The time during which pulse actually occurs",
    "options": [
      "Pulse repetition period (PRP)",
      "Pulse repetition frequency (PRF)",
      "Pulse duration (PD)",
      "Spatial pulse length (SPL)"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 49,
    "question": "Transducers are focused by two main methods, internal focusing and external focusing. Internal focusing is achieved by__________ while external focusing is achieved by ____________",
    "options": [
      "Cutting a curved transducer element, using an acoustic lens",
      "Using an acoustic lens, cutting a curved transducer element",
      "Both are achieved by cutting a curved transducer element",
      "Both are achieved by using an acoustic lens"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 50,
    "question": "The range of frequencies that are present within the pulse is called",
    "options": [
      "Bandwidth",
      "Frequency",
      "Pulse repetition frequency",
      "Power"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 51,
    "question": "The ratio of the operating (main)frequency to the bandwidth is called",
    "options": [
      "Amplitude factor",
      "Quality factor",
      "Intensity factor",
      "Propagation factor"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 52,
    "question": "Decreasing the spatial pulse length",
    "options": [
      "Improves lateral resolution",
      "Decreases lateral resolution",
      "Increases axial resolution",
      "Decreases axial resolution"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 53,
    "question": "Axial resolution is improved by",
    "options": [
      "Damping the PZT",
      "Intensity",
      "Power",
      "Sound beam diameter"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 54,
    "question": "If the amplitude is doubled, the intensity is",
    "options": [
      "Doubled",
      "Reduced by 50%",
      "Unchanged",
      "Increased 4 fold"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 55,
    "question": "Attenuation is the process by which",
    "options": [
      "the power of sound wave diminishes as it propagates through  the body",
      "the intensity of sound increases as it travels through a medium",
      "the intensity of soundwave remains unchanged as it propagates though a medium",
      "the intensity of sound is converted into electrical energy as it travels through a medium"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 56,
    "question": "The bandwidth of an ultrasound beam is",
    "options": [
      "Can be increased using the coupling gel",
      "Is the difference between the highest and lowest frequency",
      "Is the addition of the highest and lowest frequency",
      "The median frequency"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 57,
    "question": "The relative strength of a sound beam as it undergoes attenuation or amplification may be measured in :",
    "options": [
      "Inches",
      "Kilograms",
      "Rayls",
      "Decibels"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 58,
    "question": "The incident intensity of a sound beam is 65 w/cm2 while the transmitted intensity is 55 w/cm2. What is the reflected intensity?",
    "options": [
      "110 w/cm2",
      "10 w/cm2",
      "25 w/cm2",
      "There is no refection"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 59,
    "question": "The acoustic impedance of a medium",
    "options": [
      "The product of the propagation speed and the density of the medium",
      "Directly proportional to the density",
      "Inversely proportional to the propagation speed",
      "Is unrelated to either the propagation or density"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 60,
    "question": "The following is true about decibels except:",
    "options": [
      "A decibel represents a relationship between two numbers",
      "a relative measure of intensity of power",
      "Decibel notation is based on algorithms",
      "The decibel notation is negative when the acoustic signal is amplified and positive when the acoustic signal is attenuated"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 61,
    "question": "Attenuation in soft tissue",
    "options": [
      "Increases with propagation speed of the tissue",
      "Increases with tissue thickness",
      "Increased with high frequency",
      "Decreases with shorter wavelength"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 62,
    "question": "Which of the following determines the amount of reflection at an interface of two dissimilar media?",
    "options": [
      "The time gain compensation",
      "The frequency",
      "The period",
      "The difference in acoustic impedance"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 63,
    "question": "When a sound wave strikes a tissue interface at an oblique angle of incidence, what other condition must be present for refraction to take place?",
    "options": [
      "A strong reflector",
      "The presence of several smaller reflectors",
      "Normal incidence",
      "A difference in propagation speeds between the two media"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 64,
    "question": "When a sound wave strikes an interface with a normal incidence, the following other condition must be present for reflection to happen.",
    "options": [
      "An oblique incidence",
      "A strong reflector",
      "A difference in acoustic impedance",
      "The two media must have the same acoustic impedance"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 65,
    "question": "Ultrasound transducers",
    "options": [
      "Convert thermal to cavitation energy and vice versa",
      "Convert electrical to mechanical energy and vice versa",
      "Only converts mechanical to heat energy",
      "Only converts heat to mechanical energy"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 66,
    "question": "Which of the following describes the change in direction of an ultrasound beam as it travels from one medium to another",
    "options": [
      "Rarefaction",
      "Compression",
      "Reflection",
      "Refraction"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 67,
    "question": "Which of the following relates to the quality factor?",
    "options": [
      "Main frequency",
      "Highest frequency",
      "Lowest frequency",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 68,
    "question": "The incident reflection coefficient is",
    "options": [
      "The % of intensity that bounces back at an interface between two media of different impedance",
      "The % of intensity that is absorbed at the interface",
      "The % of intensity that is transmitted at the interface between two media of different impedance",
      "All of the above"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 69,
    "question": "The incident transmission coefficient is",
    "options": [
      "The % of intensity that bounces back at an interface between two media of different impedance",
      "The % of intensity that is absorbed at the interface",
      "The % of intensity that is transmitted at the interface between two media of different impedance",
      "All of the above"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 70,
    "question": "The formula for the incident reflection coefficient (IRC) is",
    "options": [
      "(Z2 + Z1 /Z2 + Z1 )2 X 100",
      "(Z2 + Z1 /Z2 - Z1 )2 X 100",
      "(Z2 – Z1 /Z2 + Z1 )2 X 100",
      "(Z2 – Z1 /Z2 - Z1 )2 X 100"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 71,
    "question": "IRC is",
    "options": [
      "A unitless value expressed as percentage",
      "Expressed in decibels",
      "Expressed as Watts/cm2",
      "Expressed in units of time"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 72,
    "question": "Incident intensity is reflected intensity plus transmitted intensity",
    "options": [
      "A unitless value expressed as percentage",
      "Expressed in decibels",
      "Expressed as Watts/cm2",
      "Expressed in units of time"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 73,
    "question": "According to the Range equation",
    "options": [
      "For every 10 seconds of go-return-time, the sound beam travels a distance of 1 centimeter deeper in the body",
      "For every 10 microsecond of go-return-time, the sound beam travels a distance of 1 centimeter deeper in the body",
      "For every 13 seconds of go-return-time, the sound beam travels a distance of 1 centimeter deeper in the body",
      "For every 13 microseconds of go-return-time, the sound beam travels a distance of 1 centimeter deeper in the body"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 74,
    "question": "A- mode appears on display as",
    "options": [
      "A block of wavy lines, indicating the changing position of moving reflectors",
      "A line graph display as a series of upward spikes",
      "A line of dots of varying brightness",
      "A mix of colors, usually read, blue, green and yellow"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 75,
    "question": "B- mode appears on display as",
    "options": [
      "A block of wavy lines, indicating the changing position of moving reflectors",
      "A line graph display as a series of upward spikes",
      "A line of dots of varying brightness",
      "A mix of colors, usually read, blue, green and yellow"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 76,
    "question": "Better axial resolution is associated with the following except",
    "options": [
      "Shorter  SPL",
      "Shorter PD",
      "Shorter wavelength",
      "Smaller beam width"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 77,
    "question": "Focusing the ultrasound beam helps to achieve the following except",
    "options": [
      "Narrower focal depth",
      "Shorter wavelength",
      "Focal zone is shorter and thinner",
      "Narrower beam diameter(width) in near field and focal zone"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 78,
    "question": "The matching layer",
    "options": [
      "Helps to reduce reflection at the transducer/tissue interface",
      "Helps to increase reflection at the transducer/tissue interface",
      "Helps to reduce transmission at the transducer/tissue interface",
      "Helps to increase the attenuation at the transducer/tissue interface"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 79,
    "question": "The frequency of the acoustic wave produced by a standard pulsed wave ultrasound system depends on",
    "options": [
      "Frequency of the electric voltage in the system",
      "Curie temperature",
      "Type of active element",
      "The thickness of the PZT and propagation speed of sound in the PZT"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 80,
    "question": "Bi-stable images are composed of",
    "options": [
      "2 or more shades of gray",
      "2 shades of gray",
      "One shade of gray",
      "Shades of blue and red"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 81,
    "question": "In grayscale displays",
    "options": [
      "There are multiple levels of brightness from light to darker shades of gray",
      "These different shades indicate different echo amplitudes",
      "The different shades differentiate the various body tissues",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 82,
    "question": "The scan converter",
    "options": [
      "temporarily retains scanned image for review and converts the image into format suitable for display, recording and storage",
      "permanently stores the scanned image",
      "deletes the stored image",
      "all of the above"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 83,
    "question": "Within the scan converter,",
    "options": [
      "Image attributes such as amplitude at each pixel location are converted from analog and re-presented in binary form",
      "Echo signals into a suitable format for display",
      "The multiple frames(images) acquired are  displayed as a single scan",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 84,
    "question": "Picture Archiving and communications System (PACS)",
    "options": [
      "is the set of rules under which the components of the system communicate.",
      "is the physical computer network installed within the facility",
      "is the administrative procedure for communicating with colleagues",
      "is the procedure for communicating with patients"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 85,
    "question": "Digital Imaging and Computers in Medicine (DICOM)",
    "options": [
      "is the set of rules under which the components of the system communicate.",
      "is the physical computer network installed within the facility",
      "is the administrative procedure for communicating with colleagues",
      "is the procedure for communicating with patients"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 86,
    "question": "There are 2 types of scan converters, analog and digital. The limitations of analog scan converters include",
    "options": [
      "image fade",
      "image flicker",
      "deterioration",
      "all of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 87,
    "question": "Advantages of digital converters include",
    "options": [
      "Uniformity",
      "Stability",
      "Durability",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 88,
    "question": "With digital imaging, the image or picture is divided into many small squares similar to a checkerboard called",
    "options": [
      "Bits",
      "Pixel",
      "Word",
      "Bytes"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 89,
    "question": "A byte = ______bits while a word = ______ bytes",
    "options": [
      "16, 8",
      "8, 16",
      "8, 2",
      "2, 8"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 90,
    "question": "Spatial compounding",
    "options": [
      "Is the technique by which Images of an object are acquired in different acoustic frequencies and  then averaged or compounded to reduce speckles (signal to noise ratio)",
      "Superimposes the current frame on previous frames (history) to create a smoother image",
      "Is the technique for producing a single image from several imaging angles. The frames are overlapped to form a single real-time image",
      "Is the method of filling in gaps of missing data that usually exists in sector shaped images as scan lines become wider apart with depth"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 91,
    "question": "Dynamic Range",
    "options": [
      "Is the extent to which a signal can vary and still maintain accuracy",
      "Is the number of,  or possible gray shades an image can produce",
      "Is the related to the bandwidth",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 92,
    "question": "Harmonic frequencies :",
    "options": [
      "Are created due to the linear distortions that sound pulses undergo as they propagate through tissue",
      "Harmonic frequencies are created due to the nonlinear distortions that sound pulses undergo as they propagate through tissue",
      "Harmonic frequencies are fractions of the main or fundamental frequencies",
      "Harmonic imaging is the creation of an image from sound reflections at half the fundamental frequency of the transmitted sound"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 93,
    "question": "Contrast agents",
    "options": [
      "Are designed to create strong reflections that light up blood vessels, blood chambers and other anatomic regions",
      "Are either intravenously injected or ingested",
      "Are commonly used to enhance echo signals from blood",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 94,
    "question": "Phased array transducers are",
    "options": [
      "Focused and steered electronically",
      "Focused and steered mechanically",
      "Focused electronically and steered mechanically",
      "Focused mechanically and steered electronically"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 95,
    "question": "Mechanical transducers are",
    "options": [
      "Focused and steered electronically",
      "Focused and steered mechanically",
      "Focused electronically and steered mechanically",
      "Focused mechanically and steered electronically"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 96,
    "question": "One method of focusing an array transducer is",
    "options": [
      "Internal focusing, using a curved element",
      "Supradicing",
      "Apodization",
      "b & c"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 97,
    "question": "Type of resolution contributes to image quality:",
    "options": [
      "Axial resolution",
      "Lateral resolution",
      "Elevational resolution",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 98,
    "question": "Dynamic or multiple focusing is a technique to",
    "options": [
      "Focus the ultrasound beam at multiple imaging points only during reception of ultrasound signals or waves",
      "Focus the ultrasound beam at multiple imaging points only during transmission of ultrasound signals or waves",
      "Focus the ultrasound beam at multiple imaging points both during transmission and reception of ultrasound signals or waves",
      "Focus the ultrasound beam in  the receiver"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 99,
    "question": "The following is true about frame rate",
    "options": [
      "The frame rate is the number of frames or images produced in a second and is measured in Hertz",
      "The frame rate and the time to produce one frame are reciprocals",
      "The frame rate is determined by the imaging depth and propagation speed",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 100,
    "question": "The following is true about  line density",
    "options": [
      "It is the amount of spacing between each scan line or sound beam",
      "Low line density generates widely space lines between sound beams or pulses, fewer pulses per frame and higher frame rate",
      "High line density generates tightly-spaced lines between successive sound beams, more pulses per frame and lower frame rate",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 101,
    "question": "The following is true about the pulser",
    "options": [
      "The pulser creates and controls electrical pulses sent to the transducer to excite the PZT crystals",
      "The pulser is also known as power, gain,  output gain, acoustic power, pulser power, energy output and transmitter output",
      "The pulser functions during transmission",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 102,
    "question": "The beam former",
    "options": [
      "Functions both during transmission and reception",
      "The beam former receives a single electrical signal from the pulser and distributes these to the active elements in a specific pattern according to need",
      "Is responsible for apodization, a process whereby electrical spike voltages are selectively regulated to reduce side lobes",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 103,
    "question": "The main functions of the receiver are in the following order",
    "options": [
      "Demodulation, amplification, compensation, compression and reject",
      "Amplification, reject, compression, compensation, compression and demodulation",
      "Reject, amplification, compression, compensation, and demodulation",
      "Amplification, compensation, compression, demodulation and reject"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 104,
    "question": "Examples of ultrasound artifacts include",
    "options": [
      "Shadowing",
      "Enhancement",
      "Reverberation",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 105,
    "question": "Which of the following is true about Thermal effects?",
    "options": [
      "They are produced primarily by a mechanism of attenuation",
      "Absorption, a major component of attenuation leads to rise in tissue temperature which may cause irreversible damage to body tissue",
      "It is generally agreed that exposure producing a maximum of 10 rise in temperature can be used without any effect",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 106,
    "question": "Ultrasound systems assume a propagation speed of 1540 m/s in soft tissue. If the beam passes from a medium of one speed into a medium of higher speed, the calculated distance will be less than the actual distance, causing the echo to be displayed closer to the transducer. This type of artifact is called",
    "options": [
      "Display artifact",
      "Sound beam artifact",
      "Propagation speed error artifact",
      "Transducer artifact"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 107,
    "question": "An increase in the apparent size of an object on the display monitor is called",
    "options": [
      "Magnification",
      "Compression",
      "Demodulation",
      "Suppression"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 108,
    "question": "In Doppler technique, the received echoes would be __________ as the ultrasound beam becomes more _________ to the organ interface",
    "options": [
      "Smaller, parallel",
      "Larger, perpendicular",
      "Larger, parallel",
      "None of the above"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 109,
    "question": "In bio effect studies, the term “In Vitro” means:",
    "options": [
      "Zombie tissues replacing human tissues",
      "Tissue cultures in a test tube",
      "Living human tissues",
      "None of the above"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 110,
    "question": "Digital computers use a special number system called",
    "options": [
      "Decimal number system",
      "Roman number system",
      "Egyptian number",
      "Binary number system"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 111,
    "question": "The Doppler shift is",
    "options": [
      "The difference between the frequency of reflected echo signal and transmitted echo signal",
      "The addition of the frequency of reflected echo signal and transmitted echo signal",
      "The product of the frequency of reflected echo signal and transmitted echo signal",
      "The ratio of the frequency of reflected echo signal to transmitted echo signal"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 112,
    "question": "Laminar flow is:",
    "options": [
      "Aligned and parallel flow streamlines",
      "Characterized by layers of blood; each layer traveling at individual speeds",
      "Usually found in normal physiological states",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 113,
    "question": "An artifact is an error in imaging. They are echoes without anatomic correlation in terms of location, interface and intensity. Artifacts may appear on images as any of the following:",
    "options": [
      "Incorrect shape or size of reflection",
      "Incorrectly positioned reflection",
      "Incorrect reflection brightness",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 114,
    "question": "Nyquist limit is defined as",
    "options": [
      "Equal to the PRF",
      "Half of the PRP",
      "Equal to the PRP",
      "Half the PRF"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 115,
    "question": "The causes of artifact include:",
    "options": [
      "Violation of assumptions",
      "The physics of ultrasound",
      "Operator error",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 116,
    "question": "Assumptions built into imaging systems which, when violated may result in creation of artifacts include:",
    "options": [
      "Sound travels in a straight line",
      "Sound travels directly to a reflector and back",
      "Sound travels in soft tissue at exactly 1540 m/s",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 117,
    "question": "If the velocity of the flow exceeds the Nyquist limit",
    "options": [
      "The velocity of flow is increases",
      "The velocity of flow is decreases",
      "Velocity of flow appear to be in same direction",
      "Velocity of flow appear to be in opposite direction"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 118,
    "question": "We may have more aliasing due to:",
    "options": [
      "Faster blood velocity",
      "Higher transducer frequency",
      "Deep sample volume or gate(low PRF)",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 119,
    "question": "The principle that describes the relationship between velocity (kinetic energy) and pressure in a moving fluid is called",
    "options": [
      "Ohm’s Principle",
      "Doppler Principle",
      "Bernoulli Principle",
      "Huygens’ Principle"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 120,
    "question": "According to the principle that describes the relationship between velocity (kinetic energy) and pressure in a moving fluid:",
    "options": [
      "With a steady flow, the sum of all forms of energy remain constant everywhere.",
      "Energy lost in one form is gained in another form. Hence the sum of both kinetic and pressure energy remains constant",
      "Higher velocity increases kinetic energy and simultaneously decreases pressure energy and vice versa",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 121,
    "question": "Velocity indicates the speed of a fluid moving from one location to another, measured in units of",
    "options": [
      "distance/time",
      "time/distance",
      "volume/distance",
      "volume/time"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 122,
    "question": "The basic forms of normal blood flow:",
    "options": [
      "Pulsatile flow",
      "Phasic flow",
      "Steady flow",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 123,
    "question": "Which of the following is correct about blood flow?",
    "options": [
      "Pulsatile flow occurs in arterial blood flow as a result of cardiac contraction and relaxation",
      "Phasic or spontaneous flow occurs when venous blood flows with variable velocity as a result of changes in respiration",
      "Steady flow occurs when a fluid moves at constant speed or velocity",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 124,
    "question": "The following are true about laminar flow except:",
    "options": [
      "The streamlines are non- aligned",
      "The streamlines are and parallel and flow in layers.  The layers of blood that travel at individual speeds",
      "It is commonly found in normal physiological states",
      "The streamlines are aligned"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 125,
    "question": "Which of the following is incorrect?",
    "options": [
      "There are 2 types of laminar flow; plug flow and parabolic flow",
      "Parabolic flow has a bullet-shaped profile with the highest flow is at the center of the lumen and gradually decreases to its minimum at the vessel wall",
      "Turbulent flow is characterized chaotic flow patterns in many different directions and speeds",
      "Turbulent flow is usually associated with normal cardiovascular physiologic state"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 126,
    "question": "Hydrostatic pressure",
    "options": [
      "Is pressure related to the weight of blood pressing on a vessel wall measured at a height above or below the heart level.",
      "It is the difference between the pressure at the heart level and site of measurement",
      "It is reported in units of mmHg",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 127,
    "question": "Which of the following is true about blood flow?",
    "options": [
      "Blood flows from one location to another due to energy gradient",
      "Blood moves from area of high gradient to area of low gradient",
      "Pressure gradient is a form of energy",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 128,
    "question": "Techniques for reducing or eliminating aliasing include:",
    "options": [
      "Adjust the scale",
      "Shifting the base",
      "Using Continuous Wave Doppler",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 129,
    "question": "The sound created from the difference between transmitted and reflected frequency is",
    "options": [
      "infrasonic",
      "Audible",
      "Ultrasonic",
      "Supersonic"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 130,
    "question": "Doppler shift provide information about flow velocity relative to the transducer. Which of the following is true regarding Doppler shift?",
    "options": [
      "Higher velocities create higher Doppler shifts and vice versa, that is the Doppler shift would double if the velocity doubles and triple if the velocity triples",
      "The velocities measured by the transducer are the same regardless of the transducer frequency",
      "Doppler shift are directly related to transducer frequency; when the transducer frequency is halved, the Doppler shift would also be halved",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 131,
    "question": "Aliasing is a",
    "options": [
      "Pulsed  ultrasound artifact where high Doppler shifts(velocities) beyond the Nyquist limit are identified as flow in the same direction",
      "Pulsed wave ultrasound artifact where high Doppler shifts(velocities) beyond the Nyquist limit are misidentified as flow in the opposite direction",
      "Continuous wave ultrasound artifact where high Doppler shifts(velocities) beyond the Nyquist limit are misidentified as flow in the same direction",
      "Continuous wave ultrasound artifact where high Doppler shifts(velocities) beyond the Nyquist limit are misidentified as flow in the opposite direction"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 132,
    "question": "Continuous Wave Doppler has the following properties except:",
    "options": [
      "High quality factor",
      "Higher sensitivity to flow signal",
      "Range ambiguity",
      "Range specificity"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 133,
    "question": "A duplex ultrasound system displays",
    "options": [
      "Only 2D information",
      "Only Doppler information",
      "Neither 2D nor Doppler information",
      "Both 2D and Doppler information"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 134,
    "question": "Color flow Doppler:",
    "options": [
      "Is a pulsed Doppler imaging modality, hence it is prone to aliasing",
      "Displays anatomic data in 2D grayscale while simultaneously displaying flow information in color",
      "The color deals with the Doppler frequencies produced by moving red blood cells in the image plane",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 135,
    "question": "With Doppler:",
    "options": [
      "The best views are obtained at either 00 or 1800",
      "Aliasing may be avoided by using lower frequency transducer",
      "Images may be obtained by both Pulsed and Continuous wave",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 136,
    "question": "Which of the following is correct?",
    "options": [
      "Velocity color modes may be identified side-to-side (horizontal) changes in the color bar, whereas variance color maps only change from top to bottom (vertically)",
      "Variance color modes may be identified side-to-side (horizontal) changes in the color bar, whereas velocity maps only change from top to bottom (vertically)",
      "Variance color mode and velocity color mode will not appear similar if flow is laminar",
      "All of the above"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 137,
    "question": "Duplex imaging combines",
    "options": [
      "2D grayscale with Doppler",
      "M mode with 2D grayscale",
      "Color Doppler with Pedoff",
      "Pedoff with 2D grayscale."
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 138,
    "question": "In Doppler color flow imaging:",
    "options": [
      "Stationery tissues are displayed in color while moving tissues are in gray scale.",
      "Both Stationery and moving tissues are displayed in gray scale",
      "Both stationery and moving tissues displayed in color.",
      "Stationery tissues are displayed in gray scale while moving tissues are in color."
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 139,
    "question": "In Doppler technique, the received echoes would be __________ as the ultrasound beam becomes more _________ to the organ interface",
    "options": [
      "Smaller, parallel",
      "Larger, perpendicular",
      "Larger, parallel",
      "None of the above"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 140,
    "question": "The Doppler Effect happens to all waves coming from a moving source, regardless of propagation velocities or power levels. The Doppler Effect depends on:",
    "options": [
      "the closing velocity between transducer and tissue",
      "Carrier frequency",
      "Ultrasound propagation velocity",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 141,
    "question": "The color flow image provides information on all of the following except:",
    "options": [
      "The existence of flow",
      "The location of the flow in the image",
      "The flow direction relative to transducer",
      "Flow velocity"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 142,
    "question": "With bidirectional spectral Doppler:",
    "options": [
      "Flow toward the transducer is displayed below the baseline while flow away from the transducer is also displayed below the baseline",
      "Flow toward the transducer is displayed above the baseline while flow away from the transducer is displayed below the baseline",
      "Flow toward the transducer is displayed below the baseline while flow away from the transducer is displayed above the baseline",
      "Flow toward the transducer is displayed above the baseline while flow away from the transducer is also displayed above the baseline"
    ],
    "correctAnswer": 1,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 143,
    "question": "The following is correct about Doppler color flow imaging except that:",
    "options": [
      "It is a continuous wave system",
      "It is a pulsed wave system",
      "It is range specific",
      "It cannot detect the peak velocity of blood flow"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 144,
    "question": "With Doppler color flow system, aliasing occurs when:",
    "options": [
      "Doppler frequency exceeds the PRF sampling (Nyquist) limit",
      "Doppler frequency is below the PRF sampling (Nyquist) limit",
      "Doppler frequency equals the PRF sampling (Nyquist) limit",
      "PRF sampling (Nyquist) limit exceeds the Doppler frequency"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 145,
    "question": "Which of the following is correct about Power Doppler Imaging?",
    "options": [
      "It is able to detect low velocity signals unlike spectral and color flow Doppler",
      "It is limited because it does not show the direction of flow",
      "It only captures the amplitudes of the signals",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 146,
    "question": "The Doppler shift is",
    "options": [
      "The difference between the frequency of reflected echo signal and transmitted echo signal",
      "The addition of the frequency of reflected echo signal and transmitted echo signal",
      "The product of the frequency of reflected echo signal and transmitted echo signal",
      "The ratio of the frequency of reflected echo signal to transmitted echo signal"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 147,
    "question": "Laminar flow is:",
    "options": [
      "Aligned and parallel flow streamlines",
      "Characterized by layers of blood; each layer traveling at individual speeds",
      "Usually found in normal physiological states",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 148,
    "question": "The two forms of laminar flow are",
    "options": [
      "Plug and parabolic flow",
      "Parabolic and abrupt flow",
      "Incident and plug flow",
      "Incident and parabolic flow"
    ],
    "correctAnswer": 0,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 149,
    "question": "Turbulent flow",
    "options": [
      "Chaotic and multi-velocity flow patterns",
      "Often associated with cardiovascular pathology and elevated blood velocities",
      "may be noticed downstream a Stenosis",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 150,
    "question": "Bernoulli’s Principle",
    "options": [
      "Describes the relationship between velocity (kinetic energy) and pressure in a moving fluid",
      "States that with a steady flow, the sum of all forms of energy remain constant everywhere.",
      "Is derived from the Principle of conservation of energy which states that energy is neither created nor destroyed.",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 151,
    "question": "In bidirectional Doppler",
    "options": [
      "A positive Doppler shift indicates a movement away from the transducer",
      "A negative Doppler shift indicates a movement toward the transducer",
      "Flow toward the transducer is above the baseline(+) while flow away from the transducer is below the baseline(-)",
      "All of the above"
    ],
    "correctAnswer": 2,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 152,
    "question": "Power Doppler",
    "options": [
      "Is  non-directional color Doppler",
      "Only  identifies the presence of Doppler shift",
      "does not evaluate for velocity",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 153,
    "question": "Pulsed Wave Doppler:",
    "options": [
      "Requires 2 crystals in the transducer, one for transmission and the other for reception",
      "Accurately measures high velocities",
      "Is unable to determine the precise location of peak velocity",
      "Requires only one PZT crystal, which alternates between transmit and receive times"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 154,
    "question": "Continuous Wave Doppler",
    "options": [
      "Measures velocity in a small region called gate or sample volume",
      "is able to select the exact location where velocities are measured (Range resolution)",
      "Is unable to measure high velocity flows accurately, causing aliasing",
      "Lacks TGC, hence deeper images not adequately compensated for"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  },
  {
    "id": 155,
    "question": "Doppler artifacts include:",
    "options": [
      "Ghosting",
      "Crosstalk",
      "Aliasing",
      "All of the above"
    ],
    "correctAnswer": 3,
    "domain": "General",
    "explanation": ""
  }
];

export function toClientQuestions(questions: ExamQuestion[]) {
  return questions.map(({ id, question, options, domain }) => ({
    id, question, options, domain
  }));
}

export function shuffleQuestions<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i],
  {
    "id": 156,
    "question": "What is the primary advantage of using a higher pulse repetition frequency (PRF) in spectral Doppler?",
    "options": [
      "Improved axial resolution",
      "Higher Nyquist limit (reduced aliasing)",
      "Deeper penetration",
      "Better lateral resolution"
    ],
    "correctAnswer": 1,
    "domain": "Doppler & Hemodynamics",
    "explanation": ""
  },
  {
    "id": 157,
    "question": "In an ultrasound system, what is the function of the analog-to-digital converter (ADC)?",
    "options": [
      "Converts sound waves to electrical signals",
      "Converts continuous analog signals to discrete digital numbers",
      "Amplifies weak returning echoes",
      "Focuses the ultrasound beam"
    ],
    "correctAnswer": 1,
    "domain": "Instrumentation",
    "explanation": ""
  },
  {
    "id": 158,
    "question": "Which artifact is caused by a very high mechanical index (MI) and the collapse of microbubbles?",
    "options": [
      "Reverberation",
      "Shadowing",
      "Cavitation artifact",
      "Enhancement"
    ],
    "correctAnswer": 2,
    "domain": "Safety & Bioeffects",
    "explanation": ""
  },
  {
    "id": 159,
    "question": "What is the effect of decreasing the dynamic range on an ultrasound image?",
    "options": [
      "Increased number of gray shades",
      "More contrast (fewer gray shades)",
      "Improved temporal resolution",
      "Decreased frame rate"
    ],
    "correctAnswer": 1,
    "domain": "Image Quality",
    "explanation": ""
  },
  {
    "id": 160,
    "question": "What does the Quality Factor (Q) of a transducer represent?",
    "options": [
      "Bandwidth / center frequency",
      "Center frequency / bandwidth",
      "Bandwidth × center frequency",
      "Damping coefficient"
    ],
    "correctAnswer": 1,
    "domain": "Instrumentation",
    "explanation": ""
  },
  {
    "id": 161,
    "question": "In hemodynamics, what is the significance of Poiseuille's law?",
    "options": [
      "Describes pressure gradient in turbulent flow",
      "Relates flow rate to vessel radius, length, and viscosity",
      "Calculates Doppler shift",
      "Determines acoustic impedance"
    ],
    "correctAnswer": 1,
    "domain": "Hemodynamics",
    "explanation": ""
  },
  {
    "id": 162,
    "question": "What type of artifact appears as a hyperechoic area behind a gas‑containing structure (e.g., bowel)?",
    "options": [
      "Shadowing",
      "Enhancement",
      "Reverberation",
      "Mirror image"
    ],
    "correctAnswer": 0,
    "domain": "Artifacts",
    "explanation": ""
  },
  {
    "id": 163,
    "question": "Which of the following best describes the purpose of a receive beamformer?",
    "options": [
      "Summing delayed signals from array elements to focus at multiple depths",
      "Generating high voltage pulses",
      "Converting radiofrequency signals to video",
      "Measuring Doppler shifts"
    ],
    "correctAnswer": 0,
    "domain": "Instrumentation",
    "explanation": ""
  },
  {
    "id": 164,
    "question": "What is the typical mechanical index (MI) limit for diagnostic ultrasound in soft tissue to avoid cavitation?",
    "options": [
      "< 0.5",
      "< 1.0",
      "< 1.9",
      "> 2.5"
    ],
    "correctAnswer": 2,
    "domain": "Safety & Bioeffects",
    "explanation": ""
  },
  {
    "id": 165,
    "question": "In B‑mode imaging, what does the envelope detector do?",
    "options": [
      "Extracts amplitude information from the radiofrequency signal",
      "Converts sound to heat",
      "Steers the beam",
      "Increases frame rate"
    ],
    "correctAnswer": 0,
    "domain": "Instrumentation",
    "explanation": ""
  },
  {
    "id": 166,
    "question": "What is the primary cause of spectral mirroring on Doppler ultrasound?",
    "options": [
      "Incorrect gain settings",
      "Poor angle correction",
      "Wall filter too low",
      "Inverting the display for convenience"
    ],
    "correctAnswer": 3,
    "domain": "Doppler & Hemodynamics",
    "explanation": ""
  },
  {
    "id": 167,
    "question": "Which of the following would improve temporal resolution the most?",
    "options": [
      "Increasing number of focal zones",
      "Decreasing sector width",
      "Using more pulses per scan line",
      "Increasing line density"
    ],
    "correctAnswer": 1,
    "domain": "Image Quality",
    "explanation": ""
  },
  {
    "id": 168,
    "question": "What is the role of matching layers in a transducer?",
    "options": [
      "Dampen crystal vibrations",
      "Increase electrical impedance",
      "Impedance matching to maximize sound transmission into tissue",
      "Steer the beam electronically"
    ],
    "correctAnswer": 2,
    "domain": "Instrumentation",
    "explanation": ""
  },
  {
    "id": 169,
    "question": "What does the term 'color write priority' control in color Doppler?",
    "options": [
      "The color map hue",
      "Minimum Doppler signal strength for displaying color",
      "Maximum velocity displayed",
      "Sector width"
    ],
    "correctAnswer": 1,
    "domain": "Doppler & Hemodynamics",
    "explanation": ""
  },
  {
    "id": 170,
    "question": "In ultrasound, what is the relationship between spatial pulse length (SPL) and axial resolution?",
    "options": [
      "Axial resolution = SPL / 2",
      "Axial resolution = 2 × SPL",
      "No relationship",
      "Axial resolution = SPL × frequency"
    ],
    "correctAnswer": 0,
    "domain": "Physics",
    "explanation": ""
  }
];
  }
  return shuffled;
}


// FILE: src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (!user || !user.password) return null;
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
        return { id: user.id, email: user.email, name: user.name };
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) session.user.id = token.id as string;
      return session;
    }
  }
};


// FILE: src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


// FILE: prisma/schema.prisma
// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Prisma Schema
// PostgreSQL database for auth, purchases, exam progress, and SRS
// ═══════════════════════════════════════════════════════════════════

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ── NextAuth Models ──────────────────────────────────────────────

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ── User ─────────────────────────────────────────────────────────

enum Role {
  STUDENT
  ADMIN
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?   // bcrypt hash — null for OAuth users
  role          Role      @default(STUDENT)

  // SonoPrep-specific
  examDate      DateTime? // Target SPI exam date
  institution   String?   // School or hospital

  // Stripe
  stripeCustomerId String? @unique

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Security
  failedLoginAttempts Int       @default(0)
  lockedUntil         DateTime?
  lastLoginAt         DateTime?

  // Concurrent session detection — only one active session at a time
  activeSessionId     String?

  // Relations
  accounts           Account[]
  sessions           Session[]
  purchases          Purchase[]
  examSessions       ExamSession[]
  flashcardProgress  FlashcardProgress[]
  studyNoteProgress  StudyNoteProgress[]

  // Soft delete
  deletedAt DateTime?

  @@index([email])
  @@index([stripeCustomerId])
}

// ── Products & Purchases ─────────────────────────────────────────

enum ProductType {
  FLASHCARDS
  PHYSICS_PEARLS
  EXAM_SIMULATOR
  STUDY_NOTES
  PREMIUM_BUNDLE
}

enum PurchaseStatus {
  COMPLETED
  REFUNDED
  DISPUTED
  PENDING
}

model Product {
  id          String      @id @default(cuid())
  type        ProductType @unique
  name        String
  description String
  priceInCents Int
  stripePriceId String?   @unique
  active      Boolean     @default(true)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  purchases Purchase[]
}

model Purchase {
  status           String   @default("COMPLETED")
  accessExpiresAt  DateTime
  productId        String?
  product          Product? @relation(fields: [productId], references: [id])
  id               String   @id @default(cuid())
  userId           String
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productName      String
  productKey       String
  priceId          String
  stripeSessionId  String   @unique
  amount           Int      // in cents
  purchasedAt      DateTime @default(now())
  expiresAt        DateTime
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

// ── Exam Simulator ───────────────────────────────────────────────

model ExamSession {
  id             String   @id @default(cuid())
  userId         String
  examType       String   @default("SPI")
  totalQuestions  Int
  correctAnswers Int      @default(0)
  score          Float?   // Percentage
  timeSpentSecs  Int      @default(0)
  completed      Boolean  @default(false)
  categoryBreakdown Json? // Per-domain score breakdown
  startedAt      DateTime @default(now())
  completedAt    DateTime?

  user    User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  answers ExamAnswer[]

  @@index([userId])
  @@index([userId, examType])
  @@index([userId, completed])
}

model ExamAnswer {
  id            String  @id @default(cuid())
  sessionId     String
  questionId    Int
  selectedIndex Int
  isCorrect     Boolean
  timeSpentMs   Int     @default(0)

  session ExamSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)

  @@index([sessionId])
}

// ── Flashcards (Spaced Repetition) ───────────────────────────────

model FlashcardProgress {
  id           String   @id @default(cuid())
  userId       String
  cardId       Int
  box          Int      @default(1) // Leitner box 1–5
  easeFactor   Float    @default(2.5) // SM-2 ease factor
  interval     Int      @default(1) // Days until next review
  repetitions  Int      @default(0) // SM-2 repetition count (resets on fail)
  nextReview   DateTime @default(now())
  lastReviewed DateTime @default(now())
  isMastered   Boolean  @default(false)
  reviewCount  Int      @default(0)
  correctCount Int      @default(0)
  incorrectCount Int    @default(0)

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, cardId])
  @@index([userId])
  @@index([userId, nextReview])
  @@index([userId, isMastered])
}

// ── Study Notes Progress ─────────────────────────────────────────

model StudyNoteProgress {
  id        String @id @default(cuid())
  userId    String
  chapterId Int
  progress  Float  @default(0) // 0–100 percentage
  bookmarks Json?  // Array of page numbers

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, chapterId])
  @@index([userId])
}

// ── Demo Lead Capture ────────────────────────────────────────────

model DemoLead {
  id        String   @id @default(cuid())
  email     String
  source    String   @default("demo") // "demo_exam", "demo_flashcards"
  score     Int?     // Exam score percentage (if from exam demo)
  createdAt DateTime @default(now())

  @@index([email])
  @@index([createdAt])
}

// ── Audit Log ────────────────────────────────────────────────────

model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String   // "login", "purchase", "exam_start", etc.
  details   Json?
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@index([createdAt])
}

