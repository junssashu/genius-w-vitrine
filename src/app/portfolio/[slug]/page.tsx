import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Motif } from "@/components/ui/motif";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { getPortfolio, findLook } from "@/lib/portfolio.server";
import { brand } from "@/lib/brand";
import { getServerDict } from "@/lib/i18n/server";

type Params = { slug: string };

export const generateStaticParams = (): Params[] => getPortfolio().map((l) => ({ slug: l.slug }));

export const generateMetadata = async ({ params }: { params: Promise<Params> }): Promise<Metadata> => {
  const { slug } = await params;
  const look = findLook(slug);
  if (!look) return {};
  return {
    title: look.title,
    description: look.description,
    alternates: { canonical: `/portfolio/${look.slug}` },
    openGraph: { title: `${look.title} — ${brand.name}`, description: look.description, type: "article" },
  };
};

const adjacent = (slug: string) => {
  const all = getPortfolio();
  const i = all.findIndex((l) => l.slug === slug);
  return { prev: all[(i - 1 + all.length) % all.length], next: all[(i + 1) % all.length] };
};

export default async function LookPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const look = findLook(slug);
  if (!look) notFound();
  const dict = await getServerDict();
  const d = dict.portfolio.detail;
  const { prev, next } = adjacent(slug);
  return (
    <>
      <ScrollProgress />
      <article aria-labelledby="look-title">
        <header className="container-edit pt-12 lg:pt-20 pb-12 flex flex-col gap-8">
          <Link href="/portfolio" className="link-underline icon-row text-[0.7rem] tracking-[0.22em] uppercase text-ivory/60 w-fit">
            <ArrowLeft size={14} aria-hidden /> {dict.cta.backToPortfolio}
          </Link>
          <Reveal><span className="eyebrow">{look.category} · {look.year}</span></Reveal>
          <Reveal delay={0.1}><h1 id="look-title" className="t-display text-balance">{look.title}</h1></Reveal>
          <Reveal delay={0.2}><p className="lede max-w-3xl text-balance">{look.description}</p></Reveal>
        </header>
        <Section contained={false}>
          <div className="container-edit grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 relative aspect-[4/5] overflow-hidden rounded-sm border border-ivory/10">
              {look.imageUrl ? (
                <Image src={look.imageUrl} alt={look.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 66vw" />
              ) : (
                <Motif motif={look.motif} from={look.palette.from} to={look.palette.to} accent={look.palette.accent} alt="" />
              )}
            </div>
            <aside className="lg:col-span-4 flex flex-col gap-6">
              <dl className="grid grid-cols-2 gap-6 card-edit">
                <div><dt className="eyebrow">{d.category}</dt><dd className="font-display text-xl mt-3">{look.category}</dd></div>
                <div><dt className="eyebrow">{d.season}</dt><dd className="font-display text-xl mt-3">{look.year}</dd></div>
                <div><dt className="eyebrow">{d.atelier}</dt><dd className="font-display text-xl mt-3">{brand.city}</dd></div>
                <div><dt className="eyebrow">{d.edition}</dt><dd className="font-display text-xl mt-3">{d.uniquePiece}</dd></div>
              </dl>
              <Button href="/contact" variant="primary">{dict.cta.requestThis}</Button>
              <Button href="/services" variant="ghost">{dict.cta.seeServices}</Button>
            </aside>
          </div>
        </Section>
        <nav aria-label={dict.cross.portfolio.title} className="container-edit border-t border-ivory/10 py-12 flex justify-between gap-6">
          <Link href={`/portfolio/${prev.slug}`} className="group icon-row gap-3 text-ivory/70 hover:text-ivory">
            <ArrowLeft className="transition-transform group-hover:-translate-x-1" aria-hidden /> <span className="font-display text-xl">{prev.title}</span>
          </Link>
          <Link href={`/portfolio/${next.slug}`} className="group icon-row gap-3 text-ivory/70 hover:text-ivory">
            <span className="font-display text-xl">{next.title}</span> <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </nav>
      </article>
    </>
  );
}
