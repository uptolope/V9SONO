"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What is the ARDMS SPI exam?",
    a: "The SPI (Sonography Principles and Instrumentation) is an ARDMS prerequisite exam testing knowledge of ultrasound physics, transducer technology, image formation, Doppler, artifact recognition, and bioeffects. It's required before sitting for any ARDMS specialty credential — RDMS, RDCS, RVT, RMSKS, and others.",
  },
  {
    q: "I'm studying for RDMS, RDCS, RVT, or RMSKS — is SonoPrep right for me?",
    a: "Yes. The SPI exam is a mandatory prerequisite for all four ARDMS credentials — RDMS (diagnostic medical sonography), RDCS (cardiac sonography), RVT (vascular technology), and RMSKS (musculoskeletal sonography). Regardless of which specialty you're pursuing, you must pass the SPI first. SonoPrep is built to get you through that gate so you can move on to your specialty exam.",
  },
  {
    q: "How many questions are on the SPI exam?",
    a: "110 multiple-choice questions with a 2.5-hour time limit. Approximately 90 are scored; 20 are unscored pilot questions distributed throughout. You won't know which is which, so treat every question equally.",
  },
  {
    q: "How long does it take to prepare for the SPI?",
    a: "Most candidates need 4–8 weeks of dedicated study. SonoPrep's spaced-repetition system is built so 30 minutes of daily practice can prepare you in as little as 30 days. Candidates with strong clinical physics backgrounds from their DMS program often need less time.",
  },
  {
    q: "How much does SonoPrep cost?",
    a: "Individual products range from $9 to $49. The Premium Bundle is $99 for all 4 products (save $27). All purchases include 90-day full access — no subscription. You can start free with 20 flashcards and a 10-question quiz. No credit card required for the free tier.",
  },
  {
    q: "What is the first-attempt pass rate for SonoPrep students?",
    a: "SonoPrep is a new platform and we don't yet have statistically meaningful first-attempt pass rate data to share. We're committed to transparency: we won't publish numbers we can't verify. What we can tell you is that every product is built around the exact ARDMS exam blueprint by credentialed sonographers who have passed the SPI. Each purchase gives you 90 days of full access — more than enough to complete a thorough preparation.",
  },
  {
    q: "Who built SonoPrep?",
    a: "SonoPrep was built by RDMS-credentialed sonographers who passed the SPI exam and scan patients daily. Every flashcard, Physics Pearl, and exam question is reviewed for clinical accuracy by practicing sonographers — not only academic educators.",
  },
  {
    q: "Does SonoPrep work on mobile?",
    a: "Yes. SonoPrep is fully optimized for iPhone, Android, tablet, and desktop. Your progress syncs automatically across all devices so you can study anywhere — waiting rooms, commutes, lunch breaks.",
  },
  {
    q: "Does SonoPrep offer institutional or program licensing?",
    a: "Yes. We offer volume pricing, cohort progress dashboards, and LMS integration for DMS programs and hospital training departments. Email support@sonoprep.com for pricing and details.",
  },
];

// JSON-LD schema for this FAQ section
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const answerId = `faq-answer-${index}`;
  const buttonId = `faq-button-${index}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.45 }}
      className="border-b border-border/50 last:border-0"
    >
      <button
        id={buttonId}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-display font-semibold text-cream leading-snug">{q}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-5 w-5 shrink-0 text-teal/60 transition-transform duration-300 mt-0.5",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        id={answerId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
      >
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="pb-5"
          >
            <p className="text-cream-dim leading-relaxed">{a}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function FaqSection() {
  return (
    <section className="relative py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <p className="section-label">Common Questions</p>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
