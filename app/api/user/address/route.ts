import { NextResponse } from "next/server";

import { getUserFromToken } from "@/lib/auth";
import prisma from "@/lib/prisma"; // your Prisma instance

export async function POST(req: Request) {

   const user = getUserFromToken();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


  const data = await req.json();

  const address = await prisma.userAddress.create({
    data: {
      street: data.street,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      userId: user.id, // replace with session user id
    },
  });
  return NextResponse.json(address);
}
