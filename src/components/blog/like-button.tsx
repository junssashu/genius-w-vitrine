"use client";

import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocalStorage } from "./use-local-storage";
import { useT } from "@/components/providers/preferences-context";

const STARTING_HEARTS = 47;
const LIKES_KEY = (slug: string) => `gw:likes:${slug}`;
const LIKED_KEY = (slug: string) => `gw:liked:${slug}`;
const PULSE_SCALE = [1, 1.4, 1];

type Props = { slug: string };

export const LikeButton = ({ slug }: Props) => {
  const reduce = useReducedMotion();
  const t = useT();
  const labels = t.blogLike;
  const [count, setCount] = useLocalStorage<number>(LIKES_KEY(slug), STARTING_HEARTS);
  const [liked, setLiked] = useLocalStorage<boolean>(LIKED_KEY(slug), false);

  const toggle = () => {
    setLiked(!liked);
    setCount((c) => (liked ? Math.max(0, c - 1) : c + 1));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      aria-label={liked ? labels.ariaRemove : labels.ariaAdd}
      className="icon-row gap-3 rounded-full border border-ivory/20 px-5 py-3 text-sm transition-colors hover:border-gold-bright"
    >
      <motion.span
        animate={reduce ? undefined : liked ? { scale: PULSE_SCALE } : { scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Heart size={16} fill={liked ? "currentColor" : "none"} className={liked ? "text-wine" : "text-ivory"} aria-hidden />
      </motion.span>
      <span className="nav-num text-ivory/80">{count}</span>
      <span className="text-[0.65rem] tracking-[0.22em] uppercase text-ivory/60">
        {liked ? labels.liked : labels.like}
      </span>
    </button>
  );
};
