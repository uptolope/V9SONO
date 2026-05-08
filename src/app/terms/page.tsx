import Link from "next/link";
export const dynamic = 'force-dynamic';

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-6">Terms of Service</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <div className="space-y-6 text-[#b8b0a4]">
          <p><strong className="text-white">1. License & Access</strong><br />Your purchase grants you a non‑transferable, 90‑day access license to the selected SonoPrep product(s). Each license is for single‑user use only. Sharing credentials or content is prohibited.</p>
          <p><strong className="text-white">2. Refund Policy</strong><br />We offer a 14‑day money‑back guarantee. If you are not satisfied with your purchase, contact support@sonoprep.com within 14 days for a full refund. After 14 days, no refunds are issued.</p>
          <p><strong className="text-white">3. Acceptable Use</strong><br />You may not reproduce, distribute, or create derivative works from SonoPrep content. The exam simulator is for personal study; any attempt to systematically retrieve questions to create a third‑party question bank is prohibited.</p>
          <p><strong className="text-white">4. Disclaimer</strong><br />SonoPrep is not affiliated with ARDMS. While our content is designed to align with the SPI exam outline, we do not guarantee a passing score. Results vary based on individual effort.</p>
          <p><strong className="text-white">5. Limitation of Liability</strong><br />To the maximum extent permitted by law, SonoPrep is not liable for indirect damages or lost exam fees. Our total liability is limited to the amount you paid.</p>
          <p><strong className="text-white">6. Governing Law</strong><br />These terms are governed by the laws of Texas. Any disputes shall be resolved in Harris County courts.</p>
          <div className="bg-[#c85b3a]/10 p-4 border-l-[3px] border-[#c85b3a] text-sm mt-8">By using SonoPrep, you acknowledge that you have read, understood, and agree to these terms.</div>
        </div>
      </div>
    </div>
  );
}
