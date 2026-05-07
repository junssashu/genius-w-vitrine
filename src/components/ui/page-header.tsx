import { Reveal } from "./reveal";
import { ScrollProgress } from "./scroll-progress";
import type { PageCopy } from "@/lib/i18n/types";
import type { ReactNode } from "react";

type Props = { copy: PageCopy; extra?: ReactNode };

export const PageHeader = ({ copy, extra }: Props) => (
  <header className="relative pt-14 lg:pt-24 pb-14 lg:pb-20 overflow-hidden">
    <ScrollProgress />
    <div aria-hidden className="absolute inset-0 aurora opacity-50" />
    <div className="container-edit relative flex flex-col gap-8 lg:gap-10">
      <Reveal>
        <span className="eyebrow">{copy.eyebrow}</span>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="t-display text-balance">
          {copy.titleA} <em className="text-gold-bright not-italic">{copy.titleEm}</em> {copy.titleB}
        </h1>
      </Reveal>
      {copy.lede ? (
        <Reveal delay={0.2}>
          <p className="lede max-w-3xl text-balance">{copy.lede}</p>
        </Reveal>
      ) : null}
      {extra}
    </div>
  </header>
);
