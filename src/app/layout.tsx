import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Italiana, Manrope } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Cursor } from "@/components/layout/cursor";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { SkipLink } from "@/components/a11y/skip-link";
import { OrgJsonLd } from "@/components/layout/json-ld";
import { PreferencesProvider } from "@/components/providers/preferences-provider";
import { ThemeScript } from "@/components/providers/theme-script";
import { GreetingBanner } from "@/components/layout/greeting-banner";
import { readServerPrefs } from "@/lib/server-prefs";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";
import { brand } from "@/lib/brand";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const OG_LOCALE: Record<"fr" | "en", string> = { fr: "fr_FR", en: "en_GB" };

export const generateMetadata = async (): Promise<Metadata> => {
  const { lang } = await readServerPrefs();
  const dict = DICTIONARIES[lang];
  return {
    metadataBase: new URL(brand.url),
    title: { default: dict.meta.rootTitle, template: `%s — ${brand.name}` },
    description: dict.meta.rootDesc,
    applicationName: brand.name,
    authors: [{ name: brand.founder }],
    creator: brand.founder,
    publisher: brand.name,
    keywords: [...dict.jsonld.keywords, brand.name, brand.founder],
    category: "fashion",
    alternates: { canonical: "/", languages: { "fr-FR": "/", "en-GB": "/" } },
    openGraph: {
      title: dict.meta.rootTitle,
      description: dict.meta.rootDesc,
      url: brand.url,
      siteName: brand.name,
      locale: OG_LOCALE[lang],
      type: "website",
    },
    twitter: { card: "summary_large_image", title: dict.meta.rootTitle, description: dict.meta.rootDesc },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const initial = await readServerPrefs();
  return (
    <html
      lang={initial.lang}
      data-theme="dark"
      suppressHydrationWarning
      className={`${cormorant.variable} ${italiana.variable} ${manrope.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <PreferencesProvider initial={initial}>
          <SkipLink />
          <SmoothScroll />
          <Cursor />
          <div className="grain" aria-hidden />
          <Nav />
          <div className="pt-20 lg:pt-24">
            <GreetingBanner />
            <main id="main" tabIndex={-1} className="relative">
              {children}
            </main>
          </div>
          <Footer />
          <OrgJsonLd />
        </PreferencesProvider>
      </body>
    </html>
  );
}
