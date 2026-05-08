import Link from "next/link";
export const dynamic = 'force-dynamic';

const VALUES = [
  { title: "Mission-Driven", desc: "We exist to help sonography students pass the SPI exam — the mandatory gateway to RDMS, RDCS, RVT, and RMSKS credentials." },
  { title: "Built by Experts", desc: "Our content is created by credentialed, practicing sonographers who know the exam inside out." },
  { title: "Science-Based", desc: "SM-2 spaced repetition, ARDMS domain weighting, and evidence-based pedagogy." },
  { title: "Results First", desc: "Every product maps directly to the ARDMS exam blueprint." },
];

const CREDENTIALS = [
  "Registered Diagnostic Cardiac Sonographer (RDCS)",
  "10+ years teaching Adult Echocardiography",
  "Practicing clinical sonographer",
  "SonoPrep founder & curriculum designer",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <div className="text-center mb-16">
          <span className="meta text-[#c85b3a] text-sm">OUR STORY</span>
          <h1 className="display-display text-5xl sm:text-6xl text-[#f0ebe4] mt-4 mb-4">About SonoPrep</h1>
          <p className="body-readable text-[#b8b0a4] max-w-2xl mx-auto">We're sonographers who were frustrated by the lack of quality SPI exam prep. So we built what we wished existed.</p>
        </div>
        <div className="depth-border corner-arch mb-16">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-2 bg-[#1a212b] flex items-center justify-center min-h-[300px]">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto bg-[#c85b3a]/20 rounded-full flex items-center justify-center mb-4"><span className="text-4xl">👤</span></div>
                <p className="text-white/40 text-xs">Founder photo</p>
              </div>
            </div>
            <div className="md:col-span-3 p-8 md:p-10">
              <div className="inline-block bg-[#c85b3a] px-3 py-1 text-[10px] meta text-white mb-4">FOUNDER & LEAD EDUCATOR</div>
              <h2 className="display-serif text-3xl font-semibold text-[#f0ebe4] mb-1">Olajide Labiyi</h2>
              <p className="text-[#c85b3a] mb-6">RDCS</p>
              <div className="space-y-4 text-[#b8b0a4] text-sm leading-relaxed">
                <p>I've spent over a decade in the echo lab — scanning patients, training students, and watching talented sonographers struggle with an exam that doesn't reflect how hard they've worked.</p>
                <p>The SPI exam is a specific challenge. I built SonoPrep because I kept seeing the same gap: students who were excellent clinically but under‑prepared for the way the ARDMS actually tests this content.</p>
                <p>Every flashcard, exam question, and physics pearl comes from real teaching experience — the mistakes I've seen students make, the concepts that trip people up, and the explanations that actually make things click.</p>
                <p className="text-[#f0ebe4]">My goal isn't just to help you pass an exam. It's to make sure you walk into your career with the confidence and understanding that sets you apart.</p>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CREDENTIALS.map((cred) => (
                  <div key={cred} className="flex items-center gap-3 border border-[#c85b3a]/30 bg-[#c85b3a]/5 px-4 py-2.5">
                    <span className="text-[#c85b3a] text-sm">—</span>
                    <span className="text-sm text-[#f0ebe4]">{cred}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {VALUES.map((val) => (
            <div key={val.title} className="depth-border corner-arch p-6 tactile-card">
              <h3 className="display-serif text-xl font-semibold text-[#f0ebe4] mb-3">{val.title}</h3>
              <p className="body-small text-[#b8b0a4] text-sm">{val.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#c85b3a]/10 p-8 border-l-[3px] border-[#c85b3a] text-center">
          <p className="body-readable text-[#f0ebe4] text-sm">We're a small, independent team. If you have feedback, reach out. We're always improving.</p>
        </div>
      </div>
    </div>
  );
}
