/* eslint-disable  @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // e.g. /api/protected/getproducts?id=1

    // const tagParam = searchParams.get("tag") || undefined;

    // console.log("dileep kumar -------------------", tag);

    if (id) {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
          imgs: true,
          tagImage:true,
          additionalDescriptions: true,
          productOptions: {
            include: {
              optionValues: true,
            },
          },
        },
      });

      if (!product)
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );

      return NextResponse.json(product, { status: 200 });
    }
 
    // ✅ Get all products
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        imgs: true,
        additionalDescriptions: true,
        productOptions: {
          include: {
            optionValues: true,
          },
        },
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}
