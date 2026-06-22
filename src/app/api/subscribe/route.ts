import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
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
