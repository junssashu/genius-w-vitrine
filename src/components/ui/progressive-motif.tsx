"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Motif } from "./motif";
import { useBandwidth } from "@/lib/use-bandwidth";
import type { Motif as MotifKind } from "@/lib/portfolio";

type Props = {
  motif: MotifKind;
  from: string;
  to: string;
  accent: string;
  alt: string;
};

const REVEAL_DURATION = 0.9;
const SLOW_DELAY_MS = 220;
const FAST_DELAY_MS = 60;

export const ProgressiveMotif = ({ motif, from, to, accent, alt }: Props) => {
  const reduce = useReducedMotion();
  const tier = useBandwidth();
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const delay = tier === "slow" ? SLOW_DELAY_MS : FAST_DELAY_MS;
    const id = window.setTimeout(() => setShowDetail(true), delay);
    return () => window.clearTimeout(id);
  }, [tier]);

  return (
    <div className="absolute inset-0">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      />
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: showDetail ? 1 : 0 }}
        transition={{ duration: REVEAL_DURATION, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute inset-0"
      >
        <Motif motif={motif} from={from} to={to} accent={accent} alt={alt} />
      </motion.div>
    </div>
  );
};
