type Variant = "gown" | "suit" | "cape";

type Props = { variant: Variant; className?: string; alt: string };

const PATHS: Record<Variant, string> = {
  gown:
    "M120 40 C140 35 160 35 180 40 L195 80 C200 95 205 110 200 130 L210 200 C215 240 200 280 195 320 L220 460 C225 520 215 580 200 640 L100 640 C85 580 75 520 80 460 L105 320 C100 280 85 240 90 200 L100 130 C95 110 100 95 105 80 Z",
  suit:
    "M150 50 L130 90 L80 120 L70 220 L80 320 L100 460 L110 640 L130 640 L140 460 L160 460 L170 640 L190 640 L200 460 L220 320 L230 220 L220 120 L170 90 Z",
  cape:
    "M150 40 L120 80 L60 200 L30 360 L50 500 L80 640 L220 640 L250 500 L270 360 L240 200 L180 80 Z",
};

export const Silhouette = ({ variant, className, alt }: Props) => (
  <svg
    role="img"
    aria-label={alt}
    viewBox="0 0 300 700"
    className={className}
  >
    <defs>
      <linearGradient id={`sil-${variant}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--gold-bright)" stopOpacity="0.45" />
        <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    <path
      d={PATHS[variant]}
      fill={`url(#sil-${variant})`}
      stroke="var(--gold-bright)"
      strokeOpacity="0.6"
      strokeWidth="0.8"
    />
  </svg>
);
