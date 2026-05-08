import { NextResponse } from "next/server";
import { requireAdmin } from "../../_helpers";
import { getPortfolio, savePortfolio } from "@/lib/portfolio.server";
import type { Look } from "@/lib/portfolio";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const err = await requireAdmin();
  if (err) return err;
  const { slug } = await params;
  const look = getPortfolio().find((l) => l.slug === slug);
  if (!look) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(look);
}

export async function PUT(req: Request, { params }: Params) {
  const err = await requireAdmin();
  if (err) return err;
  const { slug } = await params;
  const body = (await req.json()) as Partial<Look>;
  const looks = getPortfolio();
  const idx = looks.findIndex((l) => l.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = { ...looks[idx], ...body, slug } as Look;
  looks[idx] = updated;
  savePortfolio(looks);
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: Params) {
  const err = await requireAdmin();
  if (err) return err;
  const { slug } = await params;
  const looks = getPortfolio();
  const filtered = looks.filter((l) => l.slug !== slug);
  if (filtered.length === looks.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  savePortfolio(filtered);
  return NextResponse.json({ ok: true });
}
