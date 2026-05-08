import SimpleCTA from "@/components/ui/cta-simple";
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
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>18 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 2, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">Image quality and artifacts make up 12% of the SPI exam. Recognizing these seven artifacts and knowing their causes will earn you easy points. Let’s go through each one in detail.</p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-white">Reverberation</strong> – parallel, equally spaced lines. Caused by sound bouncing between two strong reflectors (e.g., lung, bladder, prosthetic valve). Common in lung (B‑lines) and near the bladder wall. Reducing gain may minimize it.</li>
            <li><strong className="text-white">Comet tail</strong> – a type of reverberation behind echogenic objects (e.g., metal clip, needle, calcium). Appears as a dense, tapering line. Often used to confirm the presence of metal or calcium.</li>
            <li><strong className="text-white">Shadowing</strong> – dark area behind a structure that strongly attenuates sound (e.g., stone, bone, calcified plaque). Helpful diagnostically (e.g., gallstones). Cannot be corrected, but you can rotate the patient or change transducer angle.</li>
            <li><strong className="text-white">Enhancement</strong> – bright area behind a structure with low attenuation (e.g., cyst, fluid‑filled bladder). Useful to confirm a cystic structure.</li>
            <li><strong className="text-white">Mirror image artifact</strong> – duplicate structure on the opposite side of a strong reflector (e.g., diaphragm). Common near the diaphragm (duplicate liver/spleen). Reduce by steering the beam away from the reflector.</li>
            <li><strong className="text-white">Side lobe artifact</strong> – false echoes appearing lateral to a real structure. Caused by off‑axis energy from side lobes of the beam. Common in fluid‑filled structures (bladder, cyst). Reduce by using harmonics or adjusting the focal zone.</li>
            <li><strong className="text-white">Speed propagation artifact</strong> – incorrect depth when sound travels through tissue with a different speed than assumed (1,540 m/s). Fat (1,450 m/s) makes structures appear deeper; fluid (1,560 m/s) makes them appear shallower. Recognizing it prevents misinterpretation.</li>
          </ul>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong className="text-white">Exam strategy:</strong> For each artifact, memorize the cause (physics) and the appearance. Flashcards are perfect for this.</p></div>
        </div>
        <SimpleCTA />
      </article>
    </div>
  );
}
