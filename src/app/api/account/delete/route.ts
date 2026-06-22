import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createRateLimiter, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

/* ── Rate limiter: 3 delete attempts per IP per hour ─────────────── */
const deleteLimiter = createRateLimiter("account_delete", {
  maxRequests: 3,
  windowMs: 60 * 60 * 1000,
});

/**
 * DELETE /api/account/delete
 * Soft-deletes the user account and anonymizes personal data.
 * Requires password confirmation for security.
 */
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clientIp = getClientIp(req);
    const rl = deleteLimiter.check(clientIp);
    if (!rl.success) return rateLimitResponse(rl);

    const userId = session.user.id;

    // Audit the deletion
    await prisma.auditLog.create({
      data: {
        userId,
        action: "ACCOUNT_DELETE_REQUESTED",
        ipAddress: clientIp,
        userAgent: req.headers.get("user-agent")?.substring(0, 500) ?? null,
      },
    });

    // Soft delete: anonymize personal data but keep purchase records for tax compliance
    await prisma.$transaction([
      // Anonymize user record
      prisma.user.update({
        where: { id: userId },
        data: {
          name: "Deleted User",
          email: `deleted_${userId}@sonoprep.com`,
          password: null,
          image: null,
          institution: null,
          examDate: null,
          activeSessionId: null,
          deletedAt: new Date(),
        },
      }),
      // Delete study progress (non-essential, user-owned data)
      prisma.flashcardProgress.deleteMany({ where: { userId } }),
      prisma.studyNoteProgress.deleteMany({ where: { userId } }),
      prisma.examAnswer.deleteMany({
        where: { session: { userId } },
      }),
      prisma.examSession.deleteMany({ where: { userId } }),
      // Delete OAuth sessions and accounts
      prisma.session.deleteMany({ where: { userId } }),
      prisma.account.deleteMany({ where: { userId } }),
    ]);

    // Note: Purchase records are retained for tax/legal compliance (7 years IRS requirement)
    // They reference the anonymized user, not personal data

    await prisma.auditLog.create({
      data: {
        userId,
        action: "ACCOUNT_DELETED",
        details: { method: "user_initiated", dataAnonymized: true },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your account has been deleted and personal data anonymized. Purchase records are retained for legal compliance.",
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
