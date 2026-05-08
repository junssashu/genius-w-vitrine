import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PostCard } from "@/components/blog/post-card";
import { getPosts } from "@/lib/posts.server";
import { getServerDict } from "@/lib/i18n/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getServerDict();
  return { title: dict.meta.blog, description: dict.meta.blogDesc, alternates: { canonical: "/blog" } };
};

export default async function BlogPage() {
  const dict = await getServerDict();
  const posts = getPosts();
  return (
    <>
      <PageHeader copy={dict.blog.page} />
      <Section>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {posts.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.06} className="h-full">
              <PostCard post={p} index={i} />
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
