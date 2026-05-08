import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CrossLinks } from "@/components/ui/cross-links";
import { getServices } from "@/lib/services.server";
import { getServerDict } from "@/lib/i18n/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getServerDict();
  return { title: dict.meta.services, description: dict.meta.servicesDesc, alternates: { canonical: "/services" } };
};

export default async function ServicesPage() {
  const dict = await getServerDict();
  const services = getServices();
  return (
    <>
      <PageHeader copy={dict.services.page} />
      {services.map((s, i) => (
        <Section key={s.slug} id={s.slug} ariaLabel={s.title} className={i % 2 === 0 ? "bg-ink" : "bg-ink/60"}>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <Reveal className="lg:col-span-2">
              <span className="font-editorial text-7xl text-gold-bright/80 leading-none">{s.num}</span>
            </Reveal>
            <Reveal className="lg:col-span-6 flex flex-col gap-8" delay={0.1}>
              <span className="eyebrow">{s.subtitle}</span>
              <h2 className="t-1 text-balance">{s.title}</h2>
              <p className="lede max-w-2xl text-balance pt-2">{s.description}</p>
              <Button href={`/contact?service=${s.slug}`} variant="ghost" className="w-fit mt-6">
                {dict.services.quoteCta} <ArrowUpRight size={14} aria-hidden />
              </Button>
            </Reveal>
            <Reveal className="lg:col-span-4" delay={0.2}>
              <ul className="card-edit flex flex-col gap-4">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-4 text-ivory/85 leading-relaxed">
                    <span aria-hidden className="mt-2.5 h-px w-4 bg-gold-bright shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>
      ))}
      <Section ariaLabel={dict.cta.further}>
        <CrossLinks keys={["portfolio", "testimonials", "faq"]} dict={dict} heading={dict.cta.further} />
      </Section>
    </>
  );
}
