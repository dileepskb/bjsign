// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // ✅ Works in Edge

// Create a reusable secret
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // 🧩 Redirect unauthenticated users to login
  if (!token) {
    if (!req.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    // ✅ Verify using jose
    const { payload } = await jwtVerify(token, SECRET);

    const role = payload.role as "admin" | "user";

    // 🚫 Restrict access by role
    if (role === "admin" && req.nextUrl.pathname.startsWith("/users")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (role === "user" && req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/users", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Invalid token:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/users/:path*"],
};
