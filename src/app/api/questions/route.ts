import { NextResponse, NextRequest } from "next/server";

// ═══════════════════════════════════════════════════════════════════
// Questions API — serves practice questions by product slug
// LICENSED CONTENT — READ ONLY — DO NOT MODIFY QUESTION CONTENT
// TODO: Move to DB once Prisma is wired for question banks
// ═══════════════════════════════════════════════════════════════════

type Question = {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

const questionsBySlug: Record<string, Question[]> = {
  "ultrasound-physics": [
    {
      id: "phys-1",
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
      id: "phys-2",
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
      id: "phys-3",
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
      id: "phys-4",
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
      id: "phys-5",
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
      id: "phys-6",
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
      id: "phys-7",
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
      id: "phys-8",
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
    {
      id: "phys-9",
      question: "In color Doppler, aliasing occurs when blood velocity exceeds the Nyquist limit. How can you typically reduce aliasing?",
      choices: [
        "Increase the imaging depth",
        "Decrease the scale (PRF)",
        "Increase the baseline shift",
        "Use a lower frequency transducer",
      ],
      answerIndex: 2,
      explanation: "Shifting the baseline effectively doubles the displayable velocity range in one direction, reducing aliasing without changing PRF or frequency.",
    },
    {
      id: "phys-10",
      question: "What is acoustic impedance (Z) and how is it calculated?",
      choices: [
        "Z = density × wavelength",
        "Z = density × propagation speed",
        "Z = frequency × wavelength",
        "Z = propagation speed / frequency",
      ],
      answerIndex: 1,
      explanation: "Acoustic impedance (Z) equals tissue density (ρ) multiplied by the speed of sound in that tissue (c): Z = ρ × c. Impedance mismatches between tissues cause reflections.",
    },
  ],
  // TODO: Add licensed abdomen + vascular question content
  "abdominal-ultrasound": [],
  "vascular-ultrasound": [],
};

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug || !questionsBySlug[slug]) {
    return NextResponse.json(
      { error: "Unknown product slug" },
      { status: 400 }
    );
  }

  const questions = questionsBySlug[slug];
  if (questions.length === 0) {
    return NextResponse.json(
      { error: "Questions not yet available for this product" },
      { status: 404 }
    );
  }

  return NextResponse.json(questions);
}
