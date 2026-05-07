import type { DayPart } from "@/lib/time";
import type { Lang } from "./types";

const FR: Record<DayPart, string> = {
  morning: "Bonjour",
  afternoon: "Bel après-midi",
  evening: "Bonsoir",
  night: "Belle nuit",
};

const EN: Record<DayPart, string> = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
  night: "Good night",
};

const TABLE: Record<Lang, Record<DayPart, string>> = { fr: FR, en: EN };

export const greetingFor = (lang: Lang, part: DayPart): string => TABLE[lang][part];
