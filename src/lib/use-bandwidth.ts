"use client";

import { useEffect, useState } from "react";
import { getNetworkInfo, tierFor, type BandwidthTier } from "./bandwidth";

export const useBandwidth = (): BandwidthTier => {
  const [tier, setTier] = useState<BandwidthTier>("fast");

  useEffect(() => {
    const info = getNetworkInfo();
    if (!info) return;
    const update = () => setTier(tierFor(info));
    update();
    info.addEventListener("change", update);
    return () => info.removeEventListener("change", update);
  }, []);

  return tier;
};
