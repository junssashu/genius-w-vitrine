"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { useT } from "@/components/providers/preferences-context";
import { services } from "@/lib/services";

export const ServicesPreview = () => {
  const t = useT();
  const c = t.services.preview;
  return (
    <Section ariaLabel={t.cross.services.title}>
      <SectionHeader
        eyebrow={c.eyebrow}
        title={<>{c.titleA} <em className="text-gold-bright not-italic">{c.titleEm}</em> {c.titleB}</>}
        lede={c.lede}
      />
      <ul className="mt-16 divide-y divide-ivory/10 border-t border-ivory/10">
        {services.map((s, i) => (
          <Reveal as="li" key={s.slug} delay={i * 0.06}>
            <Link href={`/services#${s.slug}`} className="group grid grid-cols-12 gap-4 items-baseline py-10 transition-colors hover:bg-ivory/[0.02] px-2 -mx-2" aria-label={`${s.title} — ${s.subtitle}`}>
              <span className="col-span-1 nav-num text-gold-bright/80">{s.num}</span>
              <h3 className="col-span-11 md:col-span-5 font-display text-3xl md:text-5xl text-ivory">{s.title}</h3>
              <p className="hidden md:block md:col-span-5 text-ivory/65 text-sm leading-relaxed">{s.subtitle}</p>
              <span aria-hidden className="hidden md:inline-flex justify-end col-span-1 text-ivory/60 group-hover:text-gold-bright transition-colors">
                <ArrowUpRight />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
};
