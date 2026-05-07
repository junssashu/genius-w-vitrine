import { brand } from "@/lib/brand";
import { getServerDict, getServerLang } from "@/lib/i18n/server";

const LOCALE: Record<"fr" | "en", string> = { fr: "fr-FR", en: "en-GB" };

export const OrgJsonLd = async () => {
  const dict = await getServerDict();
  const lang = await getServerLang();
  const org = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": `${brand.url}#org`,
    name: brand.name,
    alternateName: brand.founder,
    url: brand.url,
    email: brand.email,
    telephone: brand.phones[0],
    founder: { "@type": "Person", name: brand.founder },
    address: {
      "@type": "PostalAddress",
      addressLocality: brand.city,
      addressCountry: brand.country,
    },
    sameAs: [brand.socials.instagram, brand.socials.facebook],
    description: dict.jsonld.description,
    knowsAbout: dict.jsonld.keywords,
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${brand.url}#website`,
    url: brand.url,
    name: brand.name,
    inLanguage: LOCALE[lang],
    publisher: { "@id": `${brand.url}#org` },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
};
