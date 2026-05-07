import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

/* ── Product → Stripe Price ID mapping ──────────────────────────── */
export const PRODUCT_PRICES = {
  FLASHCARDS: {
    name: "SPI Flashcards",
    priceId: process.env.STRIPE_PRICE_FLASHCARDS ?? "",
    amount: 2900,
  },
  PHYSICS_PEARLS: {
    name: "Physics Pearls",
    priceId: process.env.STRIPE_PRICE_PHYSICS_PEARLS ?? "",
    amount: 900,
  },
  EXAM_SIMULATOR: {
    name: "Exam Simulator",
    priceId: process.env.STRIPE_PRICE_EXAM_SIMULATOR ?? "",
    amount: 4900,
  },
  STUDY_NOTES: {
    name: "Study Notes",
    priceId: process.env.STRIPE_PRICE_STUDY_NOTES ?? "",
    amount: 3900,
  },
  PREMIUM_BUNDLE: {
    name: "Premium Bundle",
    priceId: process.env.STRIPE_PRICE_PREMIUM_BUNDLE ?? "",
    amount: 9900,
  },
} as const;

export type ProductKey = keyof typeof PRODUCT_PRICES;

/** Products included when purchasing the Premium Bundle. */
export const BUNDLE_INCLUDES: ProductKey[] = [
  "FLASHCARDS",
  "PHYSICS_PEARLS",
  "EXAM_SIMULATOR",
  "STUDY_NOTES",
];
