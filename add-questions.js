const fs = require('fs');
const path = './src/lib/exam/full-questions.ts';

let content = fs.readFileSync(path, 'utf8');

// Find the closing bracket of the EXAM_QUESTIONS array
const lastQuestionIndex = content.lastIndexOf('}');
const insertPoint = content.lastIndexOf('],') + 1;

const newQuestions = [
  { id: 156, question: "What is the primary advantage of using a higher pulse repetition frequency (PRF) in spectral Doppler?", options: ["Improved axial resolution", "Higher Nyquist limit (reduced aliasing)", "Deeper penetration", "Better lateral resolution"], correctAnswer: 1, domain: "Doppler & Hemodynamics", explanation: "A higher PRF raises the Nyquist limit (PRF/2), allowing detection of higher velocities without aliasing. However, it reduces maximum imaging depth." },
  { id: 157, question: "In an ultrasound system, what is the function of the analog-to-digital converter (ADC)?", options: ["Converts sound waves to electrical signals", "Converts continuous analog signals to discrete digital numbers", "Amplifies weak returning echoes", "Focuses the ultrasound beam"], correctAnswer: 1, domain: "Instrumentation", explanation: "The ADC converts analog echo signals (continuous voltage) into digital numbers for processing, storage, and display in modern ultrasound systems." },
  { id: 158, question: "Which artifact is caused by a very high mechanical index (MI) and the collapse of microbubbles?", options: ["Reverberation", "Shadowing", "Cavitation artifact", "Enhancement"], correctAnswer: 2, domain: "Safety & Bioeffects", explanation: "High MI can cause inertial cavitation – microbubbles collapse violently, creating transient bright flashes or tissue damage. This is monitored via the MI display." },
  { id: 159, question: "What is the effect of decreasing the dynamic range on an ultrasound image?", options: ["Increased number of gray shades", "More contrast (fewer gray shades)", "Improved temporal resolution", "Decreased frame rate"], correctAnswer: 1, domain: "Image Quality", explanation: "Dynamic range is the ratio of largest to smallest amplitude signals displayed. Decreasing it compresses the gray scale, producing a higher contrast image (fewer shades of gray)." },
  { id: 160, question: "What does the Quality Factor (Q) of a transducer represent?", options: ["Bandwidth / center frequency", "Center frequency / bandwidth", "Bandwidth × center frequency", "Damping coefficient"], correctAnswer: 1, domain: "Instrumentation", explanation: "Q = center frequency / bandwidth. High Q means narrow bandwidth (continuous wave), low Q means wide bandwidth (pulsed wave, better axial resolution)." },
  { id: 161, question: "In hemodynamics, what is the significance of Poiseuille's law?", options: ["Describes pressure gradient in turbulent flow", "Relates flow rate to vessel radius, length, and viscosity", "Calculates Doppler shift", "Determines acoustic impedance"], correctAnswer: 1, domain: "Hemodynamics", explanation: "Poiseuille's law states that volume flow rate is proportional to the fourth power of the radius, inversely proportional to viscosity and length. Small radius changes greatly affect flow." },
  { id: 162, question: "What type of artifact appears as a hyperechoic area behind a gas‑containing structure (e.g., bowel)?", options: ["Shadowing", "Enhancement", "Reverberation", "Mirror image"], correctAnswer: 0, domain: "Artifacts", explanation: "Gas strongly attenuates and reflects sound, causing posterior acoustic shadowing – a dark (hypoechoic) area behind the gas. Enhancement occurs behind fluid." },
  { id: 163, question: "Which of the following best describes the purpose of a receive beamformer?", options: ["Summing delayed signals from array elements to focus at multiple depths", "Generating high voltage pulses", "Converting radiofrequency signals to video", "Measuring Doppler shifts"], correctAnswer: 0, domain: "Instrumentation", explanation: "The receive beamformer applies dynamic focusing by adjusting time delays to echoes from different depths, improving lateral resolution throughout the image." },
  { id: 164, question: "What is the typical mechanical index (MI) limit for diagnostic ultrasound in soft tissue to avoid cavitation?", options: ["< 0.5", "< 1.0", "< 1.9", "> 2.5"], correctAnswer: 2, domain: "Safety & Bioeffects", explanation: "The FDA diagnostic ultrasound limit for MI is 1.9 (derated to soft tissue). Higher MI increases cavitation risk. MI is displayed on the screen as a safety index." },
  { id: 165, question: "In B‑mode imaging, what does the envelope detector do?", options: ["Extracts amplitude information from the radiofrequency signal", "Converts sound to heat", "Steers the beam", "Increases frame rate"], correctAnswer: 0, domain: "Instrumentation", explanation: "The envelope detector (demodulator) extracts the amplitude (envelope) of the radiofrequency echo signal, which is then log compressed and displayed as gray‑scale brightness." },
  { id: 166, question: "What is the primary cause of spectral mirroring on Doppler ultrasound?", options: ["Incorrect gain settings", "Poor angle correction", "Wall filter too low", "Inverting the display for convenience"], correctAnswer: 3, domain: "Doppler & Hemodynamics", explanation: "Spectral mirroring is a user‑selectable display option that flips the waveform to show flow toward the transducer above the baseline (or vice versa). It does not affect measurements." },
  { id: 167, question: "Which of the following would improve temporal resolution the most?", options: ["Increasing number of focal zones", "Decreasing sector width", "Using more pulses per scan line", "Increasing line density"], correctAnswer: 1, domain: "Image Quality", explanation: "Temporal resolution (frame rate) is improved by reducing imaging depth, sector width, line density, or number of focal zones. Decreasing sector width provides the most direct improvement." },
  { id: 168, question: "What is the role of matching layers in a transducer?", options: ["Dampen crystal vibrations", "Increase electrical impedance", "Impedance matching to maximize sound transmission into tissue", "Steer the beam electronically"], correctAnswer: 2, domain: "Instrumentation", explanation: "Matching layers reduce the acoustic impedance mismatch between the piezoelectric crystal and skin, allowing more sound energy to enter the patient rather than reflecting at the surface." },
  { id: 169, question: "What does the term 'color write priority' control in color Doppler?", options: ["The color map hue", "Minimum Doppler signal strength for displaying color", "Maximum velocity displayed", "Sector width"], correctAnswer: 1, domain: "Doppler & Hemodynamics", explanation: "Color write priority determines the threshold Doppler signal amplitude required to replace the underlying gray‑scale pixel with color. Higher priority = less color noise but may miss low‑velocity flow." },
  { id: 170, question: "In ultrasound, what is the relationship between spatial pulse length (SPL) and axial resolution?", options: ["Axial resolution = SPL / 2", "Axial resolution = 2 × SPL", "No relationship", "Axial resolution = SPL × frequency"], correctAnswer: 0, domain: "Physics", explanation: "Axial resolution is approximately half the spatial pulse length. Shorter SPL (higher frequency, fewer cycles) gives better axial resolution. The formula is often stated as AR = SPL / 2." }
];

// Build the new JSON block for these questions
const newQuestionsJson = newQuestions.map(q => ({
  id: q.id,
  question: q.question,
  options: q.options,
  correctAnswer: q.correctAnswer,
  domain: q.domain,
  explanation: ""
}));

// Insert into the EXAM_QUESTIONS array before the closing bracket
const arrayEnd = content.lastIndexOf('];');
const beforeEnd = content.slice(0, arrayEnd);
const afterEnd = content.slice(arrayEnd);
const updated = beforeEnd + ',' + JSON.stringify(newQuestionsJson, null, 2).slice(1, -1) + afterEnd;

fs.writeFileSync(path, updated);
console.log(`✅ Added ${newQuestions.length} new questions. Total questions now: ${155 + newQuestions.length}`);
