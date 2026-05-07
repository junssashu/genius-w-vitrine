import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  ariaHidden?: boolean;
};

export const Marquee = ({ children, className, reverse, ariaHidden = true }: Props) => (
  <div
    aria-hidden={ariaHidden}
    className={cn("relative w-full overflow-hidden no-scrollbar", className)}
  >
    <div
      className="marquee-track flex w-max gap-12 whitespace-nowrap"
      style={{ animationDirection: reverse ? "reverse" : "normal" }}
    >
      <div className="flex gap-12">{children}</div>
      <div className="flex gap-12" aria-hidden>
        {children}
      </div>
    </div>
  </div>
);
