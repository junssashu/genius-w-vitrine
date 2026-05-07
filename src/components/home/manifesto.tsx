"use client";

import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { AtelierMark } from "@/components/ui/atelier-mark";
import { Parallax } from "@/components/ui/parallax";
import { LineDraw } from "@/components/ui/line-draw";
import { useT } from "@/components/providers/preferences-context";

const SIGNATURE_PATH = "M 10 80 C 90 10, 180 150, 280 70 S 480 20, 590 110";

const PILLAR_ORDER = ["coupe", "cousu", "brode", "pense"] as const;
const PILLAR_MARKS = { coupe: "scissors", cousu: "thread", brode: "needle", pense: "compass" } as const;

export const Manifesto = () => {
  const t = useT();
  const m = t.manifesto;
  return (
    <Section id="manifeste" ariaLabel={m.eyebrow} className="bg-ink">
      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
          <Reveal><span className="eyebrow">{m.eyebrow}</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="t-1 mt-8 text-balance">
              {m.titleA} <em className="text-gold-bright not-italic">{m.titleEm}</em> {m.titleB}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lede mt-8 max-w-md">{m.lede}</p>
          </Reveal>
          <Parallax speed={0.2} className="hidden lg:block mt-12">
            <LineDraw d={SIGNATURE_PATH} viewBox="0 0 600 200" stroke="var(--gold-bright)" strokeWidth={1.2} className="h-16 w-full text-gold-bright" />
          </Parallax>
        </div>
        <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
          {PILLAR_ORDER.map((key, i) => (
            <Reveal as="li" key={key} delay={i * 0.08}>
              <div className="card-edit h-full flex flex-col gap-6">
                <AtelierMark variant={PILLAR_MARKS[key]} size={38} className="text-gold-bright" alt={t.pillars[key]} />
                <h3 className="font-display text-2xl">{t.pillars[key]}</h3>
                <p className="text-ivory/75 leading-relaxed">{t.pillars[`${key}Text` as const]}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
};
