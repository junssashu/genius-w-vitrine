"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Reveal } from "@/components/ui/reveal";
import { LookCard } from "@/components/portfolio/look-card";
import { usePreferences } from "@/components/providers/preferences-context";
import { portfolio, type Look } from "@/lib/portfolio";

const TRACK_TRAVEL = 70;
const PIN_HEIGHT_VH = 220;
const SHOWCASE_COUNT = 5;

type Props = { looks?: Look[] };

export const HorizontalPortfolio = ({ looks: looksProp }: Props) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${TRACK_TRAVEL}%`]);
  const { t } = usePreferences();
  const looks = (looksProp ?? portfolio).slice(0, SHOWCASE_COUNT);
  const eyebrow = t.greeting.cinema;
  const title = t.greeting.cinemaTitle;

  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const header = (
    <div className="container-edit pb-8 lg:pb-10 flex items-end justify-between gap-6">
      <Reveal className="flex flex-col gap-4">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="t-2 text-balance">{title}</h2>
      </Reveal>
      <Reveal>
        <span className="text-[0.7rem] tracking-[0.22em] uppercase text-ivory/55">
          {String(looks.length).padStart(2, "0")} {t.countLabel.pieces}
        </span>
      </Reveal>
    </div>
  );

  /* ── Mobile: simple horizontal snap scroll ── */
  if (!isDesktop) {
    return (
      <section aria-label={title} className="relative bg-ink py-16">
        {header}
        <ul
          className="flex gap-5 px-[var(--pad-x)] overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {looks.map((look, i) => (
            <li key={look.slug} className="w-[72vw] sm:w-[44vw] shrink-0 snap-start">
              <LookCard look={look} index={i} />
            </li>
          ))}
          {/* trailing spacer */}
          <li className="w-[var(--pad-x)] shrink-0" aria-hidden />
        </ul>
      </section>
    );
  }

  /* ── Desktop: parallax horizontal scroll ── */
  return (
    <section
      ref={ref}
      aria-label={title}
      className="relative bg-ink"
      style={{ height: `${PIN_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {header}
        <motion.ul
          style={reduce ? undefined : { x }}
          className="flex gap-8 px-[var(--pad-x)] will-change-transform"
        >
          {looks.map((look, i) => (
            <li key={look.slug} className="w-[42vw] lg:w-[28vw] shrink-0">
              <LookCard look={look} index={i} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
