import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">TEST-TAKING TACTICS</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">SPI Exam Test‑Taking Strategies: Eliminate Wrong Answers & Manage Time</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>12 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 26, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">Knowing the content is half the battle. The other half is managing time, eliminating distractors, and staying calm under pressure. These techniques will help you maximize your score.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Pacing: 170 Questions in 3 Hours</h2>
          <p>That is approximately 1 minute per question. Here is a realistic pace: first 50 questions: 1 minute each (50 min total); next 70 questions: 55 seconds each (65 min); last 50: 50 seconds each (50 min). Reserve the remaining 15 minutes for flagged questions. Practice with timed exams to build this rhythm.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Elimination Strategy</h2>
          <p>Most SPI questions have two clearly wrong answers, one plausible distractor, and one correct answer. First, eliminate absolute impossibilities (e.g., "sound travels fastest in air" – false, it's slowest). Then, look for the option that best matches the physics principle. Do not overthink – the simplest answer is often correct.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Don't Overthink Doppler</h2>
          <p>Doppler questions can be intimidating, but they follow predictable rules: higher velocity = higher shift; increasing PRF reduces aliasing; 0° angle gives maximal shift; 90° gives zero shift. When stuck, these rules eliminate two options.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Pro tip:</strong> Flag any question you're unsure about and move on. Don't let one difficult question eat up 5 minutes. Come back at the end with fresh eyes.</p></div>
        </div>
      </article>
    </div>
  );
}
