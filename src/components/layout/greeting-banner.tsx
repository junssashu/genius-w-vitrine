"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { usePreferences } from "@/components/providers/preferences-context";
import { dayPartFor } from "@/lib/time";
import { greetingFor } from "@/lib/i18n/greetings";

const TRANSITION = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const };

export const GreetingBanner = () => {
  const { lang, name, hour, city } = usePreferences();
  const greeting = greetingFor(lang, dayPartFor(hour));
  const salutation = name ? `${greeting}, ${name}.` : `${greeting}.`;
  return (
    <motion.aside
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={TRANSITION}
      className="container-edit pt-6 lg:pt-10 flex items-center justify-between gap-4 text-[0.7rem] tracking-[0.22em] uppercase text-ivory/55"
    >
      <span className="font-display normal-case tracking-normal text-base text-ivory/85 italic">
        {salutation}
      </span>
      {city ? (
        <span className="icon-row">
          <MapPin size={12} aria-hidden className="text-gold-bright" />
          {city}
        </span>
      ) : null}
    </motion.aside>
  );
};
