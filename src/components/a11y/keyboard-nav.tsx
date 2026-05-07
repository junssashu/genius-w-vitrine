"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { navLinks } from "@/lib/nav";

const findIndex = (path: string) => {
  const idx = navLinks.findIndex((l) => l.href === path);
  return idx === -1 ? 0 : idx;
};

const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";

const isTypingTarget = (el: EventTarget | null): boolean => {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
};

export const KeyboardNav = ({ pathname }: { pathname: string }) => {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey) return;
      if (isTypingTarget(e.target)) return;
      const i = findIndex(pathname);
      if (e.key === ARROW_LEFT || e.key === ARROW_UP) {
        e.preventDefault();
        const prev = navLinks[(i - 1 + navLinks.length) % navLinks.length];
        router.push(prev.href);
      } else if (e.key === ARROW_RIGHT || e.key === ARROW_DOWN) {
        e.preventDefault();
        const next = navLinks[(i + 1) % navLinks.length];
        router.push(next.href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pathname, router]);

  return null;
};
