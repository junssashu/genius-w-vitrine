"use client";

import { createContext, useContext } from "react";
import type { Dictionary, Lang } from "@/lib/i18n/types";
import type { ThemePref } from "@/lib/server-prefs";

export type EffectiveTheme = "light" | "dark";

export type PreferencesValue = {
  theme: ThemePref;
  effectiveTheme: EffectiveTheme;
  lang: Lang;
  t: Dictionary;
  name: string | null;
  timezone: string | null;
  city: string | null;
  hour: number;
  setTheme: (t: ThemePref) => void;
  setLang: (l: Lang) => void;
  setName: (n: string) => void;
  cycleTheme: () => void;
  toggleLang: () => void;
};

export const PreferencesContext = createContext<PreferencesValue | null>(null);

export const usePreferences = (): PreferencesValue => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
};

export const useT = (): Dictionary => usePreferences().t;
