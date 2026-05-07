"use client";

import { Plus } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Faq } from "@/lib/faqs";

type Props = { item: Faq; index: number };

export const FaqItem = ({ item, index }: Props) => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const id = `faq-panel-${index}`;
  const btn = `faq-btn-${index}`;
  return (
    <li className="border-b border-ivory/10 group">
      <h3>
        <button
          id={btn}
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-baseline justify-between gap-6 py-7 text-left"
        >
          <span className="flex items-baseline gap-5">
            <span className="nav-num text-xs text-gold-bright/80">{String(index + 1).padStart(2, "0")}</span>
            <span className="font-display text-xl md:text-2xl text-ivory text-balance">{item.q}</span>
          </span>
          <Plus
            aria-hidden
            size={20}
            className={cn("shrink-0 text-gold-bright transition-transform duration-500", open && "rotate-45")}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={id}
            role="region"
            aria-labelledby={btn}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 pl-12 max-w-3xl text-ivory/75 leading-relaxed">{item.a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
};
