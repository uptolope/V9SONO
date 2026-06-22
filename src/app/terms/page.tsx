import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | SonoPrep",
  description:
    "SonoPrep's terms of service: license terms, refund policy, acceptable use, and limitations of liability.",
  keywords: ["SonoPrep terms of service", "SonoPrep refund policy"],
  alternates: {
    canonical: "https://sonoprep.com/terms",
  },
};

const LAST_UPDATED = "June 22, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#8a8279] hover:text-[#c85b3a] mb-8 inline-block">
          ← BACK TO HOME
        </Link>

        <div className="mb-12">
          <span className="meta text-[#c85b3a] text-sm">LEGAL</span>
          <h1 className="display-display text-4xl sm:text-5xl text-white mt-4 mb-3">Terms of Service</h1>
          <p className="text-[#8a8279] text-sm meta">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-10 text-[#c2bab0] body-readable leading-relaxed">

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">1. Agreement</h2>
            <p>
              By creating an account or purchasing a product on sonoprep.com (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, do not use the Service. These Terms apply to all users, including free demo users and paying customers. By checking the &quot;I agree to the Terms of Service&quot; box during registration, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">2. License</h2>
            <p className="mb-3">
              When you purchase a SonoPrep product, you receive a limited, non-exclusive, non-transferable license to access the purchased materials for the duration of your access period (60 days).
            </p>
            <p>You may not:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Share your account credentials with others</li>
              <li>Screenshot, copy, download, or redistribute any exam questions, flashcards, or physics pearls</li>
              <li>Use the content to build competing products or services</li>
              <li>Use automated tools (bots, scrapers) to access the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">3. Pricing and Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All prices are in US dollars and include applicable taxes where required.</li>
              <li>Payment is processed by Stripe. We do not store your full card details.</li>
              <li>Access is granted immediately upon successful payment.</li>
              <li>Prices are subject to change. Price changes do not affect existing purchases.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">4. Refund Policy</h2>
            <p>
              We offer a <strong className="text-white">14-day money-back guarantee</strong> on all purchases. To request a refund, email{" "}
              <a href="mailto:support@sonoprep.com" className="text-[#c85b3a] hover:underline">support@sonoprep.com</a>{" "}
              within 14 days of your purchase date. Refunds are processed within 5–10 business days to your original payment method. Refund requests made after 14 days will not be honored.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">5. Access Period</h2>
            <p>
              Access begins on the date of purchase, not on the date you first log in. All products include a 60-day access window. Access expires automatically at the end of the period and is not renewed automatically. You may repurchase any product after expiration.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">6. Exam Attempts</h2>
            <p>
              Products that include the Exam Simulator provide 3 exam attempts within the access window. Once an attempt is started, the timer cannot be paused or reset. Unused attempts do not carry over after the access period ends and are not refundable. You may repurchase the Exam Simulator for additional attempts.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">7. No Guarantee of Exam Results</h2>
            <p>
              SonoPrep prepares you for the ARDMS SPI exam based on the published content outline, but we cannot guarantee that you will pass the exam. Results depend on individual effort, prior knowledge, and many factors outside our control. We do not claim any specific pass rate.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">8. Intellectual Property</h2>
            <p>
              All content on SonoPrep — including exam questions, flashcards, physics pearls, study notes, blog articles, UI design, and the SonoPrep name and logo — is owned by SonoPrep and protected by copyright. Unauthorized reproduction or distribution is prohibited and may result in legal action.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">9. DMCA &amp; Copyright Infringement</h2>
            <p className="mb-3">
              SonoPrep respects the intellectual property rights of others. If you believe that content on SonoPrep infringes your copyright, you may submit a DMCA takedown notice to our designated agent:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li><strong className="text-white">Email:</strong>{" "}<a href="mailto:dmca@sonoprep.com" className="text-[#c85b3a] hover:underline">dmca@sonoprep.com</a></li>
              <li><strong className="text-white">Subject line:</strong> DMCA Takedown Notice</li>
            </ul>
            <p className="mb-3">Your notice must include:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Identification of the copyrighted work you claim is infringed.</li>
              <li>Identification of the material you claim is infringing and its location on the Service.</li>
              <li>Your contact information (name, address, email, phone number).</li>
              <li>A statement that you have a good-faith belief the use is not authorized by the copyright owner.</li>
              <li>A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on behalf of the owner.</li>
              <li>Your physical or electronic signature.</li>
            </ol>
            <p className="mt-3">
              Upon receipt of a valid DMCA notice, we will promptly remove or disable access to the allegedly infringing material and notify the user who posted it. Counter-notifications may be submitted following the procedures outlined in 17 U.S.C. § 512(g).
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">10. Account Termination</h2>
            <p>
              We reserve the right to terminate or suspend any account that violates these Terms, including accounts that share credentials, scrape content, or engage in fraudulent activity. Terminated accounts for violations are not eligible for refunds.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">11. Limitation of Liability</h2>
            <p className="mb-3">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SONOPREP AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF SONOPREP HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE TOTAL AMOUNT YOU HAVE PAID TO SONOPREP IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">12. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. SONOPREP DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">13. Binding Arbitration</h2>
            <p className="mb-3">
              Any dispute, controversy, or claim arising out of or relating to these Terms or the Service, including the formation, interpretation, breach, or termination thereof, shall be settled by binding arbitration administered by the American Arbitration Association (&quot;AAA&quot;) under its Consumer Arbitration Rules.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The arbitration shall take place in Houston, Texas, or at another mutually agreed location.</li>
              <li>The arbitrator&apos;s decision shall be final and binding and may be entered as a judgment in any court of competent jurisdiction.</li>
              <li>Each party shall bear its own costs and attorney&apos;s fees, unless the arbitrator determines otherwise.</li>
              <li>For claims under $10,000, the arbitration may be conducted entirely online or by phone at your election.</li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">Opt-Out:</strong> You may opt out of this arbitration provision by sending written notice to <a href="mailto:legal@sonoprep.com" className="text-[#c85b3a] hover:underline">legal@sonoprep.com</a> within 30 days of creating your account. If you opt out, disputes will be resolved in the state or federal courts located in Harris County, Texas.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">14. Class Action Waiver</h2>
            <p>
              YOU AND SONOPREP AGREE THAT EACH PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING. Unless both you and SonoPrep agree otherwise in writing, the arbitrator may not consolidate more than one person&apos;s claims and may not otherwise preside over any form of a representative or class proceeding.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">15. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict-of-law principles. To the extent that any lawsuit or court proceeding is permitted under these Terms, you and SonoPrep agree to submit to the exclusive personal jurisdiction of the state and federal courts located in Harris County, Texas.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">16. AI-Assisted Content Disclosure</h2>
            <p>
              SonoPrep may use artificial intelligence tools to assist in generating study explanations, flashcard rationales, and analytics summaries. All AI-generated content is reviewed and curated by licensed sonography professionals before publication. AI is not used to make automated decisions about your account, purchases, or exam scoring. Your exam answers are graded against a fixed answer key — not by AI.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">17. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. When we make material changes, we will notify you by email or by posting a prominent notice on the Service. Continued use of the Service after changes are posted constitutes acceptance. We will update the &quot;Last updated&quot; date when changes are made.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">18. Severability</h2>
            <p>
              If any provision of these Terms is held to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the remaining provisions will continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">19. Contact</h2>
            <p>
              Questions about these Terms? Email{" "}
              <a href="mailto:support@sonoprep.com" className="text-[#c85b3a] hover:underline">support@sonoprep.com</a>.
            </p>
          </section>
        </div>

        <div className="mt-16 flex gap-6 text-sm text-[#8a8279] meta border-t border-white/8 pt-8">
          <Link href="/privacy" className="hover:text-[#c85b3a]">Privacy Policy</Link>
          <Link href="/accessibility" className="hover:text-[#c85b3a]">Accessibility</Link>
        </div>
      </div>
    </div>
  );
}
