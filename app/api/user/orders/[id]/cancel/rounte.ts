import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { reason } = body;

    // 1️⃣ Get order from DB
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.status === "CANCELLED") {
      return NextResponse.json(
        { message: "Order already cancelled" },
        { status: 400 }
      );
    }

    // 2️⃣ Cancel or refund in Stripe
    let stripeResponse = null;
    if (order.stripePaymentIntentId) {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          order.stripePaymentIntentId
        );

        if (paymentIntent.status === "succeeded") {
          // refund
          stripeResponse = await stripe.refunds.create({
            payment_intent: order.stripePaymentIntentId,
            reason: "requested_by_customer",
          });
        } else {
          // cancel pending payment
          stripeResponse = await stripe.paymentIntents.cancel(
            order.stripePaymentIntentId
          );
        }
      } catch (err) {
        console.error("Stripe cancel error:", err);
      }
    }

    // 3️⃣ Update order in DB
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        status: "CANCELLED",
        cancelReason: reason || null,
        cancelledAt: new Date(),
      },
    });

    // 4️⃣ Log optional event
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
