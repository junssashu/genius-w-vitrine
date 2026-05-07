import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerDict } from "@/lib/i18n/server";

export default async function NotFound() {
  const dict = await getServerDict();
  const n = dict.notFound;
  return (
    <section className="min-h-[80svh] flex items-center" aria-labelledby="nf-title">
      <div className="container-edit relative">
        <div aria-hidden className="absolute inset-0 aurora opacity-50" />
        <div className="relative max-w-2xl flex flex-col gap-8">
          <span className="eyebrow">{n.code}</span>
          <h1 id="nf-title" className="t-display">{n.title}</h1>
          <p className="lede">{n.lede}</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button href="/" variant="primary">{dict.cta.backToHome}</Button>
            <Link href="/portfolio" className="btn btn-ghost">{dict.cta.seePortfolio}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
