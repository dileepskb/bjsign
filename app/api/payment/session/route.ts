import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.SECRET_KEY!);

export async function GET(req: NextRequest) {
  try {
    const sessionId = new URL(req.url).searchParams.get("session_id");
    if (!sessionId) throw new Error("Missing session_id");

    // ✅ Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "customer_details"],
    });
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;

    // ✅ Step 1: Upsert invoice (create or reuse existing)
    const invoice = await prisma.invoice.upsert({
      where: { stripeSessionId: session.id },
      update: {
        status: session.payment_status,
        amountTotal: session.amount_total ?? 0,
      },
      create: {
        stripeSessionId: session.id,
        stripePaymentId: paymentIntent?.id,
        stripeCustomerId: session.customer as string,
        userId: session.metadata?.userId ?? "",
        customerEmail: session.customer_details?.email ?? "",
        amountSubtotal: session.amount_subtotal ?? 0,
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        status: session.payment_status,
        items: lineItems.data,
        // metadata: session.metadata,
      },
    });

    // ✅ Step 2: Check if order already exists for this invoice
    let order = await prisma.order.findFirst({
      where: { invoiceId: invoice.id },
    });

    // ✅ Step 3: Create order only if not already created
    if (!order) {
      const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      order = await prisma.order.create({
        data: {
          userId: session.metadata?.userId ?? "",
          orderNumber,
          invoiceId: invoice.id,
          items: lineItems.data,
          subtotalAmount: session.amount_subtotal ?? 0,
          totalAmount: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          paymentStatus: session.payment_status,
          orderStatus: "processing",
          paymentIntentId: paymentIntent?.id,
        },
      });
    }

    return NextResponse.json({ success: true, invoice, order });
  } catch (error) {
    console.error("Error creating order/invoice:", error);
    return NextResponse.json(
      { error: "Failed to save order/invoice" },
      { status: 500 }
    );
  }
}
