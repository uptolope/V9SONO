import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "SonoPrep Terms of Service — rules and conditions for using SonoPrep exam preparation products.",
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "May 1, 2026";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          {/* Header */}
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-widest text-teal">Legal</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-cream">Terms of Service</h1>
            <p className="mt-4 text-sm text-cream-dim">
              Effective date: <time dateTime="2026-05-01">{EFFECTIVE_DATE}</time>
            </p>
            <p className="mt-4 text-cream-dim leading-relaxed">
              Please read these Terms of Service (&quot;Terms&quot;) carefully before using
              SonoPrep (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) at sonoprep.com (the &quot;Site&quot;) or
              any associated services (collectively, the &quot;Service&quot;). By creating an
              account or purchasing any product, you agree to be bound by these Terms.
              If you do not agree, do not use the Service.
            </p>
          </div>

          <div className="space-y-10 prose-sonoprep">

            <section aria-labelledby="terms-eligibility">
              <h2 id="terms-eligibility" className="font-display text-2xl font-bold text-cream mb-4">
                1. Eligibility
              </h2>
              <p className="text-cream-dim leading-relaxed">
                You must be at least 18 years old to use the Service. By using SonoPrep,
                you represent that you are at least 18 years old and have the legal capacity
                to enter into these Terms. Our Service is intended for individuals preparing
                for ARDMS examinations and related professional medical credentials.
              </p>
            </section>

            <section aria-labelledby="terms-account">
              <h2 id="terms-account" className="font-display text-2xl font-bold text-cream mb-4">
                2. Accounts
              </h2>
              <p className="text-cream-dim leading-relaxed mb-3">
                When you create an account you agree to:
              </p>
              <ul className="space-y-2 text-cream-dim">
                <li>Provide accurate, current, and complete information during registration.</li>
                <li>Maintain the security of your password and promptly notify us of any unauthorized use.</li>
                <li>Accept responsibility for all activity that occurs under your account.</li>
                <li>Not share your account credentials with any other person.</li>
              </ul>
              <p className="mt-4 text-cream-dim leading-relaxed">
                We reserve the right to suspend or terminate accounts that violate these Terms,
                engage in fraudulent activity, or share access credentials.
              </p>
            </section>

            <section aria-labelledby="terms-products">
              <h2 id="terms-products" className="font-display text-2xl font-bold text-cream mb-4">
                3. Products and Access
              </h2>
              <p className="text-cream-dim leading-relaxed mb-3">
                SonoPrep offers individual digital study products and bundles, including
                flashcards, an exam simulator, Physics Pearls, and study notes.
              </p>
              <ul className="space-y-2 text-cream-dim">
                <li>
                  <strong className="text-cream">Access period:</strong> Each product purchase
                  grants 90 days of full access from the date of purchase, unless otherwise
                  stated at the time of sale.
                </li>
                <li>
                  <strong className="text-cream">Personal use only:</strong> Your license is
                  non-exclusive, non-transferable, and limited to your personal, non-commercial
                  educational use. You may not share, resell, or sublicense access.
                </li>
                <li>
                  <strong className="text-cream">Free demo:</strong> The free demo tier provides
                  limited access to selected content without purchase. We reserve the right to
                  modify or discontinue the free demo at any time.
                </li>
                <li>
                  <strong className="text-cream">Device access:</strong> You may access your
                  purchased products on any personal device. You may not use automated tools
                  or scripts to access or extract content.
                </li>
              </ul>
            </section>

            <section aria-labelledby="terms-payments">
              <h2 id="terms-payments" className="font-display text-2xl font-bold text-cream mb-4">
                4. Payments and Refunds
              </h2>
              <h3 className="font-display text-lg font-semibold text-cream mb-2">4.1 Pricing</h3>
              <p className="text-cream-dim leading-relaxed mb-4">
                All prices are listed in U.S. dollars and are subject to change at any time.
                The price in effect at the time of your purchase will apply to that transaction.
                Applicable taxes may be added at checkout based on your location.
              </p>

              <h3 className="font-display text-lg font-semibold text-cream mb-2">4.2 Payment Processing</h3>
              <p className="text-cream-dim leading-relaxed mb-4">
                Payments are processed by Stripe, Inc. By providing your payment information,
                you authorize Stripe to charge the applicable amount. Your payment information
                is governed by Stripe&apos;s privacy policy and terms of service. We do not
                store your full card details.
              </p>

              <h3 className="font-display text-lg font-semibold text-cream mb-2">4.3 Refund Policy</h3>
              <p className="text-cream-dim leading-relaxed mb-3">
                Because our products are digital goods that grant immediate full access upon
                purchase, we generally do not offer refunds after a purchase has been made
                and access has been granted. However:
              </p>
              <ul className="space-y-2 text-cream-dim">
                <li>
                  <strong className="text-cream">7-day satisfaction guarantee:</strong> If you
                  have not accessed more than 25% of a product&apos;s content within 7 days of
                  purchase, you may request a full refund by emailing{" "}
                  <a href="mailto:support@sonoprep.com" className="text-teal-glow hover:underline">
                    support@sonoprep.com
                  </a>.
                </li>
                <li>
                  <strong className="text-cream">Technical failures:</strong> If a technical
                  issue on our side prevented you from accessing your purchased content, we
                  will issue a full refund or extend your access period.
                </li>
                <li>
                  <strong className="text-cream">Chargebacks:</strong> Initiating a chargeback
                  without first contacting us may result in account suspension.
                </li>
              </ul>
              <p className="mt-4 text-cream-dim leading-relaxed">
                To request a refund, email us at{" "}
                <a href="mailto:support@sonoprep.com" className="text-teal-glow hover:underline">
                  support@sonoprep.com
                </a>{" "}
                within the applicable window. Refunds, when approved, are issued to the
                original payment method and may take 5–10 business days to appear.
              </p>
              <p className="mt-3 text-cream-dim leading-relaxed">
                <strong className="text-cream">EU/UK consumers:</strong> If you are a consumer
                in the European Union or United Kingdom, you may have the right to withdraw
                from a purchase within 14 days under the Consumer Rights Directive or
                Consumer Contracts Regulations, respectively. However, by using digital
                content immediately upon purchase, you acknowledge that you lose this
                withdrawal right once access has begun, as permitted under applicable law.
                If you do not wish to lose this right, do not access the content before
                the 14-day withdrawal period expires. Contact us before accessing content
                if you wish to preserve your withdrawal right.
              </p>
            </section>

            <section aria-labelledby="terms-ip">
              <h2 id="terms-ip" className="font-display text-2xl font-bold text-cream mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-cream-dim leading-relaxed mb-3">
                All content on the Site — including flashcards, exam questions, physics
                pearls, study notes, text, graphics, and the underlying software — is
                owned by SonoPrep or our content contributors and is protected by copyright,
                trademark, and other intellectual property laws.
              </p>
              <p className="text-cream-dim leading-relaxed mb-3">
                Your purchase grants you a limited, personal, non-exclusive license to
                access and use the content for your individual exam preparation only.
                You may <strong className="text-cream">not</strong>:
              </p>
              <ul className="space-y-2 text-cream-dim">
                <li>Copy, reproduce, distribute, or publicly display any content.</li>
                <li>Screenshot, scrape, or extract content in bulk.</li>
                <li>Use content to create competing products or services.</li>
                <li>Remove or obscure any copyright or proprietary notices.</li>
              </ul>
            </section>

            <section aria-labelledby="terms-conduct">
              <h2 id="terms-conduct" className="font-display text-2xl font-bold text-cream mb-4">
                6. Prohibited Conduct
              </h2>
              <p className="text-cream-dim leading-relaxed mb-3">You agree not to:</p>
              <ul className="space-y-2 text-cream-dim">
                <li>Use the Service for any unlawful purpose.</li>
                <li>Attempt to gain unauthorized access to any part of the Service.</li>
                <li>Interfere with or disrupt the integrity or performance of the Service.</li>
                <li>Use automated tools, bots, or scrapers to access or extract content.</li>
                <li>Share your account login credentials with any third party.</li>
                <li>Impersonate another person or entity.</li>
                <li>Engage in any conduct that restricts or inhibits anyone&apos;s use of the Service.</li>
              </ul>
            </section>

            <section aria-labelledby="terms-accuracy">
              <h2 id="terms-accuracy" className="font-display text-2xl font-bold text-cream mb-4">
                7. Educational Content Disclaimer
              </h2>
              <p className="text-cream-dim leading-relaxed">
                SonoPrep content is created by RDMS-credentialed professionals and is
                intended for exam preparation purposes only. It does not constitute medical
                advice, clinical guidance, or an endorsement by ARDMS or any other
                credentialing organization. We make reasonable efforts to ensure accuracy
                but cannot guarantee that all content reflects the most current ARDMS
                examination blueprint or clinical standards. Always consult official ARDMS
                resources and qualified clinical supervisors for authoritative guidance.
              </p>
            </section>

            <section aria-labelledby="terms-trademarks">
              <h2 id="terms-trademarks" className="font-display text-2xl font-bold text-cream mb-4">
                8. Third-Party Trademarks &amp; Non-Affiliation
              </h2>
              <p className="text-cream-dim leading-relaxed mb-3">
                SonoPrep is an independent educational platform and is <strong className="text-cream">not affiliated with,
                endorsed by, accredited by, or sponsored by</strong> any credentialing organization, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-cream-dim text-sm mb-3">
                <li><strong className="text-cream">ARDMS</strong> (American Registry for Diagnostic Medical Sonography) — owner of the RDMS, RDCS, RVT, RMSKS, and SPI marks.</li>
                <li><strong className="text-cream">CCI</strong> (Cardiovascular Credentialing International) — owner of the RCS, RVS, and related marks.</li>
                <li><strong className="text-cream">ARRT</strong> (American Registry of Radiologic Technologists) — owner of the RT and related marks.</li>
              </ul>
              <p className="text-cream-dim leading-relaxed">
                All third-party trademarks, service marks, and credential names are the property of their respective
                owners. References to these organizations and credentials are made solely for nominative identification
                purposes to describe the examinations our materials are designed to help users prepare for.
                Use of these names does not imply any affiliation, sponsorship, or endorsement.
              </p>
            </section>

            <section aria-labelledby="terms-warranty">
              <h2 id="terms-warranty" className="font-display text-2xl font-bold text-cream mb-4">
                9. Disclaimer of Warranties
              </h2>
              <p className="text-cream-dim leading-relaxed">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES
                OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
                IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE
                UNINTERRUPTED, ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED. WE DO NOT
                GUARANTEE THAT USE OF OUR SERVICE WILL RESULT IN PASSING ANY EXAMINATION.
              </p>
            </section>

            <section aria-labelledby="terms-liability">
              <h2 id="terms-liability" className="font-display text-2xl font-bold text-cream mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-cream-dim leading-relaxed mb-3">
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, SONOPREP AND ITS
                OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF
                THE SERVICE.
              </p>
              <p className="text-cream-dim leading-relaxed">
                IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE
                AMOUNT YOU PAID TO US IN THE SIX (6) MONTHS PRECEDING THE CLAIM.
              </p>
              <p className="mt-3 text-cream-dim leading-relaxed text-sm">
                Some jurisdictions do not allow limitations on implied warranties or
                exclusion of consequential damages, so some of the above may not apply
                to you.
              </p>
            </section>

            <section aria-labelledby="terms-indemnification">
              <h2 id="terms-indemnification" className="font-display text-2xl font-bold text-cream mb-4">
                10. Indemnification
              </h2>
              <p className="text-cream-dim leading-relaxed">
                You agree to indemnify, defend, and hold harmless SonoPrep and its
                affiliates, officers, directors, and employees from any claims, damages,
                losses, liabilities, and expenses (including reasonable attorneys&apos; fees)
                arising from your use of the Service, your violation of these Terms, or
                your violation of any third-party rights.
              </p>
            </section>

            <section aria-labelledby="terms-governing">
              <h2 id="terms-governing" className="font-display text-2xl font-bold text-cream mb-4">
                11. Governing Law and Disputes
              </h2>
              <p className="text-cream-dim leading-relaxed mb-3">
                These Terms are governed by the laws of the State of Texas, United States,
                without regard to conflict of law principles.
              </p>
              <p className="text-cream-dim leading-relaxed mb-3">
                Any dispute arising from these Terms or your use of the Service shall
                first be submitted to informal negotiation by contacting us at
                support@sonoprep.com. If not resolved within 30 days, disputes shall be
                resolved by binding arbitration under the rules of the American Arbitration
                Association (AAA), conducted in English in Houston, Texas, except that
                either party may seek injunctive relief in a court of competent jurisdiction
                to prevent irreparable harm.
              </p>
              <p className="text-cream-dim leading-relaxed">
                <strong className="text-cream">Class action waiver:</strong> You agree to
                resolve disputes with us individually and not as part of a class, collective,
                or representative action.
              </p>
              <p className="mt-3 text-cream-dim leading-relaxed text-sm">
                If you are a consumer in the EU or UK, you may also be entitled to use
                the EU Online Dispute Resolution platform at{" "}
                <a href="https://ec.europa.eu/consumers/odr" className="text-teal-glow hover:underline" target="_blank" rel="noopener noreferrer">
                  ec.europa.eu/consumers/odr
                </a>.
              </p>
            </section>

            <section aria-labelledby="terms-modifications">
              <h2 id="terms-modifications" className="font-display text-2xl font-bold text-cream mb-4">
                12. Modifications to the Service and Terms
              </h2>
              <p className="text-cream-dim leading-relaxed">
                We reserve the right to modify the Service or these Terms at any time.
                For material changes, we will provide at least 14 days&apos; notice by email
                or by posting a notice on the Site. Your continued use of the Service after
                changes take effect constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section aria-labelledby="terms-termination">
              <h2 id="terms-termination" className="font-display text-2xl font-bold text-cream mb-4">
                13. Termination
              </h2>
              <p className="text-cream-dim leading-relaxed">
                Either party may terminate the relationship at any time. You may delete your
                account at any time by contacting us. We may suspend or terminate your
                access immediately for violation of these Terms. Upon termination, your
                right to use the Service ceases. Sections 5, 7, 8, 9, 10, and 11 survive
                termination.
              </p>
            </section>

            <section aria-labelledby="terms-contact" className="rounded border border-teal/20 bg-teal/5 p-6">
              <h2 id="terms-contact" className="font-display text-2xl font-bold text-cream mb-4">
                14. Contact
              </h2>
              <p className="text-cream-dim leading-relaxed">
                Questions about these Terms? Contact us:
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

          <div className="mt-12 flex gap-4">
            <Link href="/privacy" className="font-mono text-xs text-teal hover:text-teal-glow transition-colors">
              ← Privacy Policy
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
