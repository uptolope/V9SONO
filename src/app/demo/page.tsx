"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      <main id="main-content" className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-charcoal/50 to-obsidian" />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-teal/10 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="relative mx-auto max-w-4xl px-6">
          {/* Page header with premium animation */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Badge className="bg-teal/10 border-teal/20 text-teal px-4 py-2">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-block mr-2"
                >
                  ✦
                </motion.span>
                Free — No Account Required
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl font-bold text-cream"
            >
              Try SonoPrep{" "}
              <motion.span
                className="animate-text-shimmer"
                animate={{ backgroundPosition: ["0% center", "200% center"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                Free
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mx-auto mt-6 max-w-xl text-lg text-cream-dim leading-relaxed"
            >
              Experience our exam simulator and flashcard system with sample content.
              No payment or account required — just click and start studying.
            </motion.p>
          </motion.div>

          {/* Tabs: Exam / Flashcards with premium styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Tabs defaultValue="exam" className="w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center mb-8"
              >
                <TabsList className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-charcoal/80 backdrop-blur-sm border border-border">
                  <TabsTrigger
                    value="exam"
                    className="data-[state=active]:bg-teal/20 data-[state=active]:text-teal-glow data-[state=active]:border-teal/30 rounded-xl px-6 py-3 font-semibold transition-all"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mr-2"
                    >
                      📝
                    </motion.span>
                    Exam Demo (10 Questions)
                  </TabsTrigger>
                  <TabsTrigger
                    value="flashcards"
                    className="data-[state=active]:bg-teal/20 data-[state=active]:text-teal-glow data-[state=active]:border-teal/30 rounded-xl px-6 py-3 font-semibold transition-all"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="mr-2"
                    >
                      🗂️
                    </motion.span>
                    Flashcard Demo (10 Cards)
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <AnimatePresence mode="wait">
                <TabsContent value="exam" key="exam">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ExamSimulator
                      questions={DEMO_QUESTIONS}
                      isDemo={true}
                    />
                  </motion.div>
                </TabsContent>

                <TabsContent value="flashcards" key="flashcards">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <FlashcardViewer cards={DEMO_FLASHCARDS} isDemo={true} />
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-6 text-cream-dim/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="font-mono text-sm">✓ No credit card</span>
            <span className="font-mono text-sm">✓ Instant access</span>
            <span className="font-mono text-sm">✓ No account needed</span>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}