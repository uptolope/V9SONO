// ═══════════════════════════════════════════════════════════════════
// Demo exam questions — used by landing page + demo page
// LICENSED CONTENT — DO NOT MODIFY QUESTION CONTENT
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
    domain: "Acoustic Properties",
    question: "What determines acoustic impedance in a medium?",
    choices: [
      "Density and propagation speed",
      "Frequency and wavelength",
      "Amplitude and intensity",
      "Attenuation and absorption",
    ],
    answerIndex: 0,
    explanation:
      "Acoustic impedance (Z) = density × propagation speed. It determines how much sound is reflected at tissue boundaries.",
  },
  {
    id: "demo-2",
    domain: "Pulse-Echo Imaging",
    question: "Increasing transducer frequency primarily results in:",
    choices: [
      "Better axial resolution",
      "Greater penetration depth",
      "Lower attenuation",
      "Wider beam width",
    ],
    answerIndex: 0,
    explanation:
      "Higher frequency = shorter wavelength = better axial resolution, at the cost of reduced penetration depth.",
  },
  {
    id: "demo-3",
    domain: "Doppler Principles",
    question: "The Doppler shift is directly proportional to:",
    choices: [
      "Blood flow velocity",
      "Tissue density",
      "Transducer element size",
      "Pulse repetition period",
    ],
    answerIndex: 0,
    explanation:
      "The Doppler equation shows frequency shift ∝ velocity × cos(angle).",
  },
  {
    id: "demo-4",
    domain: "Artifacts",
    question: "What artifact is caused by a strong near-field reflector?",
    choices: [
      "Reverberation",
      "Acoustic enhancement",
      "Edge shadowing",
      "Slice thickness artifact",
    ],
    answerIndex: 0,
    explanation:
      "Reverberation occurs when sound bounces between the transducer and a strong reflector, creating equally spaced parallel lines.",
  },
  {
    id: "demo-5",
    domain: "Bioeffects & Safety",
    question: "The ALARA principle refers to:",
    choices: [
      "Keeping ultrasound exposure as low as reasonably achievable",
      "Using the highest frequency for every scan",
      "Maximizing power for best image quality",
      "Applying consistent pressure during scanning",
    ],
    answerIndex: 0,
    explanation:
      "ALARA = As Low As Reasonably Achievable. Minimize exposure while maintaining diagnostic quality.",
  },
];
