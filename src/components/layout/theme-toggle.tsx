"use client";

import { Sun, Moon, SunMoon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreferences } from "@/components/providers/preferences-context";
import type { ThemePref } from "@/lib/server-prefs";

const ICON = 16;
const TRANSITION = { duration: 0.35 };

const PreferIcon = ({ pref }: { pref: ThemePref }) => {
  if (pref === "light") return <Sun size={ICON} aria-hidden />;
  if (pref === "dark") return <Moon size={ICON} aria-hidden />;
  return <SunMoon size={ICON} aria-hidden />;
};

const labelFor = (pref: ThemePref, fr: { auto: string; light: string; dark: string }) => {
  if (pref === "light") return fr.light;
  if (pref === "dark") return fr.dark;
  return fr.auto;
};

export const ThemeToggle = () => {
  const { theme, cycleTheme, t, lang } = usePreferences();
  const labels = lang === "fr"
    ? { auto: "Auto (heure du jour)", light: "Clair", dark: "Sombre" }
    : { auto: "Auto (time of day)", light: "Light", dark: "Dark" };
  const current = labelFor(theme, labels);
  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`${t.toggles.theme} : ${current}`}
      title={current}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 hover:border-gold-bright transition-colors overflow-hidden"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={TRANSITION}
        >
          <PreferIcon pref={theme} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
