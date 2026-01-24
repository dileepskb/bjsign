import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "./lib/jwt";

const SECRET = new TextEncoder().encode(JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET);
    const role = payload.role as "admin" | "user";

    if (role === "admin" && req.nextUrl.pathname.startsWith("/users")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (role === "user" && req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/users", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/users/:path*"],
};
