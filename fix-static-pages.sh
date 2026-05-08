#!/bin/bash

# About page
cat > src/app/about/page.tsx << 'EOF'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-4">About SonoPrep</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <p className="body-readable text-[#b8b0a4]">SonoPrep was created by sonographers who passed the SPI exam. We provide flashcards, exam simulator, physics pearls, and study notes to help you succeed.</p>
      </div>
    </div>
  );
}
EOF

# Accessibility page
cat > src/app/accessibility/page.tsx << 'EOF'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function AccessibilityPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-4">Accessibility Statement</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <p className="body-readable text-[#b8b0a4]">SonoPrep follows WCAG 2.1 AA guidelines. The site is keyboard navigable and screen‑reader friendly. If you have any accessibility issues, please contact support.</p>
      </div>
    </div>
  );
}
EOF

# Privacy page
cat > src/app/privacy/page.tsx << 'EOF'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-4">Privacy Policy</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <p className="body-readable text-[#b8b0a4]">We collect only necessary data to provide our SPI exam prep service. We do not sell your personal information. For details, contact support.</p>
      </div>
    </div>
  );
}
EOF

# Terms page
cat > src/app/terms/page.tsx << 'EOF'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-4">Terms of Service</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <p className="body-readable text-[#b8b0a4]">Use of SonoPrep constitutes agreement to these terms. All products are for individual use only and have a 90‑day access period.</p>
      </div>
    </div>
  );
}
EOF

# FAQ page
cat > src/app/faq/page.tsx << 'EOF'
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
EOF

# RDCS page
cat > src/app/rdcs/page.tsx << 'EOF'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function RDCSPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-4">RDCS Credential</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <p className="body-readable text-[#b8b0a4]">Registered Diagnostic Cardiac Sonographer – pass SPI then specialize in adult, pediatric, or fetal echocardiography.</p>
      </div>
    </div>
  );
}
EOF

# RDMS page
cat > src/app/rdms/page.tsx << 'EOF'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function RDMSPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-4">RDMS Credential</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <p className="body-readable text-[#b8b0a4]">Registered Diagnostic Medical Sonographer – abdomen, OB/GYN, or breast sonography after passing SPI.</p>
      </div>
    </div>
  );
}
EOF

# RMSKS page
cat > src/app/rmsks/page.tsx << 'EOF'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function RMSKSPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-4">RMSKS Credential</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <p className="body-readable text-[#b8b0a4]">Registered Musculoskeletal Sonographer – advanced specialty after SPI.</p>
      </div>
    </div>
  );
}
EOF

# RVT page
cat > src/app/rvt/page.tsx << 'EOF'
import Link from "next/link";
export const dynamic = 'force-dynamic';
export default function RVTPage() {
  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="meta text-[11px] text-[#6b6359] hover:text-[#c85b3a] mb-8 inline-block">← BACK TO HOME</Link>
        <h1 className="display-display text-5xl text-[#f0ebe4] mb-4">RVT Credential</h1>
        <div className="w-12 h-px bg-[#c85b3a] mb-8" />
        <p className="body-readable text-[#b8b0a4]">Registered Vascular Technologist – vascular ultrasound specialty after passing SPI.</p>
      </div>
    </div>
  );
}
EOF

echo "✅ All static pages rewritten as server components (no useSession)."
