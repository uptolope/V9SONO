import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function RDMSPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-4">RDMS Credential</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <p className="body-readable text-[#b8b0a4]">Registered Diagnostic Medical Sonographer – abdomen, OB/GYN, or breast sonography after passing SPI.</p>
      </div>
    </div>
  );
}
