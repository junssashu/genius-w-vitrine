"use client";

import type React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { Silhouette } from "@/components/ui/silhouette";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { useT } from "@/components/providers/preferences-context";

export const Hero = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const t = useT();
  const lines = [t.hero.line1, t.hero.line2, t.hero.line3, t.hero.line4];

  return (
    <section
      ref={ref}
      aria-label="GENIUS.W"
      className="relative min-h-[100svh] flex items-end overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 aurora opacity-80" />
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: y2 }}
        className="absolute -right-12 top-10 lg:right-10 lg:top-20 w-[42vw] max-w-[520px] opacity-70 mix-blend-screen"
      >
        <Silhouette variant="gown" alt="" className="h-[78vh] w-auto float" />
      </motion.div>
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: y1 }}
        className="absolute left-4 top-32 lg:left-12 lg:top-40 w-[28vw] max-w-[300px] opacity-30"
      >
        <Silhouette variant="cape" alt="" className="h-[55vh] w-auto" />
      </motion.div>

      <div className="container-edit relative pb-24 pt-40 lg:pt-32 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7 flex flex-col gap-7">
          <motion.span style={reduce ? undefined : { opacity }} className="eyebrow">
            {t.hero.eyebrow}
          </motion.span>
          <h1 className="t-display text-balance">
            {lines.map((l, i) => (
              <span key={`${l}-${i}`} className="block reveal-mask whitespace-nowrap">
                <span
                  className="rise"
                  style={{ "--rise-delay": `${i * 120}ms` } as React.CSSProperties}
                >
                  {l}
                </span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="lede max-w-xl"
          >
            {t.hero.lede}
          </motion.p>
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Magnetic><Button href="/portfolio" variant="primary">{t.cta.viewPieces}</Button></Magnetic>
            <Magnetic><Button href="/contact" variant="ghost">{t.cta.bookAppointment}</Button></Magnetic>
          </motion.div>
        </div>

        <aside className="lg:col-span-5 self-end lg:pl-8 flex flex-col gap-8">
          <p className="font-display italic text-ivory/70 text-balance">
            {t.hero.quote}
          </p>
          <div className="flex items-center justify-between text-[0.7rem] tracking-[0.22em] uppercase text-ivory/55 border-t border-ivory/10 pt-5">
            <span>{t.hero.seasons}</span>
            <Link href="#manifeste" className="link-underline icon-row">
              {t.hero.scrollHint} <ArrowDownRight size={14} aria-hidden />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
};
