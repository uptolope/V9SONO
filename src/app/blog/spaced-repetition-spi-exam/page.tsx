import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359} hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">LEARNING SCIENCE</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Spaced Repetition for SPI Exam Success: Why Active Recall Beats Cramming</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>12 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 28, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">Research shows that spaced repetition improves long‑term retention by up to 200% compared to cramming. Here's how to apply it to SPI exam preparation.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">The Forgetting Curve</h2>
          <p>Ebbinghaus's curve shows we forget 50% of new information within one hour and 70% within 24 hours. Spaced repetition flattens this curve by reactivating memories just before they fade.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">How SM‑2 Works</h2>
          <p>SonoPrep's flashcards use the SuperMemo 2 algorithm. Each card has an interval (1 day, 3 days, 7 days, etc.). When you answer correctly, the interval grows. Answer incorrectly, it shrinks. This forces retrieval effort, strengthening neural connections.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Daily Practice Plan</h2>
          <p>Study 20‑30 minutes of flashcards every day. Don't skip days – consistency is key. Start with 20 new cards per day, plus all due reviews. Within 2 weeks, you'll be reviewing 80‑100 cards daily, but each only takes seconds.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong className="text-white">Science says:</strong> Students who use spaced repetition score 30% higher on average. SonoPrep's built‑in flashcard system is based on this exact science.</p></div>
        </div>
      </article>
    </div>
  );
}
