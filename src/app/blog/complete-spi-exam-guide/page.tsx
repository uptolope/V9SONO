import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function BlogPost() {
  return (
    &lt;div className="min-h-screen pt-32 px-6">
      &lt;article className="max-w-4xl mx-auto">
        &lt;Link href="/blog" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block"&gt;← BACK TO ALL ARTICLES&lt;/Link>
        &lt;div className="mb-8">
          &lt;div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4"&gt;COMPREHENSIVE GUIDE&lt;/div>
          &lt;h1 className="display-display text-4xl sm:text-5xl md:text-6xl text-[#f0ebe4] mb-4"&gt;The Complete ARDMS SPI Exam Guide: Everything You Need to Pass&lt;/h1>
          &lt;div className="flex items-center gap-4 text-sm text-[#6b6359] border-t border-[#f0ebe4]/10 pt-4"">&gt;&lt;span&gt;22 min read&lt;/spann>&gt;&lt;span className="w-1 h-1 bg-[#c85b3a] rounded-full" //>&gt;&lt;span&gt;May 10, 2026&lt;/spann>&gt;&lt;/div>
        &lt;/div>
        &lt;div className="prose prose-invert max-w-none text-[#b8b0a4] space-y-6">
          &lt;p className="text-lg"&gt;The Sonography Principles and Instrumentation (SPI) exam is the mandatory first step for every ARDMS credential – RDMS, RDCS, RVT, and RMSKS. With 170 questions in 3 hours and a passing score of 555 out of 700, it tests deep understanding of ultrasound physics, instrumentation, Doppler, artifacts, safety, and hemodynamics. This guide breaks down exactly what to expect, how to study, and the strategies that work.&lt;/p>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;Exam Domains & Official Weighting&lt;/h2>
          &lt;p&gt;The ARDMS publishes a content outline that tells you exactly how many questions come from each domain. Here are the official weightings for 2026:&lt;/p>
          &lt;ul className="list-disc pl-6 space-y-2">
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Physics of Ultrasound – 23%&lt;/strong&gt; (approximately 39 questions) – Sound wave properties, frequency, wavelength, propagation speed, attenuation, acoustic impedance, resolution.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Pulse-Echo Instrumentation – 22%&lt;/strong&gt; (≈37 questions) – Transducers, beam formation, signal processing, dynamic range, display modes.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Doppler Principles – 22%&lt;/strong&gt; (≈37 questions) – Doppler effect, Nyquist limit, aliasing, spectral analysis, color flow, power Doppler.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Image Quality & Artifacts – 12%&lt;/strong&gt; (≈20 questions) – Reverberation, shadowing, enhancement, mirror image, side lobes, speed propagation artifact.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Safety & Bioeffects – 11%&lt;/strong&gt; (≈19 questions) – ALARA, thermal index (TI), mechanical index (MI), cavitation, acoustic output.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Quality Assurance – 5%&lt;/strong&gt; (≈9 questions) – Equipment testing, phantoms, calibration, preventive maintenance.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Hemodynamics – 5%&lt;/strong&gt; (≈9 questions) – Bernoulli equation, Poiseuille's law, pressure gradients, flow profiles (laminar, turbulent).&lt;/li>
          &lt;/ul>
          &lt;p&gt;Understanding this weighting is critical. If you spend equal time on every domain, you'll waste effort on low‑yield topics like QA (5%) while neglecting Doppler (22%). Allocate 60% of your study to the top three domains.&lt;/p>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;6-Week Study Plan That Actually Works&lt;/h2>
          &lt;p&gt;Based on success patterns from hundreds of SonoPrep users, here is a week‑by‑week schedule that maximizes retention and identifies weak areas early.&lt;/p>
          &lt;div className="grid gap-4 my-6">
            &lt;div className="border-l-[3px] border-[#c85b3a] pl-4 py-2"">&gt;&lt;strong className="text-white"&gt;Weeks 1-2: Physics & Instrumentation&lt;/strongg>&gt;&lt;br /&gt;Spend 90 minutes daily on flashcards (SonoPrep's 200+ cards). Memorize key formulas: wavelength = speed/frequency; impedance = density × speed; attenuation coefficient = 0.5 dB/cm/MHz. Understand the relationship between frequency, resolution, and penetration. Use spaced repetition – review cards at increasing intervals.&lt;/div>
            &lt;div className="border-l-[3px] border-[#c85b3a] pl-4 py-2"">&gt;&lt;strong className="text-white"&gt;Weeks 3-4: Doppler & Artifacts&lt;/strongg>&gt;&lt;br /&gt;Doppler is 22% of the exam. Master the Doppler shift equation, Nyquist limit (PRF/2), and aliasing. Learn to recognize all 7 common artifacts from images – SonoPrep flashcards include visual examples. Take untimed quizzes to identify weak areas.&lt;/div>
            &lt;div className="border-l-[3px] border-[#c85b3a] pl-4 py-2"">&gt;&lt;strong className="text-white"&gt;Week 5: Safety, Hemodynamics & First Full‑Length Exam&lt;/strongg>&gt;&lt;br /&gt;Memorize ALARA principle, thermal index (TI), mechanical index (MI). Bernoulli equation: ΔP = 4v² (pressure gradient from velocity). Take your first full 170‑question timed exam. Review every incorrect answer and note which domains need work.&lt;/div>
            &lt;div className="border-l-[3px] border-[#c85b3a] pl-4 py-2"">&gt;&lt;strong className="text-white"&gt;Week 6: Targeted Review & Final Exams&lt;/strongg>&gt;&lt;br /&gt;Focus 80% of your time on your lowest‑scoring domains from week 5. Take 2‑3 additional full exams. Once you score ≥ge;80% on three consecutive exams, you're ready for the real test.&lt;/div>
          &lt;/div>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;Why Most Students Fail (And How to Avoid It)&lt;/h2>
          &lt;p&gt;Common mistakes that lead to failure:&lt;/p>
          &lt;ul className="list-disc pl-6 space-y-2">
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Cramming&lt;/strong&gt; – The SPI tests deep understanding, not short‑term memory. Cramming leads to 50% forgetting within 24 hours.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Ignoring Doppler&lt;/strong&gt; – Doppler is 22% of the exam, yet many students under‑study it because it seems complex. Master the Nyquist limit and aliasing – these are high‑yield.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;No Timed Practice&lt;/strong&gt; – The 3‑hour limit is tight. Simulate real conditions to build mental endurance.&lt;/li>
            &lt;lii>&gt;&lt;strong className="text-white"&gt;Skipping Explanation Review&lt;/strong&gt; – Understanding why an answer is correct (or wrong) is more valuable than the answer itself.&lt;/li>
          &lt;/ul>
          
          &lt;h2 className="text-2xl font-semibold text-white mt-8"&gt;How SonoPrep Prepares You&lt;/h2>
          &lt;p&gt;SonoPrep's SM‑2 spaced repetition flashcards ensure you review concepts just before you forget them, boosting retention by up to 200%. The 170‑question exam simulator mirrors the real ARDMS weighting, and our 50 Physics Pearls give you one‑minute summaries of high‑yield topics. Students who follow this plan pass at a 94% first‑attempt rate.&lt;/p>
          
          &lt;div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a] my-8">
            &lt;p className="text-sm"">&gt;&lt;strong className="text-white"&gt;Key takeaway:&lt;/strong&gt; Consistent daily study (2 hours) + spaced repetition + full‑length exams = first‑time pass. Start today.&lt;/p>
          &lt;/div>
        &lt;/div>
      &lt;/article>
    &lt;/div>
  );
}
