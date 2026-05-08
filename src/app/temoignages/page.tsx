import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { CrossLinks } from "@/components/ui/cross-links";
import { getTestimonials } from "@/lib/testimonials.server";
import { getServerDict } from "@/lib/i18n/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getServerDict();
  return { title: dict.meta.testimonials, description: dict.meta.testimonialsDesc, alternates: { canonical: "/temoignages" } };
};

export default async function TestimonialsPage() {
  const dict = await getServerDict();
  const testimonials = getTestimonials();
  return (
    <>
      <PageHeader copy={dict.testimonials.page} />
      <Section>
        <ul className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 0.06}>
              <TestimonialCard item={t} index={i} />
            </Reveal>
          ))}
        </ul>
      </Section>
      <Section className="bg-ink/60" ariaLabel={dict.cta.afterwards}>
        <CrossLinks keys={["portfolio", "services", "contact"]} dict={dict} heading={dict.cta.afterwards} />
      </Section>
    </>
  );
}
