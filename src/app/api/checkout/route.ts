import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  stripe,
  PRODUCT_PRICES,
  BUNDLE_INCLUDES,
  type ProductKey,
} from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/validations";
import {
  createRateLimiter,
  getClientIp,
  rateLimitResponse,
} from "@/lib/rate-limit";

/* ── Rate limiter: 10 checkout attempts per user per 15 minutes ── */
const checkoutLimiter = createRateLimiter("checkout", {
  maxRequests: 10,
  windowMs: 15 * 60 * 1000,
});

export async function POST(req: Request) {
  try {
    /* ── Auth check ─────────────────────────────────────────────── */
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* ── Rate limit (keyed on userId) ───────────────────────────── */
    const rl = checkoutLimiter.check(session.user.id);
    if (!rl.success) {
      return rateLimitResponse(rl);
    }

    /* ── Validate input ─────────────────────────────────────────── */
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const { productKey } = parsed.data;

    // Strict check: productKey must be a valid key in PRODUCT_PRICES
    const validKeys = Object.keys(PRODUCT_PRICES) as ProductKey[];
    if (!validKeys.includes(productKey as ProductKey)) {
      return NextResponse.json(
        { error: "Unknown product" },
        { status: 400 }
      );
    }

    const productInfo = PRODUCT_PRICES[productKey as ProductKey];
    if (!productInfo || !productInfo.priceId) {
      return NextResponse.json(
        { error: "Product not configured" },
        { status: 400 }
      );
    }

    /* ── Duplicate purchase detection ───────────────────────────── */
    // Check if user already has an active (non-expired, non-refunded) purchase
    const productsToCheck: ProductKey[] =
      productKey === "PREMIUM_BUNDLE"
        ? [...BUNDLE_INCLUDES]
        : [productKey as ProductKey];

    for (const pk of productsToCheck) {
      const existingPurchase = await prisma.purchase.findFirst({
        where: {
          userId: session.user.id,
          product: { type: pk },
          status: "COMPLETED",
          accessExpiresAt: { gt: new Date() },
        },
        select: { id: true },
      });

      if (existingPurchase) {
        return NextResponse.json(
          {
            error: `You already have active access to ${PRODUCT_PRICES[pk].name}. Check your dashboard.`,
          },
          { status: 409 }
        );
      }
    }

    /* ── Get or create Stripe customer ──────────────────────────── */
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true, email: true, name: true },
    });

    let customerId = user?.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user?.email ?? undefined,
        name: user?.name ?? undefined,
        metadata: { userId: session.user.id },
      });
      customerId = customer.id;
      await prisma.user.update({
        where: { id: session.user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    /* ── Create Checkout session ────────────────────────────────── */
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: productInfo.priceId, quantity: 1 }],
      success_url: `${appUrl}/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/products?canceled=true`,
      metadata: {
        userId: session.user.id,
        productKey,
        expectedAmountCents: String(productInfo.amount),
      },
    });

    /* ── Audit log ──────────────────────────────────────────────── */
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "checkout_started",
        details: { productKey, sessionId: checkoutSession.id },
        ipAddress: getClientIp(req),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
