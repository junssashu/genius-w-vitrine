"use client";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { useT } from "@/components/providers/preferences-context";
import { testimonials } from "@/lib/testimonials";

const PREVIEW = 3;

export const TestimonialsPreview = () => {
  const t = useT();
  const c = t.testimonials.preview;
  return (
    <Section ariaLabel={t.cross.testimonials.title}>
      <SectionHeader
        eyebrow={c.eyebrow}
        title={<>{c.titleA} <em className="text-gold-bright not-italic">{c.titleEm}</em> {c.titleB}</>}
        lede={c.lede}
      />
      <ul className="mt-16 grid md:grid-cols-3 gap-8">
        {testimonials.slice(0, PREVIEW).map((item, i) => (
          <Reveal as="li" key={item.name} delay={i * 0.08}>
            <TestimonialCard item={item} index={i} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
};
