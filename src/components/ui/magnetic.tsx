"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const SPRING = { stiffness: 220, damping: 20, mass: 0.6 };
const PULL_RATIO = 0.35;
const FIELD_PX = 24;

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export const Magnetic = ({ children, className, intensity = PULL_RATIO }: Props) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * intensity);
    y.set((e.clientY - cy) * intensity);
  };

  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, padding: FIELD_PX, margin: -FIELD_PX }}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
};
