"use client";

import { useLocalStorage } from "./use-local-storage";
import { CommentForm, type Comment } from "./comment-form";
import { useT, usePreferences } from "@/components/providers/preferences-context";

type Props = { slug: string };

const COMMENTS_KEY = (slug: string) => `gw:comments:${slug}`;
const fmt = (iso: string, locale: string) =>
  new Date(iso).toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });

export const Comments = ({ slug }: Props) => {
  const t = useT();
  const c = t.blog.comments;
  const { lang } = usePreferences();
  const locale = lang === "fr" ? "fr-FR" : "en-GB";
  const [list, setList] = useLocalStorage<Comment[]>(COMMENTS_KEY(slug), []);

  const add = (item: Comment) => setList([item, ...list]);

  return (
    <section aria-labelledby="comments-heading" className="flex flex-col gap-10">
      <header className="flex items-baseline justify-between gap-4 flex-wrap">
        <h2 id="comments-heading" className="t-2">
          {c.heading} <span className="text-gold-bright">({list.length})</span>
        </h2>
        <p className="text-[0.7rem] tracking-[0.22em] uppercase text-ivory/50">{c.storedHere}</p>
      </header>
      <CommentForm onSubmit={add} />
      <ul className="flex flex-col gap-5" aria-live="polite">
        {list.length === 0 ? (
          <li className="card-edit text-ivory/55 italic">{c.emptyState}</li>
        ) : (
          list.map((item) => (
            <li key={item.id} className="card-edit">
              <div className="flex items-baseline justify-between gap-4 mb-3 text-sm">
                <span className="font-medium text-ivory">{item.name}</span>
                <time dateTime={item.date} className="text-xs text-ivory/45">{fmt(item.date, locale)}</time>
              </div>
              <p className="text-ivory/85 leading-relaxed">{item.text}</p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};
