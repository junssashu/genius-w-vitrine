"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { NavLinksList } from "./nav-links-list";
import { MobileNavPanel } from "./mobile-nav-panel";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { LangToggle } from "./lang-toggle";
import { KeyboardNav } from "@/components/a11y/keyboard-nav";
import { useT } from "@/components/providers/preferences-context";
import { cn } from "@/lib/cn";

const SCROLL_THRESHOLD = 24;

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <KeyboardNav pathname={pathname} />
      <header
        role="banner"
        className={cn(
          "fixed top-0 inset-x-0 z-[90] transition-all duration-500",
          scrolled || open ? "glass-strong" : "bg-transparent"
        )}
      >
        <div className="container-edit flex items-center justify-between gap-4 py-4 lg:py-5">
          <Logo />
          <nav aria-label={t.common.siteSection} className="flex-1 flex justify-center">
            <NavLinksList variant="desktop" />
          </nav>
          <div className="flex items-center gap-2 lg:gap-3">
            <LangToggle />
            <ThemeToggle />
            <Button href="/contact" variant="ghost" className="hidden xl:inline-flex">
              {t.cta.bookAppointment}
            </Button>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.common.menuClose : t.common.menuOpen}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full bg-ink/70 border border-ivory/30 text-ivory hover:border-gold-bright hover:text-gold-bright transition-colors backdrop-blur-sm"
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>
      </header>
      <div id="mobile-nav">
        <MobileNavPanel open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};
