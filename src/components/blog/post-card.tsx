import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import type { Post } from "@/lib/posts";

type Props = { post: Post; index: number };

export const PostCard = ({ post, index }: Props) => (
  <article aria-labelledby={`post-${post.slug}`} className="h-full">
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`Lire l'article : ${post.title}`}
      className="block h-full focus-visible:outline-2 focus-visible:outline-gold-bright"
    >
      <TiltCard intensity={6} className="h-full">
        <div className="card-edit h-full flex flex-col gap-6 group relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `radial-gradient(600px circle at 30% 0%, ${post.palette.from}55, transparent 60%)` }}
          />
          <div className="relative flex items-center justify-between text-[0.65rem] tracking-[0.22em] uppercase text-ivory/55">
            <span>№ {String(index + 1).padStart(2, "0")} · {post.category}</span>
            <span>{post.read}</span>
          </div>
          <h3 id={`post-${post.slug}`} className="relative font-display text-2xl md:text-3xl leading-tight">
            {post.title}
          </h3>
          <p className="relative text-ivory/70 leading-relaxed">{post.excerpt}</p>
          <div className="relative mt-auto flex items-center justify-between text-sm">
            <time className="text-ivory/55">{post.date}</time>
            <span className="icon-row link-underline text-gold-bright">
              Lire <ArrowUpRight size={14} aria-hidden />
            </span>
          </div>
        </div>
      </TiltCard>
    </Link>
  </article>
);
