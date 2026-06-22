// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Study Notes Content API (PROTECTED)
// Returns study note sections only to users with valid purchases
// ═══════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkContentAccess } from "@/lib/content/access-check";
import { checkSessionValid } from "@/lib/session-guard";
import { STUDY_SECTIONS } from "@/lib/content";

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
    const access = await checkContentAccess(session.user.id, "STUDY_NOTES");
    if (!access.hasAccess) {
      return NextResponse.json(
        {
          error: "Study Notes access required",
          reason: access.reason,
          purchaseUrl: "/billing?product=STUDY_NOTES",
        },
        { status: 403 }
      );
    }

    // 3. Optional: request a specific section
    const { searchParams } = new URL(req.url);
    const sectionId = searchParams.get("section");

    if (sectionId) {
      const section = STUDY_SECTIONS.find(
        (s) => s.id === parseInt(sectionId, 10)
      );
      if (!section) {
        return NextResponse.json(
          { error: "Section not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({
        section,
        access: {
          expiresAt: access.expiresAt,
          daysRemaining: access.daysRemaining,
        },
      });
    }

    // Return all sections (table of contents + full content)
    return NextResponse.json({
      sections: STUDY_SECTIONS,
      totalSections: STUDY_SECTIONS.length,
      totalCards: STUDY_SECTIONS.reduce((sum, s) => sum + s.cards.length, 0),
      access: {
        expiresAt: access.expiresAt,
        daysRemaining: access.daysRemaining,
      },
    });
  } catch (error) {
    console.error("Study notes API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
