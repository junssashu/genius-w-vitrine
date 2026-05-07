"use client";

import { LookCard } from "./look-card";
import { Reveal } from "@/components/ui/reveal";
import { useT } from "@/components/providers/preferences-context";
import type { Look } from "@/lib/portfolio";

type Props = { looks: readonly Look[]; ariaLabel?: string };

export const LookGrid = ({ looks, ariaLabel }: Props) => {
  const t = useT();
  return (
    <ul
      aria-label={ariaLabel ?? t.gallery.ariaDefault}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
    >
      {looks.map((look, i) => (
        <Reveal as="li" key={look.slug} delay={i * 0.06}>
          <LookCard look={look} index={i} />
        </Reveal>
      ))}
    </ul>
  );
};
