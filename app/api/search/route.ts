import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({
      products: [],
      categories: [],
    });
  }

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 10,
    }),

    prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 10,
    }),
  ]);

  return NextResponse.json({ products, categories });
}
