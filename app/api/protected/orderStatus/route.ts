/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { orderId, status, comment } = await req.json();

    // Update order main status
    await prisma.order.update({
      where: { id: Number(orderId) },
      data: { orderStatus: status },
    });

    // Create timeline status
    const orderStatus = await prisma.orderStatus.create({
      data: {
        status,
        comment,
        orderId: Number(orderId),
      },
    });

    return NextResponse.json(orderStatus, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update status" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { message: "orderId is required" },
        { status: 400 }
      );
    }

    const allStatus = await prisma.orderStatus.findMany({
      where: { orderId: Number(orderId) },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(allStatus, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch timeline" },
      { status: 500 }
    );
  }
}
