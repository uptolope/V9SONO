import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { accountUpdateSchema } from "@/lib/validations";
import {
  createRateLimiter,
  rateLimitResponse,
} from "@/lib/rate-limit";

/* ── Rate limiter: 10 account updates per user per 15 minutes ────── */
const accountLimiter = createRateLimiter("account_update", {
  maxRequests: 10,
  windowMs: 15 * 60 * 1000,
});

export async function PATCH(req: Request) {
  try {
    /* ── Auth check ────────────────────────────────────────────── */
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* ── Rate limit ────────────────────────────────────────────── */
    const rl = accountLimiter.check(session.user.id);
    if (!rl.success) {
      return rateLimitResponse(rl);
    }

    /* ── Validate input (schemas now strip HTML via sanitizedString) */
    const body = await req.json();
    const result = accountUpdateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, examDate, institution } = result.data;

    // Ensure at least one field is being updated
    if (!name && !examDate && !institution) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    /* ── Update user ───────────────────────────────────────────── */
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(name && { name }),
        ...(examDate && { examDate: new Date(examDate) }),
        ...(institution && { institution }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        examDate: true,
        institution: true,
      },
    });

    /* ── Audit log (fixed: use `details` not `metadata`) ─────── */
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "ACCOUNT_UPDATE",
        details: { fields: Object.keys(result.data) },
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Account update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
