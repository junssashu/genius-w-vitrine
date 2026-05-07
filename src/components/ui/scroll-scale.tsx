"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const DEFAULT_FROM = 0.85;
const DEFAULT_TO = 1.05;

type Props = {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
};

export const ScrollScale = ({
  children,
  className,
  from = DEFAULT_FROM,
  to = DEFAULT_TO,
}: Props) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      <motion.div style={reduce ? undefined : { scale }} className="origin-center">
        {children}
      </motion.div>
    </div>
  );
};
