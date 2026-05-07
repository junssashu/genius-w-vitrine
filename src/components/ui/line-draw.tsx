"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const DRAW_DURATION = 1.6;
const EASE = [0.5, 0, 0.1, 1] as const;

type Props = {
  d: string;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  delay?: number;
};

const DEFAULT_VIEWBOX = "0 0 600 200";

export const LineDraw = ({
  d,
  viewBox = DEFAULT_VIEWBOX,
  stroke = "currentColor",
  strokeWidth = 1,
  className,
  delay = 0,
}: Props) => {
  const reduce = useReducedMotion();
  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={cn("overflow-visible", className)}
    >
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: DRAW_DURATION, delay, ease: EASE }}
      />
    </svg>
  );
};
