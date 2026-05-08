import { NextResponse } from "next/server";
import { requireAdmin } from "../_helpers";
import { getPortfolio, savePortfolio } from "@/lib/portfolio.server";
import type { Look } from "@/lib/portfolio";

export async function GET() {
  const err = await requireAdmin();
  if (err) return err;
  return NextResponse.json(getPortfolio());
}

export async function POST(req: Request) {
  const err = await requireAdmin();
  if (err) return err;

  const body = (await req.json()) as Look;
  if (!body.slug || !body.title) {
    return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
  }

  const looks = getPortfolio();
  if (looks.find((l) => l.slug === body.slug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const newLook: Look = {
    slug: body.slug,
    title: body.title,
    category: body.category ?? "Haute Couture",
    year: body.year ?? "SS 26",
    description: body.description ?? "",
    palette: body.palette ?? { from: "#0b0b0c", to: "#1a1a1c", accent: "#b8945f" },
    motif: body.motif ?? "weave",
    ...(body.imageUrl ? { imageUrl: body.imageUrl } : {}),
  };

  savePortfolio([newLook, ...looks]);
  return NextResponse.json(newLook, { status: 201 });
}
