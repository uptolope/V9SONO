import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | SonoPrep",
  description:
    "SonoPrep's privacy policy: what data we collect, how we use it, and your rights as a user.",
  keywords: ["SonoPrep privacy policy", "sonography exam prep privacy"],
  alternates: {
    canonical: "https://sonoprep.com/privacy",
  },
};

const LAST_UPDATED = "June 22, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#8a8279] hover:text-[#c85b3a] mb-8 inline-block">
          ← BACK TO HOME
        </Link>

        <div className="mb-12">
          <span className="meta text-[#c85b3a] text-sm">LEGAL</span>
          <h1 className="display-display text-4xl sm:text-5xl text-white mt-4 mb-3">Privacy Policy</h1>
          <p className="text-[#8a8279] text-sm meta">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-10 text-[#c2bab0] body-readable leading-relaxed">

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">1. Who We Are</h2>
            <p>
              SonoPrep (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is an online exam preparation service for ARDMS sonography credentials, operated at sonoprep.com. Our support contact is{" "}
              <a href="mailto:support@sonoprep.com" className="text-[#c85b3a] hover:underline">support@sonoprep.com</a>.
            </p>
          </section>

          {/* ── Privacy Nutrition Label ─────────────────────────────── */}
          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">2. Data Collection Summary</h2>
            <p className="mb-4 text-sm text-[#8a8279]">
              Quick reference of what we collect and why. Full details in sections below.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden" role="table">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left px-4 py-3 text-white font-medium border-b border-white/10" scope="col">Data Type</th>
                    <th className="text-left px-4 py-3 text-white font-medium border-b border-white/10" scope="col">Collected</th>
                    <th className="text-left px-4 py-3 text-white font-medium border-b border-white/10" scope="col">Purpose</th>
                    <th className="text-left px-4 py-3 text-white font-medium border-b border-white/10" scope="col">Shared</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3">Name &amp; email</td>
                    <td className="px-4 py-3">At signup</td>
                    <td className="px-4 py-3">Account, communication</td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <td className="px-4 py-3">Payment info</td>
                    <td className="px-4 py-3">At checkout</td>
                    <td className="px-4 py-3">Process payment</td>
                    <td className="px-4 py-3">Stripe only</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3">Study progress</td>
                    <td className="px-4 py-3">During use</td>
                    <td className="px-4 py-3">Track progress, analytics</td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <td className="px-4 py-3">Device/browser info</td>
                    <td className="px-4 py-3">Automatically</td>
                    <td className="px-4 py-3">Security, analytics</td>
                    <td className="px-4 py-3">Google Analytics</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3">IP address</td>
                    <td className="px-4 py-3">Automatically</td>
                    <td className="px-4 py-3">Security, rate limiting</td>
                    <td className="px-4 py-3">Anonymized to GA</td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="px-4 py-3">Email (marketing)</td>
                    <td className="px-4 py-3">If opted in</td>
                    <td className="px-4 py-3">Product updates</td>
                    <td className="px-4 py-3">MailerLite</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">3. What Data We Collect</h2>
            <p className="mb-3">We collect only what is necessary to provide the Service:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Account data:</strong> name, email address, and password (hashed with bcrypt) when you register.</li>
              <li><strong className="text-white">Payment data:</strong> billing name and last 4 digits of card. Full card details are processed by Stripe and never stored on our servers.</li>
              <li><strong className="text-white">Usage data:</strong> flashcard progress, exam scores, session activity, and study streak — used to power your study dashboard.</li>
              <li><strong className="text-white">Device &amp; browser data:</strong> browser type, operating system, screen resolution, and referring URL — collected via Google Analytics with anonymized IP addresses.</li>
              <li><strong className="text-white">Security data:</strong> IP address, user agent, and login timestamps — used for rate limiting, fraud prevention, and audit logging.</li>
              <li><strong className="text-white">Marketing data:</strong> if you opt in to email updates, your email address is shared with MailerLite for product announcements. You can unsubscribe at any time.</li>
              <li><strong className="text-white">Support data:</strong> any information you send us by email.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">4. How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To create and manage your account</li>
              <li>To process payments and send receipts</li>
              <li>To provide and improve the study tools</li>
              <li>To send transactional emails (purchase confirmation, password reset)</li>
              <li>To respond to support requests</li>
              <li>To detect and prevent fraud, abuse, and security threats</li>
              <li>To send product updates if you have opted in to marketing emails</li>
            </ul>
            <p className="mt-3">We do not sell your personal information. We do not use your data for targeted advertising.</p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">5. AI Usage Disclosure</h2>
            <p>
              SonoPrep may use artificial intelligence tools to assist in generating study explanations, flashcard rationales, and content summaries. All AI-assisted content is reviewed and approved by licensed sonography professionals before being published on the platform. AI is <strong className="text-white">not</strong> used to make automated decisions about your account, pricing, exam scoring, or access. Your exam answers are graded against a fixed, human-curated answer key.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">6. Third-Party Services</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Stripe</strong> — payment processing. Subject to <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#c85b3a] hover:underline">Stripe&apos;s Privacy Policy</a>.</li>
              <li><strong className="text-white">Google Analytics</strong> — anonymized site analytics. Subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#c85b3a] hover:underline">Google&apos;s Privacy Policy</a>.</li>
              <li><strong className="text-white">Vercel</strong> — hosting and infrastructure. Subject to <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#c85b3a] hover:underline">Vercel&apos;s Privacy Policy</a>.</li>
              <li><strong className="text-white">Supabase</strong> — database hosting. Data is stored in the US. Subject to <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#c85b3a] hover:underline">Supabase&apos;s Privacy Policy</a>.</li>
              <li><strong className="text-white">MailerLite</strong> — email marketing (opt-in only). Subject to <a href="https://www.mailerlite.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#c85b3a] hover:underline">MailerLite&apos;s Privacy Policy</a>.</li>
            </ul>
            <p className="mt-3 text-sm text-[#8a8279]">
              We do not use Meta Pixel, Facebook tracking, or any social media tracking pixels.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">7. Data Retention</h2>
            <p>
              We retain your account data for as long as your account is active. If you delete your account, we delete your personal data within 30 days, except where we are required to retain it by law (e.g., payment records for tax purposes, retained for 7 years as required by the IRS).
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">8. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Access</strong> the personal data we hold about you</li>
              <li><strong className="text-white">Download</strong> your data in a machine-readable format (data portability)</li>
              <li><strong className="text-white">Correct</strong> inaccurate data</li>
              <li><strong className="text-white">Delete</strong> your data and account</li>
              <li><strong className="text-white">Object</strong> to or restrict certain processing</li>
            </ul>
            <p className="mt-3">
              You can exercise your right to download or delete your data directly from your{" "}
              <Link href="/account" className="text-[#c85b3a] hover:underline">Account Settings</Link> page, or email{" "}
              <a href="mailto:support@sonoprep.com" className="text-[#c85b3a] hover:underline">support@sonoprep.com</a>. We will respond within 30 days.
            </p>
          </section>

          {/* ── CCPA Section ────────────────────────────────────────── */}
          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">9. California Privacy Rights (CCPA)</h2>
            <p className="mb-3">
              If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Right to Know:</strong> You may request that we disclose the categories and specific pieces of personal information we have collected about you, the categories of sources, the business purpose for collecting it, and the categories of third parties with whom we share it.</li>
              <li><strong className="text-white">Right to Delete:</strong> You may request that we delete the personal information we have collected from you, subject to certain exceptions (e.g., legal obligations, completing a transaction).</li>
              <li><strong className="text-white">Right to Opt-Out of Sale:</strong> We do not sell your personal information. We have not sold personal information in the preceding 12 months.</li>
              <li><strong className="text-white">Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights.</li>
            </ul>
            <p className="mt-3">
              To exercise your rights, email <a href="mailto:support@sonoprep.com" className="text-[#c85b3a] hover:underline">support@sonoprep.com</a> with the subject line &quot;CCPA Request&quot; or use the data controls in your{" "}
              <Link href="/account" className="text-[#c85b3a] hover:underline">Account Settings</Link>.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">10. Cookies</h2>
            <p>
              We use session cookies to keep you logged in and analytics cookies (Google Analytics) to understand site usage. We do not use advertising or tracking cookies. You can disable cookies in your browser settings, but some features (like staying logged in) will not work without them.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">11. Children&apos;s Privacy</h2>
            <p>
              SonoPrep is intended for adults who are enrolled in or have completed accredited sonography programs. We do not knowingly collect data from anyone under 18. If you believe a minor has created an account, contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">12. Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including: encrypted connections (HTTPS/TLS), bcrypt password hashing, rate limiting, account lockout after failed login attempts, session monitoring, and strict Content Security Policy headers. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">13. Changes to This Policy</h2>
            <p>
              We may update this policy. When we make material changes, we will notify you by email or by posting a prominent notice on the Service. Continued use of the Service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">14. Contact</h2>
            <p>
              Questions about this policy? Email{" "}
              <a href="mailto:support@sonoprep.com" className="text-[#c85b3a] hover:underline">support@sonoprep.com</a>.
            </p>
          </section>
        </div>

        <div className="mt-16 flex gap-6 text-sm text-[#8a8279] meta border-t border-white/8 pt-8">
          <Link href="/terms" className="hover:text-[#c85b3a]">Terms of Service</Link>
          <Link href="/accessibility" className="hover:text-[#c85b3a]">Accessibility</Link>
        </div>
      </div>
    </div>
  );
}
