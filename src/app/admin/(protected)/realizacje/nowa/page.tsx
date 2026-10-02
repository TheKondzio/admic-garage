import Link from "next/link";
import { createRealizacja } from "@/lib/actions/realizacje";
import { REALIZACJA_CATEGORIES } from "@/lib/supabase/dbTypes";

export default function NowaRealizacjaPage() {
  return (
    <div className="max-w-lg">
      <Link href="/admin/realizacje" className="text-xs text-paper-500 hover:text-paper-200">
        ← Wróć do listy
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-paper-100">Dodaj realizację</h1>
      <p className="mt-1 text-sm text-paper-500">
        Podaj tytuł i kategorię — resztę (zdjęcia, opis, markę auta) uzupełnisz na następnym ekranie.
        Adres URL (slug) wygeneruje się automatycznie z tytułu.
      </p>

      <form action={createRealizacja} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">
            Tytuł realizacji *
          </span>
          <input
            name="title"
            required
            minLength={3}
            placeholder="np. BMW G20 — aktywacja CarPlay"
            className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 placeholder:text-paper-500 focus:border-accent focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">
            Kategoria *
          </span>
          <select
            name="category"
            required
            defaultValue=""
            className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 focus:border-accent focus:outline-none"
          >
            <option value="" disabled>Wybierz kategorię…</option>
            {REALIZACJA_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <button type="submit" className="rounded bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark">
          Utwórz i przejdź do edycji →
        </button>
      </form>
    </div>
  );
}
