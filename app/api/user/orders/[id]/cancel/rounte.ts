import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY!);

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { reason } = await req.json();

    console.log(id)

    // 1️⃣ Find the order
    const order = await prisma.order.findUnique({ where: { id: Number(id) } });
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    if (order.orderStatus === "cancelled") {
      return NextResponse.json({ message: "Order already cancelled" }, { status: 400 });
    }

    // 2️⃣ Cancel/refund in Stripe
    let stripeResponse = null;
   
    if (order.paymentIntentId) {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(order.paymentIntentId);

        if (paymentIntent.status === "succeeded") {
          // Refund completed payment
          stripeResponse = await stripe.refunds.create({
            payment_intent: order.paymentIntentId,
            reason: "requested_by_customer",
          });
        } else if (["requires_payment_method", "requires_confirmation", "processing"].includes(paymentIntent.status)) {
          // Cancel pending payment
          stripeResponse = await stripe.paymentIntents.cancel(order.paymentIntentId);
        }
      } catch (stripeErr) {
        console.error("Stripe cancel/refund error:", stripeErr);
      }
    }

    // 3️⃣ Update order
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        orderStatus: "cancelled",
        paymentStatus: "refunded",
        cancelReason: reason || null,
        cancelledAt: new Date(),
        refundId: stripeResponse?.id ?? null,
      },
    });

    // 4️⃣ Log cancellation
    await prisma.orderLog.create({
      data: {
        orderId: updatedOrder.id,
        message: `Order cancelled${reason ? `: ${reason}` : ""}`,
      },
    });

    return NextResponse.json({
      message: "Order cancelled successfully",
      order: updatedOrder,
      stripe: stripeResponse,
    });
  } catch (err: any) {
    console.error("Cancel order error:", err);
    return NextResponse.json(
      { message: "Failed to cancel order", error: err.message },
      { status: 500 }
    );
  }
}
