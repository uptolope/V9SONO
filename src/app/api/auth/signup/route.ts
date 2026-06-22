import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/lib/validations";
import {
  createRateLimiter,
  getClientIp,
  rateLimitResponse,
} from "@/lib/rate-limit";

const prisma = new PrismaClient();

/* ── Rate limiter: 5 signups per IP per 15 minutes ────────────── */
const signupLimiter = createRateLimiter("signup", {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
});

export async function POST(req: NextRequest) {
  try {
    /* ── Rate limit by IP ────────────────────────────────────── */
    const clientIp = getClientIp(req);
    const rl = signupLimiter.check(clientIp);
    if (!rl.success) {
      return rateLimitResponse(rl);
    }

    const body = await req.json();

    /* ── Validate TOS acceptance ─────────────────────────────── */
    if (!body.acceptedTerms) {
      return NextResponse.json(
        { error: "You must accept the Terms of Service to create an account." },
        { status: 400 }
      );
    }

    /* ── Validate input (uses strong schema with HTML stripping,
         password complexity: 8+ chars, upper, lower, number, special) */
    const parsed = signUpSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    /* ── Check for existing user ─────────────────────────────── */
    const existing = await prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      // Don't reveal whether the email exists — use a generic message
      return NextResponse.json(
        { error: "Unable to create account. If you already have an account, please sign in." },
        { status: 400 }
      );
    }

    /* ── Hash password (cost 12 for stronger protection) ─────── */
    const hashedPassword = await bcrypt.hash(password, 12);

    /* ── Create user ─────────────────────────────────────────── */
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    /* ── Audit log ───────────────────────────────────────────── */
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "SIGNUP",
        ipAddress: clientIp,
        userAgent: req.headers.get("user-agent")?.substring(0, 500) ?? null,
        details: { method: "credentials" },
      },
    });

    return NextResponse.json(
      { user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
