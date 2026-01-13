// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = getUserFromToken();
    console.log("dileep kumar", user)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      first_name,
      last_name,
      email,
      mobile,
      street,
      city,
      state,
      postalCode,
    } = body;

    // ✅ Update basic user info (optional)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        first_name,
        last_name,
        email,
        mobile,
      },
    });

    // ✅ Create or update address
    const address = await prisma.userAddress.upsert({
      where: {
        userId: user.id,
      },
      update: {
        street,
        city,
        state,
        postalCode,
      },
      create: {
        street,
        city,
        state,
        postalCode,
        userId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Checkout details saved successfully",
      address,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
