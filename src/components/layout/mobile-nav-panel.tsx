"use client";

import { motion, AnimatePresence } from "framer-motion";
import { NavLinksList } from "./nav-links-list";
import { ThemeToggle } from "./theme-toggle";
import { LangToggle } from "./lang-toggle";
import { SocialLinks } from "@/components/ui/social-links";
import { useT } from "@/components/providers/preferences-context";
import { brand } from "@/lib/brand";

type Props = { open: boolean; onClose: () => void };

const PANEL = { duration: 0.6, ease: [0.7, 0, 0.2, 1] as const };

export const MobileNavPanel = ({ open, onClose }: Props) => {
  const t = useT();
  return (
  <AnimatePresence>
    {open ? (
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t.common.siteSection}
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        exit={{ clipPath: "inset(0 0 100% 0)" }}
        transition={PANEL}
        className="fixed inset-0 z-[80] bg-ink"
      >
        <div className="absolute inset-0 aurora opacity-50" aria-hidden />
        <div className="container-edit relative h-full pt-28 pb-12 flex flex-col gap-10 overflow-y-auto">
          <NavLinksList variant="mobile" onNavigate={onClose} />
          <div className="flex items-center gap-3 pt-2">
            <LangToggle />
            <ThemeToggle />
          </div>
          <footer className="mt-auto pt-8 border-t border-ivory/10 flex flex-col gap-4">
            <p className="text-xs tracking-[0.22em] uppercase text-ivory/50">
              {brand.city} · {brand.country}
            </p>
            <SocialLinks variant="row" />
          </footer>
        </div>
      </motion.div>
    ) : null}
  </AnimatePresence>
  );
};
