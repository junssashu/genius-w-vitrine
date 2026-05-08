"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Field, Input, Textarea, Select, ImageUploader, SubmitBtn, StatusMsg,
} from "@/app/admin/_components/form";
import type { Motif } from "@/lib/portfolio";

const MOTIFS: Motif[] = ["stripes", "weave", "dots", "arc", "grid", "gold"];

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function NewLookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "success" as "success" | "error" });

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Haute Couture");
  const [year, setYear] = useState("FW 26");
  const [description, setDescription] = useState("");
  const [motif, setMotif] = useState<Motif>("weave");
  const [colorFrom, setColorFrom] = useState("#0b0b0c");
  const [colorTo, setColorTo] = useState("#1a1a1c");
  const [colorAccent, setColorAccent] = useState("#b8945f");
  const [imageUrl, setImageUrl] = useState("");

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
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug, title, category, year, description, motif,
          palette: { from: colorFrom, to: colorTo, accent: colorAccent },
          ...(imageUrl ? { imageUrl } : {}),
        }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      router.push("/admin/portfolio");
    } catch (err) {
      setMsg({ text: err instanceof Error ? err.message : "Erreur", type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <a href="/admin/portfolio" className="text-ivory/40 hover:text-ivory text-sm transition-colors">← Portfolio</a>
        <h1 className="font-display text-2xl text-ivory">Nouveau look</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="Titre" htmlFor="title" required>
          <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} required placeholder="Nom du look" />
        </Field>

        <Field label="Slug (URL)" htmlFor="slug" required hint="Exemple : robe-obsidienne-fw26">
          <Input id="slug" value={slug} onChange={(e) => setSlug(slugify(e.target.value))} required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Catégorie" htmlFor="cat">
            <Input id="cat" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Haute Couture" />
          </Field>
          <Field label="Saison / Année" htmlFor="year">
            <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="FW 26" />
          </Field>
        </div>

        <Field label="Description" htmlFor="desc">
          <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Description courte du look…" />
        </Field>

        <Field label="Motif (si pas d'image)" htmlFor="motif">
          <Select id="motif" value={motif} onChange={(e) => setMotif(e.target.value as Motif)}>
            {MOTIFS.map((m) => <option key={m} value={m}>{m}</option>)}
          </Select>
        </Field>

        <Field label="Image du look (optionnel — remplace le motif)" htmlFor="img">
          <ImageUploader currentUrl={imageUrl} onUpload={setImageUrl} onClear={() => setImageUrl("")} />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Couleur — début" htmlFor="cf">
            <div className="flex gap-2 items-center">
              <input type="color" value={colorFrom} onChange={(e) => setColorFrom(e.target.value)} className="h-10 w-12 cursor-pointer rounded border border-ivory/20 bg-transparent" />
              <Input value={colorFrom} onChange={(e) => setColorFrom(e.target.value)} className="flex-1 text-xs" />
            </div>
          </Field>
          <Field label="Couleur — fin" htmlFor="ct">
            <div className="flex gap-2 items-center">
              <input type="color" value={colorTo} onChange={(e) => setColorTo(e.target.value)} className="h-10 w-12 cursor-pointer rounded border border-ivory/20 bg-transparent" />
              <Input value={colorTo} onChange={(e) => setColorTo(e.target.value)} className="flex-1 text-xs" />
            </div>
          </Field>
          <Field label="Couleur accent" htmlFor="ca">
            <div className="flex gap-2 items-center">
              <input type="color" value={colorAccent} onChange={(e) => setColorAccent(e.target.value)} className="h-10 w-12 cursor-pointer rounded border border-ivory/20 bg-transparent" />
              <Input value={colorAccent} onChange={(e) => setColorAccent(e.target.value)} className="flex-1 text-xs" />
            </div>
          </Field>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <SubmitBtn loading={loading} label="Créer le look" />
          <a href="/admin/portfolio" className="text-sm text-ivory/40 hover:text-ivory transition-colors">Annuler</a>
        </div>
        <StatusMsg msg={msg.text} type={msg.type} />
      </form>
    </div>
  );
}
