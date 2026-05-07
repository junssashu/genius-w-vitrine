"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
  axis?: "y" | "x";
};

export const Parallax = ({ children, speed = 0.3, className, axis = "y" }: Props) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = 200 * speed;
  const transformed = useTransform(
    scrollYProgress,
    [0, 1],
    [-distance, distance]
  );
  const motionStyle = reduce
    ? undefined
    : axis === "y"
    ? { y: transformed }
    : { x: transformed };

  return (
    <div ref={ref} className={cn("relative will-change-transform", className)}>
      <motion.div style={motionStyle}>{children}</motion.div>
    </div>
  );
};
