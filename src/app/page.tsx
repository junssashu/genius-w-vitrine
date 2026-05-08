import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { ServicesPreview } from "@/components/home/services-preview";
import { WordBand } from "@/components/home/word-band";
import { CinemaStatement } from "@/components/home/cinema-statement";
import { HorizontalPortfolio } from "@/components/home/horizontal-portfolio";
import { TestimonialsPreview } from "@/components/home/testimonials-preview";
import { BlogPreview } from "@/components/home/blog-preview";
import { PortfolioPreview } from "@/components/home/portfolio-preview";
import { CtaBottom } from "@/components/home/cta-bottom";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { getPosts } from "@/lib/posts.server";
import { getPortfolio } from "@/lib/portfolio.server";
import { getTestimonials } from "@/lib/testimonials.server";
import { getServices } from "@/lib/services.server";

export default function HomePage() {
  const posts = getPosts();
  const portfolio = getPortfolio();
  const testimonials = getTestimonials();
  const services = getServices();

  return (
    <>
      <ScrollProgress />
      <Hero />
      <Manifesto />
      <WordBand />
      <ServicesPreview services={services} />
      <CinemaStatement />
      <HorizontalPortfolio looks={portfolio} />
      <TestimonialsPreview testimonials={testimonials} />
      <PortfolioPreview looks={portfolio} />
      <BlogPreview posts={posts} />
      <CtaBottom />
    </>
  );
}
