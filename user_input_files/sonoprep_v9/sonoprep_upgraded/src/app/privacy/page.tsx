import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SonoPrep Privacy Policy — how we collect, use, and protect your personal information.",
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "May 1, 2026";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          {/* Header */}
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-widest text-teal">Legal</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-cream">Privacy Policy</h1>
            <p className="mt-4 text-sm text-cream-dim">
              Effective date: <time dateTime="2026-05-01">{EFFECTIVE_DATE}</time>
            </p>
            <p className="mt-4 text-cream-dim leading-relaxed">
              SonoPrep (&quot;SonoPrep,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting
              your privacy. This Privacy Policy explains what personal information we collect,
              how we use it, and the rights you have regarding that information.
              Please read this policy carefully. By using sonoprep.com (the &quot;Site&quot;) or
              our services, you agree to the practices described here.
            </p>
          </div>

          <div className="space-y-10 prose-sonoprep">

            {/* 1. Who We Are */}
            <section aria-labelledby="section-who">
              <h2 id="section-who" className="font-display text-2xl font-bold text-cream mb-4">
                1. Who We Are
              </h2>
              <p className="text-cream-dim leading-relaxed">
                SonoPrep is an online educational platform offering ARDMS SPI exam preparation
                materials, including flashcards, a practice exam simulator, and Physics Pearls.
                For questions about this policy or your data, contact us at:{" "}
                <a href="mailto:support@sonoprep.com" className="text-teal-glow hover:underline">
                  support@sonoprep.com
                </a>.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section aria-labelledby="section-collect">
              <h2 id="section-collect" className="font-display text-2xl font-bold text-cream mb-4">
                2. Information We Collect
              </h2>
              <h3 className="font-display text-lg font-semibold text-cream mb-2">
                2.1 Information You Provide
              </h3>
              <ul className="space-y-2 text-cream-dim mb-5">
                <li><strong className="text-cream">Account registration:</strong> name, email address, and password (stored as a secure hash).</li>
                <li><strong className="text-cream">Email capture (free demo):</strong> email address and optional study context (exam score, weakest category).</li>
                <li><strong className="text-cream">Payment information:</strong> processed entirely by Stripe, Inc. We do not store your card number, CVV, or full card details. We receive and store your Stripe Customer ID, subscription status, and payment history.</li>
                <li><strong className="text-cream">Support communications:</strong> any information you send us via email at support@sonoprep.com.</li>
              </ul>

              <h3 className="font-display text-lg font-semibold text-cream mb-2">
                2.2 Information Collected Automatically
              </h3>
              <ul className="space-y-2 text-cream-dim mb-5">
                <li><strong className="text-cream">Session cookies:</strong> we use strictly necessary session cookies set by NextAuth.js to keep you signed in. These are essential to site functionality and do not require consent under most regulations.</li>
                <li><strong className="text-cream">Usage data:</strong> study progress, flashcard review history, exam scores, and performance analytics stored on our servers to power spaced-repetition and progress tracking.</li>
                <li><strong className="text-cream">Log data:</strong> IP address, browser type, pages visited, and timestamps, collected by our hosting provider for security and debugging.</li>
              </ul>

              <h3 className="font-display text-lg font-semibold text-cream mb-2">
                2.3 Information from Third Parties
              </h3>
              <p className="text-cream-dim leading-relaxed">
                We use Stripe for payment processing and Google Sheets for internal analytics.
                Stripe may share transaction confirmation data with us. We do not currently
                use third-party advertising networks, social media pixels, or behavioural
                tracking tools.
              </p>
            </section>

            {/* 3. How We Use Your Information */}
            <section aria-labelledby="section-use">
              <h2 id="section-use" className="font-display text-2xl font-bold text-cream mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-cream-dim mb-4 leading-relaxed">
                We process your personal information for the following purposes and legal bases:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-cream-dim border border-border rounded">
                  <thead>
                    <tr className="border-b border-border bg-slate">
                      <th scope="col" className="px-4 py-3 text-left font-semibold text-cream">Purpose</th>
                      <th scope="col" className="px-4 py-3 text-left font-semibold text-cream">Legal Basis (GDPR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      ["Provide and operate the platform", "Performance of contract"],
                      ["Process payments via Stripe", "Performance of contract"],
                      ["Send transactional emails (receipt, password reset)", "Performance of contract"],
                      ["Send marketing/study-tip emails (with your consent)", "Consent"],
                      ["Improve our products and content", "Legitimate interests"],
                      ["Detect and prevent fraud or abuse", "Legitimate interests / Legal obligation"],
                      ["Comply with applicable laws", "Legal obligation"],
                    ].map(([purpose, basis]) => (
                      <tr key={purpose}>
                        <td className="px-4 py-3">{purpose}</td>
                        <td className="px-4 py-3">{basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Email Communications (CAN-SPAM) */}
            <section aria-labelledby="section-email">
              <h2 id="section-email" className="font-display text-2xl font-bold text-cream mb-4">
                4. Email Communications
              </h2>
              <p className="text-cream-dim leading-relaxed mb-4">
                We send two types of emails:
              </p>
              <ul className="space-y-3 text-cream-dim">
                <li>
                  <strong className="text-cream">Transactional emails</strong> — receipts,
                  access confirmations, and password resets. These are sent as part of your
                  service and cannot be opted out of while you maintain an account.
                </li>
                <li>
                  <strong className="text-cream">Marketing emails</strong> — occasional SPI
                  study tips and product announcements. You consent to these when you submit
                  your email on our demo page, or during account registration. You may
                  unsubscribe at any time by clicking the &quot;Unsubscribe&quot; link in any
                  marketing email, or by emailing{" "}
                  <a href="mailto:support@sonoprep.com" className="text-teal-glow hover:underline">
                    support@sonoprep.com
                  </a>.
                </li>
              </ul>
              <p className="mt-4 text-cream-dim leading-relaxed">
                In compliance with the U.S. CAN-SPAM Act, every marketing email we send
                includes a clear sender identification, an accurate subject line, a physical
                mailing address, and a working unsubscribe mechanism that we honor within
                10 business days.
              </p>
            </section>

            {/* 5. Sharing */}
            <section aria-labelledby="section-sharing">
              <h2 id="section-sharing" className="font-display text-2xl font-bold text-cream mb-4">
                5. How We Share Your Information
              </h2>
              <p className="text-cream-dim leading-relaxed mb-4">
                We do not sell your personal information. We share it only with:
              </p>
              <ul className="space-y-2 text-cream-dim">
                <li><strong className="text-cream">Stripe, Inc.</strong> — payment processing. Stripe is PCI-DSS Level 1 certified.</li>
                <li><strong className="text-cream">Hosting/infrastructure providers</strong> — for site operation, subject to confidentiality obligations.</li>
                <li><strong className="text-cream">Law enforcement or regulators</strong> — when required by valid legal process or to protect rights and safety.</li>
                <li><strong className="text-cream">Business transfers</strong> — in the event of a merger, acquisition, or sale of assets, your data may be transferred. We will notify you before your data becomes subject to a materially different privacy policy.</li>
              </ul>
            </section>

            {/* 6. Cookies */}
            <section aria-labelledby="section-cookies">
              <h2 id="section-cookies" className="font-display text-2xl font-bold text-cream mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-cream-dim leading-relaxed mb-4">
                We use the following cookies:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-cream-dim border border-border rounded">
                  <thead>
                    <tr className="border-b border-border bg-slate">
                      <th scope="col" className="px-4 py-3 text-left font-semibold text-cream">Cookie</th>
                      <th scope="col" className="px-4 py-3 text-left font-semibold text-cream">Purpose</th>
                      <th scope="col" className="px-4 py-3 text-left font-semibold text-cream">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">next-auth.session-token</td>
                      <td className="px-4 py-3">Keeps you authenticated between page loads</td>
                      <td className="px-4 py-3">Strictly necessary</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">next-auth.csrf-token</td>
                      <td className="px-4 py-3">Prevents cross-site request forgery attacks</td>
                      <td className="px-4 py-3">Strictly necessary</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-cream-dim leading-relaxed">
                We do not use advertising cookies, cross-site tracking cookies, or
                analytics platforms such as Google Analytics. Strictly necessary cookies
                cannot be disabled without breaking core site functionality.
              </p>
            </section>

            {/* 7. Data Retention */}
            <section aria-labelledby="section-retention">
              <h2 id="section-retention" className="font-display text-2xl font-bold text-cream mb-4">
                7. Data Retention
              </h2>
              <p className="text-cream-dim leading-relaxed">
                We retain your account data for as long as your account is active. If you
                request account deletion, we will delete or anonymize your personal data
                within 30 days, except where retention is required by law (e.g., financial
                records required by tax regulations, retained for up to 7 years). Study
                progress data tied to your account is deleted with your account.
              </p>
            </section>

            {/* 8. Security */}
            <section aria-labelledby="section-security">
              <h2 id="section-security" className="font-display text-2xl font-bold text-cream mb-4">
                8. Security
              </h2>
              <p className="text-cream-dim leading-relaxed">
                We implement industry-standard security measures including TLS/HTTPS
                encryption for data in transit, bcrypt password hashing, CSRF protection,
                and rate limiting on authentication endpoints. No method of transmission
                over the internet is 100% secure; we cannot guarantee absolute security.
                If we become aware of a data breach that affects your rights or freedoms,
                we will notify you as required by applicable law.
              </p>
            </section>

            {/* 9. Your Rights */}
            <section aria-labelledby="section-rights">
              <h2 id="section-rights" className="font-display text-2xl font-bold text-cream mb-4">
                9. Your Privacy Rights
              </h2>

              <h3 className="font-display text-lg font-semibold text-cream mb-2">
                9.1 Rights Under GDPR (EEA, UK, and Switzerland Residents)
              </h3>
              <ul className="space-y-2 text-cream-dim mb-6">
                <li><strong className="text-cream">Right of access</strong> — request a copy of the personal data we hold about you.</li>
                <li><strong className="text-cream">Right to rectification</strong> — request correction of inaccurate data.</li>
                <li><strong className="text-cream">Right to erasure</strong> — request deletion of your personal data (&quot;right to be forgotten&quot;).</li>
                <li><strong className="text-cream">Right to restrict processing</strong> — request that we limit how we use your data.</li>
                <li><strong className="text-cream">Right to data portability</strong> — receive your data in a structured, machine-readable format.</li>
                <li><strong className="text-cream">Right to object</strong> — object to processing based on legitimate interests or direct marketing.</li>
                <li><strong className="text-cream">Right to withdraw consent</strong> — withdraw consent for marketing emails at any time (this does not affect the lawfulness of prior processing).</li>
                <li><strong className="text-cream">Right to lodge a complaint</strong> — with your local data protection authority.</li>
              </ul>

              <h3 className="font-display text-lg font-semibold text-cream mb-2">
                9.2 Rights Under CCPA/CPRA (California Residents)
              </h3>
              <p className="text-cream-dim leading-relaxed mb-3">
                California residents have the right to:
              </p>
              <ul className="space-y-2 text-cream-dim mb-4">
                <li><strong className="text-cream">Know</strong> what personal information we collect, use, disclose, and sell (we do not sell personal information).</li>
                <li><strong className="text-cream">Delete</strong> personal information we have collected.</li>
                <li><strong className="text-cream">Correct</strong> inaccurate personal information.</li>
                <li><strong className="text-cream">Opt out of sale or sharing</strong> — we do not sell or share personal information for cross-context behavioral advertising.</li>
                <li><strong className="text-cream">Non-discrimination</strong> — you will not receive worse service for exercising your rights.</li>
              </ul>
              <p className="text-cream-dim leading-relaxed">
                <strong className="text-cream">Shine the Light:</strong> California Civil Code § 1798.83 allows California residents to request information about disclosure of personal information to third parties for direct marketing. We do not disclose personal information to third parties for their direct marketing purposes.
              </p>

              <h3 className="mt-6 font-display text-lg font-semibold text-cream mb-2">
                9.3 How to Exercise Your Rights
              </h3>
              <p className="text-cream-dim leading-relaxed">
                To exercise any of the rights above, email us at{" "}
                <a href="mailto:support@sonoprep.com" className="text-teal-glow hover:underline">
                  support@sonoprep.com
                </a>{" "}
                with the subject line &quot;Privacy Request.&quot; We will respond within 30 days
                (GDPR) or 45 days (CCPA). We may need to verify your identity before
                fulfilling your request.
              </p>
            </section>

            {/* 10. Children */}
            <section aria-labelledby="section-children">
              <h2 id="section-children" className="font-display text-2xl font-bold text-cream mb-4">
                10. Children&apos;s Privacy
              </h2>
              <p className="text-cream-dim leading-relaxed">
                Our services are directed at adults pursuing professional medical credentials.
                We do not knowingly collect personal information from children under 13
                (or under 16 for users in the EEA). If you believe we have inadvertently
                collected such information, please contact us immediately.
              </p>
            </section>

            {/* 11. Third-party Links */}
            <section aria-labelledby="section-links">
              <h2 id="section-links" className="font-display text-2xl font-bold text-cream mb-4">
                11. Third-Party Links
              </h2>
              <p className="text-cream-dim leading-relaxed">
                Our Site may contain links to third-party websites (e.g., ARDMS.org, Stripe).
                We are not responsible for the privacy practices of those sites and encourage
                you to review their privacy policies.
              </p>
            </section>

            {/* 12. Changes */}
            <section aria-labelledby="section-changes">
              <h2 id="section-changes" className="font-display text-2xl font-bold text-cream mb-4">
                12. Changes to This Policy
              </h2>
              <p className="text-cream-dim leading-relaxed">
                We may update this policy periodically. When we make material changes,
                we will update the effective date at the top of this page and, where
                appropriate, notify you by email. Your continued use of the Site after
                changes are posted constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* 13. Contact */}
            <section aria-labelledby="section-contact" className="rounded border border-teal/20 bg-teal/5 p-6">
              <h2 id="section-contact" className="font-display text-2xl font-bold text-cream mb-4">
                13. Contact Us
              </h2>
              <p className="text-cream-dim leading-relaxed">
                For any privacy questions, data subject requests, or complaints:
              </p>
              <address className="mt-3 not-italic text-cream-dim">
                <strong className="text-cream">SonoPrep</strong><br />
                Email:{" "}
                <a href="mailto:support@sonoprep.com" className="text-teal-glow hover:underline">
                  support@sonoprep.com
                </a>
              </address>
            </section>

          </div>

          {/* Back link */}
          <div className="mt-12 flex gap-4">
            <Link href="/terms" className="font-mono text-xs text-teal hover:text-teal-glow transition-colors">
              Terms of Service →
            </Link>
            <Link href="/accessibility" className="font-mono text-xs text-teal hover:text-teal-glow transition-colors">
              Accessibility Statement →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
