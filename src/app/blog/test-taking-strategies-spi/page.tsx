"use client";
import Link from "next/link";
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">TEST-TAKING SKILLS</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">SPI Exam Test-Taking Strategies: How to Eliminate Wrong Answers and Manage Time</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>9 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 6, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="body-readable text-[#b8b0a4] text-lg leading-relaxed">Knowing the content is half the battle. The other half is managing time, eliminating distractors, and staying calm under pressure. Here are strategies that work on the SPI exam.</p>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-8 mb-4">Time Management: 170 Questions in 3 Hours</h2>
          <p className="body-readable text-[#b8b0a4] leading-relaxed mb-4">You have approximately 1 minute per question. That's tight but manageable if you move deliberately. The first 50 questions often take longer; the last 50 can go faster. Aim to finish with 15-20 minutes left for review.</p>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-8 mb-4">Elimination Strategy</h2>
          <p className="body-readable text-[#b8b0a4] leading-relaxed mb-4">Multiple-choice questions usually have two clearly wrong answers, one plausible but incorrect distractor, and one correct answer. Identify the absolute wrong answers first — they often violate basic physics principles (like "sound travels fastest in air"). Then compare the remaining two.</p>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-8 mb-4">Don't Overthink Doppler</h2>
          <p className="body-readable text-[#b8b0a4] leading-relaxed mb-4">Doppler questions can be tricky. Memorize these rules: higher velocity = higher shift; increasing PRF reduces aliasing; 0-degree angle gives maximal shift; 90-degree gives zero shift. When stuck, remember these facts eliminate two options immediately.</p>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-8 mb-4">Pacing Yourself</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#b8b0a4] mb-6">
            <li><strong className="text-white">Question 1-50:</strong> 1 minute each (50 min total)</li>
            <li><strong className="text-white">Question 51-120:</strong> 55 seconds each (65 min total)</li>
            <li><strong className="text-white">Question 121-170:</strong> 50 seconds each (50 min total)</li>
            <li><strong className="text-white">Remaining time:</strong> Review flagged questions</li>
          </ul>
          <div className="bg-[#c85b3a]/10 p-6 my-8 border-l-[3px] border-[#c85b3a]">
            <p className="body-readable text-[#f0ebe4] text-sm"><strong className="text-white">Pro tip:</strong> Flag any question you're unsure about and move on. Don't let one difficult question eat up 5 minutes. Come back at the end with fresh eyes.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
