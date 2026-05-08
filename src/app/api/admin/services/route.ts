import { NextResponse } from "next/server";
import { requireAdmin } from "../_helpers";
import { getServices, saveServices } from "@/lib/services.server";
import type { Service } from "@/lib/services";

export async function GET() {
  const err = await requireAdmin();
  if (err) return err;
  return NextResponse.json(getServices());
}

export async function PUT(req: Request) {
  const err = await requireAdmin();
  if (err) return err;
  const body = (await req.json()) as Service[];
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected array of services" }, { status: 400 });
  }
  saveServices(body);
  return NextResponse.json({ ok: true });
}
