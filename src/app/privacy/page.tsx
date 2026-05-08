import Link from "next/link";
export const dynamic = 'force-dynamic';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-6">Privacy Policy</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <div className="space-y-6 text-[#b8b0a4]">
          <p><strong className="text-white">Information We Collect</strong><br />We collect only the information necessary to provide our SPI exam preparation services: name, email address, and payment details (processed securely by Stripe). We do not collect sensitive health information.</p>
          <p><strong className="text-white">How We Use Your Information</strong><br />To create your account, track your study progress, process payments, and communicate important updates about your access. We never sell your personal data to third parties.</p>
          <p><strong className="text-white">Data Security</strong><br />We use industry-standard encryption (SSL/TLS) and store passwords using bcrypt hashing. Stripe handles all payment processing – no credit card data is stored on our servers.</p>
          <p><strong className="text-white">Your Rights</strong><br />You can request deletion of your account and associated data at any time by emailing support@sonoprep.com. We will respond within 30 days.</p>
          <p><strong className="text-white">Cookies</strong><br />We use essential cookies for authentication and session management. No tracking or advertising cookies are used.</p>
          <p><strong className="text-white">Changes to This Policy</strong><br />We will notify users by email of any material changes. This policy was last updated May 1, 2026.</p>
        </div>
      </div>
    </div>
  );
}
