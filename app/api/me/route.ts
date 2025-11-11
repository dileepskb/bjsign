import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromToken();
  //  console.log("dileep kumar", user)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user });
}