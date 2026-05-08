// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Content Access Verification (SERVER-SIDE ONLY)
// Checks if a user has purchased and has active access to a product
// ═══════════════════════════════════════════════════════════════════

import { prisma } from "@/lib/prisma";

export type ProductContentKey = 
  | "FLASHCARDS"
  | "EXAM_SIMULATOR" 
  | "PHYSICS_PEARLS"
  | "STUDY_NOTES"
  | "PREMIUM_BUNDLE";

export interface AccessResult {
  hasAccess: boolean;
  expiresAt?: Date;
  daysRemaining?: number;
  reason?: string;
}

// Which product keys are included in the bundle
const BUNDLE_INCLUDES: ProductContentKey[] = [
  "FLASHCARDS",
  "EXAM_SIMULATOR",
  "PHYSICS_PEARLS",
  "STUDY_NOTES",
];

export async function checkContentAccess(
  userId: string,
  productKey: ProductContentKey
): Promise<AccessResult> {
  if (!userId || !productKey) {
    return { hasAccess: false, reason: "Missing user or product" };
  }

  const now = new Date();

  // Fetch all active purchases for this user
  const purchases = await prisma.purchase.findMany({
    where: {
      userId,
      status: "COMPLETED",
      accessExpiresAt: { gt: now },
    },
  });

  if (purchases.length === 0) {
    return { hasAccess: false, reason: "No active purchases" };
  }

  // Check direct product purchase (using productKey field)
  const directPurchase = purchases.find(p => p.productKey === productKey);
  if (directPurchase) {
    const daysRemaining = Math.ceil(
      (directPurchase.accessExpiresAt!.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return {
      hasAccess: true,
      expiresAt: directPurchase.accessExpiresAt!,
      daysRemaining,
    };
  }

  // Check Premium Bundle (includes all products)
  if (BUNDLE_INCLUDES.includes(productKey)) {
    const bundlePurchase = purchases.find(p => p.productKey === "PREMIUM_BUNDLE");
    if (bundlePurchase) {
      const daysRemaining = Math.ceil(
        (bundlePurchase.accessExpiresAt!.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      return {
        hasAccess: true,
        expiresAt: bundlePurchase.accessExpiresAt!,
        daysRemaining,
      };
    }
  }

  return { hasAccess: false, reason: "Product not purchased or expired" };
}

export async function getUserProductAccess(userId: string): Promise<Record<string, AccessResult>> {
  const products: ProductContentKey[] = [
    "FLASHCARDS",
    "EXAM_SIMULATOR",
    "PHYSICS_PEARLS",
    "STUDY_NOTES",
  ];
  const results: Record<string, AccessResult> = {};
  for (const product of products) {
    results[product] = await checkContentAccess(userId, product);
  }
  return results;
}
