import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      first_name,
      last_name,
      email,
      mobile,
      street,
      city,
      state,
      postalCode,
      name,
      address_mobile,
      landmark,
      default: isDefault,
    } = await req.json();

    // ✅ Update user basic info
    await prisma.user.update({
      where: { id: user.id }, // id is String ✔
      data: {
        first_name,
        last_name,
        email,
        mobile,
      },
    });

    // ✅ If new address is default → unset old defaults
    if (isDefault === true) {
      await prisma.userAddress.updateMany({
        where: { userId: user.id },
        data: { default: false },
      });
    }

    // ✅ CREATE new address (NOT upsert)
    const address = await prisma.userAddress.create({
      data: {
        name,
        address_mobile,
        street,
        city,
        state,
        postalCode,
        landmark,
        default: isDefault ?? false,
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
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
