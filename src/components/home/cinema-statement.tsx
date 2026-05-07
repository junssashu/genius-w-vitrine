"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { LineDraw } from "@/components/ui/line-draw";
import { SplitText } from "@/components/ui/split-text";
import { usePreferences } from "@/components/providers/preferences-context";

const PIN_HEIGHT_VH = 180;
const SCALE_FROM = 0.6;
const SCALE_TO = 1.4;
const ROTATE_DEG = 8;
const SIGNATURE_PATH = "M 20 150 C 120 30, 220 220, 320 90 S 520 50, 580 150";
const SIGNATURE_VIEWBOX = "0 0 600 200";

export const CinemaStatement = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [SCALE_FROM, 1, SCALE_TO]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-ROTATE_DEG, ROTATE_DEG]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const { t } = usePreferences();
  const c = t.greeting;

  return (
    <section
      ref={ref}
      aria-label={`${c.line1} ${c.line2} ${c.line3} ${c.line4}`}
      className="relative bg-ink overflow-hidden"
      style={{ height: `${PIN_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div aria-hidden className="absolute inset-0 aurora opacity-50" />
        <motion.div
          style={reduce ? undefined : { scale, rotate, opacity }}
          className="container-edit text-center flex flex-col items-center gap-2"
        >
          <span className="eyebrow mb-4">{c.statement}</span>
          <SplitText as="h2" text={c.line1} className="font-editorial text-[clamp(3rem,12vw,12rem)] leading-[0.9]" />
          <SplitText as="h2" text={c.line2} className="font-editorial italic text-gold-bright text-[clamp(3rem,12vw,12rem)] leading-[0.9]" />
          <SplitText as="h2" text={c.line3} className="font-editorial text-[clamp(3rem,12vw,12rem)] leading-[0.9]" />
          <SplitText as="h2" text={c.line4} className="font-editorial italic text-[clamp(3rem,12vw,12rem)] leading-[0.9]" />
          <LineDraw
            d={SIGNATURE_PATH}
            viewBox={SIGNATURE_VIEWBOX}
            stroke="var(--gold-bright)"
            strokeWidth={1.4}
            className="mt-6 h-12 w-72"
            delay={0.4}
          />
        </motion.div>
      </div>
    </section>
  );
};
