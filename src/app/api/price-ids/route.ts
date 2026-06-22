import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * GET /api/price-ids
 * Returns Stripe price IDs for client-side checkout.
 * Requires authentication — prevents scraping of price IDs.
 *
 * NOTE: Stripe price IDs are not secret (they're sent to checkout.js),
 * but gating behind auth prevents unnecessary exposure.
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const priceIds = {
    flashcards: process.env.STRIPE_PRICE_FLASHCARDS,
    simulator: process.env.STRIPE_PRICE_EXAM_SIMULATOR,
    pearls: process.env.STRIPE_PRICE_PHYSICS_PEARLS,
    notes: process.env.STRIPE_PRICE_STUDY_NOTES,
    bundle: process.env.STRIPE_PRICE_PREMIUM_BUNDLE,
  };
  return NextResponse.json(priceIds);
}
