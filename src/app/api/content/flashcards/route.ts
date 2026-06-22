// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Flashcard Content API (PROTECTED)
// Returns flashcard content only to users with valid purchases
// ═══════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkContentAccess } from "@/lib/content/access-check";
import { checkSessionValid } from "@/lib/session-guard";
import { FLASHCARDS, FLASHCARD_CATEGORIES } from "@/lib/content";

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
    const access = await checkContentAccess(session.user.id, "FLASHCARDS");
    if (!access.hasAccess) {
      return NextResponse.json(
        {
          error: "Flashcard access required",
          reason: access.reason,
          purchaseUrl: "/billing?product=FLASHCARDS",
        },
        { status: 403 }
      );
    }

    // 3. Optional filtering
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);

    let cards = [...FLASHCARDS];

    if (category && category !== "all") {
      cards = cards.filter((c) => c.category === category);
    }

    const total = cards.length;
    const offset = (page - 1) * limit;
    const paginated = cards.slice(offset, offset + limit);

    // 4. Return content with access metadata
    return NextResponse.json({
      cards: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      categories: FLASHCARD_CATEGORIES,
      access: {
        expiresAt: access.expiresAt,
        daysRemaining: access.daysRemaining,
      },
    });
  } catch (error) {
    console.error("Flashcard API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
