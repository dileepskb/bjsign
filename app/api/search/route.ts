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
        title: {
          startsWith: q,
          mode: "insensitive",
        },
      },
      take: 10,
      include:{
        category:true
      }
    }),

    prisma.category.findMany({
      where: {
         name: {
          startsWith: q,
          mode: "insensitive",
        },
      },
      take: 10,
    }),
  ]);

  return NextResponse.json({ products, categories });
}
