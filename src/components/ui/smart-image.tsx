"use client";

import Image, { type ImageProps } from "next/image";
import { useBandwidth } from "@/lib/use-bandwidth";
import { QUALITY, SIZES_PRESET } from "@/lib/bandwidth";
import { solidBlurDataURL } from "@/lib/lqip";
import { cn } from "@/lib/cn";

type SizesPreset = keyof typeof SIZES_PRESET;

type Props = Omit<ImageProps, "quality" | "placeholder" | "blurDataURL" | "loading"> & {
  sizesPreset?: SizesPreset;
  paletteColor?: string;
  priority?: boolean;
};

const DEFAULT_PALETTE = "#1a1a1c";

export const SmartImage = ({
  sizesPreset = "cardThird",
  paletteColor = DEFAULT_PALETTE,
  priority,
  className,
  alt,
  sizes,
  ...rest
}: Props) => {
  const tier = useBandwidth();
  const quality = QUALITY[tier];
  return (
    <Image
      {...rest}
      alt={alt}
      sizes={sizes ?? SIZES_PRESET[sizesPreset]}
      quality={quality}
      placeholder="blur"
      blurDataURL={solidBlurDataURL(paletteColor)}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={cn("transition-opacity duration-700", className)}
    />
  );
};
