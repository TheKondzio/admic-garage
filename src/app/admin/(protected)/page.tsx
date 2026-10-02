import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const [{ count: totalCount }, { count: publishedCount }, { count: draftCount }, { data: recent }] = await Promise.all([
    supabase.from("realizacje").select("*", { count: "exact", head: true }),
    supabase.from("realizacje").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("realizacje").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("realizacje").select("id, title, status, updated_at").order("updated_at", { ascending: false }).limit(5),
  ]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold text-paper-100">Dashboard</h1>
        <Link href="/admin/realizacje/nowa" className="rounded bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark">
          + Dodaj realizację
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Wszystkie realizacje" value={totalCount ?? 0} />
        <StatCard label="Opublikowane" value={publishedCount ?? 0} />
        <StatCard label="Wersje robocze" value={draftCount ?? 0} />
      </div>

      <div className="mt-8">
        <h2 className="font-display text-base font-semibold text-paper-100">Ostatnio zmienione</h2>
        {recent && recent.length > 0 ? (
          <ul className="mt-3 divide-y divide-ink-800 rounded border border-ink-800">
            {recent.map((r) => (
              <li key={r.id}>
                <Link href={`/admin/realizacje/${r.id}`} className="flex items-center justify-between px-4 py-3 text-sm hover:bg-ink-900">
                  <span className="text-paper-200">{r.title}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${r.status === "published" ? "bg-emerald-500/15 text-emerald-400" : "bg-ink-800 text-paper-400"}`}>
                    {r.status === "published" ? "Opublikowana" : "Wersja robocza"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-paper-500">Brak realizacji — dodaj pierwszą.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded border border-ink-800 bg-ink-900 p-5">
      <p className="text-3xl font-bold text-paper-100">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-paper-500">{label}</p>
    </div>
  );
}
