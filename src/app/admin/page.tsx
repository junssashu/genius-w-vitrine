import Link from "next/link";
import { FileText, Image, MessageSquare, Settings, Plus, ExternalLink } from "lucide-react";
import { getPosts } from "@/lib/posts.server";
import { getPortfolio } from "@/lib/portfolio.server";
import { getTestimonials } from "@/lib/testimonials.server";
import { getServices } from "@/lib/services.server";

const CARDS = [
  { href: "/admin/blog", label: "Articles", icon: FileText, cta: "Gérer les articles" },
  { href: "/admin/portfolio", label: "Portfolio", icon: Image, cta: "Gérer les looks" },
  { href: "/admin/testimonials", label: "Témoignages", icon: MessageSquare, cta: "Gérer les témoignages" },
  { href: "/admin/services", label: "Services", icon: Settings, cta: "Gérer les services" },
];

export default function AdminDashboard() {
  const posts = getPosts();
  const portfolio = getPortfolio();
  const testimonials = getTestimonials();
  const services = getServices();

  const counts = [posts.length, portfolio.length, testimonials.length, services.length];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ivory">Tableau de bord</h1>
          <p className="text-ivory/50 text-sm mt-1">Bienvenue dans l'espace d'administration GENIUS.W</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-ivory/50 hover:text-gold-bright transition-colors"
        >
          <ExternalLink size={14} aria-hidden /> Voir le site
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CARDS.map(({ href, label, icon: Icon, cta }, i) => (
          <Link
            key={href}
            href={href}
            className="border border-ivory/10 rounded-sm p-5 flex flex-col gap-3 hover:border-gold-bright/40 hover:bg-ivory/[0.03] transition-all group"
          >
            <div className="flex items-center justify-between">
              <Icon size={18} className="text-gold-bright" aria-hidden />
              <span className="text-2xl font-display text-ivory">{counts[i]}</span>
            </div>
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-ivory/60">{label}</p>
              <p className="text-xs text-ivory/40 mt-1 group-hover:text-gold-bright/70 transition-colors">{cta} →</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/40 mb-4">Actions rapides</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-gold-bright/40 text-gold-bright text-sm hover:bg-gold-bright/10 transition-colors"
          >
            <Plus size={15} aria-hidden /> Nouvel article
          </Link>
          <Link
            href="/admin/portfolio/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-ivory/20 text-ivory/70 text-sm hover:text-ivory hover:border-ivory/40 transition-colors"
          >
            <Plus size={15} aria-hidden /> Nouveau look
          </Link>
        </div>
      </div>

      {/* Recent posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/40">Derniers articles</h2>
          <Link href="/admin/blog" className="text-xs text-ivory/40 hover:text-gold-bright transition-colors">Voir tout →</Link>
        </div>
        <ul className="flex flex-col divide-y divide-ivory/8">
          {posts.slice(0, 4).map((post) => (
            <li key={post.slug} className="flex items-center justify-between py-3 gap-4">
              <div className="min-w-0">
                <p className="text-sm text-ivory truncate">{post.title}</p>
                <p className="text-xs text-ivory/40">{post.category} · {post.date}</p>
              </div>
              <Link
                href={`/admin/blog/${post.slug}`}
                className="shrink-0 text-xs text-ivory/40 hover:text-gold-bright transition-colors"
              >
                Éditer
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
