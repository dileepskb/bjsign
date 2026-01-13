import { NextResponse } from "next/server";

export async function POST() {
  // Remove the token cookie
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.set("token", "", { path: "/", expires: new Date(0) }); // delete token
  return response;
}
