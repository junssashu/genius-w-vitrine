import { NextResponse } from "next/server";
import { requireAdmin } from "../_helpers";
import { getPosts, savePosts } from "@/lib/posts.server";
import type { Post } from "@/lib/posts";

export async function GET() {
  const err = await requireAdmin();
  if (err) return err;
  return NextResponse.json(getPosts());
}

export async function POST(req: Request) {
  const err = await requireAdmin();
  if (err) return err;

  const body = (await req.json()) as Post;
  if (!body.slug || !body.title) {
    return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
  }

  const posts = getPosts();
  if (posts.find((p) => p.slug === body.slug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const newPost: Post = {
    slug: body.slug,
    title: body.title,
    excerpt: body.excerpt ?? "",
    category: body.category ?? "Manifeste",
    date: body.date ?? new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
    read: body.read ?? "5 min",
    body: Array.isArray(body.body) ? body.body : [],
    palette: body.palette ?? { from: "#0b0b0c", to: "#1a1a1c" },
    ...(body.coverUrl ? { coverUrl: body.coverUrl } : {}),
    ...(body.videoUrl ? { videoUrl: body.videoUrl } : {}),
  };

  savePosts([newPost, ...posts]);
  return NextResponse.json(newPost, { status: 201 });
}
