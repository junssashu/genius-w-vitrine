"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { useT } from "@/components/providers/preferences-context";
import { services as staticServices } from "@/lib/services";
import type { Service } from "@/lib/services";

type Props = { services?: Service[] };

export const ServicesPreview = ({ services: sProp }: Props) => {
  const services = sProp ?? staticServices;
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
            <Link href={`/services#${s.slug}`} className="group grid grid-cols-12 gap-x-4 gap-y-1 items-baseline py-8 md:py-10 transition-colors hover:bg-ivory/[0.02] px-2 -mx-2" aria-label={`${s.title} — ${s.subtitle}`}>
              <span className="col-span-1 nav-num text-gold-bright/80">{s.num}</span>
              <h3 className="col-span-11 md:col-span-5 font-display text-2xl sm:text-3xl md:text-5xl text-ivory">{s.title}</h3>
              <p className="col-span-11 col-start-2 md:col-start-auto md:col-span-5 text-ivory/55 text-xs md:text-sm leading-relaxed mt-0.5 md:mt-0">{s.subtitle}</p>
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
