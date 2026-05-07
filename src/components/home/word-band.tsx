"use client";

import { WordStrip } from "@/components/ui/word-strip";
import { useT } from "@/components/providers/preferences-context";

export const WordBand = () => {
  const t = useT();
  return (
    <section aria-label={t.greeting.wordsAria} className="border-y border-ivory/10 bg-ink py-12 lg:py-20 overflow-hidden flex flex-col gap-8">
      <WordStrip words={t.greeting.wordsTop} />
      <div className="divider-fade" aria-hidden />
      <WordStrip words={t.greeting.wordsBottom} reverse />
    </section>
  );
};
