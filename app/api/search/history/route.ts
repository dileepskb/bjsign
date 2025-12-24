import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth"; // your JWT helper

export async function POST(req: NextRequest) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({}, { status: 204 });

  const { query } = await req.json();
  if (!query) return NextResponse.json({}, { status: 204 });

  await prisma.searchHistory.create({
    data: {
      query,
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json([]);

  const history = await prisma.searchHistory.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return NextResponse.json(history);
}