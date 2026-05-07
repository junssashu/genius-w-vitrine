import type { Lang } from "./i18n/types";

const SUPPORTED: readonly Lang[] = ["fr", "en"];
const DEFAULT_LANG: Lang = "fr";

export const parseLangFromHeader = (header: string | null | undefined): Lang => {
  if (!header) return DEFAULT_LANG;
  const tags = header.split(",").map((p) => p.trim().split(";")[0].toLowerCase());
  for (const tag of tags) {
    const base = tag.split("-")[0];
    if (SUPPORTED.includes(base as Lang)) return base as Lang;
  }
  return DEFAULT_LANG;
};

export const isLang = (v: string | null | undefined): v is Lang =>
  v === "fr" || v === "en";
