import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const priceId = lineItems.data[0]?.price?.id;
      const customerEmail = session.customer_details?.email;

      if (!priceId || !customerEmail) {
        console.error("Webhook: Missing priceId or email", { priceId, customerEmail, sessionId: session.id });
        return NextResponse.json({ error: "Missing data" }, { status: 400 });
      }

      // Find or create user
      let user = await prisma.user.findUnique({ where: { email: customerEmail } });
      if (!user) {
        user = await prisma.user.create({ data: { email: customerEmail } });
      }

      // Update Stripe customer ID if not set
      if (!user.stripeCustomerId && session.customer) {
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: session.customer as string },
        });
      }

      // ── Product mapping ──────────────────────────────────────
      // Env var names MUST match what's in .env and /api/price-ids
      // Product keys MUST match what checkContentAccess() expects
      const productMap: Record<string, { name: string; key: string; days: number }> = {
        [process.env.STRIPE_PRICE_FLASHCARDS!]:      { name: "SPI Flashcards",  key: "FLASHCARDS",      days: 90 },
        [process.env.STRIPE_PRICE_EXAM_SIMULATOR!]:   { name: "Exam Simulator",  key: "EXAM_SIMULATOR",  days: 90 },
        [process.env.STRIPE_PRICE_PHYSICS_PEARLS!]:   { name: "Physics Pearls",  key: "PHYSICS_PEARLS",  days: 90 },
        [process.env.STRIPE_PRICE_STUDY_NOTES!]:      { name: "Study Notes",     key: "STUDY_NOTES",     days: 90 },
        [process.env.STRIPE_PRICE_PREMIUM_BUNDLE!]:   { name: "Premium Bundle",  key: "PREMIUM_BUNDLE",  days: 90 },
      };

      const product = productMap[priceId];
      if (!product) {
        console.error("Webhook: Unknown priceId", { priceId, sessionId: session.id });
        return NextResponse.json({ error: "Unknown product" }, { status: 400 });
      }

      const expiresAt = new Date(Date.now() + product.days * 24 * 60 * 60 * 1000);

      // Prevent duplicate purchases from webhook retries
      const existing = await prisma.purchase.findUnique({
        where: { stripeSessionId: session.id },
      });

      if (!existing) {
        await prisma.purchase.create({
          data: {
            userId: user.id,
            productName: product.name,
            productKey: product.key,
            priceId,
            stripeSessionId: session.id,
            amount: session.amount_total || 0,
            purchasedAt: new Date(),
            expiresAt,
            accessExpiresAt: expiresAt,
            status: "COMPLETED",
          },
        });

        // Audit log
        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: "purchase",
            details: {
              product: product.key,
              amount: session.amount_total,
              stripeSessionId: session.id,
            },
          },
        });
      }
    } catch (err) {
      console.error("Webhook processing error:", err);
      return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
