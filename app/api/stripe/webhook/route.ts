import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.SECRET_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { expand: ["data.price.product"] }
      );

      const userId = session.metadata?.userId;
      if (!userId) {
        console.error("❌ Missing userId in metadata");
        return NextResponse.json({ received: true });
      }

      // ✅ Convert Stripe LineItems → plain JSON
      const items = lineItems.data.map((item) => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        amount_total: item.amount_total,
        currency: item.currency,
        price: {
          id: item.price?.id,
          unit_amount: item.price?.unit_amount,
          product:
            typeof item.price?.product === "object"
              ? {
                  id: item.price.product.id,
                  name: item.price.product.name,
                }
              : item.price?.product,
        },
      }));

      await prisma.invoice.create({
        data: {
          stripeSessionId: session.id,
          stripePaymentId: session.payment_intent as string,
          stripeCustomerId: session.customer as string,
          customerEmail: session.customer_email ?? "",
          amountSubtotal: session.amount_subtotal ?? 0,
          amountTotal: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          status: session.payment_status ?? "paid",
          items, 
          user: {
            connect: { id: userId },
          },
        },
      });

      console.log("✅ Invoice saved:", session.id);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}
