// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Content Access Verification (SERVER-SIDE ONLY)
// Checks if a user has purchased and has active access to a product
// ═══════════════════════════════════════════════════════════════════

import { prisma } from "@/lib/prisma";
import { BUNDLE_INCLUDES, type ProductContentKey } from "./index";

export interface AccessResult {
  hasAccess: boolean;
  expiresAt?: Date;
  daysRemaining?: number;
  reason?: string;
}

/**
 * Check if a user has active access to a specific product.
 * Also checks if they have the Premium Bundle (which includes all products).
 *
 * SECURITY: This must be called on every content API route before
 * serving any educational content.
 */
export async function checkContentAccess(
  userId: string,
  productKey: ProductContentKey
): Promise<AccessResult> {
  if (!userId || !productKey) {
    return { hasAccess: false, reason: "Missing user or product" };
  }

  const now = new Date();

  // Find all active purchases for this user
  const purchases = await prisma.purchase.findMany({
    where: {
      userId,
      status: "COMPLETED",
      accessExpiresAt: { gt: now },
    },
    include: {
      product: true,
    },
  });

  if (purchases.length === 0) {
    return { hasAccess: false, reason: "No active purchases" };
  }

  // Check direct product purchase
  const directPurchase = purchases.find(
    (p) => p.product && p.product.type === productKey
  );

  if (directPurchase) {
    const daysRemaining = Math.ceil(
      (directPurchase.accessExpiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return {
      hasAccess: true,
      expiresAt: directPurchase.accessExpiresAt,
      daysRemaining,
    };
  }

  // Check Premium Bundle (includes all products)
  if (BUNDLE_INCLUDES.includes(productKey)) {
    const bundlePurchase = purchases.find(
      (p) => p.product && p.product.type === "PREMIUM_BUNDLE"
    );

    if (bundlePurchase) {
      const daysRemaining = Math.ceil(
        (bundlePurchase.accessExpiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      return {
        hasAccess: true,
        expiresAt: bundlePurchase.accessExpiresAt,
        daysRemaining,
      };
    }
  }

  return { hasAccess: false, reason: "Product not purchased or expired" };
}

/**
 * Get all active product access for a user (used in dashboard).
 */
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
