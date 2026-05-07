"use client";

import Link from "next/link";
import { brand } from "@/lib/brand";
import { navLinks } from "@/lib/nav";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import { useT } from "@/components/providers/preferences-context";
import type { NavKey } from "@/lib/i18n/types";

const YEAR = new Date().getFullYear();

export const Footer = () => {
  const t = useT();
  return (
    <footer role="contentinfo" className="relative border-t border-ivory/10 bg-ink" aria-label={t.common.sitemap}>
      <div className="container-edit py-20 grid gap-16 lg:gap-12 lg:grid-cols-12">
        <section className="lg:col-span-5 flex flex-col gap-8" aria-labelledby="f-brand">
          <Logo />
          <h2 id="f-brand" className="t-2 max-w-md text-balance">
            {t.footer.sloganLeft}
          </h2>
          <p className="text-ivory/65 max-w-md leading-relaxed">
            {t.footer.brandLede}
          </p>
        </section>

        <nav className="lg:col-span-3 flex flex-col gap-6" aria-label={t.common.sitemap}>
          <p className="eyebrow">{t.common.sitemap}</p>
          <ul className="flex flex-col gap-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline text-ivory/80 hover:text-ivory">
                  {t.nav[l.num as NavKey]}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/mentions-legales" className="link-underline text-ivory/60 hover:text-ivory">
                {t.common.legal}
              </Link>
            </li>
          </ul>
        </nav>

        <section className="lg:col-span-4 flex flex-col gap-6" aria-labelledby="f-contact">
          <p id="f-contact" className="eyebrow">{t.common.contact}</p>
          <address className="not-italic flex flex-col gap-3 text-ivory/85">
            <a href={`mailto:${brand.email}`} className="link-underline w-fit">{brand.email}</a>
            {brand.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="link-underline w-fit">{p}</a>
            ))}
            <span className="text-ivory/55">{brand.city}, {brand.country}</span>
          </address>
          <SocialLinks variant="row" className="mt-2" />
        </section>
      </div>
      <small className="container-edit border-t border-ivory/10 py-6 flex flex-wrap items-center justify-between gap-4 text-[0.7rem] tracking-[0.22em] uppercase text-ivory/45">
        <span>© {YEAR} {brand.name} — {brand.founder}</span>
        <span>{t.footer.sloganRight}</span>
      </small>
    </footer>
  );
};
