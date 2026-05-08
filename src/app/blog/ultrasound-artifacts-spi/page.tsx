import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">ARTIFACT IDENTIFICATION</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Ultrasound Artifacts: The 7 Most Common SPI Exam Questions</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>11 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 30, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">Image quality and artifacts make up 12% of the SPI exam. Recognizing these seven artifacts and knowing their causes will earn easy points.</p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-white">Reverberation:</strong> Parallel lines caused by sound bouncing between two strong reflectors (e.g., lung, bladder, prosthetic valves).</li>
            <li><strong className="text-white">Comet tail:</strong> A type of reverberation seen behind metal clips, calcium, or needles.</li>
            <li><strong className="text-white">Shadowing:</strong> Dark area behind a structure that attenuates sound strongly (stones, bone, dense calcification).</li>
            <li><strong className="text-white">Enhancement:</strong> Bright area behind a structure with low attenuation (cyst, fluid, bladder).</li>
            <li><strong className="text-white">Mirror image:</strong> Duplicate structure on opposite side of a strong reflector (e.g., diaphragm, pleura).</li>
            <li><strong className="text-white">Side lobe:</strong> False echoes appearing lateral to a structure due to off‑axis beam energy. Common in fluid‑filled structures.</li>
            <li><strong className="text-white">Speed propagation artifact:</strong> Incorrect depth when sound travels through tissue with different speed than 1,540 m/s (e.g., fat, fluid).</li>
          </ul>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong className="text-white">Exam strategy:</strong> For each artifact, memorize the cause (physics) and the appearance. Flashcards are perfect for this.</p></div>
        </div>
      </article>
    </div>
  );
}
