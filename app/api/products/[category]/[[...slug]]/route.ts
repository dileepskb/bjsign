import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products/[category] or /api/products/[category]/[slug]
export async function GET(
  req: Request,
  context: { params: Promise<{ category: string; slug?: string[] }> }
) {
  const { category, slug } = await context.params;


  try {
    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    // If only category → return all products under that category
    if (!slug || slug.length === 0) {
      const getCategory = await prisma.category.findUnique({
        where: { slug: category },
        include: {
          products: {
            select: {
              id: true,
              title: true,
              description: true,
              price: true,
              discountedPrice: true,
              imgs: true,
              tagImage: true,
              createdAt: true,
            },
          },
        },
      });

      console.log("product first", getCategory);

      return NextResponse.json(getCategory);
    }

    // If slug exists → fetch specific product
    const productSlug = slug.join("/"); // supports nested URLs like /flyers/custom

    const product = await prisma.product.findFirst({
      where: {
        title: {
          equals: productSlug,
          mode: "insensitive", // 🔥 ignores case
        },
      },
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
    console.log(product)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
