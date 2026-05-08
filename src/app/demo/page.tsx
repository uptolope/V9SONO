"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExamSimulator } from "@/components/app/exam-simulator";
import { FlashcardViewer } from "@/components/app/flashcard-viewer";
import { DEMO_QUESTIONS } from "@/lib/demo/exam-data";
import { DEMO_FLASHCARDS } from "@/lib/demo/flashcard-data";

export default function DemoPage() {
  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home button */}
        <Link href="/" className="inline-flex items-center gap-2 meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 transition-colors">
          ← BACK TO HOME
        </Link>

        <div className="text-center mb-12">
          <span className="display-eyebrow">TRY BEFORE YOU BUY</span>
          <h1 className="display-headline text-4xl sm:text-5xl mt-2">No account. No noise.</h1>
          <p className="display-body mt-4">Experience the full power of SonoPrep's exam simulator and flashcards completely free.</p>
        </div>

        <Tabs defaultValue="exam" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/5 border border-white/10">
            <TabsTrigger value="exam" className="data-[state=active]:bg-[#c85b3a] data-[state=active]:text-white">Exam Simulator</TabsTrigger>
            <TabsTrigger value="flashcards" className="data-[state=active]:bg-[#c85b3a] data-[state=active]:text-white">Flashcards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="exam">
            <ExamSimulator questions={DEMO_QUESTIONS} />
          </TabsContent>

      <div className="mt-8 text-center">
        <p className="meta text-[10px] text-[#6b6359]">
          Like what you see? <Link href="/auth/signin" className="text-[#c85b3a] hover:underline">Sign in</Link> to access the full random‑order exam simulator.
        </p>
      </div>
          
          <TabsContent value="flashcards">
            <FlashcardViewer cards={DEMO_FLASHCARDS} />
          </TabsContent>

      <div className="mt-8 text-center">
        <p className="meta text-[10px] text-[#6b6359]">
          Like what you see? <Link href="/auth/signin" className="text-[#c85b3a] hover:underline">Sign in</Link> to access the full random‑order exam simulator.
        </p>
      </div>
        </Tabs>
      </div>
    </div>
  );
}
