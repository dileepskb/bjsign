// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  if (!process.env.JWT_SECRET) {
    console.error("❌ Missing JWT_SECRET in .env");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email,  pic:user?.pic, first_name:user?.first_name, last_name:user?.last_name, },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Create response with cookie
    const res = NextResponse.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, email: user.email, pic:user?.pic, first_name:user?.first_name, last_name:user?.last_name, role: user.role },
    });

    // ✅ Store JWT as HTTP-only cookie
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // 'strict' can block cookies in dev
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
