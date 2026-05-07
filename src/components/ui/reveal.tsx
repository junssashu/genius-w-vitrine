"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const REVEAL_MARGIN_PX = 80;

type Tag = "div" | "span" | "li" | "article";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: Tag;
};

const baseClass: Record<Tag, string> = {
  div: "reveal-fx",
  span: "reveal-fx inline-block",
  li: "reveal-fx",
  article: "reveal-fx",
};

export const Reveal = ({ children, delay = 0, className, as = "div" }: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === "undefined") { setShown(true); return; }
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) { setShown(true); io.disconnect(); break; } },
      { rootMargin: `-${REVEAL_MARGIN_PX}px` }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const Tag = as;
  const ms = `${Math.round(delay * 1000)}ms`;
  return (
    <Tag
      ref={ref as never}
      data-shown={shown ? "true" : "false"}
      style={{ "--reveal-delay": ms } as React.CSSProperties}
      className={cn(baseClass[as], className)}
    >
      {children}
    </Tag>
  );
};
