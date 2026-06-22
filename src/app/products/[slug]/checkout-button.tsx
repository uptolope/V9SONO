"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Map product slugs → Stripe env var keys
// These correspond to STRIPE_PRICE_* env vars set in Vercel
const SLUG_TO_PRODUCT_KEY: Record<string, string> = {
  "ultrasound-physics": "PHYSICS_QB",
  "abdominal-ultrasound": "ABDOMEN_QB",
  "vascular-ultrasound": "VASCULAR_QB",
};

export function ProductCheckoutButton({
  slug,
  price,
}: {
  slug: string;
  price: number;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    // If not logged in, redirect to sign in with return URL
    if (!session?.user) {
      router.push(`/auth/signin?callbackUrl=/products/${slug}`);
      return;
    }

    setLoading(true);
    try {
      const productKey = SLUG_TO_PRODUCT_KEY[slug];
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productKey,
          successUrl: `${window.location.origin}/dashboard?success=true&product=${slug}`,
          cancelUrl: `${window.location.origin}/products/${slug}?canceled=true`,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setLoading(false);
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="btn-industrial w-full py-4 text-[11px] mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "REDIRECTING TO CHECKOUT…" : `GET ACCESS — $${price} →`}
    </button>
  );
}
