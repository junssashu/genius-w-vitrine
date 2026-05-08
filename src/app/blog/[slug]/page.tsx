import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { LikeButton } from "@/components/blog/like-button";
import { Comments } from "@/components/blog/comments";
import { ArticleJsonLd } from "@/components/blog/article-jsonld";
import { getPosts, findPost } from "@/lib/posts.server";
import { brand } from "@/lib/brand";
import { getServerDict } from "@/lib/i18n/server";
import { VideoEmbed } from "@/components/blog/video-embed";

type Params = { slug: string };

export const generateStaticParams = (): Params[] => getPosts().map((p) => ({ slug: p.slug }));

export const generateMetadata = async ({ params }: { params: Promise<Params> }): Promise<Metadata> => {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: `${post.title} — ${brand.name}`, description: post.excerpt, type: "article", publishedTime: post.date, authors: [brand.founder] },
  };
};

const adjacent = (slug: string) => {
  const all = getPosts();
  const i = all.findIndex((p) => p.slug === slug);
  return { prev: all[(i - 1 + all.length) % all.length], next: all[(i + 1) % all.length] };
};

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  const dict = await getServerDict();
  const d = dict.blog.detail;
  const { prev, next } = adjacent(slug);

  return (
    <>
      <ScrollProgress />
      <ArticleJsonLd post={post} />
      <article aria-labelledby="article-title">
        <header
          className="relative pt-14 lg:pt-24 pb-16 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${post.palette.from}, ${post.palette.to})` }}
        >
          <div aria-hidden className="absolute inset-0 aurora opacity-50" />
          <div className="container-edit relative flex flex-col gap-8 max-w-4xl">
            <Link href="/blog" className="link-underline icon-row text-[0.7rem] tracking-[0.22em] uppercase text-ivory/70 w-fit">
              <ArrowLeft size={14} aria-hidden /> {dict.cta.backToJournal}
            </Link>
            <Reveal><span className="eyebrow">{post.category}</span></Reveal>
            <Reveal delay={0.1}><h1 id="article-title" className="t-1 text-balance">{post.title}</h1></Reveal>
            <Reveal delay={0.2}><p className="lede max-w-3xl text-balance">{post.excerpt}</p></Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-8 text-sm text-ivory/65 pt-6">
                <span className="icon-row"><Calendar size={14} aria-hidden /> <time>{post.date}</time></span>
                <span className="icon-row"><Clock size={14} aria-hidden /> {post.read} {d.read}</span>
                <span className="icon-row">{d.by} {brand.founder}</span>
              </div>
            </Reveal>
          </div>
          {post.coverUrl && (
            <div className="container-edit relative aspect-video max-h-[60vh] overflow-hidden rounded-sm mt-8">
              <Image src={post.coverUrl} alt={post.title} fill className="object-cover" priority />
            </div>
          )}
        </header>
        <Section>
          <div className="max-w-2xl mx-auto flex flex-col gap-8 text-lg leading-relaxed text-ivory/85">
            {post.videoUrl && (
              <VideoEmbed url={post.videoUrl} />
            )}
            {post.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <p className="text-balance">{p}</p>
              </Reveal>
            ))}
            <div className="pt-10 mt-6 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-4">
              <LikeButton slug={post.slug} />
              <p className="text-[0.65rem] tracking-[0.22em] uppercase text-ivory/50">{d.share}</p>
            </div>
          </div>
        </Section>
        <Section className="bg-ink/60" ariaLabel={dict.blog.comments.heading}>
          <div className="max-w-2xl mx-auto">
            <Comments slug={post.slug} />
          </div>
        </Section>
        <nav aria-label={dict.cross.blog.title} className="container-edit border-t border-ivory/10 py-12 flex justify-between gap-6">
          <Link href={`/blog/${prev.slug}`} className="group icon-row gap-3 text-ivory/70 hover:text-ivory">
            <ArrowLeft className="transition-transform group-hover:-translate-x-1" aria-hidden /> <span className="font-display text-xl">{prev.title}</span>
          </Link>
          <Link href={`/blog/${next.slug}`} className="group icon-row gap-3 text-ivory/70 hover:text-ivory">
            <span className="font-display text-xl">{next.title}</span> <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </nav>
      </article>
    </>
  );
}
