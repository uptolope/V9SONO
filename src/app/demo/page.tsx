"use client";

import { useState } from "react";
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
        <div className="text-center mb-12">
          <span className="display-eyebrow">try before you buy</span>
          <h1 className="display-headline text-4xl sm:text-5xl mt-2">No account. No noise.</h1>
          <p className="display-body mt-4">Experience the full power of SonoPrep's exam simulator and flashcards completely free.</p>
        </div>

        <Tabs defaultValue="exam" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/5 border border-white/10">
            <TabsTrigger value="exam" className="data-[state=active]:bg-[#ff6b4a] data-[state=active]:text-white">Exam Simulator</TabsTrigger>
            <TabsTrigger value="flashcards" className="data-[state=active]:bg-[#ff6b4a] data-[state=active]:text-white">Flashcards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="exam">
            <ExamSimulator questions={DEMO_QUESTIONS} />
          </TabsContent>
          
          <TabsContent value="flashcards">
            <FlashcardViewer cards={DEMO_FLASHCARDS} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
