"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT, usePreferences } from "@/components/providers/preferences-context";

export type Comment = {
  id: string;
  name: string;
  text: string;
  date: string;
};

type Props = { onSubmit: (c: Comment) => void };

const MIN_TEXT = 4;
const MIN_NAME = 2;

const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const CommentForm = ({ onSubmit }: Props) => {
  const t = useT();
  const c = t.blog.comments;
  const { name: savedName, setName: persistName } = usePreferences();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { if (savedName) setName(savedName); }, [savedName]);

  const handle = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < MIN_NAME) return setError(c.errorName);
    if (text.trim().length < MIN_TEXT) return setError(c.errorText);
    setError(null);
    persistName(name.trim());
    onSubmit({ id: makeId(), name: name.trim(), text: text.trim(), date: new Date().toISOString() });
    setText("");
  };

  return (
    <form onSubmit={handle} className="flex flex-col gap-5" aria-label={c.heading}>
      <div className="grid sm:grid-cols-3 gap-5">
        <label className="flex flex-col gap-2 sm:col-span-1">
          <span className="text-[0.65rem] tracking-[0.22em] uppercase text-ivory/60">{c.nameLabel}</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required minLength={MIN_NAME} className="bg-transparent border-b border-ivory/25 py-3 px-1 focus:border-gold-bright outline-none transition-colors" placeholder={c.namePlaceholder} />
        </label>
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-[0.65rem] tracking-[0.22em] uppercase text-ivory/60">{c.commentLabel}</span>
          <input value={text} onChange={(e) => setText(e.target.value)} required minLength={MIN_TEXT} className="bg-transparent border-b border-ivory/25 py-3 px-1 focus:border-gold-bright outline-none transition-colors" placeholder={c.commentPlaceholder} />
        </label>
      </div>
      {error ? <p role="alert" className="text-sm text-wine">{error}</p> : null}
      <div className="flex items-center justify-between gap-3 pt-2">
        <p className="text-[0.65rem] tracking-[0.22em] uppercase text-ivory/40">{c.storedNotice}</p>
        <Button type="submit" variant="gold">
          <Send size={14} aria-hidden /> {t.cta.publish}
        </Button>
      </div>
    </form>
  );
};
