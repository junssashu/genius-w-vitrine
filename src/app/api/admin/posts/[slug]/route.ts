import { NextResponse } from "next/server";
import { requireAdmin } from "../../_helpers";
import { getPosts, savePosts } from "@/lib/posts.server";
import type { Post } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const err = await requireAdmin();
  if (err) return err;
  const { slug } = await params;
  const post = getPosts().find((p) => p.slug === slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: Params) {
  const err = await requireAdmin();
  if (err) return err;
  const { slug } = await params;
  const body = (await req.json()) as Partial<Post>;
  const posts = getPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = { ...posts[idx], ...body, slug } as Post;
  posts[idx] = updated;
  savePosts(posts);
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: Params) {
  const err = await requireAdmin();
  if (err) return err;
  const { slug } = await params;
  const posts = getPosts();
  const filtered = posts.filter((p) => p.slug !== slug);
  if (filtered.length === posts.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  savePosts(filtered);
  return NextResponse.json({ ok: true });
}
