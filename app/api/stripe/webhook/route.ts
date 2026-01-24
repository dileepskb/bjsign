import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.SECRET_KEY!);
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

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

  const userId = session.metadata?.userId; // ✅ from checkout

  if (!userId) {
    console.error("❌ Missing userId in Stripe metadata");
    return NextResponse.json({ received: true });
  }

  await prisma.invoice.create({
   data: {
    stripeSessionId: session.id,
    customerEmail: session.customer_email || "",
    amountSubtotal: session.amount_subtotal || 0,
    amountTotal: session.amount_total || 0,
    currency: session.currency || "usd",
    status: session.payment_status || "paid",
    items: lineItems.data,
    user: {
      connect: { id: userId },
    },
  },
  });
}


    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}
