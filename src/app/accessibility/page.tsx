import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "SonoPrep's commitment to web accessibility and WCAG 2.1 AA conformance.",
  robots: { index: true, follow: true },
};

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-widest text-teal">Legal</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-cream">Accessibility Statement</h1>
            <p className="mt-4 text-sm text-cream-dim">
              Last reviewed: <time dateTime="2026-05-01">May 1, 2026</time>
            </p>
          </div>

          <div className="space-y-10 prose-sonoprep">

            <section aria-labelledby="a11y-commitment">
              <h2 id="a11y-commitment" className="font-display text-2xl font-bold text-cream mb-4">
                Our Commitment
              </h2>
              <p className="text-cream-dim leading-relaxed">
                SonoPrep is committed to ensuring that our website and study tools are
                accessible to all people, including those with disabilities. We aim to
                conform to the{" "}
                <a
                  href="https://www.w3.org/TR/WCAG21/"
                  className="text-teal-glow hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Web Content Accessibility Guidelines (WCAG) 2.1
                </a>{" "}
                at Level AA.
              </p>
            </section>

            <section aria-labelledby="a11y-measures">
              <h2 id="a11y-measures" className="font-display text-2xl font-bold text-cream mb-4">
                Measures We Have Taken
              </h2>
              <ul className="space-y-2 text-cream-dim">
                <li>Skip-to-main-content link for keyboard and screen reader users.</li>
                <li>All form inputs have programmatically associated labels.</li>
                <li>All interactive elements are keyboard-accessible with visible focus indicators.</li>
                <li>Color contrast ratios meet or exceed WCAG 2.1 AA minimums (4.5:1 for normal text, 3:1 for large text).</li>
                <li>All non-text content (images, icons) includes alternative text or is marked as decorative.</li>
                <li>Accordion and expandable components use <code>aria-expanded</code>, <code>aria-controls</code>, and associated IDs.</li>
                <li>Navigation landmarks (<code>nav</code>, <code>main</code>, <code>footer</code>) are properly labeled.</li>
                <li>Animations and motion effects respect the <code>prefers-reduced-motion</code> media query.</li>
                <li>The page language is declared (<code>lang=&quot;en&quot;</code>).</li>
                <li>Interactive icons without visible text labels include <code>aria-label</code> attributes.</li>
              </ul>
            </section>

            <section aria-labelledby="a11y-status">
              <h2 id="a11y-status" className="font-display text-2xl font-bold text-cream mb-4">
                Conformance Status
              </h2>
              <p className="text-cream-dim leading-relaxed">
                We believe SonoPrep is <strong className="text-cream">partially conformant</strong> with
                WCAG 2.1 Level AA. &quot;Partially conformant&quot; means that some parts of the content do
                not fully conform to the accessibility standard. We are actively working to address
                known gaps, and this statement will be updated as improvements are made.
              </p>
            </section>

            <section aria-labelledby="a11y-known">
              <h2 id="a11y-known" className="font-display text-2xl font-bold text-cream mb-4">
                Known Limitations
              </h2>
              <p className="text-cream-dim leading-relaxed mb-3">
                We are aware of the following areas that are still being improved:
              </p>
              <ul className="space-y-2 text-cream-dim">
                <li>Complex interactive study tools (flashcard viewer, exam simulator) may have limited screen reader compatibility in some browsers; we are actively testing and improving these.</li>
                <li>Some animated data visualizations do not have full text alternatives; we plan to add these in an upcoming release.</li>
              </ul>
            </section>

            <section aria-labelledby="a11y-feedback" className="rounded border border-teal/20 bg-teal/5 p-6">
              <h2 id="a11y-feedback" className="font-display text-2xl font-bold text-cream mb-4">
                Feedback and Contact
              </h2>
              <p className="text-cream-dim leading-relaxed mb-3">
                We welcome feedback about the accessibility of SonoPrep. If you experience
                any barriers to access or have suggestions for improvement, please contact us:
              </p>
              <address className="not-italic text-cream-dim">
                <strong className="text-cream">Email:</strong>{" "}
                <a href="mailto:support@sonoprep.com" className="text-teal-glow hover:underline">
                  support@sonoprep.com
                </a>
                <br />
                <strong className="text-cream">Subject line:</strong> Accessibility Feedback
              </address>
              <p className="mt-3 text-cream-dim leading-relaxed">
                We aim to respond to accessibility feedback within 5 business days.
              </p>
            </section>

            <section aria-labelledby="a11y-enforcement">
              <h2 id="a11y-enforcement" className="font-display text-2xl font-bold text-cream mb-4">
                Enforcement Procedure
              </h2>
              <p className="text-cream-dim leading-relaxed">
                If you are not satisfied with our response, you may contact the relevant
                enforcement body in your jurisdiction. In the United States, complaints
                regarding web accessibility for businesses serving the public may be filed
                with the U.S. Department of Justice under the Americans with Disabilities
                Act (ADA). In the UK, you may contact the Equality and Human Rights Commission
                (EHRC). In the EU, contact your national enforcement authority.
              </p>
            </section>

          </div>

          <div className="mt-12 flex gap-4">
            <Link href="/privacy" className="font-mono text-xs text-teal hover:text-teal-glow transition-colors">
              ← Privacy Policy
            </Link>
            <Link href="/terms" className="font-mono text-xs text-teal hover:text-teal-glow transition-colors">
              ← Terms of Service
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
