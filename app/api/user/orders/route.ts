import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // ✅ 1. Get the authenticated user
    const user = (await getUserFromToken()) as { id: string } | null;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ 2. Fetch user's orders with related invoice
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        invoice: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // ✅ 3. Format the response for the frontend
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.orderStatus,
      paymentStatus: order.paymentStatus,
      totalAmount: order.totalAmount / 100, // convert cents to dollars
      currency: order.currency.toUpperCase(),
      createdAt: order.createdAt,
      items: order.items,
      invoice: order.invoice
        ? {
            id: order.invoice.id,
            amountTotal: order.invoice.amountTotal / 100,
            status: order.invoice.status,
            currency: order.invoice.currency,
            createdAt: order.invoice.createdAt,
          }
        : null,
    }));

    // ✅ 4. Return all orders
    return NextResponse.json({ success: true, orders: formattedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
