"use client";

import { Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./brand-icons";
import { brand } from "@/lib/brand";
import { useT } from "@/components/providers/preferences-context";
import { cn } from "@/lib/cn";

type Props = { className?: string; variant?: "row" | "column" };

const ICON_SIZE = 16;
const ITEM_CLASS = "link-underline icon-row text-ivory/80 hover:text-gold-bright transition-colors";

export const SocialLinks = ({ className, variant = "row" }: Props) => {
  const t = useT();
  const s = t.social;
  return (
    <ul className={cn("flex gap-4", variant === "column" && "flex-col gap-3", className)}>
      <li>
        <a href={brand.socials.instagram} target="_blank" rel="noopener noreferrer me" aria-label={s.instagramAria} className={ITEM_CLASS}>
          <InstagramIcon size={ICON_SIZE} /> Instagram
        </a>
      </li>
      <li>
        <a href={brand.socials.facebook} target="_blank" rel="noopener noreferrer me" aria-label={s.facebookAria} className={ITEM_CLASS}>
          <FacebookIcon size={ICON_SIZE} /> Facebook
        </a>
      </li>
      <li>
        <a href={`mailto:${brand.email}`} aria-label={`${s.emailAria} : ${brand.email}`} className={ITEM_CLASS}>
          <Mail size={ICON_SIZE} aria-hidden /> {brand.email}
        </a>
      </li>
    </ul>
  );
};
