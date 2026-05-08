import { NextResponse } from "next/server";
import { requireAdmin } from "../_helpers";
import { getTestimonials, saveTestimonials } from "@/lib/testimonials.server";
import type { Testimonial } from "@/lib/testimonials";

export async function GET() {
  const err = await requireAdmin();
  if (err) return err;
  return NextResponse.json(getTestimonials());
}

export async function POST(req: Request) {
  const err = await requireAdmin();
  if (err) return err;
  const body = (await req.json()) as Testimonial;
  if (!body.name || !body.text) {
    return NextResponse.json({ error: "name and text are required" }, { status: 400 });
  }
  const items = getTestimonials();
  const newItem: Testimonial = {
    name: body.name,
    role: body.role ?? "",
    city: body.city ?? "",
    text: body.text,
  };
  saveTestimonials([newItem, ...items]);
  return NextResponse.json(newItem, { status: 201 });
}
