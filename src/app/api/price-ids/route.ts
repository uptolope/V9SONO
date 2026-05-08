import { NextResponse } from "next/server";

export async function GET() {
  const priceIds = {
    flashcards: process.env.STRIPE_PRICE_FLASHCARDS,
    simulator: process.env.STRIPE_PRICE_EXAM_SIMULATOR,
    pearls: process.env.STRIPE_PRICE_PHYSICS_PEARLS,
    notes: process.env.STRIPE_PRICE_STUDY_NOTES,
    bundle: process.env.STRIPE_PRICE_PREMIUM_BUNDLE,
  };
  return NextResponse.json(priceIds);
}