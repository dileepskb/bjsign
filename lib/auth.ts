import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type AuthUser = {
  id: string;
  email: string;
  role: "admin" | "user";
};

export async function getUserFromToken(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
  } catch {
    return null;
  }
}
