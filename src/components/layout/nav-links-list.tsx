"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav";
import { useT } from "@/components/providers/preferences-context";
import { cn } from "@/lib/cn";
import type { NavKey } from "@/lib/i18n/types";

type Props = { variant: "desktop" | "mobile"; onNavigate?: () => void };

const DESKTOP_COUNT = 7;

export const NavLinksList = ({ variant, onNavigate }: Props) => {
  const pathname = usePathname();
  const t = useT();
  const links = (variant === "desktop" ? navLinks.slice(0, DESKTOP_COUNT) : navLinks);

  if (variant === "desktop") {
    return (
      <ul className="hidden lg:flex items-center gap-8 text-[0.78rem] tracking-[0.2em] uppercase">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "link-underline transition-colors",
                  active ? "text-gold-bright" : "text-ivory/85 hover:text-ivory"
                )}
              >
                {t.nav[l.num as NavKey]}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <li key={l.href} className="border-b border-ivory/10 pb-4">
            <Link
              href={l.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className="flex items-baseline justify-between gap-6"
            >
              <span className="flex items-baseline gap-4">
                <span className="nav-num text-[0.7rem] text-gold-bright">{l.num}</span>
                <span className={cn("t-3 transition-colors", active ? "text-gold-bright" : "text-ivory")}>
                  {t.nav[l.num as NavKey]}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
