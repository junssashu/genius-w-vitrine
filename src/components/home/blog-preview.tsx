"use client";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { PostCard } from "@/components/blog/post-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useT } from "@/components/providers/preferences-context";
import { posts } from "@/lib/posts";

const PREVIEW = 3;

export const BlogPreview = () => {
  const t = useT();
  const c = t.blog.preview;
  return (
    <Section ariaLabel={t.cross.blog.title}>
      <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
        <SectionHeader
          eyebrow={c.eyebrow}
          title={<>{c.titleA} <em className="text-gold-bright not-italic">{c.titleEm}</em> {c.titleB}</>}
          lede={c.lede}
        />
        <Reveal><Button href="/blog" variant="ghost">{t.cta.allArticles}</Button></Reveal>
      </div>
      <ul className="grid md:grid-cols-3 gap-8 items-stretch">
        {posts.slice(0, PREVIEW).map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 0.08} className="h-full">
            <PostCard post={p} index={i} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
};
