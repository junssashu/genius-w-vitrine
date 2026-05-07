"use client";

import { faqs } from "@/lib/faqs";
import { FaqItem } from "./faq-item";
import { useT } from "@/components/providers/preferences-context";

export const FaqAccordion = () => {
  const t = useT();
  return (
    <ul aria-label={t.faqAccordion.aria} className="border-t border-ivory/10">
      {faqs.map((item, i) => (
        <FaqItem key={item.q} item={item} index={i} />
      ))}
    </ul>
  );
};
