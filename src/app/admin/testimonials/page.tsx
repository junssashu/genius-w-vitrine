"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  Field, Input, Textarea, SubmitBtn, DangerBtn, StatusMsg,
} from "@/app/admin/_components/form";
import type { Testimonial } from "@/lib/testimonials";

type EditState = { idx: number; data: Testimonial } | null;

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editState, setEditState] = useState<EditState>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "success" as "success" | "error" });
  const [isNew, setIsNew] = useState(false);
  const [newItem, setNewItem] = useState<Testimonial>({ name: "", role: "", city: "", text: "" });

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) setItems(await res.json() as Testimonial[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchItems(); }, [fetchItems]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editState) return;
    setSaving(true);
    setMsg({ text: "", type: "success" });
    try {
      const res = await fetch(`/api/admin/testimonials/${editState.idx}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editState.data),
      });
      if (!res.ok) throw new Error("Erreur");
      const updated = [...items];
      updated[editState.idx] = editState.data;
      setItems(updated);
      setEditState(null);
      setMsg({ text: "Témoignage enregistré", type: "success" });
    } catch {
      setMsg({ text: "Erreur lors de la sauvegarde", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (idx: number) => {
    if (!confirm("Supprimer ce témoignage ?")) return;
    const res = await fetch(`/api/admin/testimonials/${idx}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((_, i) => i !== idx));
      if (editState?.idx === idx) setEditState(null);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) throw new Error("Erreur");
      setIsNew(false);
      setNewItem({ name: "", role: "", city: "", text: "" });
      void fetchItems();
      setMsg({ text: "Témoignage ajouté", type: "success" });
    } catch {
      setMsg({ text: "Erreur lors de la création", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-ivory">Témoignages</h1>
        <button
          onClick={() => { setIsNew(true); setEditState(null); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-gold-bright text-ink text-xs font-medium tracking-[0.15em] uppercase hover:brightness-110 transition-all"
        >
          <Plus size={14} aria-hidden /> Ajouter
        </button>
      </div>

      <StatusMsg msg={msg.text} type={msg.type} />

      {/* New testimonial form */}
      {isNew && (
        <form onSubmit={handleCreate} className="border border-gold-bright/30 rounded-sm p-5 flex flex-col gap-4 bg-gold-bright/[0.03]">
          <p className="text-[0.68rem] tracking-[0.2em] uppercase text-gold-bright">Nouveau témoignage</p>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Nom" htmlFor="nn" required>
              <Input id="nn" value={newItem.name} onChange={(e) => setNewItem((p) => ({ ...p, name: e.target.value }))} required />
            </Field>
            <Field label="Rôle" htmlFor="nr">
              <Input id="nr" value={newItem.role} onChange={(e) => setNewItem((p) => ({ ...p, role: e.target.value }))} />
            </Field>
            <Field label="Ville" htmlFor="nc">
              <Input id="nc" value={newItem.city} onChange={(e) => setNewItem((p) => ({ ...p, city: e.target.value }))} />
            </Field>
          </div>
          <Field label="Témoignage" htmlFor="nt" required>
            <Textarea id="nt" value={newItem.text} onChange={(e) => setNewItem((p) => ({ ...p, text: e.target.value }))} rows={3} required />
          </Field>
          <div className="flex gap-3">
            <SubmitBtn loading={saving} label="Ajouter" />
            <button type="button" onClick={() => setIsNew(false)} className="text-sm text-ivory/40 hover:text-ivory transition-colors">Annuler</button>
          </div>
        </form>
      )}

      {/* List */}
      {loading ? (
        <p className="text-ivory/40 text-sm py-8 text-center">Chargement…</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item, idx) => (
            <li key={idx} className="border border-ivory/10 rounded-sm">
              {editState?.idx === idx ? (
                <form onSubmit={handleSave} className="p-4 flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Nom" htmlFor={`n-${idx}`} required>
                      <Input id={`n-${idx}`} value={editState.data.name} onChange={(e) => setEditState((p) => p && { ...p, data: { ...p.data, name: e.target.value } })} required />
                    </Field>
                    <Field label="Rôle" htmlFor={`r-${idx}`}>
                      <Input id={`r-${idx}`} value={editState.data.role} onChange={(e) => setEditState((p) => p && { ...p, data: { ...p.data, role: e.target.value } })} />
                    </Field>
                    <Field label="Ville" htmlFor={`c-${idx}`}>
                      <Input id={`c-${idx}`} value={editState.data.city} onChange={(e) => setEditState((p) => p && { ...p, data: { ...p.data, city: e.target.value } })} />
                    </Field>
                  </div>
                  <Field label="Témoignage" htmlFor={`t-${idx}`} required>
                    <Textarea id={`t-${idx}`} value={editState.data.text} onChange={(e) => setEditState((p) => p && { ...p, data: { ...p.data, text: e.target.value } })} rows={4} required />
                  </Field>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <SubmitBtn loading={saving} />
                      <button type="button" onClick={() => setEditState(null)} className="text-sm text-ivory/40 hover:text-ivory transition-colors">Annuler</button>
                    </div>
                    <DangerBtn onClick={() => void handleDelete(idx)}>Supprimer</DangerBtn>
                  </div>
                </form>
              ) : (
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ivory">{item.name} <span className="text-ivory/50 font-normal">— {item.role}, {item.city}</span></p>
                    <p className="text-sm text-ivory/60 mt-1 line-clamp-2">« {item.text} »</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => setEditState({ idx, data: { ...item } })} className="text-xs text-ivory/40 hover:text-gold-bright transition-colors">Éditer</button>
                    <button onClick={() => void handleDelete(idx)} className="text-ivory/30 hover:text-red-400 transition-colors" aria-label="Supprimer">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
