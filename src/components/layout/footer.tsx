import Link from "next/link";
import { Mail } from "lucide-react";

const LINKS = {
  "Study Tools": [
    { href: "/demo", label: "Free Demo" },
    { href: "/products", label: "All Products" },
    { href: "/products#flashcards", label: "Flashcards" },
    { href: "/products#simulator", label: "Exam Simulator" },
    { href: "/products#pearls", label: "Physics Pearls" },
  ],
  "Learn": [
    { href: "/blog", label: "SPI Study Blog" },
    { href: "/blog/what-is-the-spi-exam", label: "What Is the SPI?" },
    { href: "/blog/doppler-physics-spi-guide", label: "Doppler Physics Guide" },
    { href: "/blog/spi-exam-domains-explained", label: "SPI Exam Domains" },
    { href: "/faq", label: "FAQ" },
  ],
  "Credentials": [
    { href: "/rdms", label: "RDMS Prep" },
    { href: "/rdcs", label: "RDCS Prep" },
    { href: "/rvt", label: "RVT Prep" },
    { href: "/rmsks", label: "RMSKS Prep" },
  ],
  "Company": [
    { href: "/about", label: "About SonoPrep" },
    { href: "/auth/signin", label: "Sign In" },
    { href: "/auth/signup", label: "Create Account" },
    { href: "mailto:support@sonoprep.com", label: "Contact Us", external: true },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-obsidian">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="font-display text-2xl font-bold text-cream">
              Sono<span className="text-teal">Prep</span>
            </Link>
            {/* cream-dim on obsidian passes WCAG AA at 7.32:1 */}
            <p className="mt-3 max-w-xs text-sm text-cream-dim leading-relaxed">
              ARDMS SPI exam preparation built by RDMS-credentialed sonographers. 
              200+ flashcards, 110-question simulator, 50 Physics Pearls. 
              Built around the exact ARDMS exam blueprint. Individual products from $9.
            </p>
            <a
              href="mailto:support@sonoprep.com"
              className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-teal hover:text-teal-glow transition-colors"
            >
              <Mail className="h-3 w-3" aria-hidden="true" />
              support@sonoprep.com
            </a>
          </div>

          {/* Nav columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <nav key={heading} aria-label={`${heading} links`}>
              {/* cream-dim at 80% opacity on obsidian: ~4.9:1 – passes AA */}
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-cream-dim/80">
                {heading}
              </p>
              <ul className="space-y-3">
                {links.map((l) => {
                  const isExternal = "external" in l && l.external;
                  return (
                    <li key={l.href}>
                      {isExternal ? (
                        <a
                          href={l.href}
                          className="font-mono text-xs text-cream-dim hover:text-cream transition-colors"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="font-mono text-xs text-cream-dim hover:text-cream transition-colors"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="sep-line my-10" />

        {/* Legal links row */}
        <nav aria-label="Legal" className="mb-6 flex flex-wrap gap-5">
          {[
            { href: "/privacy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms of Service" },
            { href: "/accessibility", label: "Accessibility" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-xs text-cream-dim/80 hover:text-cream transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* cream-dim/70 on obsidian: ~5.16:1 – passes AA */}
          <p className="font-mono text-xs text-cream-dim/70">
            © {new Date().getFullYear()} SonoPrep. All rights reserved.
          </p>
          <div className="flex gap-5">
            {[
              { href: "/llms.txt", label: "llms.txt" },
              { href: "/sitemap.xml", label: "Sitemap" },
              { href: "/robots.txt", label: "Robots" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-xs text-cream-dim/70 hover:text-cream-dim transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
