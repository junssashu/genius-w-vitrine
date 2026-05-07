export const brand = {
  name: "GENIUS.W",
  founder: "Junius Wabo",
  tagline: "Maison de Couture",
  email: "juniuswabo@gmail.com",
  phones: ["+237 695 299 095", "+237 672 473 291"],
  city: "Yaoundé",
  country: "Cameroun",
  locale: "fr-FR",
  url: "https://genius-wabo.com",
  socials: {
    instagram:
      "https://www.instagram.com/genius_wabo.official?igsh=bTZpOW9qbmUycXFv&utm_source=qr",
    facebook: "https://www.facebook.com/share/18QskaAfF8/?mibextid=wwXIfr",
  },
} as const;

export type Brand = typeof brand;
