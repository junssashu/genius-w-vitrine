const CITY_LABELS: Record<string, string> = {
  "Africa/Yaounde": "Yaoundé",
  "Africa/Douala": "Douala",
  "Africa/Lagos": "Lagos",
  "Africa/Abidjan": "Abidjan",
  "Africa/Dakar": "Dakar",
  "Africa/Casablanca": "Casablanca",
  "Africa/Tunis": "Tunis",
  "Africa/Algiers": "Alger",
  "Europe/Paris": "Paris",
  "Europe/Brussels": "Bruxelles",
  "Europe/London": "London",
  "Europe/Madrid": "Madrid",
  "Europe/Rome": "Rome",
  "Europe/Berlin": "Berlin",
  "America/New_York": "New York",
  "America/Los_Angeles": "Los Angeles",
  "America/Toronto": "Toronto",
  "America/Sao_Paulo": "São Paulo",
  "Asia/Tokyo": "Tokyo",
  "Asia/Dubai": "Dubaï",
};

export const cityFromTimezone = (tz: string | null | undefined): string | null => {
  if (!tz) return null;
  if (CITY_LABELS[tz]) return CITY_LABELS[tz];
  const tail = tz.split("/").pop();
  return tail ? tail.replace(/_/g, " ") : null;
};

export const detectTimezone = (): string | null => {
  if (typeof Intl === "undefined") return null;
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
  } catch {
    return null;
  }
};
