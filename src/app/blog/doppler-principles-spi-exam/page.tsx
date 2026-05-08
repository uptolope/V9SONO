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
          <div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"><span>20 min read</span><span className="w-1 h-1 bg-[#c85b3a] rounded-full" /><span>May 6, 2026</span></div>
        </div>
        <div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          <p className="text-lg">Doppler principles account for 22% of the SPI exam – the same weight as basic physics. Mastering this domain can be the difference between passing and failing. This guide covers everything you need: the Doppler effect, Nyquist limit, aliasing, spectral Doppler, color flow, and power Doppler.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">The Doppler Effect</h2>
          <p>The Doppler effect is the change in frequency of sound waves when they reflect off moving structures (red blood cells). Motion toward the transducer increases frequency (positive shift). Motion away decreases frequency (negative shift). The magnitude of the frequency shift is proportional to velocity. The full equation: Δf = 2 × v × f₀ × cosθ / c. Here, Δf is the Doppler shift, v is velocity, f₀ is transmitted frequency, θ is the angle between the beam and flow, and c is propagation speed (1,540 m/s).</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Nyquist Limit &amp; Aliasing</h2>
          <p>The Nyquist limit equals half the pulse repetition frequency (PRF). When the Doppler shift exceeds the Nyquist limit, aliasing occurs – high velocities wrap around and display in the opposite direction. On a spectral Doppler waveform, aliasing appears as the waveform "cutting off" the top and appearing on the bottom. On color Doppler, aliasing appears as a sudden change from red to blue (or vice versa) in the same vessel.</p>
          <p><strong className="text-white">How to eliminate aliasing:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Increase the PRF (velocity scale) – this raises the Nyquist limit.</li>
            <li>Use a lower frequency transducer – lower f₀ reduces Doppler shift magnitude.</li>
            <li>Shift the baseline – allows more room for velocities in one direction.</li>
            <li>Change to continuous wave (CW) Doppler – CW has no Nyquist limit.</li>
          </ul>
          <p>On the SPI exam, if you see "aliasing," the correct answer is almost always "increase PRF" or "use a lower frequency transducer."</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Types of Doppler</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Pulsed Wave (PW) Doppler</strong> – Transmits a pulse, waits for echo, samples at a specific depth. Provides velocity waveform over time. Has a Nyquist limit (aliasing possible). Used for low‑velocity flow (venous, low‑velocity arterial).</li>
            <li><strong className="text-white">Continuous Wave (CW) Doppler</strong> – Uses two crystals: one transmits continuously, one receives. No depth resolution (cannot localize), but no aliasing – can measure very high velocities (stenosis, regurgitation).</li>
            <li><strong className="text-white">Color Doppler</strong> – Overlays velocity information on a B‑mode image using a color map. Standard convention: red = flow toward transducer, blue = flow away. Provides directional and velocity information but limited by aliasing.</li>
            <li><strong className="text-white">Power Doppler</strong> – Displays amplitude (strength) of Doppler signal, not direction or velocity. More sensitive to low flow and small vessels, but no directional information and motion artifact is more prominent. Used for evaluating parenchymal flow (kidney, liver).</li>
          </ul>
          <h2 className="text-2xl font-semibold text-white mt-8">Angle Dependence</h2>
          <p>Doppler shift is maximal at 0° (parallel to flow) and zero at 90° (perpendicular). To maintain accuracy, clinical exams keep the Doppler angle ≤60°. The machine automatically corrects for angle using the cosθ term – but the correction becomes inaccurate at angles &gt;60°. Remember: if angle = 0°, cosθ = 1 (max shift); if angle = 90°, cosθ = 0 (no shift).</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Common Doppler Artifacts</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Aliasing</strong> – discussed above.</li>
            <li><strong className="text-white">Twinkling artifact</strong> – color noise seen behind echogenic objects (stones, calcification). Caused by rough surfaces.</li>
            <li><strong className="text-white">Ghosting (flash artifact)</strong> – color flashes from motion of vessel walls or tissue. Can be reduced by reducing gain or using wall filters.</li>
            <li><strong className="text-white">Mirror image artifact</strong> – duplicate vessel seen on opposite side of a strong reflector (e.g., diaphragm).</li>
          </ul>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8">
            <p className="text-sm"><strong className="text-white">Must‑know formula:</strong> Nyquist limit = PRF/2. Aliasing velocity = (PRF × wavelength) / 4. To avoid aliasing → increase PRF or reduce transducer frequency.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
