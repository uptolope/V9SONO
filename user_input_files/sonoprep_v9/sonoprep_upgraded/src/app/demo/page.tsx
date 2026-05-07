"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ExamSimulator } from "@/components/app/exam-simulator";
import { FlashcardViewer } from "@/components/app/flashcard-viewer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DEMO_QUESTIONS } from "@/lib/exam-data";
import { DEMO_FLASHCARDS } from "@/lib/flashcard-data";

export default function DemoPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Page header */}
          <div className="mb-12 text-center">
            <Badge className="mb-4">Free — No Account Required</Badge>
            <h1 className="font-display text-3xl font-bold text-cream sm:text-4xl">
              Try SonoPrep Free
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-cream-dim">
              Experience our exam simulator and flashcard system with sample
              content. No payment or account required.
            </p>
          </div>

          {/* Tabs: Exam / Flashcards */}
          <Tabs defaultValue="exam" className="w-full">
            <TabsList className="mx-auto mb-8 flex w-fit">
              <TabsTrigger value="exam">Exam Demo (10 Questions)</TabsTrigger>
              <TabsTrigger value="flashcards">
                Flashcard Demo (10 Cards)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="exam">
              <ExamSimulator
                questions={DEMO_QUESTIONS}
                isDemo={true}
              />
            </TabsContent>

            <TabsContent value="flashcards">
              <FlashcardViewer cards={DEMO_FLASHCARDS} isDemo={true} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
