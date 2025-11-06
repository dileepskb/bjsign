// app/api/user/update/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Decode token
    const { payload } = await jwtVerify(token, SECRET);
    const userId = payload.id as number;

    const { name, gender, email, mobile } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, gender, email, mobile },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
