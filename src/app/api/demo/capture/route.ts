// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Demo Lead Capture API
// Stores email from demo users, syncs to MailerLite for nurturing
// ═══════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appendLeadToSheet } from "@/lib/google-sheets";
import { z } from "zod";

const captureSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  source: z.enum(["demo_page", "demo_exam", "demo_flashcards", "landing_page"]).default("demo_page"),
  score: z.number().int().min(0).max(100).optional(),
  weakestCategory: z.string().max(100).optional(),
});

/* ── MailerLite helper ────────────────────────────────────────────── */

async function addToMailerLite(
  email: string,
  source: string,
  score?: number,
  weakestCategory?: string
) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  if (!apiKey || !groupId) return; // silently skip if not configured

  try {
    const fields: Record<string, string> = { signup_source: source };
    if (score !== undefined) fields.demo_score = String(score);
    if (weakestCategory) fields.weakest_category = weakestCategory;

    const subRes = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          fields,
          groups: [groupId],
          double_optin: false,
        }),
      }
    );

    if (!subRes.ok) {
      const text = await subRes.text();
      console.error("MailerLite subscriber error:", subRes.status, text);
    }
  } catch (err) {
    // Never block the user experience for a marketing integration
    console.error("MailerLite sync failed:", err);
  }
}

/* ── POST handler ─────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = captureSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { email, source, score, weakestCategory } = parsed.data;

    // Store in DB + sync to MailerLite + log to Google Sheets in parallel
    await Promise.all([
      prisma.demoLead.create({ data: { email, source, score } }),
      addToMailerLite(email, source, score, weakestCategory),
      appendLeadToSheet({ email, source, score, weakestCategory }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo capture error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
