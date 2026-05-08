"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { LayoutDashboard, FileText, Image, MessageSquare, Settings, LogOut, Scissors } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/blog", label: "Articles", icon: FileText },
  { href: "/admin/portfolio", label: "Portfolio", icon: Image },
  { href: "/admin/testimonials", label: "Témoignages", icon: MessageSquare },
  { href: "/admin/services", label: "Services", icon: Settings },
];

function AdminSidebar({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside className="flex flex-col h-full bg-[#0b0b0c] border-r border-ivory/10">
      <div className="px-6 py-5 border-b border-ivory/10 flex items-center gap-3">
        <Scissors size={16} className="text-gold-bright" aria-hidden />
        <span className="font-editorial text-xl tracking-wide text-ivory">GENIUS.W</span>
        <span className="text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 ml-1">Admin</span>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1" aria-label="Navigation admin">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNav}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors",
                active
                  ? "bg-gold-bright/10 text-gold-bright"
                  : "text-ivory/60 hover:text-ivory hover:bg-ivory/5"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={16} aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-4 border-t border-ivory/10 pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-ivory/60 hover:text-ivory hover:bg-ivory/5 transition-colors"
        >
          <LogOut size={16} aria-hidden />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Restore cursor for admin
  useEffect(() => {
    document.body.style.setProperty("cursor", "auto");
    document.body.style.setProperty("--cursor-none", "auto");
    const style = document.createElement("style");
    style.id = "admin-cursor";
    style.textContent = "body, body *, [data-cursor] { cursor: auto !important; }";
    document.head.appendChild(style);
    return () => {
      document.body.style.removeProperty("cursor");
      document.body.style.removeProperty("--cursor-none");
      document.getElementById("admin-cursor")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-ivory font-body flex">
      {/* Sidebar desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-56 lg:fixed lg:inset-y-0">
        <AdminSidebar />
      </div>
      {/* Main content */}
      <main className="flex-1 lg:pl-56 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
