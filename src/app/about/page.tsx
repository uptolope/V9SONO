import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-4">About SonoPrep</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <p className="body-readable text-[#b8b0a4]">SonoPrep was created by sonographers who passed the SPI exam. We provide flashcards, exam simulator, physics pearls, and study notes to help you succeed.</p>
      </div>
    </div>
  );
}
