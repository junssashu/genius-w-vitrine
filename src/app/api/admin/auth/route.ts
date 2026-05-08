import { NextResponse } from "next/server";
import { createAdminToken, ADMIN_COOKIE, COOKIE_MAX_AGE } from "@/lib/auth";

export async function POST(req: Request) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return NextResponse.json(
      { error: "Admin access not configured. Set ADMIN_PASSWORD in your environment." },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (body.password !== password) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const token = await createAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
