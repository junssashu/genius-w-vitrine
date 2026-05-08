"use client";

import { useState } from "react";
import { Scissors } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = "/admin";
      } else {
        const data = await res.json() as { error?: string };
        setError(data.error ?? "Erreur d'authentification");
      }
    } catch {
      setError("Erreur réseau, veuillez réessayer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-3 mb-6">
            <Scissors size={20} className="text-gold-bright" aria-hidden />
            <span className="font-editorial text-3xl text-ivory">GENIUS.W</span>
          </span>
          <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/40">Espace Administration</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="border border-ivory/15 rounded-sm p-8 flex flex-col gap-6 bg-ivory/[0.02]"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[0.7rem] tracking-[0.22em] uppercase text-ivory/60">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full bg-transparent border border-ivory/20 rounded px-4 py-3 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold-bright transition-colors"
              placeholder="••••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm" role="alert">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 px-6 rounded bg-gold-bright text-ink text-sm font-medium tracking-[0.15em] uppercase transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Connexion…" : "Accéder"}
          </button>
        </form>

        <p className="text-center mt-6 text-ivory/30 text-xs">
          Accès réservé — <a href="/" className="underline hover:text-ivory/60">Retour au site</a>
        </p>
      </div>
    </div>
  );
}
