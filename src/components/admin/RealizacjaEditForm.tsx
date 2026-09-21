"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateRealizacja, deleteRealizacja, type ActionResult } from "@/lib/actions/realizacje";
import { REALIZACJA_CATEGORIES } from "@/lib/supabase/dbTypes";
import type { RealizacjaRow, RealizacjaImageRow } from "@/lib/supabase/dbTypes";
import { ImageSlot } from "@/components/admin/ImageSlot";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { confirmedServices } from "@/data/services";
import { site } from "@/data/site";

export function RealizacjaEditForm({
  realizacja,
  images,
  canDelete,
}: {
  realizacja: RealizacjaRow;
  images: RealizacjaImageRow[];
  canDelete: boolean;
}) {
  const router = useRouter();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [pending, startTransition] = useTransition();
  const [dirty, setDirty] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [cover, setCover] = useState({ url: realizacja.cover_image_url ?? "", alt: realizacja.cover_image_alt ?? "" });
  const [before, setBefore] = useState({ url: realizacja.before_image_url ?? "", alt: realizacja.before_image_alt ?? "" });
  const [after, setAfter] = useState({ url: realizacja.after_image_url ?? "", alt: realizacja.after_image_alt ?? "" });

  // Ostrzeżenie przed utratą niezapisanych zmian przy zamknięciu/odświeżeniu karty.
  useEffect(() => {
    function handler(e: BeforeUnloadEvent) {
      if (dirty) {
        e.preventDefault();
      }
    }
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  function handleSubmit(formData: FormData) {
    setResult(null);
    startTransition(async () => {
      const res = await updateRealizacja(realizacja.id, formData);
      setResult(res);
      if (res.ok) setDirty(false);
    });
  }

  function handleDelete() {
    if (!confirm(`Na pewno usunąć „${realizacja.title}”? Tej operacji nie można cofnąć.`)) return;
    setDeleting(true);
    startTransition(async () => {
      const res = await deleteRealizacja(realizacja.id);
      if (res.ok) {
        router.push("/admin/realizacje");
      } else {
        setResult(res);
        setDeleting(false);
      }
    });
  }

  return (
    <div className="max-w-3xl" onChange={() => setDirty(true)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/realizacje" className="text-xs text-paper-500 hover:text-paper-200">
            ← Wróć do listy
          </Link>
          <h1 className="mt-1 font-display text-2xl font-semibold text-paper-100">{realizacja.title}</h1>
        </div>
        {realizacja.status === "published" && (
          <a
            href={`${site.url}/realizacje/${realizacja.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent-light hover:text-accent"
          >
            Zobacz na żywo →
          </a>
        )}
      </div>

      <form action={handleSubmit} className="mt-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">Tytuł *</span>
            <input name="title" required minLength={3} defaultValue={realizacja.title} className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 focus:border-accent focus:outline-none" />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">Adres URL (slug)</span>
            <input name="slug" defaultValue={realizacja.slug} className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 focus:border-accent focus:outline-none" />
            <span className="mt-1 block text-xs text-paper-500">
              {site.url}/realizacje/<span className="text-paper-300">{realizacja.slug}</span>
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">Kategoria *</span>
            <select name="category" required defaultValue={realizacja.category} className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 focus:border-accent focus:outline-none">
              {REALIZACJA_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">Powiązana usługa</span>
            <select name="serviceSlug" defaultValue={realizacja.service_slug ?? ""} className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 focus:border-accent focus:outline-none">
              <option value="">— brak —</option>
              {confirmedServices.map((s) => (
                <option key={s.slug} value={s.slug}>{s.navLabel}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">Marka</span>
            <input name="vehicleBrand" defaultValue={realizacja.vehicle_brand ?? ""} placeholder="np. BMW" className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 placeholder:text-paper-500 focus:border-accent focus:outline-none" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">Model</span>
            <input name="vehicleModel" defaultValue={realizacja.vehicle_model ?? ""} placeholder="np. G20" className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 placeholder:text-paper-500 focus:border-accent focus:outline-none" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">Rocznik</span>
            <input name="vehicleYear" defaultValue={realizacja.vehicle_year ?? ""} placeholder="np. 2022" className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 placeholder:text-paper-500 focus:border-accent focus:outline-none" />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">Status</span>
            <select name="status" defaultValue={realizacja.status} className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 focus:border-accent focus:outline-none">
              <option value="draft">Wersja robocza (niewidoczna publicznie)</option>
              <option value="published">Opublikowana</option>
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">Krótki opis</span>
            <input name="shortDescription" defaultValue={realizacja.short_description ?? ""} placeholder="Jedno zdanie — widoczne na kaflu realizacji" className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 placeholder:text-paper-500 focus:border-accent focus:outline-none" />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">Pełny opis</span>
            <textarea name="fullDescription" defaultValue={realizacja.full_description ?? ""} rows={4} placeholder="Co dokładnie zrobiliście przy tym aucie" className="w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 placeholder:text-paper-500 focus:border-accent focus:outline-none" />
          </label>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-paper-300">Zdjęcia</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <ImageSlot label="Zdjęcie główne" pathPrefix={`realizacje/${realizacja.id}/cover`} value={cover.url} alt={cover.alt} onChange={(url, alt) => { setCover({ url, alt }); setDirty(true); }} />
            <ImageSlot label="Przed" pathPrefix={`realizacje/${realizacja.id}/before`} value={before.url} alt={before.alt} onChange={(url, alt) => { setBefore({ url, alt }); setDirty(true); }} />
            <ImageSlot label="Po" pathPrefix={`realizacje/${realizacja.id}/after`} value={after.url} alt={after.alt} onChange={(url, alt) => { setAfter({ url, alt }); setDirty(true); }} />
          </div>
          <input type="hidden" name="coverImageUrl" value={cover.url} />
          <input type="hidden" name="coverImageAlt" value={cover.alt} />
          <input type="hidden" name="beforeImageUrl" value={before.url} />
          <input type="hidden" name="beforeImageAlt" value={before.alt} />
          <input type="hidden" name="afterImageUrl" value={after.url} />
          <input type="hidden" name="afterImageAlt" value={after.alt} />
        </div>

        {result && !result.ok && <p className="text-sm text-red-400">{result.error}</p>}
        {result && result.ok && <p className="text-sm text-emerald-400">Zapisano.</p>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={pending} className="rounded bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60">
            {pending ? "Zapisywanie…" : "Zapisz zmiany"}
          </button>

          {canDelete && (
            <button type="button" onClick={handleDelete} disabled={deleting} className="rounded border border-red-900 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-950 disabled:opacity-60">
              {deleting ? "Usuwanie…" : "Usuń realizację"}
            </button>
          )}
        </div>
      </form>

      <div className="mt-10 border-t border-ink-800 pt-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-paper-300">
          Galeria dodatkowych zdjęć
        </h2>
        <p className="mt-1 text-xs text-paper-500">
          Zmiany w galerii zapisują się od razu — nie trzeba klikać „Zapisz zmiany”.
        </p>
        <div className="mt-3">
          <GalleryManager realizacjaId={realizacja.id} initialImages={images} />
        </div>
      </div>
    </div>
  );
}
