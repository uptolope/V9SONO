import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <div className="mb-8">
          <h1 className="display-display text-5xl sm:text-6xl text-[#f0ebe4] mb-4">Accessibility Statement</h1>
          <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        </div>
        <div className="space-y-6">
          <p className="body-readable text-[#b8b0a4] leading-relaxed">SonoPrep is committed to making our platform accessible to all sonography students, including those with disabilities. We follow WCAG 2.1 AA guidelines.</p>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-6 mb-3">Accessibility features</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#b8b0a4]">
            <li>Keyboard navigable interface</li>
            <li>Screen reader compatible semantic HTML</li>
            <li>Sufficient color contrast ratios</li>
            <li>Resizable text without loss of functionality</li>
            <li>ARIA labels on interactive elements</li>
          </ul>
          <h2 className="display-serif text-2xl font-semibold text-[#f0ebe4] mt-6 mb-3">Feedback</h2>
          <p className="body-readable text-[#b8b0a4] leading-relaxed">If you experience any accessibility barriers, please contact us.</p>
          <div className="bg-[#c85b3a]/10 p-6 border-l-[3px] border-[#c85b3a]">
            <p className="body-readable text-[#f0ebe4] text-sm">We continuously improve accessibility based on user feedback.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
