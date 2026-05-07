import { brand } from "@/lib/brand";
import type { Post } from "@/lib/posts";

type Props = { post: Post };

export const ArticleJsonLd = ({ post }: Props) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: brand.founder },
    publisher: { "@id": `${brand.url}#org` },
    mainEntityOfPage: `${brand.url}/blog/${post.slug}`,
    articleSection: post.category,
    inLanguage: "fr-FR",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
