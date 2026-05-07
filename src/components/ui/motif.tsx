import type { Motif as MotifKind } from "@/lib/portfolio";

type Props = { motif: MotifKind; from: string; to: string; accent: string; alt: string };

export const Motif = ({ motif, from, to, accent, alt }: Props) => {
  const id = `m-${motif}-${from.replace("#", "")}`;
  return (
    <svg
      role="img"
      aria-label={alt}
      viewBox="0 0 600 800"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="60%" cy="20%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.42" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.0" />
        </radialGradient>
      </defs>
      <rect width="600" height="800" fill={`url(#${id}-bg)`} />
      <rect width="600" height="800" fill={`url(#${id}-glow)`} />
      {motif === "stripes" &&
        Array.from({ length: 28 }).map((_, i) => (
          <line key={i} x1="-50" y1={i * 32} x2="700" y2={i * 32 - 200} stroke={accent} strokeOpacity="0.10" strokeWidth="1" />
        ))}
      {motif === "weave" && (
        <g stroke={accent} strokeOpacity="0.18" fill="none">
          {Array.from({ length: 18 }).map((_, i) => (
            <path key={`v${i}`} d={`M${i * 36} 0 Q ${i * 36 + 18} 400 ${i * 36} 800`} />
          ))}
        </g>
      )}
      {motif === "dots" &&
        Array.from({ length: 120 }).map((_, i) => (
          <circle
            key={i}
            cx={(i * 53) % 600}
            cy={((i * 97) % 800)}
            r={(i % 5) + 1}
            fill={accent}
            fillOpacity={0.18 + (i % 3) * 0.08}
          />
        ))}
      {motif === "arc" && (
        <g fill="none" stroke={accent} strokeOpacity="0.30">
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} cx="300" cy="900" r={200 + i * 80} strokeWidth="1.5" />
          ))}
        </g>
      )}
      {motif === "grid" && (
        <g stroke={accent} strokeOpacity="0.14">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`gx${i}`} x1={i * 40} y1="0" x2={i * 40} y2="800" />
          ))}
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={`gy${i}`} x1="0" y1={i * 40} x2="600" y2={i * 40} />
          ))}
        </g>
      )}
      {motif === "gold" && (
        <g>
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M ${50 + i * 60} 100 Q 300 ${300 + i * 30} ${550 - i * 60} 700`}
              stroke={accent}
              strokeWidth="1.5"
              strokeOpacity={0.55 - i * 0.04}
              fill="none"
            />
          ))}
        </g>
      )}
    </svg>
  );
};
