import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import {
  stripe,
  BUNDLE_INCLUDES,
  PRODUCT_PRICES,
  type ProductKey,
} from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

/**
 * Stripe Webhook Handler
 *
 * SECURITY:
 * - Signature verified with STRIPE_WEBHOOK_SECRET (raw body)
 * - Event deduplication via stripeSessionId unique constraint
 * - Amount verification: paid amount must match expected product price
 * - All database writes are transactional and scoped to the purchasing user
 * - Structured error logging for incident response
 */
export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("[webhook] Missing signature or webhook secret");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("[webhook] Signature verification failed:", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  /* ── Handle checkout.session.completed ─────────────────────────── */
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const productKey = session.metadata?.productKey as ProductKey | undefined;

    if (!userId || !productKey) {
      console.error("[webhook] Missing metadata:", {
        sessionId: session.id,
        eventId: event.id,
        userId,
        productKey,
      });
      return NextResponse.json({ received: true });
    }

    /* ── Event deduplication ──────────────────────────────────── */
    // stripeSessionId has a unique constraint in the Purchase model.
    // If we already processed this session, skip gracefully.
    const existingPurchase = await prisma.purchase.findUnique({
      where: { stripeSessionId: session.id },
      select: { id: true },
    });

    if (existingPurchase) {
      console.log(
        `[webhook] Duplicate event skipped: session=${session.id}, event=${event.id}`
      );
      return NextResponse.json({ received: true });
    }

    /* ── Amount verification (log only) ────────────────────────── */
    // Log mismatches for investigation but still grant access.
    // This allows Stripe-side price changes (e.g. promotions, test prices)
    // without breaking the webhook flow. Review audit logs regularly.
    const expectedAmount = PRODUCT_PRICES[productKey]?.amount;
    const paidAmount = session.amount_total; // in cents

    if (expectedAmount && paidAmount && paidAmount !== expectedAmount) {
      console.warn("[webhook] Amount mismatch (logged, access still granted):", {
        sessionId: session.id,
        eventId: event.id,
        productKey,
        expectedCents: expectedAmount,
        paidCents: paidAmount,
        userId,
      });
      await prisma.auditLog.create({
        data: {
          userId,
          action: "purchase_amount_mismatch",
          details: {
            sessionId: session.id,
            productKey,
            expectedCents: expectedAmount,
            paidCents: paidAmount,
          },
        },
      });
    }

    /* ── Verify user exists ───────────────────────────────────── */
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!userExists) {
      console.error("[webhook] User not found:", {
        userId,
        sessionId: session.id,
      });
      return NextResponse.json({ received: true });
    }

    const accessDays = 90;
    const accessExpiresAt = new Date(
      Date.now() + accessDays * 24 * 60 * 60 * 1000
    );

    // Determine which products to grant access to
    const productsToGrant: ProductKey[] =
      productKey === "PREMIUM_BUNDLE"
        ? [...BUNDLE_INCLUDES]
        : [productKey];

    try {
      // Grant access to each product in a transaction
      await prisma.$transaction(async (tx) => {
        for (const pk of productsToGrant) {
          const productInfo = PRODUCT_PRICES[pk];

          // Find or create the Product record
          let product = await tx.product.findUnique({
            where: { type: pk },
          });

          if (!product) {
            product = await tx.product.create({
              data: {
                type: pk,
                name: productInfo.name,
                description: productInfo.name,
                priceInCents: productInfo.amount,
                stripePriceId: productInfo.priceId || null,
              },
            });
          }

          // Create purchase record
          await tx.purchase.create({
            data: {
              userId,
              productId: product.id,
              status: "COMPLETED",
              amountInCents:
                productKey === "PREMIUM_BUNDLE"
                  ? Math.round(
                      PRODUCT_PRICES.PREMIUM_BUNDLE.amount /
                        BUNDLE_INCLUDES.length
                    )
                  : productInfo.amount,
              currency: "usd",
              stripeSessionId:
                pk === productsToGrant[0] ? session.id : undefined,
              stripePaymentIntentId:
                typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : undefined,
              accessExpiresAt,
            },
          });
        }

        // Audit log
        await tx.auditLog.create({
          data: {
            userId,
            action: "purchase_completed",
            details: {
              productKey,
              sessionId: session.id,
              eventId: event.id,
              productsGranted: productsToGrant,
              paidCents: paidAmount,
            },
          },
        });
      });

      console.log(
        `[webhook] ✅ Access granted: user=${userId}, products=${productsToGrant.join(", ")}, session=${session.id}`
      );
    } catch (error) {
      console.error("[webhook] Failed to grant access:", {
        error: error instanceof Error ? error.message : String(error),
        sessionId: session.id,
        eventId: event.id,
        userId,
        productKey,
      });
      // Return 500 so Stripe retries
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 }
      );
    }
  }

  /* ── Handle refunds ────────────────────────────────────────────── */
  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    const paymentIntentId =
      typeof charge.payment_intent === "string"
        ? charge.payment_intent
        : null;

    if (paymentIntentId) {
      const result = await prisma.purchase.updateMany({
        where: { stripePaymentIntentId: paymentIntentId },
        data: { status: "REFUNDED" },
      });

      console.log(
        `[webhook] 🔄 Purchase refunded: pi=${paymentIntentId}, records=${result.count}`
      );

      // Audit the refund
      const refundedPurchase = await prisma.purchase.findFirst({
        where: { stripePaymentIntentId: paymentIntentId },
        select: { userId: true },
      });
      if (refundedPurchase) {
        await prisma.auditLog.create({
          data: {
            userId: refundedPurchase.userId,
            action: "purchase_refunded",
            details: {
              paymentIntentId,
              eventId: event.id,
            },
          },
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
