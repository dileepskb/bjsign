import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      include: {
        product: {
          select: {
            id: true,
            title: true,
            price: true,
            discountedPrice: true,
            imgs: true, // optional
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    console.log(faqs)
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("GET FAQ error:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, answer, productId } = body;

    const newFAQ = await prisma.fAQ.create({
      data: { question, answer, productId:Number(productId) },
    });

    return NextResponse.json({ success: true, faq: newFAQ });
  } catch (error) {
    console.error("POST FAQ error:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
