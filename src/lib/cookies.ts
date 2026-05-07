const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export const COOKIE_KEYS = {
  theme: "gw_theme",
  lang: "gw_lang",
  name: "gw_name",
  tz: "gw_tz",
} as const;

export type CookieKey = (typeof COOKIE_KEYS)[keyof typeof COOKIE_KEYS];

export const setCookie = (name: CookieKey, value: string, maxAge = ONE_YEAR_SECONDS) => {
  if (typeof document === "undefined") return;
  const v = encodeURIComponent(value);
  document.cookie = `${name}=${v}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
};

export const getCookie = (name: CookieKey): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};
