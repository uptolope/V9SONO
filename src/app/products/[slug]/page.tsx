import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { questionBanks, getProductBySlug } from "@/lib/products";
import { ProductCheckoutButton } from "./checkout-button";
import { WaitlistForm } from "./waitlist-form";

/* ── Static generation for all product pages ───────────────────── */
export function generateStaticParams() {
  return questionBanks.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — $${product.price} | SonoPrep`,
    description: product.description,
  };
}

/* ── Product detail page (purchase page) ───────────────────────── */
export default function ProductDetailPage({
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
          href="/products"
          className="inline-flex items-center gap-2 meta text-[10px] text-[#4a453f] hover:text-[#c85b3a] mb-10 transition-colors"
        >
          ← ALL PRODUCTS
        </Link>

        {/* Coming Soon badge */}
        {product.comingSoon && (
          <div className="mb-6 inline-block px-3 py-1.5 border border-[#c85b3a]/30 bg-[#c85b3a]/5 rounded">
            <span className="meta text-[9px] text-[#c85b3a]">COMING SOON</span>
          </div>
        )}

        {/* Product header */}
        <div className="mb-10">
          <span className="meta text-[9px] text-[#c85b3a] mb-3 block">
            QUESTION BANK · {product.questionCount} QUESTIONS
          </span>
          <h1 className="display-serif text-3xl sm:text-4xl font-semibold text-white mb-4">
            {product.name}
          </h1>
          <p className="body-readable text-[#c2bab0] text-base leading-relaxed">
            {product.longDescription}
          </p>
        </div>

        {/* Purchase card or waitlist */}
        <div className="depth-border corner-arch p-8 sm:p-10 mb-8 relative border-[#c85b3a]/20 bg-[#c85b3a]/[0.02]">
          {product.comingSoon ? (
            /* ── Coming Soon — Waitlist ──────────────────────────── */
            <div className="text-center py-4">
              <p className="meta text-[9px] text-[#4a453f] mb-4">
                WE&apos;RE BUILDING THIS
              </p>
              <h2 className="display-serif text-xl font-semibold text-white mb-3">
                Be the first to know when it launches
              </h2>
              <p className="body-readable text-[#8a8279] text-sm mb-6 max-w-md mx-auto">
                Join the waitlist and we&apos;ll notify you as soon as the{" "}
                {product.shortName} question bank is ready. No spam — just
                the launch announcement.
              </p>
              <div className="flex items-baseline justify-center gap-3 mb-6">
                <span className="text-3xl font-bold text-[#c85b3a]/50">
                  ${product.price}
                </span>
                <span className="meta text-[9px] text-[#3a3530]">
                  / estimated price
                </span>
              </div>
              <WaitlistForm productSlug={product.slug} productName={product.shortName} />
            </div>
          ) : (
            /* ── Live product — Purchase ─────────────────────────── */
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="meta text-[9px] text-[#4a453f] mb-4">
                  WHAT&apos;S INCLUDED
                </p>
                <ul className="space-y-3 mb-6">
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
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-[#c85b3a]">
                    ${product.price}
                  </span>
                  <span className="meta text-[9px] text-[#3a3530]">
                    / 90-day access
                  </span>
                </div>

                {/* Risk reversal */}
                <div className="mb-6 p-4 border border-white/5 bg-[#f0ebe4]/[0.01] rounded">
                  <p className="meta text-[9px] text-[#4a453f] mb-1">
                    14-DAY REFUND POLICY
                  </p>
                  <p className="text-xs text-[#8a8279] leading-relaxed">
                    If you go through this and still don&apos;t feel prepared, you
                    get your money back. No questions asked.
                  </p>
                </div>

                {/* Stripe checkout button */}
                <ProductCheckoutButton slug={product.slug} price={product.price} />

                <p className="meta text-[9px] text-[#3a3530] text-center">
                  One payment · instant access · no subscription
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Preview CTA — only for live products */}
        {!product.comingSoon && (
          <div className="depth-border corner-arch p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="display-serif text-base font-semibold text-white mb-1">
                Not sure yet?
              </p>
              <p className="text-sm text-[#8a8279]">
                Try a few free questions before purchasing.
              </p>
            </div>
            <Link
              href={`/practice/${product.slug}`}
              className="btn-industrial-outline px-6 py-3 text-[10px] shrink-0"
            >
              START FREE PREVIEW →
            </Link>
          </div>
        )}

        {/* For coming soon, show link to live physics product */}
        {product.comingSoon && (
          <div className="depth-border corner-arch p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="display-serif text-base font-semibold text-white mb-1">
                Start studying now
              </p>
              <p className="text-sm text-[#8a8279]">
                Our SPI Physics Question Bank is live with 278 questions.
              </p>
            </div>
            <Link
              href="/products/ultrasound-physics"
              className="btn-industrial px-6 py-3 text-[10px] shrink-0"
            >
              VIEW PHYSICS QB →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
