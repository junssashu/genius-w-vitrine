import type React from "react";
import { cn } from "@/lib/cn";

const STAGGER_PER_CHAR_MS = 25;
const BASE_DELAY_MS = 0;

type Mode = "char" | "word";

type Props = {
  text: string;
  mode?: Mode;
  delay?: number;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  ariaLabel?: string;
};

const splitWords = (text: string): string[] => text.split(/(\s+)/);
const splitChars = (text: string): string[] => Array.from(text);

export const SplitText = ({
  text,
  mode = "char",
  delay = BASE_DELAY_MS,
  className,
  as: Tag = "span",
  ariaLabel,
}: Props) => {
  const words = splitWords(text);
  let charIndex = 0;
  return (
    <Tag aria-label={ariaLabel ?? text} className={cn("inline-block", className)}>
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) return <span key={`s-${wi}`} aria-hidden>{word}</span>;
        const tokens = mode === "char" ? splitChars(word) : [word];
        return (
          <span key={`w-${wi}`} aria-hidden className="inline-block whitespace-nowrap">
            {tokens.map((token, ti) => {
              const i = charIndex++;
              const ms = delay + i * STAGGER_PER_CHAR_MS;
              return (
                <span key={`t-${wi}-${ti}`} aria-hidden className="split-mask">
                  <span
                    className="rise"
                    style={{ "--rise-delay": `${ms}ms` } as React.CSSProperties}
                  >
                    {token}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
};
