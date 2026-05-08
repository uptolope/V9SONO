import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">PHYSICS DEEP DIVE</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Ultrasound Physics for the SPI Exam: The 6 Concepts You Must Know</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>14 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 8, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">Physics of Ultrasound accounts for 23% of the SPI exam – the single largest domain. Master these six concepts, and you'll dominate this section.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">1. Frequency vs. Wavelength</h2>
          <p>Frequency (MHz) and wavelength (mm) are inversely related: λ = c / f. Higher frequency = shorter wavelength = better axial resolution but shallower penetration. Lower frequency = longer wavelength = deeper penetration but worse resolution. For abdominal exams: 2–5 MHz; for superficial structures (thyroid, breast): 7–15 MHz.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">2. Propagation Speed</h2>
          <p>Speed of sound varies by tissue: bone ~4,000 m/s, soft tissue ~1,540 m/s, air ~330 m/s. Ultrasound machines assume 1,540 m/s for all distance calculations. When sound travels through fat (1,450 m/s) or fluid (1,560 m/s), speed artifacts occur.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">3. Attenuation</h2>
          <p>As sound travels, its intensity decreases due to absorption, scattering, and reflection. Attenuation coefficient (dB/cm) = 0.5 × frequency (MHz) for soft tissue. Higher frequency = more attenuation. Time‑gain compensation (TGC) corrects for this in the image.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">4. Acoustic Impedance</h2>
          <p>Z = density × propagation speed. The greater the impedance mismatch between two tissues, the more sound is reflected at their boundary. Bone–soft tissue reflects >50% of sound; soft tissue–soft tissue reflects <1%. Matching layers on transducers reduce reflection at the crystal‑skin interface.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">5. Resolution Types</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-white">Axial (parallel to beam)</strong> – determined by spatial pulse length. Shorter pulse = better axial resolution.</li>
            <li><strong className="text-white">Lateral (perpendicular to beam)</strong> – determined by beam width. Narrower beam = better lateral resolution.</li>
            <li><strong className="text-white">Contrast</strong> – ability to distinguish tissues of similar echogenicity.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-white mt-8">6. The Piezoelectric Effect</h2>
          <p>Piezoelectric crystals convert electrical energy to sound (transmission) and sound back to electrical energy (reception). Thinner crystals produce higher frequencies. Damping reduces pulse length (improves axial resolution) but also reduces sensitivity.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong className="text-white">Exam tip:</strong> Remember: soft tissue propagation speed = 1,540 m/s. Attenuation coefficient (dB/cm/MHz) = 0.5. Higher frequency = better resolution but less depth.</p></div>
        </div>
      </article>
    </div>
  );
}
