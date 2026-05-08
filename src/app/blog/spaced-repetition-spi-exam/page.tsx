"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">LEARNING SCIENCE</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Spaced Repetition for SPI Exam Success: Why Active Recall Beats Cramming</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>10 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 8, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg leading-relaxed">Research shows that spaced repetition improves long-term retention by up to 200% compared to cramming. Here's how to apply it to SPI exam preparation.</p>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-8 mb-4">What Is Spaced Repetition?</h2>
          <p className="body-readable text-[#b8b0a4] leading-relaxed mb-4">Spaced repetition is a learning technique where you review material at increasing intervals over time. Instead of studying the same flashcards every day, the algorithm shows you cards just before you're about to forget them. This forces your brain to work harder to retrieve the information, strengthening neural pathways.</p>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-8 mb-4">The Forgetting Curve</h2>
          <p className="body-readable text-[#b8b0a4] leading-relaxed mb-4">Hermann Ebbinghaus's forgetting curve shows that humans forget 50% of new information within one hour and 70% within 24 hours. Spaced repetition flattens this curve by reactivating memories just before they fade.</p>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-8 mb-4">How to Apply It to SPI Prep</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#b8b0a4] mb-6">
            <li><strong className="text-white">Use SM-2 flashcards:</strong> SonoPrep's flashcards use the SuperMemo 2 algorithm, the gold standard in spaced repetition.</li>
            <li><strong className="text-white">Study daily:</strong> 20-30 minutes of flashcards every day beats 3 hours once a week.</li>
            <li><strong className="text-white">Trust the algorithm:</strong> Don't skip cards just because they feel easy. The system knows when you need to review.</li>
            <li><strong className="text-white">Mix old and new:</strong> Always include review cards alongside new material.</li>
          </ul>
          <div className="bg-[#c85b3a]/10 p-6 my-8 border-l-[3px] border-[#c85b3a]">
            <p className="body-readable text-[#f0ebe4] text-sm"><strong className="text-white">Science says:</strong> Students who use spaced repetition score 30% higher on average than those who don't. SonoPrep's flashcard system is built on this exact science.</p>
          </div>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-8 mb-4">Sample 6-Week Flashcard Plan</h2>
          <p className="body-readable text-[#b8b0a4] leading-relaxed mb-4">Week 1: 20 new cards/day (140 total). Week 2: 15 new + reviews. Week 3-6: 10-15 new + systematic reviews. By exam day, you'll have seen each card 8-10 times — enough for permanent retention.</p>
        </div>
      </article>
    </div>
  );
}
