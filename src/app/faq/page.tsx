import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/faqs";
import { getServerDict } from "@/lib/i18n/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getServerDict();
  return { title: dict.meta.faq, description: dict.meta.faqDesc, alternates: { canonical: "/faq" } };
};

const FaqJsonLd = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
};

export default async function FaqPage() {
  const dict = await getServerDict();
  return (
    <>
      <FaqJsonLd />
      <PageHeader copy={dict.faq} />
      <Section>
        <FaqAccordion />
        <div className="mt-16 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">{dict.faq.detail.ask}</Button>
          <Button href="/services" variant="ghost">{dict.cta.seeServices}</Button>
        </div>
      </Section>
    </>
  );
}
