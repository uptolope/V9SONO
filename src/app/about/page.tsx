import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <div className="mb-8">
          <h1 className="display-display text-5xl sm:text-6xl text-[#f0ebe4] mb-4">About SonoPrep</h1>
          <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mb-3">Built by sonographers, for sonographers</h2>
            <p className="body-readable text-[#b8b0a4] leading-relaxed">SonoPrep was created by ARDMS-certified sonographers who passed the SPI exam and wanted to share what actually works. We've scanned patients, studied the material, and built a platform that cuts through the noise.</p>
          </div>
          <div>
            <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mb-3">What makes us different</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#b8b0a4]">
              <li><strong className="text-white">Clinical relevance</strong> – Every concept tied to real scanning scenarios</li>
              <li><strong className="text-white">Spaced repetition</strong> – Science-backed flashcards that stick</li>
              <li><strong className="text-white">No fluff</strong> – Straight to what the exam tests</li>
              <li><strong className="text-white">Affordable</strong> – Premium quality without insane pricing</li>
            </ul>
          </div>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a]">
            <p className="body-readable text-[#f0ebe4] text-sm">We're a small, independent team. If you have feedback, reach out. We're always improving.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
