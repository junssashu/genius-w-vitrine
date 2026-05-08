"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import type { Post } from "@/lib/posts";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) setPosts(await res.json() as Post[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchPosts(); }, [fetchPosts]);

  const handleDelete = async (slug: string) => {
    if (!confirm("Supprimer cet article définitivement ?")) return;
    const res = await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
    if (res.ok) setPosts((prev) => prev.filter((p) => p.slug !== slug));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-ivory">Articles</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-gold-bright text-ink text-xs font-medium tracking-[0.15em] uppercase hover:brightness-110 transition-all"
        >
          <Plus size={14} aria-hidden /> Nouvel article
        </Link>
      </div>

      {loading ? (
        <p className="text-ivory/40 text-sm py-8 text-center">Chargement…</p>
      ) : posts.length === 0 ? (
        <p className="text-ivory/40 text-sm py-8 text-center border border-ivory/10 rounded">Aucun article pour le moment.</p>
      ) : (
        <div className="border border-ivory/10 rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ivory/10 bg-ivory/[0.02]">
                <th className="text-left px-4 py-3 text-[0.65rem] tracking-[0.2em] uppercase text-ivory/40">Titre</th>
                <th className="text-left px-4 py-3 text-[0.65rem] tracking-[0.2em] uppercase text-ivory/40 hidden sm:table-cell">Catégorie</th>
                <th className="text-left px-4 py-3 text-[0.65rem] tracking-[0.2em] uppercase text-ivory/40 hidden md:table-cell">Date</th>
                <th className="px-4 py-3 text-right text-[0.65rem] tracking-[0.2em] uppercase text-ivory/40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/8">
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-ivory/[0.015] transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="text-ivory font-medium truncate max-w-[220px]">{post.title}</p>
                    <p className="text-xs text-ivory/40 mt-0.5 sm:hidden">{post.category}</p>
                  </td>
                  <td className="px-4 py-3.5 text-ivory/60 hidden sm:table-cell">{post.category}</td>
                  <td className="px-4 py-3.5 text-ivory/50 hidden md:table-cell">{post.date}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 text-ivory/40 hover:text-ivory transition-colors" aria-label="Voir">
                        <ExternalLink size={14} />
                      </a>
                      <Link href={`/admin/blog/${post.slug}`}
                        className="p-1.5 text-ivory/40 hover:text-gold-bright transition-colors" aria-label="Éditer">
                        <Edit2 size={14} />
                      </Link>
                      <button onClick={() => void handleDelete(post.slug)}
                        className="p-1.5 text-ivory/40 hover:text-red-400 transition-colors" aria-label="Supprimer">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

