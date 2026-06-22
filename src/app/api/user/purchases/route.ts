import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const purchases = await prisma.purchase.findMany({
      where: {
        userId: session.user.id,
        status: "COMPLETED",
        accessExpiresAt: { gt: new Date() },
      },
      orderBy: { purchasedAt: "desc" },
      select: {
        id: true,
        productName: true,
        productKey: true,
        amount: true,
        purchasedAt: true,
        expiresAt: true,
        accessExpiresAt: true,
        status: true,
      },
    });

    return NextResponse.json({ purchases });
  } catch (error) {
    console.error("Purchases API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
