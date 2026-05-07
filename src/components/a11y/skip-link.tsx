"use client";

import { useT } from "@/components/providers/preferences-context";

export const SkipLink = () => {
  const t = useT();
  return (
    <a href="#main" className="skip-link">
      {t.common.skip}
    </a>
  );
};
