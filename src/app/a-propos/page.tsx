import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/parallax";
import { Silhouette } from "@/components/ui/silhouette";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { CrossLinks } from "@/components/ui/cross-links";
import { getServerDict, getServerLang } from "@/lib/i18n/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getServerDict();
  return { title: dict.meta.about, description: dict.meta.aboutDesc, alternates: { canonical: "/a-propos" } };
};

const FACTS = [
  { k: "founded", v: 2018, suffix: "" },
  { k: "pieces", v: 240, suffix: "+" },
  { k: "hours", v: 320, suffix: " h" },
  { k: "brodeuses", v: 7, suffix: "" },
] as const;

const TITLES = {
  fr: { titleA: "Une maison", titleEm: "qui pense", titleB: ".", lede: "Fondée par Junius Wabo à Yaoundé, GENIUS.W cultive la lenteur du geste et la précision de la coupe." },
  en: { titleA: "A house",     titleEm: "that thinks", titleB: ".", lede: "Founded by Junius Wabo in Yaoundé, GENIUS.W cultivates slowness of gesture and precision of cut." },
} as const;

export default async function AboutPage() {
  const dict = await getServerDict();
  const lang = await getServerLang();
  const tt = TITLES[lang];
  const copy = {
    eyebrow: dict.cross.aPropos.title,
    titleA: tt.titleA,
    titleEm: tt.titleEm,
    titleB: tt.titleB,
    lede: tt.lede,
  };
  const a = dict.about;
  return (
    <>
      <PageHeader copy={copy} />
      <Section>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <Reveal className="lg:col-span-7 flex flex-col gap-7">
            <h2 className="t-2">{a.atelier}</h2>
            <p className="text-ivory/85 leading-relaxed">{a.p1}</p>
            <p className="text-ivory/75 leading-relaxed">{a.p2}</p>
            <p className="text-ivory/75 leading-relaxed">{a.p3}</p>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-10 pt-10 border-t border-ivory/10">
              {FACTS.map((f) => (
                <li key={f.k} className="flex flex-col gap-2">
                  <Counter to={f.v} suffix={f.suffix} className="font-editorial text-3xl text-ivory" />
                  <p className="text-[0.65rem] tracking-[0.22em] uppercase text-ivory/55">{a[f.k]}</p>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button href="/services" variant="ghost">{a.ourCrafts}</Button>
              <Button href="/portfolio" variant="link">{a.viewPortfolio}</Button>
            </div>
          </Reveal>
          <Parallax speed={0.4} className="lg:col-span-5">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden glass">
              <Silhouette variant="gown" alt="" className="absolute inset-0 h-full w-full" />
            </div>
          </Parallax>
        </div>
      </Section>
      <Section ariaLabel={dict.cta.continueRead} className="bg-ink/60">
        <CrossLinks keys={["services", "portfolio", "blog"]} dict={dict} heading={dict.cta.continueRead} />
      </Section>
    </>
  );
}
