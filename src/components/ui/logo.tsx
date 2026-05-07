import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/cn";

const SRC = "/logo.jpeg";
const RENDER_SIZE = 56;

type Props = { className?: string; variant?: "full" | "mark" };

export const Logo = ({ className, variant = "full" }: Props) => (
  <Link
    href="/"
    aria-label={`${brand.name} — ${brand.tagline}`}
    className={cn("group icon-row gap-3", className)}
  >
    <span className="relative inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white ring-1 ring-ivory/30 overflow-hidden transition-transform duration-500 group-hover:scale-[1.04]">
      <Image
        src={SRC}
        alt={brand.name}
        width={RENDER_SIZE}
        height={RENDER_SIZE}
        priority
        sizes={`${RENDER_SIZE}px`}
        className="h-10 w-10 sm:h-11 sm:w-11 object-cover"
      />
    </span>
    {variant === "full" ? (
      <span className="hidden md:flex flex-col leading-tight">
        <span className="font-editorial text-lg tracking-[0.02em] text-ivory">
          GENIUS<span className="text-gold-bright">.</span>W
        </span>
        <span className="text-[0.55rem] tracking-[0.32em] uppercase text-ivory/55">
          Maison
        </span>
      </span>
    ) : null}
  </Link>
);
