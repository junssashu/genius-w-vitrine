import { NextResponse } from "next/server";
import { requireAdmin } from "../_helpers";
import fs from "node:fs";
import path from "node:path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 8 * 1024 * 1024; // 8 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: Request) {
  const err = await requireAdmin();
  if (err) return err;

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP and GIF images are allowed" },
      { status: 415 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File exceeds 8 MB limit" }, { status: 413 });
  }

  // Sanitize filename
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(UPLOADS_DIR, safeName), buffer);

  return NextResponse.json({ url: `/uploads/${safeName}` });
}
