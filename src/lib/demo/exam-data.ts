// ═══════════════════════════════════════════════════════════════════
// Demo exam questions — used by landing page + demo page
// LICENSED CONTENT — READ ONLY — DO NOT MODIFY QUESTION CONTENT
// ═══════════════════════════════════════════════════════════════════

export interface DemoQuestion {
  id: string;
  domain: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

export const DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: "demo-1",
    domain: "Artifacts",
    question: "A patient with gallstones shows posterior acoustic shadowing. What is the primary cause of this artifact?",
    choices: [
      "Reflection at tissue interfaces",
      "Strong attenuation by the stones",
      "Refraction at curved surfaces",
      "Mirror imaging artifact",
    ],
    answerIndex: 1,
    explanation: "Gallstones cause strong attenuation (both absorption and reflection), resulting in posterior acoustic shadowing — a clean shadow directly behind the calcified structure.",
  },
  {
    id: "demo-2",
    domain: "Doppler",
    question: "When using spectral Doppler, what happens to the frequency shift when the angle of incidence increases from 0° to 60°?",
    choices: [
      "Frequency shift doubles",
      "Frequency shift decreases",
      "Frequency shift increases",
      "No change in frequency shift",
    ],
    answerIndex: 1,
    explanation: "The Doppler equation includes cosθ. As the angle increases from 0° to 60°, cosθ decreases from 1.0 to 0.5, causing the measured frequency shift to decrease by half.",
  },
  {
    id: "demo-3",
    domain: "Resolution",
    question: "Which type of resolution is determined primarily by the transducer frequency?",
    choices: [
      "Lateral resolution",
      "Axial resolution",
      "Temporal resolution",
      "Contrast resolution",
    ],
    answerIndex: 1,
    explanation: "Axial resolution is determined by spatial pulse length (SPL), which is inversely related to transducer frequency. Higher frequency → shorter SPL → better axial resolution.",
  },
  {
    id: "demo-4",
    domain: "Physics",
    question: "What happens to beam penetration when transducer frequency is increased?",
    choices: [
      "Penetration increases",
      "Penetration decreases",
      "Penetration stays the same",
      "Penetration doubles",
    ],
    answerIndex: 1,
    explanation: "Higher frequency ultrasound experiences greater attenuation in tissue, resulting in less penetration depth. This is the fundamental frequency–penetration tradeoff.",
  },
  {
    id: "demo-5",
    domain: "Safety",
    question: "What are the two main biological effects of ultrasound?",
    choices: [
      "Thermal and cavitational",
      "Electrical and magnetic",
      "Ionizing and non-ionizing",
      "Mechanical and chemical",
    ],
    answerIndex: 0,
    explanation: "The two main biological effects are thermal (tissue heating from absorption) and cavitational (microscopic bubble formation and collapse). Both are monitored via TI and MI indices.",
  },
  {
    id: "demo-6",
    domain: "Physics",
    question: "What percentage of ultrasound energy is reflected at a soft tissue-to-bone interface?",
    choices: [
      "Less than 1%",
      "About 50%",
      "Nearly 100%",
      "About 25%",
    ],
    answerIndex: 2,
    explanation: "Bone has a much higher acoustic impedance than soft tissue. The large impedance mismatch causes nearly total reflection of ultrasound energy at this interface.",
  },
  {
    id: "demo-7",
    domain: "Safety",
    question: "The Mechanical Index (MI) on an ultrasound machine displays 0.8. What does this value indicate?",
    choices: [
      "Maximum frame rate setting",
      "Thermal dose delivered to tissue",
      "Likelihood of cavitation effects",
      "Current transducer frequency in MHz",
    ],
    answerIndex: 2,
    explanation: "The Mechanical Index (MI) estimates the likelihood of cavitational (mechanical) bioeffects. Higher MI values indicate a greater potential for cavitation. FDA limit is 1.9 for diagnostic use.",
  },
  {
    id: "demo-8",
    domain: "Physics",
    question: "What is the typical attenuation coefficient of soft tissue in dB/cm/MHz?",
    choices: [
      "0.3 dB/cm/MHz",
      "0.5 dB/cm/MHz",
      "1.0 dB/cm/MHz",
      "2.0 dB/cm/MHz",
    ],
    answerIndex: 1,
    explanation: "The average attenuation coefficient of soft tissue is approximately 0.5 dB/cm/MHz. This is the foundational value used for calculating penetration depth and TGC settings.",
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
