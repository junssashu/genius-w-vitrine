import { cookies, headers } from "next/headers";
import { COOKIE_KEYS } from "./cookies";
import { parseLangFromHeader, isLang } from "./locale";
import type { Lang } from "./i18n/types";

export type ThemePref = "light" | "dark" | "auto";
const DEFAULT_THEME: ThemePref = "auto";

const isThemePref = (v: string | null | undefined): v is ThemePref =>
  v === "light" || v === "dark" || v === "auto";

export type ServerPrefs = {
  lang: Lang;
  theme: ThemePref;
  name: string | null;
};

export const readServerPrefs = async (): Promise<ServerPrefs> => {
  const c = await cookies();
  const h = await headers();
  const cookieLang = c.get(COOKIE_KEYS.lang)?.value;
  const cookieTheme = c.get(COOKIE_KEYS.theme)?.value;
  const name = c.get(COOKIE_KEYS.name)?.value ?? null;
  const lang = isLang(cookieLang) ? cookieLang : parseLangFromHeader(h.get("accept-language"));
  const theme = isThemePref(cookieTheme) ? cookieTheme : DEFAULT_THEME;
  return { lang, theme, name };
};
