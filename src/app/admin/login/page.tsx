"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setLoading(false);
      // Prawdziwy powód (zły e-mail/hasło, brak konta, błędne dane Supabase
      // w .env.local, e-mail niepotwierdzony...) trafia do konsoli
      // przeglądarki — widoczny do diagnozy, ale nie pokazywany wprost na
      // stronie (standardowa praktyka bezpieczeństwa logowania).
      console.error("Błąd logowania Supabase:", signInError.message, signInError);
      setError("Nieprawidłowy e-mail lub hasło. Szczegóły błędu: konsola przeglądarki (F12 → Console).");
      return;
    }

    // Logowanie w Supabase Auth się udało — ale panel wymaga też wiersza
    // w tabeli `profiles` (tworzonego automatycznie triggerem z schema.sql).
    // Jeśli go brakuje, layout panelu i tak odeśle z powrotem tutaj — co z
    // zewnątrz wygląda IDENTYCZNIE jak "złe hasło", tylko nią nie jest.
    // Sprawdzamy to od razu, żeby dać Ci konkretną, trafną podpowiedź.
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", data.user.id)
      .maybeSingle();

    if (!profile) {
      setLoading(false);
      await supabase.auth.signOut();
      setError(
        "Zalogowano poprawnie, ale brak profilu w bazie. Najpewniej nie uruchomiono jeszcze supabase/schema.sql (Krok 2 w README_PANEL.md) — zrób to w Supabase → SQL Editor, potem spróbuj ponownie."
      );
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-5">
      <div className="w-full max-w-sm rounded border border-ink-800 bg-ink-900 p-8">
        <p className="font-display text-lg font-bold text-paper-100">
          ADMIC <span className="text-accent">GARAGE</span>
        </p>
        <h1 className="mt-1 text-sm font-medium text-paper-400">Panel administracyjny</h1>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">
              Adres e-mail
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 focus:border-accent focus:outline-none"
              placeholder="twoj@email.pl"
              autoComplete="username"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">
              Hasło
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 focus:border-accent focus:outline-none"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
          >
            {loading ? "Logowanie…" : "Zaloguj się"}
          </button>
        </form>

        <p className="mt-6 text-xs text-paper-500">
          Nie masz konta? Poproś administratora o założenie go w Supabase
          (Dashboard → Authentication → Users → Add user).
        </p>
      </div>
    </div>
  );
}
