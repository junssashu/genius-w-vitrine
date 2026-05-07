"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProgressiveMotif } from "@/components/ui/progressive-motif";
import { TiltCard } from "@/components/ui/tilt-card";
import { useT } from "@/components/providers/preferences-context";
import { cn } from "@/lib/cn";
import type { Look } from "@/lib/portfolio";

type Props = { look: Look; index: number; aspect?: "tall" | "square" };

export const LookCard = ({ look, index, aspect = "tall" }: Props) => {
  const t = useT();
  const meta = `${t.lookCard.ariaLabel} ${look.title}, ${look.category}, ${look.year}`;
  const visual = `${t.lookCard.visualAlt} ${look.title}`;
  return (
    <Link
      href={`/portfolio/${look.slug}`}
      data-cursor="view"
      aria-label={meta}
      className="group block focus-visible:outline-2 focus-visible:outline-gold-bright"
    >
      <TiltCard className="relative overflow-hidden rounded-sm border border-ivory/10">
        <article className={cn("img-zoom relative w-full", aspect === "tall" ? "aspect-[3/4]" : "aspect-square")}>
          <figure className="img-inner absolute inset-0 m-0" aria-hidden>
            <ProgressiveMotif motif={look.motif} from={look.palette.from} to={look.palette.to} accent={look.palette.accent} alt={visual} />
          </figure>
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c]/80 via-[#0b0b0c]/0 to-transparent" />
          <header className="absolute top-4 left-4 right-4 flex items-start justify-between text-[0.7rem] tracking-[0.22em] uppercase on-dark opacity-85">
            <span>№ {String(index + 1).padStart(2, "0")}</span>
            <time>{look.year}</time>
          </header>
          <footer className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-4">
            <hgroup>
              <p className="text-[0.65rem] tracking-[0.22em] uppercase text-gold-bright">{look.category}</p>
              <h3 className="font-editorial text-3xl md:text-4xl leading-none mt-3 on-dark">{look.title}</h3>
            </hgroup>
            <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-full on-dark on-dark-border on-dark-bg-hover transition-all duration-500">
              <ArrowUpRight size={16} />
            </span>
          </footer>
        </article>
      </TiltCard>
    </Link>
  );
};
