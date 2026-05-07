export type BandwidthTier = "slow" | "medium" | "fast";

const SLOW_TYPES = ["slow-2g", "2g"] as const;
const MEDIUM_TYPES = ["3g"] as const;

export const QUALITY: Record<BandwidthTier, number> = {
  slow: 45,
  medium: 68,
  fast: 86,
};

export const SIZES_PRESET = {
  cardThird: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  cardHalf: "(min-width: 640px) 50vw, 100vw",
  full: "100vw",
  hero: "(min-width: 1024px) 60vw, 100vw",
} as const;

type EffectiveType = "slow-2g" | "2g" | "3g" | "4g";

type NetworkInformation = {
  effectiveType?: EffectiveType;
  saveData?: boolean;
  addEventListener: (type: "change", listener: () => void) => void;
  removeEventListener: (type: "change", listener: () => void) => void;
};

type WithConnection = Navigator & { connection?: NetworkInformation };

const isSlow = (t: EffectiveType | undefined, save: boolean | undefined): boolean =>
  Boolean(save) || (t !== undefined && (SLOW_TYPES as readonly string[]).includes(t));

const isMedium = (t: EffectiveType | undefined): boolean =>
  t !== undefined && (MEDIUM_TYPES as readonly string[]).includes(t);

export const tierFor = (info: NetworkInformation | undefined): BandwidthTier => {
  if (!info) return "fast";
  if (isSlow(info.effectiveType, info.saveData)) return "slow";
  if (isMedium(info.effectiveType)) return "medium";
  return "fast";
};

export const getNetworkInfo = (): NetworkInformation | undefined =>
  typeof navigator === "undefined" ? undefined : (navigator as WithConnection).connection;
