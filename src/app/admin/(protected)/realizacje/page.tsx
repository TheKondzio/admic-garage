import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { REALIZACJA_CATEGORIES } from "@/lib/supabase/dbTypes";

export default async function AdminRealizacjePage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; status?: string };
}) {
  const supabase = createClient();
  let query = supabase.from("realizacje").select("id, title, slug, category, status, vehicle_brand, vehicle_model, updated_at");

  if (searchParams.q) query = query.ilike("title", `%${searchParams.q}%`);
  if (searchParams.category) query = query.eq("category", searchParams.category);
  if (searchParams.status) query = query.eq("status", searchParams.status);

  const { data: realizacje, error } = await query.order("updated_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold text-paper-100">Realizacje</h1>
        <Link href="/admin/realizacje/nowa" className="rounded bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark">
          + Dodaj realizację
        </Link>
      </div>

      <form className="mt-6 flex flex-wrap gap-3" method="get">
        <input
          type="text"
          name="q"
          defaultValue={searchParams.q}
          placeholder="Szukaj po tytule…"
          className="rounded border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-paper-100 placeholder:text-paper-500 focus:border-accent focus:outline-none"
        />
        <select name="category" defaultValue={searchParams.category ?? ""} className="rounded border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-paper-100">
          <option value="">Wszystkie kategorie</option>
          {REALIZACJA_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select name="status" defaultValue={searchParams.status ?? ""} className="rounded border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-paper-100">
          <option value="">Wszystkie statusy</option>
          <option value="published">Opublikowane</option>
          <option value="draft">Wersje robocze</option>
        </select>
        <button type="submit" className="rounded border border-ink-700 px-4 py-2 text-sm font-semibold text-paper-200 hover:border-paper-300">
          Filtruj
        </button>
      </form>

      {error && <p className="mt-6 text-sm text-red-400">Błąd wczytywania: {error.message}</p>}

      <div className="mt-6 overflow-x-auto rounded border border-ink-800">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-ink-800 bg-ink-900 text-xs uppercase tracking-wide text-paper-500">
              <th className="px-4 py-3">Tytuł</th>
              <th className="px-4 py-3">Kategoria</th>
              <th className="px-4 py-3">Auto</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {realizacje && realizacje.length > 0 ? (
              realizacje.map((r) => (
                <tr key={r.id} className="border-b border-ink-800 last:border-0 hover:bg-ink-900/50">
                  <td className="px-4 py-3 text-paper-200">{r.title}</td>
                  <td className="px-4 py-3 text-paper-400">{r.category}</td>
                  <td className="px-4 py-3 text-paper-400">{[r.vehicle_brand, r.vehicle_model].filter(Boolean).join(" ") || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${r.status === "published" ? "bg-emerald-500/15 text-emerald-400" : "bg-ink-800 text-paper-400"}`}>
                      {r.status === "published" ? "Opublikowana" : "Robocza"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/realizacje/${r.id}`} className="text-accent-light hover:text-accent">
                      Edytuj →
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-paper-500">
                  Brak realizacji spełniających kryteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
