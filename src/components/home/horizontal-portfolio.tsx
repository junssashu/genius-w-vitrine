"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { LookCard } from "@/components/portfolio/look-card";
import { usePreferences } from "@/components/providers/preferences-context";
import { portfolio } from "@/lib/portfolio";

const TRACK_TRAVEL = 70;
const PIN_HEIGHT_VH = 220;
const SHOWCASE_COUNT = 5;

export const HorizontalPortfolio = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${TRACK_TRAVEL}%`]);
  const { t } = usePreferences();
  const looks = portfolio.slice(0, SHOWCASE_COUNT);
  const eyebrow = t.greeting.cinema;
  const title = t.greeting.cinemaTitle;

  return (
    <section
      ref={ref}
      aria-label={title}
      className="relative bg-ink"
      style={{ height: `${PIN_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container-edit pb-10 flex items-end justify-between gap-6">
          <Reveal className="flex flex-col gap-4">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="t-2 text-balance">{title}</h2>
          </Reveal>
          <Reveal>
            <span className="text-[0.7rem] tracking-[0.22em] uppercase text-ivory/55">
              {String(SHOWCASE_COUNT).padStart(2, "0")} {t.countLabel.pieces}
            </span>
          </Reveal>
        </div>
        <motion.ul
          style={reduce ? undefined : { x }}
          className="flex gap-8 px-[var(--pad-x)] will-change-transform"
        >
          {looks.map((look, i) => (
            <li key={look.slug} className="w-[68vw] sm:w-[42vw] lg:w-[28vw] shrink-0">
              <LookCard look={look} index={i} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
