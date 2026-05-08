import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { LookGrid } from "@/components/portfolio/look-grid";
import { CrossLinks } from "@/components/ui/cross-links";
import { getPortfolio } from "@/lib/portfolio.server";
import { getServerDict } from "@/lib/i18n/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getServerDict();
  return { title: dict.meta.portfolio, description: dict.meta.portfolioDesc, alternates: { canonical: "/portfolio" } };
};

export default async function PortfolioPage() {
  const dict = await getServerDict();
  const portfolio = getPortfolio();
  return (
    <>
      <PageHeader copy={dict.portfolio.page} />
      <Section>
        <LookGrid looks={portfolio} ariaLabel={dict.cross.portfolio.title} />
      </Section>
      <Section ariaLabel={dict.cta.continueRead} className="bg-ink/60">
        <CrossLinks keys={["services", "testimonials", "contact"]} dict={dict} heading={dict.cta.continueRead} />
      </Section>
    </>
  );
}
