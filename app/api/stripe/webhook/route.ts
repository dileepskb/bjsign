import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.SECRET_KEY!, {
  apiVersion: "2025-01-27",
});

// ⚠️ Disable Next.js body parsing for raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // ✅ When payment succeeds
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const customer = await stripe.customers.retrieve(
        session.customer as string
      );
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      // 💾 Save invoice/payment data in DB
      await prisma.invoice.create({
        data: {
          stripeSessionId: session.id,
          customerId: (session.customer as string) || "",
          customerEmail: session.customer_email || "",
          amountTotal: session.amount_total || 0,
          currency: session.currency || "usd",
          status: session.payment_status,
          items: JSON.stringify(lineItems.data),
        },
      });

      console.log("✅ Payment recorded in DB:", session.id);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}
