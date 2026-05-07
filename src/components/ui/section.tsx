import { cn } from "@/lib/cn";
import type { ReactNode, ElementType } from "react";

type SectionProps = {
  id?: string;
  as?: ElementType;
  className?: string;
  contained?: boolean;
  ariaLabel?: string;
  children: ReactNode;
};

export const Section = ({
  id,
  as: Tag = "section",
  className,
  contained = true,
  ariaLabel,
  children,
}: SectionProps) => (
  <Tag
    id={id}
    aria-label={ariaLabel}
    tabIndex={id ? -1 : undefined}
    className={cn("section-y relative", className)}
  >
    {contained ? <div className="container-edit">{children}</div> : children}
  </Tag>
);
