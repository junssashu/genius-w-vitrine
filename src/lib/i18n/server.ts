import { readServerPrefs } from "../server-prefs";
import { DICTIONARIES } from "./dictionaries";
import type { Dictionary, Lang } from "./types";

export const getServerDict = async (): Promise<Dictionary> => {
  const { lang } = await readServerPrefs();
  return DICTIONARIES[lang];
};

export const getServerLang = async (): Promise<Lang> => {
  const { lang } = await readServerPrefs();
  return lang;
};
