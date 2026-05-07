type Variant = "scissors" | "thread" | "needle" | "ribbon" | "compass";

type Props = { variant: Variant; size?: number; className?: string; alt: string };

const VIEW = "0 0 64 64";
const STROKE = "currentColor";
const SW = 1.2;

const Body = ({ variant }: { variant: Variant }) => {
  switch (variant) {
    case "scissors":
      return (
        <g fill="none" stroke={STROKE} strokeWidth={SW}>
          <circle cx="18" cy="46" r="6" />
          <circle cx="46" cy="46" r="6" />
          <path d="M22 42 L40 14" /><path d="M42 42 L24 14" />
        </g>
      );
    case "thread":
      return (
        <g fill="none" stroke={STROKE} strokeWidth={SW}>
          <ellipse cx="32" cy="22" rx="14" ry="10" />
          <path d="M18 22 C 18 38 46 38 46 22" />
          <path d="M32 32 L32 56" />
        </g>
      );
    case "needle":
      return (
        <g fill="none" stroke={STROKE} strokeWidth={SW}>
          <path d="M12 12 L52 52" />
          <circle cx="14" cy="14" r="3" />
          <path d="M50 48 L52 52 L48 50 Z" fill={STROKE} />
        </g>
      );
    case "ribbon":
      return (
        <g fill="none" stroke={STROKE} strokeWidth={SW}>
          <path d="M8 32 Q 20 14 32 32 T 56 32" />
          <path d="M8 38 Q 20 20 32 38 T 56 38" opacity="0.5" />
        </g>
      );
    case "compass":
      return (
        <g fill="none" stroke={STROKE} strokeWidth={SW}>
          <circle cx="32" cy="32" r="22" />
          <path d="M32 14 L36 32 L32 50 L28 32 Z" />
          <circle cx="32" cy="32" r="2" fill={STROKE} />
        </g>
      );
  }
};

export const AtelierMark = ({ variant, size = 24, className, alt }: Props) => (
  <svg
    role="img"
    aria-label={alt}
    viewBox={VIEW}
    width={size}
    height={size}
    className={className}
  >
    <Body variant={variant} />
  </svg>
);
