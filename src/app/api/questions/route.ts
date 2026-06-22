import { NextResponse, NextRequest } from "next/server";

// ═══════════════════════════════════════════════════════════════════
// Questions API — serves practice questions by product slug
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
      question: "What determines acoustic impedance in a medium?",
      choices: [
        "Density and propagation speed",
        "Frequency and wavelength",
        "Amplitude and intensity",
        "Attenuation and absorption",
      ],
      answerIndex: 0,
      explanation:
        "Acoustic impedance (Z) equals density × propagation speed. It determines how much sound is reflected at tissue boundaries.",
    },
    {
      id: "phys-2",
      question: "Increasing transducer frequency primarily results in:",
      choices: [
        "Better axial resolution",
        "Greater penetration depth",
        "Lower attenuation",
        "Wider beam width",
      ],
      answerIndex: 0,
      explanation:
        "Higher frequency = shorter wavelength = better axial resolution. The trade-off is reduced penetration depth due to increased attenuation.",
    },
    {
      id: "phys-3",
      question:
        "The Doppler shift frequency is directly proportional to which of the following?",
      choices: [
        "Blood flow velocity",
        "Tissue density",
        "Transducer element size",
        "Pulse repetition period",
      ],
      answerIndex: 0,
      explanation:
        "The Doppler equation shows frequency shift is directly proportional to blood velocity and the cosine of the insonation angle.",
    },
    {
      id: "phys-4",
      question: "What artifact is caused by a strong reflector near the transducer?",
      choices: [
        "Reverberation",
        "Acoustic enhancement",
        "Edge shadowing",
        "Slice thickness artifact",
      ],
      answerIndex: 0,
      explanation:
        "Reverberation artifacts occur when sound bounces back and forth between the transducer and a strong near-field reflector, creating equally spaced parallel lines.",
    },
    {
      id: "phys-5",
      question: "The ALARA principle refers to:",
      choices: [
        "Keeping ultrasound exposure as low as reasonably achievable",
        "Using the highest frequency available for every scan",
        "Maximizing output power for best image quality",
        "Applying consistent pressure during scanning",
      ],
      answerIndex: 0,
      explanation:
        "ALARA (As Low As Reasonably Achievable) is a safety principle — minimize patient exposure while maintaining diagnostic quality.",
    },
    {
      id: "phys-6",
      question:
        "Lateral resolution is determined primarily by:",
      choices: [
        "Beam width",
        "Spatial pulse length",
        "Pulse repetition frequency",
        "Dynamic range",
      ],
      answerIndex: 0,
      explanation:
        "Lateral resolution equals beam width at the point of interest. It is best at the focal zone where the beam is narrowest.",
    },
  ],
  "abdominal-ultrasound": [
    {
      id: "abd-1",
      question:
        "A patient presents with right upper quadrant pain. On ultrasound, a gallstone is identified in the gallbladder neck with posterior acoustic shadowing. What is the most likely diagnosis?",
      choices: [
        "Cholelithiasis",
        "Gallbladder polyp",
        "Adenomyomatosis",
        "Porcelain gallbladder",
      ],
      answerIndex: 0,
      explanation:
        "The combination of an echogenic focus with posterior shadowing in the gallbladder is characteristic of cholelithiasis. Polyps typically do not shadow.",
    },
    {
      id: "abd-2",
      question:
        "What is the normal upper limit for the common bile duct diameter in adults?",
      choices: ["6-7 mm", "10-12 mm", "3-4 mm", "15-20 mm"],
      answerIndex: 0,
      explanation:
        "The normal CBD measures up to 6-7mm. It may be slightly larger in elderly patients or post-cholecystectomy (up to 10mm).",
    },
    {
      id: "abd-3",
      question:
        "Which sonographic finding is most suggestive of hepatic cirrhosis?",
      choices: [
        "Nodular liver surface with caudate lobe hypertrophy",
        "Homogeneous echogenicity",
        "Smooth liver capsule",
        "Normal portal vein diameter",
      ],
      answerIndex: 0,
      explanation:
        "Cirrhosis shows surface nodularity, heterogeneous echotexture, caudate lobe hypertrophy, and often signs of portal hypertension.",
    },
    {
      id: "abd-4",
      question: "Acoustic enhancement is typically seen posterior to:",
      choices: [
        "Fluid-filled structures",
        "Calcified lesions",
        "Gas collections",
        "Dense tissue",
      ],
      answerIndex: 0,
      explanation:
        "Fluid attenuates less than surrounding tissue, so the sound beam is stronger beyond the fluid, creating posterior acoustic enhancement.",
    },
    {
      id: "abd-5",
      question:
        "A hyperechoic renal mass with posterior shadowing most likely represents:",
      choices: [
        "Angiomyolipoma",
        "Renal cell carcinoma",
        "Simple cyst",
        "Transitional cell carcinoma",
      ],
      answerIndex: 0,
      explanation:
        "Angiomyolipomas are the most common benign renal tumors. They are characteristically hyperechoic due to their fat content.",
    },
    {
      id: "abd-6",
      question:
        "What structure connects the gallbladder to the common hepatic duct?",
      choices: [
        "Cystic duct",
        "Common bile duct",
        "Pancreatic duct",
        "Hepatic artery",
      ],
      answerIndex: 0,
      explanation:
        "The cystic duct connects the gallbladder to the common hepatic duct. Together they form the common bile duct.",
    },
  ],
  "vascular-ultrasound": [
    {
      id: "vasc-1",
      question:
        "An ICA stenosis of 70-99% typically shows a peak systolic velocity (PSV) greater than:",
      choices: ["125 cm/s", "50 cm/s", "200 cm/s", "80 cm/s"],
      answerIndex: 0,
      explanation:
        "PSV > 125 cm/s with end-diastolic velocity > 40 cm/s and ICA/CCA ratio > 2.0 indicates 50-69% stenosis. For 70-99%, PSV is typically > 230 cm/s per some criteria, but > 125 cm/s is the threshold for significant stenosis.",
    },
    {
      id: "vasc-2",
      question:
        "The normal direction of flow in the vertebral artery is:",
      choices: [
        "Antegrade (toward the brain)",
        "Retrograde (away from the brain)",
        "Bidirectional",
        "No detectable flow",
      ],
      answerIndex: 0,
      explanation:
        "Normal vertebral artery flow is antegrade — toward the brain. Reversed flow suggests subclavian steal syndrome.",
    },
    {
      id: "vasc-3",
      question:
        "Which finding is most diagnostic of acute deep vein thrombosis (DVT)?",
      choices: [
        "Non-compressibility of the vein",
        "Augmented flow with calf squeeze",
        "Phasic respiratory variation",
        "Thin vessel walls",
      ],
      answerIndex: 0,
      explanation:
        "The hallmark of DVT on ultrasound is non-compressibility. A normal vein collapses completely with probe pressure; a thrombosed vein does not.",
    },
    {
      id: "vasc-4",
      question:
        "Spectral broadening in arterial Doppler indicates:",
      choices: [
        "Disturbed or turbulent flow",
        "Normal laminar flow",
        "Complete vessel occlusion",
        "Venous contamination",
      ],
      answerIndex: 0,
      explanation:
        "Spectral broadening occurs when blood cells move at many different velocities simultaneously, indicating disturbed or turbulent flow — typically seen at or just beyond a stenosis.",
    },
    {
      id: "vasc-5",
      question:
        "In a normal lower extremity venous exam, flow should be:",
      choices: [
        "Spontaneous, phasic with respiration, and augmentable",
        "Continuous and non-phasic",
        "Only detectable with Valsalva",
        "Pulsatile like arterial flow",
      ],
      answerIndex: 0,
      explanation:
        "Normal venous flow is spontaneous, phasic with respiration (increases with expiration), and augments with distal compression. Loss of phasicity suggests proximal obstruction.",
    },
    {
      id: "vasc-6",
      question:
        "What does a tardus-parvus waveform distal to a stenosis indicate?",
      choices: [
        "Significant proximal arterial stenosis",
        "Normal distal perfusion",
        "Venous insufficiency",
        "AV fistula",
      ],
      answerIndex: 0,
      explanation:
        "Tardus (slow rise) parvus (diminished amplitude) waveforms are seen distal to a hemodynamically significant stenosis. The stenosis dampens the normal sharp systolic peak.",
    },
  ],
};

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug || !questionsBySlug[slug]) {
    return NextResponse.json(
      { error: "Unknown product slug" },
      { status: 400 }
    );
  }

  return NextResponse.json(questionsBySlug[slug]);
}
