"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  Field, Input, Textarea, ParagraphList, ImageUploader, SubmitBtn, DangerBtn, StatusMsg,
} from "@/app/admin/_components/form";
import type { Post } from "@/lib/posts";

export default function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "success" as "success" | "error" });

  useEffect(() => {
    fetch(`/api/admin/posts/${slug}`)
      .then((r) => r.json())
      .then((data: Post) => { setPost(data); setLoading(false); })
      .catch(() => { setMsg({ text: "Impossible de charger l'article", type: "error" }); setLoading(false); });
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    setSaving(true);
    setMsg({ text: "", type: "success" });
    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setMsg({ text: "Article enregistré avec succès", type: "success" });
    } catch (err) {
      setMsg({ text: err instanceof Error ? err.message : "Erreur", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer cet article définitivement ?")) return;
    const res = await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/blog");
  };

  if (loading) return <p className="text-ivory/40 text-sm py-8">Chargement…</p>;
  if (!post) return <p className="text-red-400 text-sm py-8">Article introuvable.</p>;

  const setField = <K extends keyof Post>(k: K, v: Post[K]) => setPost((prev) => prev ? { ...prev, [k]: v } : prev);

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a href="/admin/blog" className="text-ivory/40 hover:text-ivory text-sm transition-colors">← Articles</a>
          <h1 className="font-display text-2xl text-ivory">Éditer l'article</h1>
        </div>
        <a href={`/blog/${slug}`} target="_blank" rel="noopener noreferrer"
          className="text-xs text-ivory/40 hover:text-gold-bright transition-colors">Voir →</a>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="Titre" htmlFor="title" required>
          <Input id="title" value={post.title} onChange={(e) => setField("title", e.target.value)} required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Catégorie" htmlFor="cat">
            <Input id="cat" value={post.category} onChange={(e) => setField("category", e.target.value)} />
          </Field>
          <Field label="Temps de lecture" htmlFor="read">
            <Input id="read" value={post.read} onChange={(e) => setField("read", e.target.value)} />
          </Field>
        </div>

        <Field label="Date" htmlFor="date">
          <Input id="date" value={post.date} onChange={(e) => setField("date", e.target.value)} />
        </Field>

        <Field label="Extrait" htmlFor="excerpt">
          <Textarea id="excerpt" value={post.excerpt} onChange={(e) => setField("excerpt", e.target.value)} rows={3} />
        </Field>

        <Field label="Corps de l'article" htmlFor="body">
          <ParagraphList value={[...post.body]} onChange={(v) => setField("body", v)} />
        </Field>

        <Field label="Image de couverture" htmlFor="cover">
          <ImageUploader
            currentUrl={post.coverUrl}
            onUpload={(url) => setField("coverUrl", url)}
            onClear={() => setPost((p) => p ? { ...p, coverUrl: undefined } : p)}
          />
        </Field>

        <Field label="Vidéo YouTube / Vimeo (optionnel)" htmlFor="video">
          <Input id="video" value={post.videoUrl ?? ""} onChange={(e) => setField("videoUrl", e.target.value)} placeholder="https://www.youtube.com/watch?v=…" />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Couleur fond — début" htmlFor="cf">
            <div className="flex gap-3 items-center">
              <input type="color" value={post.palette.from} onChange={(e) => setField("palette", { ...post.palette, from: e.target.value })} className="h-10 w-14 cursor-pointer rounded border border-ivory/20 bg-transparent" />
              <Input value={post.palette.from} onChange={(e) => setField("palette", { ...post.palette, from: e.target.value })} className="flex-1" />
            </div>
          </Field>
          <Field label="Couleur fond — fin" htmlFor="ct">
            <div className="flex gap-3 items-center">
              <input type="color" value={post.palette.to} onChange={(e) => setField("palette", { ...post.palette, to: e.target.value })} className="h-10 w-14 cursor-pointer rounded border border-ivory/20 bg-transparent" />
              <Input value={post.palette.to} onChange={(e) => setField("palette", { ...post.palette, to: e.target.value })} className="flex-1" />
            </div>
          </Field>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <SubmitBtn loading={saving} />
            <a href="/admin/blog" className="text-sm text-ivory/40 hover:text-ivory transition-colors">Annuler</a>
          </div>
          <DangerBtn onClick={() => void handleDelete()}>Supprimer</DangerBtn>
        </div>
        <StatusMsg msg={msg.text} type={msg.type} />
      </form>
    </div>
  );
}
