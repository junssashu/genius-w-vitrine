import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { ServicesPreview } from "@/components/home/services-preview";
import { WordBand } from "@/components/home/word-band";
import { CinemaStatement } from "@/components/home/cinema-statement";
import { HorizontalPortfolio } from "@/components/home/horizontal-portfolio";
import { TestimonialsPreview } from "@/components/home/testimonials-preview";
import { BlogPreview } from "@/components/home/blog-preview";
import { CtaBottom } from "@/components/home/cta-bottom";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <Manifesto />
      <WordBand />
      <ServicesPreview />
      <CinemaStatement />
      <HorizontalPortfolio />
      <TestimonialsPreview />
      <BlogPreview />
      <CtaBottom />
    </>
  );
}
