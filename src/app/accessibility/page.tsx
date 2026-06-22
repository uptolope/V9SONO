import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility Statement | SonoPrep",
  description:
    "SonoPrep's commitment to digital accessibility and WCAG 2.1 AA compliance.",
  alternates: {
    canonical: "https://sonoprep.com/accessibility",
  },
};

const LAST_UPDATED = "June 22, 2026";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#8a8279] hover:text-[#c85b3a] mb-8 inline-block">
          ← BACK TO HOME
        </Link>

        <div className="mb-12">
          <span className="meta text-[#c85b3a] text-sm">ACCESSIBILITY</span>
          <h1 className="display-display text-4xl sm:text-5xl text-white mt-4 mb-3">Accessibility Statement</h1>
          <p className="text-[#8a8279] text-sm meta">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-10 text-[#c2bab0] body-readable leading-relaxed">

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">Our Commitment</h2>
            <p>
              SonoPrep is committed to ensuring digital accessibility for all users, including people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">Standards</h2>
            <p className="mb-3">
              We aim to conform to the <strong className="text-white">Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>. These guidelines explain how to make web content more accessible to people with a wide array of disabilities.
            </p>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">Measures We Take</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Semantic HTML:</strong> We use proper heading hierarchy, landmark regions (nav, main, footer), and semantic elements throughout the site.</li>
              <li><strong className="text-white">Keyboard Navigation:</strong> All interactive elements (buttons, links, form fields, flashcard flips, exam navigation) are fully operable via keyboard. A skip-to-content link is provided on every page.</li>
              <li><strong className="text-white">Screen Reader Support:</strong> We use ARIA labels, roles, and live regions where needed to ensure screen readers can convey content and state changes effectively.</li>
              <li><strong className="text-white">Color Contrast:</strong> Text and interactive elements meet WCAG 2.1 AA minimum contrast ratios (4.5:1 for normal text, 3:1 for large text).</li>
              <li><strong className="text-white">Focus Indicators:</strong> Visible focus outlines are provided for all interactive elements to support keyboard-only users.</li>
              <li><strong className="text-white">Form Labels:</strong> All form inputs have associated labels. Error messages are announced to screen readers.</li>
              <li><strong className="text-white">Responsive Design:</strong> The site is fully responsive and works with zoom levels up to 200% without loss of content or functionality.</li>
              <li><strong className="text-white">Motion:</strong> Animations respect the <code className="text-[#c85b3a]">prefers-reduced-motion</code> system preference where applicable.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">Known Limitations</h2>
            <p className="mb-3">
              While we strive for full compliance, some areas may have limitations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Third-party content (Stripe checkout, Google Analytics) is governed by their own accessibility practices.</li>
              <li>Some complex interactive components (exam simulator timer, flashcard flip animations) may have reduced functionality with certain assistive technologies.</li>
            </ul>
          </section>

          <section>
            <h2 className="display-serif text-xl font-semibold text-white mb-3">Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of SonoPrep. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Email: <a href="mailto:support@sonoprep.com" className="text-[#c85b3a] hover:underline">support@sonoprep.com</a></li>
              <li>Subject line: Accessibility Feedback</li>
            </ul>
            <p className="mt-3">
              We aim to respond to accessibility feedback within 5 business days and to resolve issues as quickly as possible.
            </p>
          </section>

        </div>

        <div className="mt-16 flex gap-6 text-sm text-[#8a8279] meta border-t border-white/8 pt-8">
          <Link href="/terms" className="hover:text-[#c85b3a]">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-[#c85b3a]">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
