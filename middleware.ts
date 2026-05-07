import { NextResponse, type NextRequest } from "next/server";
import { parseLangFromHeader } from "@/lib/locale";
import { COOKIE_KEYS } from "@/lib/cookies";

const ONE_YEAR = 60 * 60 * 24 * 365;

export const middleware = (req: NextRequest) => {
  const res = NextResponse.next();
  if (!req.cookies.get(COOKIE_KEYS.lang)) {
    const detected = parseLangFromHeader(req.headers.get("accept-language"));
    res.cookies.set(COOKIE_KEYS.lang, detected, {
      maxAge: ONE_YEAR,
      sameSite: "lax",
      path: "/",
    });
  }
  return res;
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|icon.svg|logo.svg).*)"],
};
