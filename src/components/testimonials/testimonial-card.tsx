import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

type Props = { item: Testimonial; index: number };

export const TestimonialCard = ({ item, index }: Props) => (
  <figure
    aria-labelledby={`t-${index}-name`}
    className="card-edit relative h-full flex flex-col gap-6"
  >
    <Quote aria-hidden className="text-gold-bright" size={28} />
    <blockquote className="font-display text-xl md:text-2xl leading-snug text-ivory/95 text-balance">
      <q>{item.text}</q>
    </blockquote>
    <figcaption className="mt-auto pt-4 border-t border-ivory/10">
      <span id={`t-${index}-name`} className="block font-medium text-ivory">{item.name}</span>
      <span className="block text-sm text-ivory/60">{item.role} — {item.city}</span>
    </figcaption>
  </figure>
);
