import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";

type Key = keyof Dictionary["cross"];

const ROUTES: Record<Key, string> = {
  aPropos: "/a-propos",
  services: "/services",
  portfolio: "/portfolio",
  testimonials: "/temoignages",
  faq: "/faq",
  contact: "/contact",
  blog: "/blog",
};

type Props = { keys: readonly Key[]; dict: Dictionary; heading?: string };

export const CrossLinks = ({ keys, dict, heading }: Props) => (
  <nav aria-label={heading ?? dict.cta.further} className="flex flex-col gap-6">
    <p className="eyebrow">{heading ?? dict.cta.further}</p>
    <div className="grid md:grid-cols-3 gap-6">
      {keys.map((k) => (
        <Link key={k} href={ROUTES[k]} className="card-edit hover:border-gold-bright transition-colors">
          <h3 className="t-3">{dict.cross[k].title}</h3>
          <p className="text-ivory/65 mt-3 text-sm leading-relaxed">{dict.cross[k].lede}</p>
        </Link>
      ))}
    </div>
  </nav>
);
