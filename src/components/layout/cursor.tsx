"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";
import { usePreferences } from "@/components/providers/preferences-context";

const SPRING = { stiffness: 280, damping: 28, mass: 0.5 };
const HOVER_SELECTOR = "a, button, [role='button'], [data-cursor='hover']";
const VIEW_SELECTOR = "[data-cursor='view']";
const RING_SCALE_HOVER = 1.6;
const RING_SCALE_VIEW = 3.4;
const DOT_SCALE_HOVER = 2.4;

type Mode = "default" | "hover" | "view";

const matchMode = (el: Element | null): Mode => {
  if (!el) return "default";
  if (el.closest(VIEW_SELECTOR)) return "view";
  if (el.closest(HOVER_SELECTOR)) return "hover";
  return "default";
};

export const Cursor = () => {
  const reduce = useReducedMotion();
  const { t } = usePreferences();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  const [mode, setMode] = useState<Mode>("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const supported =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      window.innerWidth > 1024;
    setEnabled(supported && !reduce);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const onOver = (e: MouseEvent) => {
      setMode(matchMode(e.target instanceof Element ? e.target : null));
    };
    const onOut = () => setMode("default");
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const ring = mode === "view" ? RING_SCALE_VIEW : mode === "hover" ? RING_SCALE_HOVER : 1;
  const dot = mode === "default" ? 1 : DOT_SCALE_HOVER;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: dot, opacity: mode === "default" ? 1 : 0.3 }}
          transition={{ duration: 0.35 }}
          className="h-2 w-2 rounded-full bg-ivory"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9997] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: ring, backgroundColor: mode === "view" ? "var(--gold-bright)" : "transparent" }}
          transition={{ duration: 0.45 }}
          className="h-10 w-10 rounded-full border border-gold-bright/60 flex items-center justify-center"
        >
          <AnimatePresence>
            {mode === "view" ? (
              <motion.span
                key="lbl"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 / RING_SCALE_VIEW }}
                exit={{ opacity: 0 }}
                className="text-[0.55rem] tracking-[0.3em] uppercase text-ink font-medium"
              >
                {t.cursor.view}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};
