// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Product-Based Question Banks
// Physics is live; Abdomen + Vascular are Coming Soon
// ═══════════════════════════════════════════════════════════════════

export interface QuestionBankProduct {
  slug: string;
  name: string;
  shortName: string;
  price: number;
  description: string;
  longDescription: string;
  questionCount: string;
  features: string[];
  seoTitle: string;
  seoDescription: string;
  comingSoon: boolean;
}

export const questionBanks: QuestionBankProduct[] = [
  {
    slug: "ultrasound-physics",
    name: "SPI Physics Question Bank",
    shortName: "Physics",
    price: 49,
    description:
      "High-yield physics questions designed for ARDMS SPI exam success.",
    longDescription:
      "Covers all core physics domains tested on the SPI — acoustic properties, pulse-echo imaging, Doppler principles, artifacts, instrumentation, and bioeffects. Every question maps to the official ARDMS content outline weightings.",
    questionCount: "278",
    features: [
      "Questions mapped to ARDMS content outline",
      "Detailed clinical rationales for every answer",
      "Domain-weighted distribution (real exam ratios)",
      "Covers all 6 SPI physics domains",
      "90-day access with progress tracking",
    ],
    seoTitle: "Ultrasound Physics Practice Questions — ARDMS SPI Prep",
    seoDescription:
      "Practice high-yield ultrasound physics questions mapped to the ARDMS SPI exam content outline. Start free, unlock the full bank.",
    comingSoon: false,
  },
  {
    slug: "abdominal-ultrasound",
    name: "Abdominal Ultrasound Question Bank",
    shortName: "Abdomen",
    price: 59,
    description:
      "Comprehensive abdominal cases and diagnostic concepts for exam prep.",
    longDescription:
      "Real clinical scenarios covering hepatobiliary, renal, splenic, pancreatic, and GI pathology. Questions emphasize the diagnostic reasoning tested on ARDMS specialty exams — not just anatomy identification.",
    questionCount: "150+",
    features: [
      "Clinical case-based question format",
      "Covers hepatobiliary, renal, splenic, pancreatic, GI",
      "Diagnostic reasoning emphasis",
      "Detailed image-based explanations",
      "90-day access with progress tracking",
    ],
    seoTitle: "Abdominal Ultrasound Practice Questions — ARDMS Exam Prep",
    seoDescription:
      "Practice abdominal ultrasound questions with clinical cases and diagnostic reasoning. Prep for ARDMS specialty exams.",
    comingSoon: true,
  },
  {
    slug: "vascular-ultrasound",
    name: "Vascular Ultrasound Question Bank",
    shortName: "Vascular",
    price: 59,
    description:
      "Focused vascular prep with exam-style questions for RVT certification.",
    longDescription:
      "Targeted vascular questions covering carotid, venous, arterial, and abdominal vascular protocols. Emphasis on Doppler interpretation, hemodynamic principles, and the diagnostic criteria that appear on the RVT exam.",
    questionCount: "130+",
    features: [
      "Carotid, venous, arterial, abdominal vascular",
      "Doppler interpretation focus",
      "Hemodynamic principles",
      "Diagnostic criteria emphasis",
      "90-day access with progress tracking",
    ],
    seoTitle: "Vascular Ultrasound Practice Questions — RVT Exam Prep",
    seoDescription:
      "Practice vascular ultrasound questions focused on Doppler interpretation and hemodynamics. Prep for the RVT exam.",
    comingSoon: true,
  },
];

export function getProductBySlug(slug: string): QuestionBankProduct | undefined {
  return questionBanks.find((p) => p.slug === slug);
}
