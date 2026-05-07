import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getServerDict } from "@/lib/i18n/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getServerDict();
  return { title: dict.meta.legal, description: dict.meta.legalDesc, alternates: { canonical: "/mentions-legales" } };
};

export default async function LegalPage() {
  const dict = await getServerDict();
  return (
    <>
      <PageHeader copy={dict.legal} />
      <Section>
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          {dict.legalSections.map((s) => (
            <article key={s.h} className="flex flex-col gap-4">
              <h2 className="t-3">{s.h}</h2>
              <p className="text-ivory/80 leading-relaxed">{s.b}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
