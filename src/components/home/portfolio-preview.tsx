"use client";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { LookGrid } from "@/components/portfolio/look-grid";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useT } from "@/components/providers/preferences-context";
import { portfolio } from "@/lib/portfolio";

const PREVIEW_COUNT = 6;

export const PortfolioPreview = () => {
  const t = useT();
  const c = t.portfolio.preview;
  return (
    <Section ariaLabel={t.cross.portfolio.title}>
      <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
        <SectionHeader
          eyebrow={c.eyebrow}
          title={<>{c.titleA} <em className="text-gold-bright not-italic">{c.titleEm}</em> {c.titleB}</>}
          lede={c.lede}
        />
        <Reveal><Button href="/portfolio" variant="ghost">{t.cta.viewAll}</Button></Reveal>
      </div>
      <LookGrid looks={portfolio.slice(0, PREVIEW_COUNT)} ariaLabel={t.lookCard.featured} />
    </Section>
  );
};
