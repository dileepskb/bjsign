import { NextResponse } from "next/server";

import { getUserFromToken } from "@/lib/auth";
import prisma from "@/lib/prisma"; // your Prisma instance

export async function POST(req: Request) {
  try {
    const user = getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // ✅ If address is marked as default, unset other default addresses for this user
    if (data.default === true) {
      await prisma.userAddress.updateMany({
        where: { userId: user.id, default: true },
        data: { default: false },
      });
    }

    // ✅ Create the new address
    const address = await prisma.userAddress.create({
      data: {
        name: data.name,
        address_mobile: data.address_mobile,
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        default: data.default ?? false,
        userId: user.id,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.error("Error creating address:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const user = getUserFromToken();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const address = await prisma?.userAddress?.findMany({
    where: {
      userId: user.id,
    },
    orderBy: [{ default: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(address);
}
