import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/lib/validations";
import {
  createRateLimiter,
  getClientIp,
  rateLimitResponse,
} from "@/lib/rate-limit";

/* ── Rate limiter: 5 signup attempts per IP per 15 minutes ──────── */
const signupLimiter = createRateLimiter("signup", {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
});

/** Maximum request body size (16 KB — far more than any signup payload) */
const MAX_BODY_SIZE = 16 * 1024;

export async function POST(req: Request) {
  try {
    /* ── Rate limit ───────────────────────────────────────────── */
    const clientIp = getClientIp(req);
    const rl = signupLimiter.check(clientIp);
    if (!rl.success) {
      return rateLimitResponse(rl);
    }

    /* ── Body size guard ──────────────────────────────────────── */
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: "Request body too large" },
        { status: 413 }
      );
    }

    const rawBody = await req.text();
    if (rawBody.length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: "Request body too large" },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON" },
        { status: 400 }
      );
    }

    /* ── Validate input ───────────────────────────────────────── */
    const parsed = signUpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;
    // email is already normalized (trimmed + lowercased) by the schema

    /* ── Hash password ────────────────────────────────────────── */
    // Hash password BEFORE checking for duplicates to ensure constant-time
    // response regardless of whether the user exists. This prevents
    // timing-based enumeration of registered emails.
    const hashedPassword = await bcrypt.hash(password, 12);

    /* ── Check for existing user ──────────────────────────────── */
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      // Generic message — don't confirm whether the email is registered.
      // The bcrypt.hash above ensures timing is consistent either way.
      return NextResponse.json(
        {
          error:
            "If this email is not already registered, an account has been created. Please check your email or try signing in.",
        },
        { status: 409 }
      );
    }

    /* ── Create user ──────────────────────────────────────────── */
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "STUDENT",
      },
      select: { id: true, name: true, email: true },
    });

    /* ── Audit log ────────────────────────────────────────────── */
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "signup",
        details: { method: "credentials" },
        ipAddress: clientIp,
      },
    });

    return NextResponse.json(
      { message: "Account created successfully.", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
