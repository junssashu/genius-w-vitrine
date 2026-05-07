export type NavLink = {
  num: string;
  label: string;
  href: string;
  description: string;
};

export const navLinks: readonly NavLink[] = [
  { num: "01", label: "Accueil", href: "/", description: "Page d'ouverture" },
  { num: "02", label: "À Propos", href: "/a-propos", description: "L'atelier et son fondateur" },
  { num: "03", label: "Services", href: "/services", description: "Quatre métiers, une exigence" },
  { num: "04", label: "Portfolio", href: "/portfolio", description: "Réalisations & collections" },
  { num: "05", label: "Témoignages", href: "/temoignages", description: "Paroles de client·e·s" },
  { num: "06", label: "Journal", href: "/blog", description: "Notes & coulisses" },
  { num: "07", label: "FAQ", href: "/faq", description: "Questions fréquentes" },
  { num: "08", label: "Contact", href: "/contact", description: "Prendre rendez-vous" },
] as const;
