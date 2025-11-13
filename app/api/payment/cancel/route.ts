import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json();

    if (!session_id) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    // 🧾 Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;

    // 🛑 Case 1: Payment not completed — cancel order without refund
    if (session.payment_status !== "paid") {
      await prisma.invoice.updateMany({
        where: { sessionId: session.id },
        data: { orderStatus: "cancelled" },
      });

      return NextResponse.json({
        success: true,
        message: "Order cancelled before payment. No refund required.",
      });
    }

    // 🧾 Case 2: Payment completed — refund via Stripe
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntent.id,
      reason: "requested_by_customer",
    });

    // 🧾 Update DB record
    await prisma.invoice.updateMany({
      where: { sessionId: session.id },
      data: {
        orderStatus: "cancelled",
        paymentStatus: "refunded",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order cancelled and refunded successfully.",
      refund,
    });
  } catch (error: any) {
    console.error("Error cancelling order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to cancel order" },
      { status: 500 }
    );
  }
}
