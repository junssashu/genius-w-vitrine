"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";
import { COOKIE_KEYS, setCookie } from "@/lib/cookies";
import { detectTimezone, cityFromTimezone } from "@/lib/timezone";
import { isDaylight } from "@/lib/time";
import type { Lang } from "@/lib/i18n/types";
import type { ThemePref } from "@/lib/server-prefs";
import {
  PreferencesContext,
  type EffectiveTheme,
  type PreferencesValue,
} from "./preferences-context";

const HOUR_TICK_MS = 60_000;
const THEME_CYCLE: readonly ThemePref[] = ["auto", "light", "dark"] as const;

const resolveEffective = (pref: ThemePref, hour: number): EffectiveTheme =>
  pref === "auto" ? (isDaylight(hour) ? "light" : "dark") : pref;

type Initial = { theme: ThemePref; lang: Lang; name: string | null };

export const PreferencesProvider = ({
  initial,
  children,
}: { initial: Initial; children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemePref>(initial.theme);
  const [lang, setLangState] = useState<Lang>(initial.lang);
  const [name, setNameState] = useState<string | null>(initial.name);
  const [hour, setHour] = useState<number>(() => new Date().getHours());
  const [timezone, setTimezone] = useState<string | null>(null);

  useEffect(() => {
    setTimezone(detectTimezone());
    const tick = () => setHour(new Date().getHours());
    tick();
    const id = window.setInterval(tick, HOUR_TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  const effectiveTheme = useMemo(() => resolveEffective(theme, hour), [theme, hour]);

  useEffect(() => {
    document.documentElement.dataset.theme = effectiveTheme;
    document.documentElement.dataset.themePref = theme;
  }, [effectiveTheme, theme]);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const setTheme = useCallback((t: ThemePref) => {
    setThemeState(t);
    setCookie(COOKIE_KEYS.theme, t);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    setCookie(COOKIE_KEYS.lang, l);
  }, []);

  const setName = useCallback((n: string) => {
    const trimmed = n.trim();
    setNameState(trimmed || null);
    if (trimmed) setCookie(COOKIE_KEYS.name, trimmed);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((p) => {
      const i = THEME_CYCLE.indexOf(p);
      const next = THEME_CYCLE[(i + 1) % THEME_CYCLE.length];
      setCookie(COOKIE_KEYS.theme, next);
      return next;
    });
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((p) => {
      const next: Lang = p === "fr" ? "en" : "fr";
      setCookie(COOKIE_KEYS.lang, next);
      return next;
    });
  }, []);

  const value = useMemo<PreferencesValue>(
    () => ({
      theme,
      effectiveTheme,
      lang,
      t: DICTIONARIES[lang],
      name,
      timezone,
      city: cityFromTimezone(timezone),
      hour,
      setTheme,
      setLang,
      setName,
      cycleTheme,
      toggleLang,
    }),
    [theme, effectiveTheme, lang, name, timezone, hour, setTheme, setLang, setName, cycleTheme, toggleLang]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};
