import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function FAQPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-4">Frequently Asked Questions</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <div className="space-y-6">
          <div><h2 className="font-semibold text-white">How long do I have access?</h2><p className="text-[#b8b0a4]">90 days from purchase.</p></div>
          <div><h2 className="font-semibold text-white">Can I share my account?</h2><p className="text-[#b8b0a4]">No, each license is for one user.</p></div>
          <div><h2 className="font-semibold text-white">Is there a refund policy?</h2><p className="text-[#b8b0a4]">14‑day money‑back guarantee.</p></div>
        </div>
      </div>
    </div>
  );
}
