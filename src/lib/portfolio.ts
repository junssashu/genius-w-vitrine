export type Motif = "stripes" | "weave" | "dots" | "arc" | "grid" | "gold";

export type Look = {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  palette: { from: string; to: string; accent: string };
  motif: Motif;
};

export const portfolio: readonly Look[] = [
  {
    slug: "obsidienne",
    title: "Obsidienne",
    category: "Haute Couture",
    year: "FW 26",
    description:
      "Robe-sculpture en velours de soie noir, drapé asymétrique inspiré des falaises de Mandara.",
    palette: { from: "#0b0b0c", to: "#2b1d1f", accent: "#b8945f" },
    motif: "weave",
  },
  {
    slug: "ivoire-vif",
    title: "Ivoire Vif",
    category: "Prêt-à-Porter",
    year: "SS 26",
    description:
      "Tailleur en lin écru, structure architecturale, doublure de soie sauvage.",
    palette: { from: "#ece4d4", to: "#c9b893", accent: "#5a1a1f" },
    motif: "stripes",
  },
  {
    slug: "or-de-mfoundi",
    title: "Or de Mfoundi",
    category: "Couture Mixte",
    year: "FW 26",
    description:
      "Cape brodée fil d'or, motif inspiré des bronzes Tikar — pièce de défilé.",
    palette: { from: "#1a1a1c", to: "#5a3a1a", accent: "#d4b27f" },
    motif: "gold",
  },
  {
    slug: "vermeil",
    title: "Vermeil",
    category: "Haute Couture",
    year: "SS 26",
    description:
      "Robe à corolle, mousseline rouge sang, traîne sculpturale. Pièce d'apparat.",
    palette: { from: "#5a1a1f", to: "#2b0e10", accent: "#d4b27f" },
    motif: "arc",
  },
  {
    slug: "graphite",
    title: "Graphite",
    category: "Couture Mixte",
    year: "FW 26",
    description:
      "Manteau long oversize, laine compactée, ceinture nouée. Silhouette monolithique.",
    palette: { from: "#2a2a2c", to: "#0b0b0c", accent: "#b8945f" },
    motif: "grid",
  },
  {
    slug: "ambre",
    title: "Ambre",
    category: "Accessoires",
    year: "Capsule",
    description:
      "Sac structuré en cuir tanné, fermoir laiton brossé, sangle tressée main.",
    palette: { from: "#7a4a1a", to: "#3a1d0e", accent: "#ece4d4" },
    motif: "dots",
  },
  {
    slug: "lune-noire",
    title: "Lune Noire",
    category: "Haute Couture",
    year: "FW 26",
    description:
      "Robe bustier perlée, tulle de soie noire, broderie galaxie main, 320h d'atelier.",
    palette: { from: "#0b0b0c", to: "#1a1430", accent: "#d4b27f" },
    motif: "dots",
  },
  {
    slug: "savane",
    title: "Savane",
    category: "Prêt-à-Porter",
    year: "SS 26",
    description:
      "Robe longue en lin sable, fendue, encolure dégagée. Sandales lacées.",
    palette: { from: "#c9b893", to: "#7a5a3a", accent: "#0b0b0c" },
    motif: "stripes",
  },
] as const;

export const findLook = (slug: string): Look | undefined =>
  portfolio.find((l) => l.slug === slug);
