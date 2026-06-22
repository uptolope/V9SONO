// ═══════════════════════════════════════════════════════════════════
// Demo flashcards — used by landing page + demo page
// LICENSED CONTENT — DO NOT MODIFY QUESTION CONTENT
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
    front: "What is the speed of sound in soft tissue?",
    back: "1,540 m/s — this is the assumed average used by all ultrasound machines for distance calculations.",
    domain: "Acoustic Properties",
  },
  {
    id: "fc-2",
    front: "What determines axial resolution?",
    back: "Spatial pulse length (SPL). Axial resolution = SPL / 2. Shorter pulses = better axial resolution.",
    domain: "Pulse-Echo Imaging",
  },
  {
    id: "fc-3",
    front: "What is the Nyquist limit?",
    back: "Maximum Doppler shift that can be detected = PRF / 2. Exceeding it causes aliasing.",
    domain: "Doppler Principles",
  },
  {
    id: "fc-4",
    front: "What artifact appears behind a fluid-filled structure?",
    back: "Posterior acoustic enhancement — the beam is less attenuated through fluid, so echoes deep to it appear brighter.",
    domain: "Artifacts",
  },
  {
    id: "fc-5",
    front: "What does the mechanical index (MI) measure?",
    back: "Likelihood of mechanical bioeffects (cavitation). MI = peak negative pressure / √frequency. Keep < 1.9.",
    domain: "Bioeffects & Safety",
  },
];
