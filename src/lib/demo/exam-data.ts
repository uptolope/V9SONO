import type { ExamQuestion } from "@/types";

/**
 * SPI Exam Questions — Demo Set
 */
export const DEMO_QUESTIONS: ExamQuestion[] = [
  {
    id: 0,
    question: "A patient with gallstones shows posterior acoustic shadowing. What is the primary cause of this artifact?",
    options: [
      "Reflection at tissue interfaces",
      "Strong attenuation by the stones",
      "Refraction at curved surfaces",
      "Mirror imaging artifact",
    ],
    correctIndex: 1,
    explanation: "Gallstones cause strong attenuation (both absorption and reflection), resulting in posterior acoustic shadowing — a clean shadow directly behind the calcified structure.",
    category: "Artifacts",
  },
  {
    id: 1,
    question: "When using spectral Doppler, what happens to the frequency shift when the angle of incidence increases from 0° to 60°?",
    options: [
      "Frequency shift doubles",
      "Frequency shift decreases",
      "Frequency shift increases",
      "No change in frequency shift",
    ],
    correctIndex: 1,
    explanation: "The Doppler equation includes cosθ. As the angle increases from 0° to 60°, cosθ decreases from 1.0 to 0.5, causing the measured frequency shift to decrease by half.",
    category: "Doppler",
  },
  {
    id: 2,
    question: "Which type of resolution is determined primarily by the transducer frequency?",
    options: [
      "Lateral resolution",
      "Axial resolution",
      "Temporal resolution",
      "Contrast resolution",
    ],
    correctIndex: 1,
    explanation: "Axial resolution is determined by spatial pulse length (SPL), which is inversely related to transducer frequency. Higher frequency → shorter SPL → better axial resolution.",
    category: "Resolution",
  },
  {
    id: 3,
    question: "What happens to beam penetration when transducer frequency is increased?",
    options: [
      "Penetration increases",
      "Penetration decreases",
      "Penetration stays the same",
      "Penetration doubles",
    ],
    correctIndex: 1,
    explanation: "Higher frequency ultrasound experiences greater attenuation in tissue, resulting in less penetration depth. This is the fundamental frequency–penetration tradeoff.",
    category: "Physics",
  },
  {
    id: 4,
    question: "What are the two main biological effects of ultrasound?",
    options: [
      "Thermal and cavitational",
      "Electrical and magnetic",
      "Ionizing and non-ionizing",
      "Mechanical and chemical",
    ],
    correctIndex: 0,
    explanation: "The two main biological effects are thermal (tissue heating from absorption) and cavitational (microscopic bubble formation and collapse). Both are monitored via TI and MI indices.",
    category: "Safety",
  },
  {
    id: 5,
    question: "What percentage of ultrasound energy is reflected at a soft tissue-to-bone interface?",
    options: [
      "Less than 1%",
      "About 50%",
      "Nearly 100%",
      "About 25%",
    ],
    correctIndex: 2,
    explanation: "Bone has a much higher acoustic impedance than soft tissue. The large impedance mismatch causes nearly total reflection of ultrasound energy at this interface.",
    category: "Physics",
  },
  {
    id: 6,
    question: "The Mechanical Index (MI) on an ultrasound machine displays 0.8. What does this value indicate?",
    options: [
      "Maximum frame rate setting",
      "Thermal dose delivered to tissue",
      "Likelihood of cavitation effects",
      "Current transducer frequency in MHz",
    ],
    correctIndex: 2,
    explanation: "The Mechanical Index (MI) estimates the likelihood of cavitational (mechanical) bioeffects. Higher MI values indicate a greater potential for cavitation. FDA limit is 1.9 for diagnostic use.",
    category: "Safety",
  },
  {
    id: 7,
    question: "What is the typical attenuation coefficient of soft tissue in dB/cm/MHz?",
    options: [
      "0.3 dB/cm/MHz",
      "0.5 dB/cm/MHz",
      "1.0 dB/cm/MHz",
      "2.0 dB/cm/MHz",
    ],
    correctIndex: 1,
    explanation: "The average attenuation coefficient of soft tissue is approximately 0.5 dB/cm/MHz. This is the foundational value used for calculating penetration depth and TGC settings.",
    category: "Physics",
  },
  {
    id: 8,
    question: "In color Doppler, aliasing occurs when blood velocity exceeds the Nyquist limit. How can you typically reduce aliasing?",
    options: [
      "Increase the imaging depth",
      "Decrease the scale (PRF)",
      "Increase the baseline shift",
      "Use a lower frequency transducer",
    ],
    correctIndex: 2,
    explanation: "Shifting the baseline effectively doubles the displayable velocity range in one direction, reducing aliasing without changing PRF or frequency.",
    category: "Doppler",
  },
  {
    id: 9,
    question: "What is acoustic impedance (Z) and how is it calculated?",
    options: [
      "Z = density × wavelength",
      "Z = density × propagation speed",
      "Z = frequency × wavelength",
      "Z = propagation speed / frequency",
    ],
    correctIndex: 1,
    explanation: "Acoustic impedance (Z) equals tissue density (ρ) multiplied by the speed of sound in that tissue (c): Z = ρ × c. Impedance mismatches between tissues cause reflections.",
    category: "Physics",
  },
];

/** ARDMS domain categories with weights */
export const EXAM_CATEGORIES = [
  { name: "Physics", weight: 25, color: "#0d9488" },
  { name: "Doppler", weight: 20, color: "#14b8a6" },
  { name: "Artifacts", weight: 15, color: "#f59e0b" },
  { name: "Resolution", weight: 15, color: "#d97706" },
  { name: "Safety", weight: 15, color: "#10b981" },
  { name: "Instrumentation", weight: 10, color: "#6366f1" },
];