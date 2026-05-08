import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAdminToken, ADMIN_COOKIE } from "@/lib/auth";

export async function requireAdmin(): Promise<Response | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const valid = await verifyAdminToken(token);
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
