import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook error", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const priceId = lineItems.data[0]?.price?.id;
    const customerEmail = session.customer_details?.email;
    if (!priceId || !customerEmail) return NextResponse.json({ error: "Missing data" }, { status: 400 });
    let user = await prisma.user.findUnique({ where: { email: customerEmail } });
    if (!user) user = await prisma.user.create({ data: { email: customerEmail } });
    const productMap: Record<string, { name: string; key: string; days: number }> = {
      [process.env.STRIPE_PRICER_FLASH_CARDS!]: { name: "SPI Flashcards", key: "flashcards", days: 90 },
      [process.env.STRIPE_PRICE_EXAM_SIMULATOR!]: { name: "Exam Simulator", key: "simulator", days: 90 },
      [process.env.STRIPE_PRICE_PHYSICS_PEARS!]: { name: "Physics Pearls", key: "pearls", days: 90 },
      [process.env.STRIPE_PRICE_STUDY_NOTES!]: { name: "Study Notes", key: "notes", days: 90 },
      [process.env.STRIPE_PRICER_PREMIUM_BUNDLE!]: { name: "Premium Bundle", key: "bundle", days: 90 },
    };
    const product = productMap[priceId];
    if (!product) return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    const expiresAt = new Date(Date.now() + product.days * 24 * 60 * 60 * 1000);
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
  }
  return NextResponse.json({ received: true });
}
// dummy commit to trigger redeploy
