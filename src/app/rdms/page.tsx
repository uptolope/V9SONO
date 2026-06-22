import Link from "next/link";
export default function RDMSPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#8a8279] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-white mb-4">RDMS Credential</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <p className="body-readable text-[#c2bab0]">Registered Diagnostic Medical Sonographer – abdomen, OB/GYN, or breast sonography after passing SPI.</p>
      </div>
    </div>
  );
}
