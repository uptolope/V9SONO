import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { questionBanks, getProductBySlug } from "@/lib/products";
import { InternalLinks } from "@/components/InternalLinks";

/* ── Static params — generate all topic pages at build time ────── */
export function generateStaticParams() {
  return questionBanks.map((p) => ({ slug: p.slug }));
}

/* ── Dynamic metadata for each topic page ──────────────────────── */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
    },
  };
}

/* ── SEO landing page for each topic ───────────────────────────── */
export default function MarketingPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <main className="min-h-screen pt-28 px-6 pb-24">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 meta text-[10px] text-[#4a453f] hover:text-[#c85b3a] mb-10 transition-colors"
        >
          ← BACK TO HOME
        </Link>

        {/* Topic header */}
        <div className="mb-10">
          <span className="meta text-[9px] text-[#c85b3a] mb-3 block">
            {product.comingSoon ? "COMING SOON" : "LICENSED QUESTION BANK"}
          </span>
          <h1 className="display-serif text-3xl sm:text-4xl font-semibold text-white mb-4">
            {product.name}
          </h1>
          <p className="body-readable text-[#c2bab0] text-base leading-relaxed max-w-2xl">
            {product.longDescription}
          </p>
        </div>

        {/* What's included */}
        <div className="depth-border corner-arch p-6 sm:p-8 mb-8">
          <p className="meta text-[9px] text-[#4a453f] mb-4">WHAT YOU GET</p>
          <ul className="space-y-3">
            {product.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 text-sm text-[#c2bab0]"
              >
                <span className="text-[#c85b3a] text-xs shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <div className="flex items-baseline gap-3 mt-6 pt-5 border-t border-white/5">
            <span className="text-3xl font-bold text-[#c85b3a]">
              ${product.price}
            </span>
            <span className="meta text-[9px] text-[#4a453f]">
              / 90-day access
            </span>
          </div>
        </div>

        {/* CTA block */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Link
            href={`/products/${product.slug}`}
            className="btn-industrial px-6 py-4 text-[11px] text-center"
          >
            {product.comingSoon ? "JOIN WAITLIST →" : "VIEW FULL QUESTION BANK →"}
          </Link>
          {!product.comingSoon && (
            <Link
              href={`/practice/${product.slug}`}
              className="btn-industrial-outline px-6 py-4 text-[10px] text-center"
            >
              TRY FREE PREVIEW
            </Link>
          )}
        </div>

        <p className="meta text-[9px] text-[#3a3530]">
          {product.comingSoon
            ? "Join the waitlist — we'll notify you at launch"
            : "Licensed content · 14-day full refund · No subscription"}
        </p>

        {/* Cross-links */}
        <InternalLinks current={`/${product.slug}`} />
      </div>
    </main>
  );
}
