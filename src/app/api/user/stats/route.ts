import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // Replace with real DB aggregation later
  return NextResponse.json({
    flashcardsReviewed: Math.floor(Math.random() * 400) + 100,
    examAttempts: Math.floor(Math.random() * 8) + 1,
    bestScore: Math.floor(Math.random() * 30) + 65,
    streak: Math.floor(Math.random() * 14) + 1,
  });
}
