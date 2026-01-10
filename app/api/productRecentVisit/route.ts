import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ids: number[] = body?.ids;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json([]);
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        faq: true,
        imgs: true,
        tagImage: true,
        additionalDescriptions: true,
        productOptions: {
          include: {
            optionValues: true,
          },
        },
      },
    });

    // Preserve visit order
    const orderedProducts = ids
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);

    return NextResponse.json(orderedProducts);
  } catch (error) {
    console.error("Recent visit error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
