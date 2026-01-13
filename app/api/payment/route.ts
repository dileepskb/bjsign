import { getUserFromToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY || "sk_test_51PeKFs2NCE5zPV5uSmtA6JMbWNvcoVHgutIvhxJoetFdS56dtSboEVCHYmY8f2XKQaemr59YgWGS3V6HaO0ZaYLA00sP8lomQG");

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const user = (await getUserFromToken()) as UserData | null;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const getAddress = await prisma.userAddress.findFirst({
      where: {
        default: true,
        userId: user.id,
      },
    });

    const data: CartItem[] = await request.json();

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Calculate total amount (in dollars)
    const totalAmount = data.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    // Create (or reuse) Stripe customer
    const customer = await stripe.customers.create({
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      address: {
        line1: getAddress?.street || "",
        postal_code: getAddress?.postalCode || "",
        city: getAddress?.city || "",
        state: getAddress?.state || "",
        country: "US",
      },
    });

    // Build line_items for Stripe Checkout
    const line_items = data.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.price * 100), // convert dollars to cents
        product_data: {
          name: item.name,
        },
      },
    }));

    // Create checkout session and include totalAmount in metadata (and in cents too)
    const checkOutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer: customer.id,
      success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/cancel`,
      line_items,
      metadata: {
        userId: user.id,
        totalAmount: totalAmount.toString(), // human readable dollars
        totalAmountCents: String(Math.round(totalAmount * 100)), // cents
        items: JSON.stringify(data.map((i) => ({ id: i.id, name: i.name, qty: i.quantity }))),
      },
    });

    // Return the session url and id and totalAmount for frontend convenience
    return NextResponse.json(
      {
        success: true,
        url: checkOutSession.url,
        sessionId: checkOutSession.id,
        totalAmount,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Stripe Checkout Error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
