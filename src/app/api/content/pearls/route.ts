// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Physics Pearls Content API (PROTECTED)
// Returns physics pearl content only to users with valid purchases
// ═══════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkContentAccess } from "@/lib/content/access-check";
import { checkSessionValid } from "@/lib/session-guard";
import { PHYSICS_PEARLS } from "@/lib/content";

export async function GET(req: NextRequest) {
  try {
    // 1. Auth check
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // 2. Concurrent session check
    const sessionCheck = await checkSessionValid(session.user.id, session.user.sessionId);
    if (!sessionCheck.valid) {
      return NextResponse.json(
        { error: sessionCheck.reason, code: "CONCURRENT_SESSION" },
        { status: 403 }
      );
    }

    // 3. Purchase access check
    const access = await checkContentAccess(session.user.id, "PHYSICS_PEARLS");
    if (!access.hasAccess) {
      return NextResponse.json(
        {
          error: "Physics Pearls access required",
          reason: access.reason,
          purchaseUrl: "/billing?product=PHYSICS_PEARLS",
        },
        { status: 403 }
      );
    }

    // 3. Optional pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 50);

    const total = PHYSICS_PEARLS.length;
    const offset = (page - 1) * limit;
    const paginated = PHYSICS_PEARLS.slice(offset, offset + limit);

    return NextResponse.json({
      pearls: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      access: {
        expiresAt: access.expiresAt,
        daysRemaining: access.daysRemaining,
      },
    });
  } catch (error) {
    console.error("Pearls API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
