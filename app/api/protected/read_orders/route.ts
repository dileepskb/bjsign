/* eslint-disable  @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
     const { id } = await req.json();
  try {
    const unreadCount = await prisma.order.update({
        where: {
            id:id
        },
        data:{
            isRead: "read",
        }
    })

    // console.log(unreadCount)

    return NextResponse.json(unreadCount, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}
