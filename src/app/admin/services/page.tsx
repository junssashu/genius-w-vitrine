"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Field, Input, Textarea, FeatureList, SubmitBtn, StatusMsg,
} from "@/app/admin/_components/form";
import type { Service } from "@/lib/services";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [msg, setMsg] = useState({ text: "", type: "success" as "success" | "error" });

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) setServices(await res.json() as Service[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchServices(); }, [fetchServices]);

  const handleSave = async (e: React.FormEvent, idx: number) => {
    e.preventDefault();
    setSaving(idx);
    setMsg({ text: "", type: "success" });
    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(services),
      });
      if (!res.ok) throw new Error("Erreur");
      setMsg({ text: `Service "${services[idx].title}" enregistré`, type: "success" });
    } catch {
      setMsg({ text: "Erreur lors de la sauvegarde", type: "error" });
    } finally {
      setSaving(null);
    }
  };

  const setServiceField = <K extends keyof Service>(idx: number, key: K, value: Service[K]) => {
    setServices((prev) => prev.map((s, i) => i === idx ? { ...s, [key]: value } : s));
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-ivory">Services</h1>
      <p className="text-sm text-ivory/50">Modifiez les textes de chaque service. Les services ne peuvent pas être créés ou supprimés ici (ils font partie de la structure du site).</p>

      <StatusMsg msg={msg.text} type={msg.type} />

      {loading ? (
        <p className="text-ivory/40 text-sm py-8 text-center">Chargement…</p>
      ) : (
        <div className="flex flex-col gap-6">
          {services.map((service, idx) => (
            <form key={service.slug} onSubmit={(e) => void handleSave(e, idx)} className="border border-ivory/10 rounded-sm p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[0.68rem] tracking-[0.24em] uppercase text-gold-bright">{service.num} — {service.slug}</span>
                <a href={`/services#${service.slug}`} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-ivory/40 hover:text-gold-bright transition-colors">Voir →</a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Titre" htmlFor={`title-${idx}`} required>
                  <Input id={`title-${idx}`} value={service.title} onChange={(e) => setServiceField(idx, "title", e.target.value)} required />
                </Field>
                <Field label="Sous-titre" htmlFor={`sub-${idx}`}>
                  <Input id={`sub-${idx}`} value={service.subtitle} onChange={(e) => setServiceField(idx, "subtitle", e.target.value)} />
                </Field>
              </div>

              <Field label="Description" htmlFor={`desc-${idx}`}>
                <Textarea id={`desc-${idx}`} value={service.description} onChange={(e) => setServiceField(idx, "description", e.target.value)} rows={3} />
              </Field>

              <Field label="Caractéristiques" htmlFor={`feat-${idx}`}>
                <FeatureList value={[...service.features]} onChange={(v) => setServiceField(idx, "features", v)} />
              </Field>

              <div className="flex justify-end">
                <SubmitBtn loading={saving === idx} />
              </div>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}
