import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO ALL ARTICLES</Link>
        <div className="mb-8">
          <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">DOPPLER MASTERY</div>
          <h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4">Doppler Principles for the SPI Exam: Nyquist, Aliasing, and Spectral Analysis</h1>
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>16 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 6, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">Doppler principles account for 22% of the SPI exam – the same weight as basic physics. Mastering this domain can be the difference between passing and failing.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">The Doppler Effect</h2>
          <p>Reflected frequency changes when sound interacts with moving blood cells. Motion toward transducer = increased frequency (positive shift). Motion away = decreased frequency (negative shift). The magnitude of the frequency shift is proportional to velocity: Δf = 2 × v × f₀ × cosθ / c.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Nyquist Limit & Aliasing</h2>
          <p>Nyquist limit = PRF / 2. Aliasing occurs when Doppler shift exceeds this limit – high velocities wrap around and display in the opposite direction. To eliminate aliasing: increase PRF (velocity scale), lower transducer frequency, or shift baseline. On the exam, "increase PRF" is almost always the correct answer.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Types of Doppler</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Pulsed Wave (PW)</strong> – samples at a specific depth, has aliasing, provides velocity waveform.</li>
            <li><strong className="text-white">Continuous Wave (CW)</strong> – no aliasing, no depth resolution, used for high velocities.</li>
            <li><strong className="text-white">Color Doppler</strong> – overlays velocity on B‑mode; convention: red toward, blue away.</li>
            <li><strong className="text-white">Power Doppler</strong> – displays amplitude (strength) not direction; more sensitive but no velocity info.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-white mt-8">Angle Dependence</h2>
          <p>Doppler shift is maximal at 0° (parallel to flow) and zero at 90°. Most clinical exams keep angle ≤60° to maintain accuracy. Cosθ correction is built into the machine.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8"><p className="text-sm"><strong className="text-white">Must‑know formula:</strong> Aliasing velocity = PRF × wavelength / 4. To avoid aliasing, increase PRF or reduce frequency.</p></div>
        </div>
      </article>
    </div>
  );
}
