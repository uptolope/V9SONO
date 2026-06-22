import { NextRequest, NextResponse } from "next/server";
import { createRateLimiter, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

/* ── Rate limiter: 5 subscribes per IP per 15 minutes ─────────────── */
const subscribeLimiter = createRateLimiter("subscribe", {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
});

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const rl = subscribeLimiter.check(clientIp);
    if (!rl.success) return rateLimitResponse(rl);

    const { email, signup_source = "unknown" } = await req.json();

    // basic validation
    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: true }); // fail soft
    }

    await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        groups: [process.env.MAILERLITE_GROUP_ID],
        fields: {
          signup_source,
        },
        double_optin: false,
      }),
    });

    // always return success (ghost mode UX)
    return NextResponse.json({ success: true });
  } catch (err) {
    // silent fail
    return NextResponse.json({ success: true });
  }
}
