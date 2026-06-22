import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isStaleSession } from "@/lib/session-guard";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ── Product key → Stripe price ID mapping ────────────────────────
// Keys match the PRODUCTS array in product-card.tsx
const PRODUCT_PRICE_MAP: Record<string, string | undefined> = {
  SPI_FLASHCARDS:  process.env.STRIPE_PRICE_FLASHCARDS,
  EXAM_SIMULATOR:  process.env.STRIPE_PRICE_EXAM_SIMULATOR,
  PHYSICS_PEARLS:  process.env.STRIPE_PRICE_PHYSICS_PEARLS,
  STUDY_NOTES:     process.env.STRIPE_PRICE_STUDY_NOTES,
  PREMIUM_BUNDLE:  process.env.STRIPE_PRICE_PREMIUM_BUNDLE,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support both { productKey } (from billing page) and { priceId } (direct)
    let priceId: string | undefined = body.priceId;

    if (!priceId && body.productKey) {
      priceId = PRODUCT_PRICE_MAP[body.productKey];
      if (!priceId) {
        return NextResponse.json(
          { error: "Invalid product key" },
          { status: 400 }
        );
      }
    }

    if (!priceId) {
      return NextResponse.json(
        { error: "Missing priceId or productKey" },
        { status: 400 }
      );
    }

    // Get user session (if logged in)
    const session = await getServerSession(authOptions);

    // Concurrent session guard
    if (await isStaleSession(session)) {
      return NextResponse.json(
        { error: "Session expired. Please sign in again.", code: "SESSION_EXPIRED" },
        { status: 401 }
      );
    }

    const customerEmail = session?.user?.email || undefined;

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url:
        body.successUrl ||
        `${req.headers.get("origin")}/dashboard?success=true`,
      cancel_url:
        body.cancelUrl ||
        `${req.headers.get("origin")}/products?canceled=true`,
      customer_email: customerEmail,
    });

    return NextResponse.json({
      sessionId: stripeSession.id,
      url: stripeSession.url,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
