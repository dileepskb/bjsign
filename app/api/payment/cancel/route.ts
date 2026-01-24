import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json();

    if (!session_id) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );
    }

    // 🔹 Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent | null;

    // 🛑 CASE 1: Payment NOT completed → cancel only
    if (session.payment_status !== "paid") {
      await prisma.invoice.updateMany({
        where: {
          stripeSessionId: session.id,
        },
        data: {
          status: "cancelled",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Order cancelled before payment. No refund required.",
      });
    }

    // 💸 CASE 2: Payment completed → refund
    if (paymentIntent) {
      await stripe.refunds.create({
        payment_intent: paymentIntent.id,
        reason: "requested_by_customer",
      });
    }

    // 🧾 Update invoice after refund
    await prisma.invoice.updateMany({
      where: {
        stripeSessionId: session.id,
      },
      data: {
        status: "refunded",
        stripePaymentId: paymentIntent?.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order cancelled and refunded successfully.",
    });
  } catch (error: any) {
    console.error("❌ Cancel error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to cancel order" },
      { status: 500 }
    );
  }
}
