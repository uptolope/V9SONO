// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Concurrent Session Guard (SERVER-SIDE ONLY)
// Ensures only one device can access paid content at a time.
// Last login wins: if user logs in elsewhere, the first device is blocked.
// ═══════════════════════════════════════════════════════════════════

import { prisma } from "@/lib/prisma";

export interface SessionCheckResult {
  valid: boolean;
  reason?: string;
}

/**
 * Verify that the session's ID matches the user's active session in the DB.
 * If they don't match, another device logged in after this one.
 *
 * Call this on every protected content API route.
 */
export async function checkSessionValid(
  userId: string,
  sessionId: string | undefined
): Promise<SessionCheckResult> {
  if (!userId) {
    return { valid: false, reason: "Missing user ID" };
  }

  if (!sessionId) {
    // Legacy sessions without sessionId — allow (will get new one on next login)
    return { valid: true };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { activeSessionId: true },
  });

  if (!user) {
    return { valid: false, reason: "User not found" };
  }

  // If no activeSessionId in DB (e.g., before migration), allow
  if (!user.activeSessionId) {
    return { valid: true };
  }

  if (user.activeSessionId !== sessionId) {
    return {
      valid: false,
      reason: "Your account is active on another device. Please sign in again to use it here.",
    };
  }

  return { valid: true };
}
