import { NextResponse } from "next/server";
import { requireAdmin } from "../../_helpers";
import { getTestimonials, saveTestimonials } from "@/lib/testimonials.server";
import type { Testimonial } from "@/lib/testimonials";

type Params = { params: Promise<{ index: string }> };

export async function PUT(req: Request, { params }: Params) {
  const err = await requireAdmin();
  if (err) return err;
  const { index } = await params;
  const idx = Number(index);
  const body = (await req.json()) as Partial<Testimonial>;
  const items = getTestimonials();
  if (idx < 0 || idx >= items.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  items[idx] = { ...items[idx], ...body } as Testimonial;
  saveTestimonials(items);
  return NextResponse.json(items[idx]);
}

export async function DELETE(_req: Request, { params }: Params) {
  const err = await requireAdmin();
  if (err) return err;
  const { index } = await params;
  const idx = Number(index);
  const items = getTestimonials();
  if (idx < 0 || idx >= items.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  items.splice(idx, 1);
  saveTestimonials(items);
  return NextResponse.json({ ok: true });
}
