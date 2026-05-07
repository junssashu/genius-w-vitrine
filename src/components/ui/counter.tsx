"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/cn";

const DURATION_MS = 1600;
const EASE = (t: number) => 1 - Math.pow(1 - t, 4);

type Props = {
  to: number;
  from?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
};

export const Counter = ({
  to,
  from = 0,
  suffix = "",
  prefix = "",
  className,
  duration = DURATION_MS,
}: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    let frame = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      setValue(Math.round(from + (to - from) * EASE(t)));
      if (t < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className={cn("nav-num", className)} aria-label={`${prefix}${to}${suffix}`}>
      {prefix}{value}{suffix}
    </span>
  );
};
