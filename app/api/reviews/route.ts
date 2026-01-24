import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

/* -------------------- POST /api/reviews -------------------- */
export async function POST(req: Request) {
  const user = await getUserFromToken(); // ✅ MUST await

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, rating, comment } = await req.json();

  if (!productId || !rating) {
    return NextResponse.json(
      { error: "Product ID and rating are required" },
      { status: 400 }
    );
  }

  try {
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        productId,
        userId: user.id, // ✅ now works
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

/* -------------------- GET /api/reviews -------------------- */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productIdParam = searchParams.get("productId");

  if (!productIdParam) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  const productId = Number(productIdParam); // ✅ FIX

  if (isNaN(productId)) {
    return NextResponse.json(
      { error: "Invalid product ID" },
      { status: 400 }
    );
  }

  const reviews = await prisma.review.findMany({
    where: { productId }, // ✅ number now
    include: {
      user: {
        select: {
          id: true,
          first_name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}