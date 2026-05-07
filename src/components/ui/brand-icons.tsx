type Props = { size?: number; className?: string };

const SVG_BASE = "0 0 24 24";
const STROKE = "currentColor";
const SW = 1.6;

export const InstagramIcon = ({ size = 16, className }: Props) => (
  <svg viewBox={SVG_BASE} width={size} height={size} fill="none" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill={STROKE} stroke="none" />
  </svg>
);

export const FacebookIcon = ({ size = 16, className }: Props) => (
  <svg viewBox={SVG_BASE} width={size} height={size} fill="none" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1Z" />
  </svg>
);
