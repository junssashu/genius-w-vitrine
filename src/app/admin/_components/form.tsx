"use client";

import { useState, useRef, type ReactNode } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/* ── Field wrapper ── */
export function Field({
  label,
  htmlFor,
  required,
  children,
  hint,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[0.68rem] tracking-[0.22em] uppercase text-ivory/60">
        {label}{required && <span className="text-gold-bright ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-ivory/35">{hint}</p>}
    </div>
  );
}

/* ── Base input styles ── */
const inputCls =
  "w-full bg-transparent border border-ivory/20 rounded px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/25 focus:outline-none focus:border-gold-bright transition-colors";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputCls, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...props} className={cn(inputCls, "resize-y min-h-[100px]", props.className)} />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(inputCls, "cursor-pointer", props.className)}>
      {props.children}
    </select>
  );
}

/* ── Dynamic paragraph list for blog body ── */
export function ParagraphList({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const add = () => onChange([...value, ""]);
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const update = (i: number, v: string) =>
    onChange(value.map((p, idx) => (idx === i ? v : p)));

  return (
    <div className="flex flex-col gap-3">
      {value.map((para, i) => (
        <div key={i} className="relative">
          <Textarea
            value={para}
            onChange={(e) => update(i, e.target.value)}
            placeholder={`Paragraphe ${i + 1}…`}
            rows={4}
          />
          {value.length > 1 && (
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-2 right-2 text-ivory/30 hover:text-red-400 transition-colors"
              aria-label="Supprimer ce paragraphe"
            >
              <X size={14} />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="self-start text-xs tracking-[0.18em] uppercase text-gold-bright/70 hover:text-gold-bright transition-colors"
      >
        + Ajouter un paragraphe
      </button>
    </div>
  );
}

/* ── Feature list (for services) ── */
export function FeatureList({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const add = () => onChange([...value, ""]);
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const update = (i: number, v: string) =>
    onChange(value.map((f, idx) => (idx === i ? v : f)));

  return (
    <div className="flex flex-col gap-2">
      {value.map((feat, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={feat}
            onChange={(e) => update(i, e.target.value)}
            placeholder={`Caractéristique ${i + 1}…`}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="shrink-0 text-ivory/30 hover:text-red-400 transition-colors"
            aria-label="Supprimer"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="self-start text-xs tracking-[0.18em] uppercase text-gold-bright/70 hover:text-gold-bright transition-colors"
      >
        + Ajouter
      </button>
    </div>
  );
}

/* ── Image uploader ── */
export function ImageUploader({
  currentUrl,
  onUpload,
  onClear,
}: {
  currentUrl?: string;
  onUpload: (url: string) => void;
  onClear: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onUpload(data.url!);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur d'upload");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) void handleFile(file);
  };

  return (
    <div className="flex flex-col gap-3">
      {currentUrl ? (
        <div className="relative w-full max-w-xs aspect-square rounded border border-ivory/20 overflow-hidden">
          <Image src={currentUrl} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-2 right-2 p-1 rounded-full bg-ink/70 text-ivory hover:bg-red-900/80 transition-colors"
            aria-label="Supprimer l'image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border border-dashed border-ivory/20 rounded p-8 flex flex-col items-center gap-3 text-center cursor-pointer hover:border-gold-bright/50 hover:bg-ivory/[0.02] transition-colors"
        >
          <Upload size={24} className="text-ivory/30" aria-hidden />
          <p className="text-sm text-ivory/50">
            {uploading ? "Upload en cours…" : "Cliquer ou déposer une image"}
          </p>
          <p className="text-xs text-ivory/30">JPEG, PNG, WebP — max 8 Mo</p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        onChange={handleChange}
      />
      {error && <p className="text-xs text-red-400" role="alert">{error}</p>}
    </div>
  );
}

/* ── Submit button ── */
export function SubmitBtn({ loading, label = "Enregistrer" }: { loading?: boolean; label?: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="px-6 py-2.5 rounded bg-gold-bright text-ink text-sm font-medium tracking-[0.15em] uppercase transition-all hover:brightness-110 disabled:opacity-50"
    >
      {loading ? "Enregistrement…" : label}
    </button>
  );
}

/* ── Danger button ── */
export function DangerBtn({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded border border-red-900/50 text-red-400 text-sm hover:bg-red-900/20 transition-colors"
    >
      {children}
    </button>
  );
}

/* ── Page heading ── */
export function AdminHeading({ title, back, backLabel = "Retour" }: { title: string; back?: string; backLabel?: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      {back && (
        <a href={back} className="text-ivory/40 hover:text-ivory transition-colors text-sm">← {backLabel}</a>
      )}
      <h1 className="font-display text-2xl text-ivory">{title}</h1>
    </div>
  );
}

/* ── Status message ── */
export function StatusMsg({ msg, type = "success" }: { msg: string; type?: "success" | "error" }) {
  if (!msg) return null;
  return (
    <p
      role="status"
      className={cn(
        "text-sm px-4 py-2.5 rounded border",
        type === "success"
          ? "border-green-800/50 text-green-400 bg-green-950/30"
          : "border-red-800/50 text-red-400 bg-red-950/30"
      )}
    >
      {msg}
    </p>
  );
}
