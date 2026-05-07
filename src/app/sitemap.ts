import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { navLinks } from "@/lib/nav";
import { portfolio } from "@/lib/portfolio";
import { posts } from "@/lib/posts";

const NOW = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.url;
  const core = navLinks.map((l) => ({
    url: `${base}${l.href === "/" ? "" : l.href}`,
    lastModified: NOW,
    changeFrequency: "monthly" as const,
    priority: l.href === "/" ? 1 : 0.8,
  }));
  const looks = portfolio.map((look) => ({
    url: `${base}/portfolio/${look.slug}`,
    lastModified: NOW,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const articles = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: NOW,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  const legal = [{
    url: `${base}/mentions-legales`,
    lastModified: NOW,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }];
  return [...core, ...looks, ...articles, ...legal];
}
