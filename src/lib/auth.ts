// ═══════════════════════════════════════════════════════════════════
// Auth placeholder — ready for Clerk integration
// Replace getCurrentUser() with real auth once Clerk is wired
// ═══════════════════════════════════════════════════════════════════

export interface AppUser {
  id: string;
  purchasedProducts: string[]; // slugs of purchased question banks
}

export async function getCurrentUser(): Promise<AppUser> {
  // TODO: Replace with Clerk auth
  return {
    id: "demo-user",
    purchasedProducts: [], // will be populated from DB after Clerk + Stripe
  };
}
