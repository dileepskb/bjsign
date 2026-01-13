import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: {
    params: Promise<{
      productId: string;
      tag: string;
    }>;
  }
) {
  try {
    // ✅ MUST await params
    const { productId, tag } = await context.params;

    // console.log("Tag:", productId, tag);

    const productIdNumber = Number(productId);

    if (!productIdNumber || !tag) {
      return NextResponse.json(
        { message: "Invalid productId or tag" },
        { status: 400 }
      );
    }

    const tagImages = await prisma.tagImage.findMany({
      where: {
        productId: productIdNumber,
        tag: { equals: tag, mode: "insensitive" },
      },
      select: {
        id: true,
        tag: true,
        thumbnails: true,
        previews: true,
      },
    });

    console.log(tagImages)

    return NextResponse.json(tagImages);
  } catch (error) {
    console.error("❌ Tag image fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch tag images" },
      { status: 500 }
    );
  }
}
