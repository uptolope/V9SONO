import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    &lt;div className="min-h-screen pt-32 px-6">
      &lt;article className="max-w-4xl mx-auto">
        &lt;Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block"&gt;← BACK TO ALL ARTICLES&lt;/Link>
        &lt;div className="mb-8">
          &lt;div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4"&gt;ARTIFACT IDENTIFICATION&lt;/div>
          &lt;h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4"&gt;Ultrasound Artifacts: The 7 Most Common SPI Exam Questions&lt;/h1>
          &lt;div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"">&gt;&lt;span&gt;15 min read&lt;/spann>&gt;&lt;span className="w-1 h-1 bg-[#c85b3a] rounded-full" //>&gt;&lt;span&gt;April 30, 2026&lt;/spann>&gt;&lt;/div>
        &lt;/div>
        &lt;div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          &lt;p className="text-lg"&gt;Image quality and artifacts make up 12% of the SPI exam. Recognizing these seven artifacts and knowing their causes will earn you easy points. Here is a detailed breakdown of each artifact, including its appearance, cause, and how to correct it.&lt;/p>
          &lt;ul className="list-disc pl-6 space-y-3">
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Reverberation:&lt;/strong&gt; Parallel, equally spaced lines. Caused by sound bouncing between two strong reflectors (e.g., lung, bladder, prosthetic valve). The distance between lines equals the distance between reflectors. Cannot be eliminated, but reducing gain may minimize. Common in lung (B‑lines) and near the bladder wall.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Comet tail:&lt;/strong&gt; A type of reverberation behind echogenic objects (e.g., metal clip, needle, calcium). Appears as a dense, tapering line. No clinical correction needed – often used to confirm presence of metal or calcium.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Shadowing:&lt;/strong&gt; Dark area behind a structure that strongly attenuates sound (e.g., stone, bone, calcified plaque). Caused by high attenuation – sound cannot penetrate. May be helpful diagnostically (e.g., gallstones). Cannot be corrected, but you can rotate patient or change transducer angle.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Enhancement:&lt;/strong&gt; Bright area behind a structure with low attenuation (e.g., cyst, fluid‑filled bladder, bile duct). Caused by lack of attenuation – sound passes easily. Usually considered a helpful artifact to confirm a cystic structure.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Mirror image artifact:&lt;/strong&gt; Duplicate structure on opposite side of a strong reflector (e.g., diaphragm). The machine misinterprets reflection as a real structure. Common near the diaphragm (duplicate liver/spleen) or needle. Can be reduced by steering the beam away from the reflector.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Side lobe artifact:&lt;/strong&gt; False echoes appearing lateral to a real structure. Caused by off‑axis energy from side lobes of the beam. Common in fluid‑filled structures (bladder, cyst). Reduce by using harmonics or adjusting focal zone.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Speed propagation artifact:&lt;/strong&gt; Incorrect depth displayed when sound travels through tissue with a different speed than assumed (1,540 m/s). Fat (1,450 m/s) causes structures to appear deeper; fluid (1,560 m/s) causes them to appear shallower. Cannot be corrected, but recognizing it prevents misinterpretation.&lt;/li>
          &lt;/ul>
          &lt;div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"">&gt;&lt;p className="text-sm"">&gt;&lt;strong&gt;Exam strategy:&lt;/strong&gt; For each artifact, memorize the cause (physics) and the appearance. Use flashcards – they're perfect for this.&lt;/pp>&gt;&lt;/div>
        &lt;/div>
      &lt;/article>
    &lt;/div>
  );
}
