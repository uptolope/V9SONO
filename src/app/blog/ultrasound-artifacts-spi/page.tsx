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
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>15 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>April 30, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">Image quality and artifacts make up 12% of the SPI exam. Recognizing these seven artifacts and knowing their causes will earn you easy points. Here is a detailed breakdown of each artifact, including its appearance, cause, and how to correct it.</p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-white">Reverberation:</strong> Parallel, equally spaced lines. Caused by sound bouncing between two strong reflectors (e.g., lung, bladder, prosthetic valve). The distance between lines equals the distance between reflectors. Cannot be eliminated, but reducing gain may minimize. Common in lung (B‑lines) and near the bladder wall.</li>
            <li><strong className="text-white">Comet tail:</strong> A type of reverberation behind echogenic objects (e.g., metal clip, needle, calcium). Appears as a dense, tapering line. No clinical correction needed – often used to confirm presence of metal or calcium.</li>
            <li><strong className="text-white">Shadowing:</strong> Dark area behind a structure that strongly attenuates sound (e.g., stone, bone, calcified plaque). Caused by high attenuation – sound cannot penetrate. May be helpful diagnostically (e.g., gallstones). Cannot be corrected, but you can rotate patient or change transducer angle.</li>
            <li><strong className="text-white">Enhancement:</strong> Bright area behind a structure with low attenuation (e.g., cyst, fluid‑filled bladder, bile duct). Caused by lack of attenuation – sound passes easily. Usually considered a helpful artifact to confirm a cystic structure.</li>
            <li><strong className="text-white">Mirror image artifact:</strong> Duplicate structure on opposite side of a strong reflector (e.g., diaphragm). The machine misinterprets reflection as a real structure. Common near the diaphragm (duplicate liver/spleen) or needle. Can be reduced by steering the beam away from the reflector.</li>
            <li><strong className="text-white">Side lobe artifact:</strong> False echoes appearing lateral to a real structure. Caused by off‑axis energy from side lobes of the beam. Common in fluid‑filled structures (bladder, cyst). Reduce by using harmonics or adjusting focal zone.</li>
            <li><strong className="text-white">Speed propagation artifact:</strong> Incorrect depth displayed when sound travels through tissue with a different speed than assumed (1,540 m/s). Fat (1,450 m/s) causes structures to appear deeper; fluid (1,560 m/s) causes them to appear shallower. Cannot be corrected, but recognizing it prevents misinterpretation.</li>
          </ul>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong>Exam strategy:</strong> For each artifact, memorize the cause (physics) and the appearance. Use flashcards – they're perfect for this.</p></div>
        </div>
      </article>
    </div>
  );
}
