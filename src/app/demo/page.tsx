"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExamSimulator } from "@/components/app/exam-simulator";
import { FlashcardViewer } from "@/components/app/flashcard-viewer";
import { DEMO_QUESTIONS } from "@/lib/demo/exam-data";
import { DEMO_FLASHCARDS } from "@/lib/demo/flashcard-data";

export default function DemoPage() {
  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 transition-colors">← BACK TO HOME</Link>

        <div className="text-center mb-12">
          <span className="meta">TRY BEFORE YOU BUY</span>
          <h1 className="display-headline text-4xl sm:text-5xl mt-2">No account. No noise.</h1>
          <p className="display-body mt-4">Experience the exam simulator and flashcards free. Sign in for the full 170‑question randomized exam.</p>
        </div>

        <Tabs defaultValue="exam" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/5 border border-white/10">
            <TabsTrigger value="exam" className="data-[state=active]:bg-[#c85b3a] data-[state=active]:text-white">Exam Simulator</TabsTrigger>
            <TabsTrigger value="flashcards" className="data-[state=active]:bg-[#c85b3a] data-[state=active]:text-white">Flashcards</TabsTrigger>
          </TabsList>
          <TabsContent value="exam">
            <ExamSimulator questions={DEMO_QUESTIONS} />
          </TabsContent>
          <TabsContent value="flashcards">
            <FlashcardViewer cards={DEMO_FLASHCARDS} />
          </TabsContent>
        </Tabs>

        {/* Larger CTA for both products */}
        <div className="mt-12 text-center border-t border-[#f0ebe4]/10 pt-8">
          <div className="bg-[#c85b3a]/5 p-6 border-l-[3px] border-[#c85b3a]">
            <p className="body-readable text-[#f0ebe4] text-base mb-4">
              Ready to master the SPI exam? Get full access to <strong>all 170+ randomized questions</strong> and <strong>200+ spaced repetition flashcards</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products" className="btn-industrial px-6 py-3 text-base">View Products →</Link>
              <Link href="/auth/signin" className="btn-industrial-outline px-6 py-3 text-base">Sign In</Link>
            </div>
            <p className="text-[#6b6359] text-xs mt-4">90‑day access · 14‑day refund · Start studying today</p>
          </div>
        </div>
      </div>
    </div>
  );
}
