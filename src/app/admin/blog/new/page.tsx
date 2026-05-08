"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Field, Input, Textarea, ParagraphList, ImageUploader, SubmitBtn, StatusMsg,
} from "@/app/admin/_components/form";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "success" as "success" | "error" });

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Manifeste");
  const [date, setDate] = useState(new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }));
  const [readTime, setReadTime] = useState("5 min");
  const [body, setBody] = useState<string[]>([""]);
  const [coverUrl, setCoverUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [colorFrom, setColorFrom] = useState("#0b0b0c");
  const [colorTo, setColorTo] = useState("#1a1a1c");

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slug || slug === slugify(title)) setSlug(slugify(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) { setMsg({ text: "Titre et slug requis", type: "error" }); return; }
    setLoading(true);
    setMsg({ text: "", type: "success" });
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug, title, excerpt, category, date, read: readTime,
          body: body.filter(Boolean),
          palette: { from: colorFrom, to: colorTo },
          ...(coverUrl ? { coverUrl } : {}),
          ...(videoUrl ? { videoUrl } : {}),
        }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      router.push("/admin/blog");
    } catch (err) {
      setMsg({ text: err instanceof Error ? err.message : "Erreur", type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <a href="/admin/blog" className="text-ivory/40 hover:text-ivory text-sm transition-colors">← Articles</a>
        <h1 className="font-display text-2xl text-ivory">Nouvel article</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="Titre" htmlFor="title" required>
          <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} required placeholder="Titre de l'article" />
        </Field>

        <Field label="Slug (URL)" htmlFor="slug" required hint="Exemple : mon-article-2026">
          <Input id="slug" value={slug} onChange={(e) => setSlug(slugify(e.target.value))} required placeholder="mon-article-2026" />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Catégorie" htmlFor="cat">
            <Input id="cat" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Manifeste" />
          </Field>
          <Field label="Temps de lecture" htmlFor="read">
            <Input id="read" value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="5 min" />
          </Field>
        </div>

        <Field label="Date de publication" htmlFor="date">
          <Input id="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="12 Avril 2026" />
        </Field>

        <Field label="Extrait" htmlFor="excerpt">
          <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Résumé court de l'article…" rows={3} />
        </Field>

        <Field label="Corps de l'article (paragraphes)" htmlFor="body">
          <ParagraphList value={body} onChange={setBody} />
        </Field>

        <Field label="Image de couverture (optionnel)" htmlFor="cover">
          <ImageUploader
            currentUrl={coverUrl}
            onUpload={setCoverUrl}
            onClear={() => setCoverUrl("")}
          />
        </Field>

        <Field label="Lien vidéo YouTube / Vimeo (optionnel)" htmlFor="video" hint="Exemple : https://www.youtube.com/watch?v=ABC123">
          <Input id="video" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=…" />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Couleur fond — début" htmlFor="cf">
            <div className="flex gap-3 items-center">
              <input type="color" value={colorFrom} onChange={(e) => setColorFrom(e.target.value)} className="h-10 w-14 cursor-pointer rounded border border-ivory/20 bg-transparent" />
              <Input value={colorFrom} onChange={(e) => setColorFrom(e.target.value)} className="flex-1" placeholder="#0b0b0c" />
            </div>
          </Field>
          <Field label="Couleur fond — fin" htmlFor="ct">
            <div className="flex gap-3 items-center">
              <input type="color" value={colorTo} onChange={(e) => setColorTo(e.target.value)} className="h-10 w-14 cursor-pointer rounded border border-ivory/20 bg-transparent" />
              <Input value={colorTo} onChange={(e) => setColorTo(e.target.value)} className="flex-1" placeholder="#1a1a1c" />
            </div>
          </Field>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <SubmitBtn loading={loading} label="Publier l'article" />
          <a href="/admin/blog" className="text-sm text-ivory/40 hover:text-ivory transition-colors">Annuler</a>
        </div>
        <StatusMsg msg={msg.text} type={msg.type} />
      </form>
    </div>
  );
}
