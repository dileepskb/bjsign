// app/api/user/update/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { JWT_SECRET } from "@/lib/jwt";

const SECRET = new TextEncoder().encode(JWT_SECRET);

export async function POST(req: Request) {
  try {
    // ✅ MUST await cookies()
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Decode JWT
    const { payload } = await jwtVerify(token, SECRET);
    const userId = payload.id as string; // Prisma User.id = String

    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { name, gender, email, mobile } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        first_name:name,
        gender,
        email,
        mobile,
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
