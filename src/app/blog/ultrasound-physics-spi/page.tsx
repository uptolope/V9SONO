import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    &lt;div className="min-h-screen pt-32 px-6">
      &lt;article className="max-w-4xl mx-auto">
        &lt;Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block"&gt;← BACK TO ALL ARTICLES&lt;/Link>
        &lt;div className="mb-8">
          &lt;div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4"&gt;PHYSICS DEEP DIVE&lt;/div>
          &lt;h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4"&gt;Ultrasound Physics for the SPI Exam: The 6 Concepts You Must Know&lt;/h1>
          &lt;div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"">&gt;&lt;span&gt;18 min read&lt;/spann>&gt;&lt;span className="w-1 h-1 bg-[#c85b3a] rounded-full" //>&gt;&lt;span&gt;May 8, 2026&lt;/spann>&gt;&lt;/div>
        &lt;/div>
        &lt;div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          &lt;p className="text-lg"&gt;Physics of Ultrasound accounts for 23% of the SPI exam – the single largest domain. Master these six concepts, and you'll dominate this section.&lt;/p>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;1. Frequency vs. Wavelength&lt;/h2>
          &lt;p&gt;Frequency (measured in hertz, MHz) and wavelength (mm) are inversely related: λ = c / f. Higher frequency = shorter wavelength = better axial resolution but shallower penetration. Lower frequency = longer wavelength = deeper penetration but worse resolution. Clinical examples: abdominal exams use 2–5 MHz (deep penetration needed), superficial structures like thyroid or breast use 7–15 MHz (high resolution, shallow depth).&lt;/p>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;2. Propagation Speed&lt;/h2>
          &lt;p&gt;Sound travels at different speeds depending on the medium: bone ~4,000 m/s, soft tissue ~1,540 m/s, air ~330 m/s. Ultrasound machines assume 1,540 m/s for all distance calculations. When sound travels through fat (1,450 m/s) or fluid (1,560 m/s), speed artifacts occur – structures appear at incorrect depths. This is a common exam question: "What speed does ultrasound assume in soft tissue?" Answer: 1,540 m/s.&lt;/p>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;3. Attenuation&lt;/h2>
          &lt;p&gt;As sound travels through tissue, its intensity decreases due to absorption, scattering, and reflection. The attenuation coefficient (measured in dB/cm) is approximately 0.5 × frequency (MHz) for soft tissue. Therefore, higher frequency = more attenuation = shallower penetration. Time‑gain compensation (TGC) corrects for attenuation by amplifying deeper signals. On the exam, you might see: "Which frequency yields the greatest attenuation?" Answer: 10 MHz (highest frequency).&lt;/p>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;4. Acoustic Impedance&lt;/h2>
          &lt;p&gt;Acoustic impedance (Z) = density × propagation speed. The greater the impedance mismatch between two tissues, the more sound is reflected at their boundary. Bone–soft tissue reflects &gt;50% of sound (bright interface). Soft tissue–soft tissue reflects &lt;1% (mostly transmits). Matching layers on transducers reduce reflection at the crystal‑skin interface, improving transmission.&lt;/p>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;5. Resolution Types&lt;/h2>
          &lt;p&gt;Three types of resolution appear frequently on the exam:&lt;/p>
          &lt;ul className="list-disc pl-6 space-y-2">
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Axial resolution&lt;/strong&gt; – ability to distinguish two structures parallel to the beam. Determined by spatial pulse length (SPL). Shorter pulses = better axial resolution. SPL = number of cycles × wavelength. Higher frequency = shorter SPL = better axial resolution.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Lateral resolution&lt;/strong&gt; – ability to distinguish two structures perpendicular to the beam. Determined by beam width. Narrower beam = better lateral resolution. Focusing (acoustic lenses, phased arrays) improves lateral resolution.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Contrast resolution&lt;/strong&gt; – ability to distinguish tissues of similar echogenicity. Improved by higher bit depth and better signal processing.&lt;/li>
          &lt;/ul>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;6. The Piezoelectric Effect&lt;/h2>
          &lt;p&gt;Piezoelectric crystals in the transducer convert electrical energy to sound (transmission) and sound back to electrical energy (reception). This two‑way conversion is the foundation of ultrasound imaging. Thinner crystals produce higher frequencies. Damping (backing material) reduces pulse length (improves axial resolution) but also reduces sensitivity (weaker echo signals). Matching layers increase transmission of sound from crystal to skin.&lt;/p>
          
          &lt;div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8">
            &lt;p className="text-sm"">&gt;&lt;strong className="text-white"&gt;Exam tip:&lt;/strong&gt; Memorize three numbers: soft tissue propagation speed = 1,540 m/s; attenuation coefficient = 0.5 dB/cm/MHz; average speed in bone = 4,000 m/s. Higher frequency = better resolution but less depth.&lt;/p>
          &lt;/div>
        &lt;/div>
      &lt;/article>
    &lt;/div>
  );
}
