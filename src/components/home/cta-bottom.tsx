"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useT } from "@/components/providers/preferences-context";
import { brand } from "@/lib/brand";

export const CtaBottom = () => {
  const t = useT();
  return (
    <Section ariaLabel={t.cta.bookAppointment} className="relative">
      <div aria-hidden className="absolute inset-0 aurora opacity-70" />
      <div className="relative card-edit !p-10 md:!p-20 flex flex-col items-start gap-10 max-w-5xl mx-auto">
        <Reveal><span className="eyebrow">{t.contact.eyebrow}</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="t-1 text-balance">
            {t.contact.titleA} <em className="text-gold-bright not-italic">{t.contact.titleEm}</em> {t.contact.titleB}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lede max-w-2xl">{t.contact.lede}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">{t.cta.bookAppointment}</Button>
            <Button href={`mailto:${brand.email}`} variant="ghost">{t.cta.writeFounder}</Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};
