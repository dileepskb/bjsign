import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.SECRET_KEY!);

export async function GET(req: NextRequest) {
  try {
    const sessionId = new URL(req.url).searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );
    }

    // 🔹 Fetch Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "customer_details"],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;

    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

    // ✅ VERY IMPORTANT: Convert Stripe objects → plain JSON
    const safeItems = lineItems.data.map((item) => ({
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      amount_total: item.amount_total,
      currency: item.currency,
      price: item.price
        ? {
            id: item.price.id,
            unit_amount: item.price.unit_amount,
            product:
              typeof item.price.product === "object"
                ? {
                    id: item.price.product.id,
                    name: item.price.product.name,
                  }
                : item.price.product,
          }
        : null,
    }));

    // 🔹 STEP 1: Create / Update Invoice
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
        items: safeItems, // ✅ FIX
      },
    });

    // 🔹 STEP 2: Check if Order already exists
    let order = await prisma.order.findFirst({
      where: { invoiceId: invoice.id },
    });

    // 🔹 STEP 3: Create Order if not exists
    if (!order) {
      const orderNumber = `ORD-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`;

      order = await prisma.order.create({
        data: {
          userId: session.metadata?.userId ?? "",
          orderNumber,
          invoiceId: invoice.id,
          items: safeItems, // ✅ FIX
          subtotalAmount: session.amount_subtotal ?? 0,
          totalAmount: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          paymentStatus: session.payment_status,
          orderStatus: "processing",
          paymentIntentId: paymentIntent?.id,
        },
      });
    }

    return NextResponse.json({
      success: true,
      invoice,
      order,
    });
  } catch (error) {
    console.error("❌ Error creating order/invoice:", error);
    return NextResponse.json(
      { error: "Failed to save order/invoice" },
      { status: 500 }
    );
  }
}
