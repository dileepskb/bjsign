import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { JWT_SECRET } from "@/lib/jwt";
import bcrypt from "bcryptjs";

const dummyPassword = await bcrypt.hash(
  crypto.randomUUID(),
  10
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Code missing" }, { status: 400 });
  }

  // 1️⃣ Exchange code for access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  // 2️⃣ Get user info
  const userRes = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    }
  );

  const googleUser = await userRes.json();

  if (!googleUser.email) {
    return NextResponse.json({ error: "Google auth failed" }, { status: 400 });
  }

  // 3️⃣ Find or create user
  let user = await prisma.user.findUnique({
    where: { email: googleUser.email },
  });


  const fullName = googleUser.name || "";
const [firstName, ...lastParts] = fullName.split(" ");
const lastName = lastParts.join(" ") || null;


  if (!user) {
    user = await prisma.user.create({
      data: {
        email: googleUser.email,
        first_name: firstName,
        last_name:lastName,
        password:dummyPassword,
        role: "user",
      },
    });
  }

  // 4️⃣ Create JWT
  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 5️⃣ Set cookie & redirect
  const res = NextResponse.redirect(
    new URL(user.role === "ADMIN" ? "/admin" : "/users", req.url)
  );

  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
}
