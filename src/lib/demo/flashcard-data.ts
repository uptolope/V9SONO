// ═══════════════════════════════════════════════════════════════════
// Demo flashcards — used by landing page + demo page
// LICENSED CONTENT — READ ONLY — DO NOT MODIFY QUESTION CONTENT
// ═══════════════════════════════════════════════════════════════════

export interface DemoFlashcard {
  id: string;
  front: string;
  back: string;
  domain: string;
}

export const DEMO_FLASHCARDS: DemoFlashcard[] = [
  {
    id: "fc-1",
    front: "What is the relationship between frequency and wavelength in ultrasound?",
    back: "Frequency (f) and wavelength (λ) are inversely proportional: f = c / λ, where c is the speed of sound in tissue (1540 m/s). Higher frequency → shorter wavelength → better resolution but less penetration.",
    domain: "Physics",
  },
  {
    id: "fc-2",
    front: "What is the pulse repetition period (PRP)?",
    back: "The time from the beginning of one pulse to the beginning of the next. PRP = 1 / PRF. Determined by imaging depth. Typical values: 100 μs to 1 ms.",
    domain: "Physics",
  },
  {
    id: "fc-3",
    front: "What is the typical frequency range for a curved array transducer used for abdominal imaging?",
    back: "Curved array transducers for abdominal imaging typically operate at 2–5 MHz, balancing penetration depth (needed for deep abdominal structures) with adequate resolution.",
    domain: "Instrumentation",
  },
  {
    id: "fc-4",
    front: "What does ALARA stand for?",
    back: "ALARA = As Low As Reasonably Achievable. The fundamental principle of ultrasound safety — use the lowest output power and shortest scanning time that still produces diagnostic-quality images.",
    domain: "Safety",
  },
  {
    id: "fc-5",
    front: "What is the average attenuation coefficient of soft tissue?",
    back: "Approximately 0.5 dB/cm/MHz. This means a 5 MHz beam loses about 2.5 dB per centimeter of travel through soft tissue. Used to calculate penetration depth.",
    domain: "Physics",
  },
  {
    id: "fc-6",
    front: "What is acoustic impedance (Z) and how is it calculated?",
    back: "Acoustic impedance (Z) = density (ρ) × speed of sound (c). Measured in Rayls. Impedance mismatches between tissues cause reflections, which form the basis of ultrasound imaging.",
    domain: "Physics",
  },
  {
    id: "fc-7",
    front: "What is axial resolution and what determines it?",
    back: "Axial resolution is the ability to distinguish two structures parallel to the beam direction. Determined by spatial pulse length (SPL = # cycles × wavelength). Shorter SPL = better axial resolution.",
    domain: "Resolution",
  },
  {
    id: "fc-8",
    front: "What is the Doppler equation used to calculate flow velocity?",
    back: "fd = (2 × f₀ × v × cosθ) / c, where fd = frequency shift, f₀ = transmitted frequency, v = blood velocity, θ = angle of incidence, c = speed of sound (1540 m/s).",
    domain: "Doppler",
  },
  {
    id: "fc-9",
    front: "What causes posterior acoustic shadowing?",
    back: "Posterior acoustic shadowing occurs when sound waves are strongly attenuated (reflected or absorbed) by a structure like bone, calculi, or gallstones. Little energy reaches structures behind it.",
    domain: "Artifacts",
  },
  {
    id: "fc-10",
    front: "What is the Mechanical Index (MI)?",
    back: "MI estimates the likelihood of cavitational (mechanical) bioeffects. MI = peak rarefactional pressure / √frequency. FDA limit for diagnostic use: 1.9. Higher MI = higher cavitation risk.",
    domain: "Safety",
  },
];

/** SM-2 Spaced Repetition algorithm */
export function calculateSM2(
  quality: number,
  currentEF: number,
  currentInterval: number,
  currentReps: number
): { easeFactor: number; interval: number; repetitions: number } {
  let easeFactor = currentEF;
  let interval = currentInterval;
  let repetitions = currentReps;

  if (quality >= 3) {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(currentInterval * easeFactor);
    }
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }

  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  return { easeFactor, interval, repetitions };
}
