"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT, usePreferences } from "@/components/providers/preferences-context";

type Status = "idle" | "submitting" | "sent";
const SUBMIT_DELAY_MS = 700;

const FIELD = "bg-transparent border-b border-ivory/25 py-4 px-1 outline-none focus:border-gold-bright transition-colors text-ivory placeholder:text-ivory/40";
const LABEL = "text-[0.65rem] tracking-[0.22em] uppercase text-ivory/55";

export const ContactForm = () => {
  const t = useT();
  const c = t.contact.detail;
  const { name: savedName, setName: persistName } = usePreferences();
  const [status, setStatus] = useState<Status>("idle");
  const [name, setNameField] = useState("");

  useEffect(() => { if (savedName) setNameField(savedName); }, [savedName]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) persistName(name.trim());
    setStatus("submitting");
    setTimeout(() => setStatus("sent"), SUBMIT_DELAY_MS);
  };

  if (status === "sent") {
    return (
      <div role="status" className="card-edit flex flex-col items-start gap-5">
        <CheckCircle2 className="text-gold-bright" aria-hidden />
        <h3 className="t-3">{c.received}</h3>
        <p className="text-ivory/70 leading-relaxed">{c.receivedLede}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2" aria-label={t.cross.contact.title}>
      <label className="flex flex-col gap-3 md:col-span-1">
        <span className={LABEL}>{c.nameLbl}</span>
        <input required name="name" autoComplete="name" value={name} onChange={(e) => setNameField(e.target.value)} className={FIELD} placeholder={c.namePh} />
      </label>
      <label className="flex flex-col gap-3 md:col-span-1">
        <span className={LABEL}>{c.emailLbl}</span>
        <input required type="email" name="email" autoComplete="email" className={FIELD} placeholder={c.emailPh} />
      </label>
      <label className="flex flex-col gap-3 md:col-span-1">
        <span className={LABEL}>{c.phoneLbl}</span>
        <input name="phone" type="tel" autoComplete="tel" className={FIELD} placeholder={c.phonePh} />
      </label>
      <label className="flex flex-col gap-3 md:col-span-1">
        <span className={LABEL}>{c.kindLbl}</span>
        <select name="kind" className={`${FIELD} appearance-none`}>
          <option value="haute-couture">{c.kinds.hc}</option>
          <option value="couture-mixte">{c.kinds.mix}</option>
          <option value="pret-a-porter">{c.kinds.rtw}</option>
          <option value="accessoires">{c.kinds.acc}</option>
          <option value="autre">{c.kinds.other}</option>
        </select>
      </label>
      <label className="flex flex-col gap-3 md:col-span-2">
        <span className={LABEL}>{c.messageLbl}</span>
        <textarea required name="message" rows={5} className={FIELD} placeholder={c.messagePh} />
      </label>
      <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-6">
        <p className="text-[0.65rem] tracking-[0.22em] uppercase text-ivory/45">{c.reply}</p>
        <Button type="submit" variant="gold" disabled={status === "submitting"}>
          <Send size={14} aria-hidden />
          {status === "submitting" ? t.cta.sending : t.cta.send}
        </Button>
      </div>
    </form>
  );
};
