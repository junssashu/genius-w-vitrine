"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  Field, Input, Textarea, Select, ImageUploader, SubmitBtn, DangerBtn, StatusMsg,
} from "@/app/admin/_components/form";
import type { Look, Motif } from "@/lib/portfolio";

const MOTIFS: Motif[] = ["stripes", "weave", "dots", "arc", "grid", "gold"];

export default function EditLookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [look, setLook] = useState<Look | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "success" as "success" | "error" });

  useEffect(() => {
    fetch(`/api/admin/portfolio/${slug}`)
      .then((r) => r.json())
      .then((data: Look) => { setLook(data); setLoading(false); })
      .catch(() => { setMsg({ text: "Look introuvable", type: "error" }); setLoading(false); });
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!look) return;
    setSaving(true);
    setMsg({ text: "", type: "success" });
    try {
      const res = await fetch(`/api/admin/portfolio/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(look),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setMsg({ text: "Look enregistré", type: "success" });
    } catch (err) {
      setMsg({ text: err instanceof Error ? err.message : "Erreur", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer ce look définitivement ?")) return;
    const res = await fetch(`/api/admin/portfolio/${slug}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/portfolio");
  };

  if (loading) return <p className="text-ivory/40 text-sm py-8">Chargement…</p>;
  if (!look) return <p className="text-red-400 text-sm py-8">Look introuvable.</p>;

  const setF = <K extends keyof Look>(k: K, v: Look[K]) => setLook((p) => p ? { ...p, [k]: v } : p);

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a href="/admin/portfolio" className="text-ivory/40 hover:text-ivory text-sm transition-colors">← Portfolio</a>
          <h1 className="font-display text-2xl text-ivory">Éditer le look</h1>
        </div>
        <a href={`/portfolio/${slug}`} target="_blank" rel="noopener noreferrer"
          className="text-xs text-ivory/40 hover:text-gold-bright transition-colors">Voir →</a>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="Titre" htmlFor="title" required>
          <Input id="title" value={look.title} onChange={(e) => setF("title", e.target.value)} required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Catégorie" htmlFor="cat">
            <Input id="cat" value={look.category} onChange={(e) => setF("category", e.target.value)} />
          </Field>
          <Field label="Saison" htmlFor="year">
            <Input id="year" value={look.year} onChange={(e) => setF("year", e.target.value)} />
          </Field>
        </div>

        <Field label="Description" htmlFor="desc">
          <Textarea id="desc" value={look.description} onChange={(e) => setF("description", e.target.value)} rows={3} />
        </Field>

        <Field label="Motif (si pas d'image)" htmlFor="motif">
          <Select id="motif" value={look.motif} onChange={(e) => setF("motif", e.target.value as Motif)}>
            {MOTIFS.map((m) => <option key={m} value={m}>{m}</option>)}
          </Select>
        </Field>

        <Field label="Image du look (remplace le motif)" htmlFor="img">
          <ImageUploader
            currentUrl={look.imageUrl}
            onUpload={(url) => setF("imageUrl", url)}
            onClear={() => setLook((p) => p ? { ...p, imageUrl: undefined } : p)}
          />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Couleur — début" htmlFor="cf">
            <div className="flex gap-2 items-center">
              <input type="color" value={look.palette.from} onChange={(e) => setF("palette", { ...look.palette, from: e.target.value })} className="h-10 w-12 cursor-pointer rounded border border-ivory/20 bg-transparent" />
              <Input value={look.palette.from} onChange={(e) => setF("palette", { ...look.palette, from: e.target.value })} className="flex-1 text-xs" />
            </div>
          </Field>
          <Field label="Couleur — fin" htmlFor="ct">
            <div className="flex gap-2 items-center">
              <input type="color" value={look.palette.to} onChange={(e) => setF("palette", { ...look.palette, to: e.target.value })} className="h-10 w-12 cursor-pointer rounded border border-ivory/20 bg-transparent" />
              <Input value={look.palette.to} onChange={(e) => setF("palette", { ...look.palette, to: e.target.value })} className="flex-1 text-xs" />
            </div>
          </Field>
          <Field label="Accent" htmlFor="ca">
            <div className="flex gap-2 items-center">
              <input type="color" value={look.palette.accent} onChange={(e) => setF("palette", { ...look.palette, accent: e.target.value })} className="h-10 w-12 cursor-pointer rounded border border-ivory/20 bg-transparent" />
              <Input value={look.palette.accent} onChange={(e) => setF("palette", { ...look.palette, accent: e.target.value })} className="flex-1 text-xs" />
            </div>
          </Field>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <SubmitBtn loading={saving} />
            <a href="/admin/portfolio" className="text-sm text-ivory/40 hover:text-ivory transition-colors">Annuler</a>
          </div>
          <DangerBtn onClick={() => void handleDelete()}>Supprimer</DangerBtn>
        </div>
        <StatusMsg msg={msg.text} type={msg.type} />
      </form>
    </div>
  );
}
