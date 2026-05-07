import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { SocialLinks } from "@/components/ui/social-links";
import { brand } from "@/lib/brand";
import { getServerDict } from "@/lib/i18n/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getServerDict();
  return { title: dict.meta.contact, description: dict.meta.contactDesc, alternates: { canonical: "/contact" } };
};

const ICON = 16;

export default async function ContactPage() {
  const dict = await getServerDict();
  const c = dict.contact;
  return (
    <>
      <PageHeader copy={c} />
      <Section>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>
          <aside className="lg:col-span-5 flex flex-col gap-8">
            <Reveal>
              <div className="card-edit flex flex-col gap-5">
                <p className="eyebrow">{c.detail.coordinates}</p>
                <ul className="flex flex-col gap-4 text-ivory/85">
                  <li className="icon-row gap-3"><Mail size={ICON} aria-hidden className="text-gold-bright" /> <a href={`mailto:${brand.email}`} className="link-underline">{brand.email}</a></li>
                  {brand.phones.map((p) => (
                    <li key={p} className="icon-row gap-3"><Phone size={ICON} aria-hidden className="text-gold-bright" /> <a href={`tel:${p.replace(/\s/g, "")}`} className="link-underline">{p}</a></li>
                  ))}
                  <li className="icon-row gap-3"><MapPin size={ICON} aria-hidden className="text-gold-bright" /> {brand.city}, {brand.country}</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-edit flex flex-col gap-5">
                <p className="eyebrow">{dict.common.follow}</p>
                <SocialLinks variant="column" />
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="card-edit flex flex-col gap-4">
                <p className="eyebrow">{c.detail.hours}</p>
                <p className="text-ivory/85 leading-relaxed">{c.detail.hoursText}</p>
                <Link href="/faq" className="link-underline text-sm w-fit">{c.detail.seeFaq}</Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}
