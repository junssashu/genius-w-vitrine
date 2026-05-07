import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export const SectionHeader = ({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: Props) => (
  <header
    className={cn(
      "flex flex-col gap-6 max-w-3xl",
      align === "center" && "items-center text-center mx-auto",
      className
    )}
  >
    {eyebrow ? (
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
    ) : null}
    <Reveal delay={0.1}>
      <h2 className="t-1 text-balance">{title}</h2>
    </Reveal>
    {lede ? (
      <Reveal delay={0.2}>
        <p className="lede max-w-2xl text-balance">{lede}</p>
      </Reveal>
    ) : null}
  </header>
);
