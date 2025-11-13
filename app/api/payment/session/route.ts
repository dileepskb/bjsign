import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.SECRET_KEY || "sk_test_51PeKFs2NCE5zPV5uSmtA6JMbWNvcoVHgutIvhxJoetFdS56dtSboEVCHYmY8f2XKQaemr59YgWGS3V6HaO0ZaYLA00sP8lomQG"
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    // ✅ Fetch the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "customer", "customer_details"],
    });

    // ✅ Fetch line items separately
    const lineItemsResponse = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });
    const lineItems = lineItemsResponse.data || [];

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;

    const invoiceData = {
      sessionId: session.id,
      paymentId: paymentIntent?.id,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency?.toUpperCase(),
      paymentStatus: session.payment_status,
      paymentMethod: paymentIntent?.payment_method_types?.[0],
      customerName: session.customer_details?.name,
      customerEmail: session.customer_details?.email,
      customerAddress: session.customer_details?.address,
      items: lineItems.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        unit_amount: (item.price?.unit_amount ?? 0) / 100,
        total: ((item.price?.unit_amount ?? 0) * (item.quantity ?? 1)) / 100,
      })),
      createdAt: new Date(paymentIntent?.created ? paymentIntent.created * 1000 : Date.now()),
    };

    return NextResponse.json({ success: true, invoice: invoiceData });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
