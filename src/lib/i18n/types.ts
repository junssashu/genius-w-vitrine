export type Lang = "fr" | "en";

export type NavKey = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08";

export type PageCopy = {
  eyebrow: string;
  titleA: string;
  titleEm: string;
  titleB: string;
  lede: string;
};

export type CrossLink = { title: string; lede: string };

export type Dictionary = {
  nav: Record<NavKey, string>;
  cta: {
    bookAppointment: string;
    viewPieces: string;
    viewAll: string;
    allArticles: string;
    readMore: string;
    requestQuote: string;
    requestThis: string;
    writeFounder: string;
    backToHome: string;
    backToPortfolio: string;
    backToJournal: string;
    publish: string;
    sending: string;
    send: string;
    askQuestion: string;
    seeServices: string;
    seePortfolio: string;
    continueRead: string;
    further: string;
    afterwards: string;
  };
  common: {
    skip: string;
    menuOpen: string;
    menuClose: string;
    house: string;
    sitemap: string;
    contact: string;
    follow: string;
    legal: string;
    siteSection: string;
    sitemapPage: string;
  };
  toggles: { light: string; dark: string; auto: string; fr: string; en: string; theme: string; language: string };
  hero: { eyebrow: string; line1: string; line2: string; line3: string; line4: string; lede: string; quote: string; seasons: string; scrollHint: string };
  manifesto: { eyebrow: string; titleA: string; titleEm: string; titleB: string; lede: string };
  pillars: { coupe: string; coupeText: string; cousu: string; cousuText: string; brode: string; brodeText: string; pense: string; penseText: string };
  services: { preview: PageCopy; page: PageCopy; quoteCta: string };
  portfolio: { preview: PageCopy; page: PageCopy; detail: { category: string; season: string; atelier: string; edition: string; uniquePiece: string } };
  testimonials: { preview: PageCopy; page: PageCopy };
  blog: { preview: PageCopy; page: PageCopy; detail: { read: string; by: string; share: string }; comments: { heading: string; storedHere: string; emptyState: string; namePlaceholder: string; commentPlaceholder: string; nameLabel: string; commentLabel: string; storedNotice: string; errorName: string; errorText: string } };
  faq: PageCopy & { detail: { ask: string } };
  contact: PageCopy & { detail: { coordinates: string; hours: string; hoursText: string; seeFaq: string; reply: string; received: string; receivedLede: string; namePh: string; nameLbl: string; emailLbl: string; emailPh: string; phoneLbl: string; phonePh: string; kindLbl: string; messageLbl: string; messagePh: string; kinds: { hc: string; mix: string; rtw: string; acc: string; other: string } } };
  legal: PageCopy;
  notFound: { code: string; title: string; lede: string };
  footer: { sloganLeft: string; sloganRight: string; designedIn: string; brandLede: string };
  greeting: { cinema: string; cinemaTitle: string; statement: string; line1: string; line2: string; line3: string; line4: string; wordsTop: readonly string[]; wordsBottom: readonly string[]; wordsAria: string };
  lookCard: { ariaLabel: string; visualAlt: string; featured: string };
  faqAccordion: { aria: string };
  cursor: { view: string };
  blogLike: { liked: string; like: string; ariaAdd: string; ariaRemove: string };
  social: { instagramAria: string; facebookAria: string; emailAria: string };
  countLabel: { pieces: string };
  gallery: { ariaDefault: string };
  meta: { rootTitle: string; rootDesc: string; about: string; aboutDesc: string; services: string; servicesDesc: string; portfolio: string; portfolioDesc: string; testimonials: string; testimonialsDesc: string; blog: string; blogDesc: string; faq: string; faqDesc: string; contact: string; contactDesc: string; legal: string; legalDesc: string };
  legalSections: ReadonlyArray<{ h: string; b: string }>;
  jsonld: { description: string; keywords: readonly string[] };
  about: { atelier: string; p1: string; p2: string; p3: string; founded: string; pieces: string; hours: string; brodeuses: string; ourCrafts: string; viewPortfolio: string };
  cross: { aPropos: CrossLink; services: CrossLink; portfolio: CrossLink; testimonials: CrossLink; faq: CrossLink; contact: CrossLink; blog: CrossLink };
};
