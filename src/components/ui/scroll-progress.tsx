"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const SPRING = { stiffness: 90, damping: 22, restDelta: 0.001 };

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING);
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[95] h-[2px] w-full origin-left bg-gradient-to-r from-gold via-gold-bright to-gold"
    />
  );
};
