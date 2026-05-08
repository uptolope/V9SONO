import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    &lt;div className="min-h-screen pt-32 px-6">
      &lt;article className="max-w-4xl mx-auto">
        &lt;Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block"&gt;← BACK TO ALL ARTICLES&lt;/Link>
        &lt;div className="mb-8">
          &lt;div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4"&gt;DOPPLER MASTERY&lt;/div>
          &lt;h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4"&gt;Doppler Principles for the SPI Exam: Nyquist, Aliasing, and Spectral Analysis&lt;/h1>
          &lt;div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"">&gt;&lt;span&gt;20 min read&lt;/spann>&gt;&lt;span className="w-1 h-1 bg-[#c85b3a] rounded-full" //>&gt;&lt;span&gt;May 6, 2026&lt;/spann>&gt;&lt;/div>
        &lt;/div>
        &lt;div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          &lt;p className="text-lg"&gt;Doppler principles account for 22% of the SPI exam – the same weight as basic physics. Mastering this domain can be the difference between passing and failing. This guide covers everything you need: the Doppler effect, Nyquist limit, aliasing, spectral Doppler, color flow, and power Doppler.&lt;/p>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;The Doppler Effect&lt;/h2>
          &lt;p&gt;The Doppler effect is the change in frequency of sound waves when they reflect off moving structures (red blood cells). Motion toward the transducer increases frequency (positive shift). Motion away decreases frequency (negative shift). The magnitude of the frequency shift is proportional to velocity. The full equation: Δf = 2 × v × f₀ × cosθ / c. Here, Δf is the Doppler shift, v is velocity, f₀ is transmitted frequency, θ is the angle between the beam and flow, and c is propagation speed (1,540 m/s).&lt;/p>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;Nyquist Limit & Aliasing&lt;/h2>
          &lt;p&gt;The Nyquist limit equals half the pulse repetition frequency (PRF). When the Doppler shift exceeds the Nyquist limit, aliasing occurs – high velocities wrap around and display in the opposite direction. On a spectral Doppler waveform, aliasing appears as the waveform "cutting off" the top and appearing on the bottom. On color Doppler, aliasing appears as a sudden change from red to blue (or vice versa) in the same vessel.&lt;/p>
          &lt;pp>&gt;&lt;strong className="text-white"&gt;How to eliminate aliasing:&lt;/strongg>&gt;&lt;/p>
          &lt;ul className="list-disc pl-6 space-y-2">
            &lt;li&gt;Increase the PRF (velocity scale) – this raises the Nyquist limit.&lt;/li>
            &lt;li&gt;Use a lower frequency transducer – lower f₀ reduces Doppler shift magnitude.&lt;/li>
            &lt;li&gt;Shift the baseline – allows more room for velocities in one direction.&lt;/li>
            &lt;li&gt;Change to continuous wave (CW) Doppler – CW has no Nyquist limit.&lt;/li>
          &lt;/ul>
          &lt;p&gt;On the SPI exam, if you see "aliasing," the correct answer is almost always "increase PRF" or "use a lower frequency transducer."&lt;/p>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;Types of Doppler&lt;/h2>
          &lt;ul className="list-disc pl-6 space-y-2">
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Pulsed Wave (PW) Doppler&lt;/strong&gt; – Transmits a pulse, waits for echo, samples at a specific depth. Provides velocity waveform over time. Has a Nyquist limit (aliasing possible). Used for low‑velocity flow (venous, low‑velocity arterial).&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Continuous Wave (CW) Doppler&lt;/strong&gt; – Uses two crystals: one transmits continuously, one receives. No depth resolution (cannot localize), but no aliasing – can measure very high velocities (stenosis, regurgitation).&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Color Doppler&lt;/strong&gt; – Overlays velocity information on a B‑mode image using a color map. Standard convention: red = flow toward transducer, blue = flow away. Provides directional and velocity information but limited by aliasing.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Power Doppler&lt;/strong&gt; – Displays amplitude (strength) of Doppler signal, not direction or velocity. More sensitive to low flow and small vessels, but no directional information and motion artifact is more prominent. Used for evaluating parenchymal flow (kidney, liver).&lt;/li>
          &lt;/ul>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;Angle Dependence&lt;/h2>
          &lt;p&gt;Doppler shift is maximal at 0° (parallel to flow) and zero at 90° (perpendicular). To maintain accuracy, clinical exams keep the Doppler angle ≤le;60°. The machine automatically corrects for angle using the cosθ term – but the correction becomes inaccurate at angles &gt;60°. Remember: if angle = 0°, cosθ = 1 (max shift); if angle = 90°, cosθ = 0 (no shift).&lt;/p>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;Common Doppler Artifacts&lt;/h2>
          &lt;ul className="list-disc pl-6 space-y-2">
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Aliasing&lt;/strong&gt; – discussed above.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Twinkling artifact&lt;/strong&gt; – color noise seen behind echogenic objects (stones, calcification). Caused by rough surfaces.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Ghosting (flash artifact)&lt;/strong&gt; – color flashes from motion of vessel walls or tissue. Can be reduced by reducing gain or using wall filters.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Mirror image artifact&lt;/strong&gt; – duplicate vessel seen on opposite side of a strong reflector (e.g., diaphragm).&lt;/li>
          &lt;/ul>
          
          &lt;div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8">
            &lt;p className="text-sm"">&gt;&lt;strong className="text-white"&gt;Must‑know formula:&lt;/strong&gt; Nyquist limit = PRF/2. Aliasing velocity = (PRF × wavelength) / 4. To avoid aliasing → increase PRF or reduce transducer frequency.&lt;/p>
          &lt;/div>
        &lt;/div>
      &lt;/article>
    &lt;/div>
  );
}
