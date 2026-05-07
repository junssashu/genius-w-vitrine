"use client";

import { useRouter } from "next/navigation";
import { usePreferences } from "@/components/providers/preferences-context";
import { cn } from "@/lib/cn";
import type { Lang } from "@/lib/i18n/types";

const SEGMENT = "px-2.5 py-1 text-[0.7rem] tracking-[0.2em] uppercase transition-colors";

export const LangToggle = () => {
  const { lang, setLang, t } = usePreferences();
  const router = useRouter();
  const pick = (next: Lang) => {
    if (next === lang) return;
    setLang(next);
    router.refresh();
  };
  return (
    <div role="group" aria-label={t.toggles.language} className="inline-flex items-center rounded-full border border-ivory/20 overflow-hidden">
      <button type="button" onClick={() => pick("fr")} aria-pressed={lang === "fr"} className={cn(SEGMENT, lang === "fr" ? "bg-ivory text-ink" : "text-ivory/70 hover:text-ivory")}>
        {t.toggles.fr}
      </button>
      <span className="h-3 w-px bg-ivory/20" aria-hidden />
      <button type="button" onClick={() => pick("en")} aria-pressed={lang === "en"} className={cn(SEGMENT, lang === "en" ? "bg-ivory text-ink" : "text-ivory/70 hover:text-ivory")}>
        {t.toggles.en}
      </button>
    </div>
  );
};
