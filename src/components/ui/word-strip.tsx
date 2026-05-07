import { Marquee } from "./marquee";

type Props = { words: readonly string[]; reverse?: boolean; className?: string };

const Diamond = () => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    width={18}
    height={18}
    className="inline-block mx-8 text-gold-bright"
  >
    <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="currentColor" />
  </svg>
);

export const WordStrip = ({ words, reverse, className }: Props) => (
  <div className={className} aria-hidden>
    <Marquee reverse={reverse}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="font-editorial text-[clamp(3rem,8vw,8rem)] leading-none text-ivory/85 inline-flex items-center"
        >
          {w}
          <Diamond />
        </span>
      ))}
    </Marquee>
  </div>
);
