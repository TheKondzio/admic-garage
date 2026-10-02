"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireProfile, requireAdmin } from "@/lib/supabase/auth";
import { slugify } from "@/lib/slugify";
import { REALIZACJA_CATEGORIES } from "@/lib/supabase/dbTypes";

export type ActionResult = { ok: true } | { ok: false; error: string };

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const supabase = createClient();
  let slug = slugify(base) || "realizacja";
  let attempt = 0;

  while (true) {
    let query = supabase.from("realizacje").select("id").eq("slug", slug);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query.maybeSingle();
    if (!data) return slug;
    attempt += 1;
    slug = `${slugify(base)}-${attempt + 1}`;
  }
}

// ETAP 1 tworzenia: minimalne dane, żeby jak najszybciej dostać ID i przejść
// do pełnej edycji (w tym galerii, która wymaga istniejącej realizacji).
export async function createRealizacja(formData: FormData): Promise<void> {
  const profile = await requireProfile();

  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "");

  if (title.length < 3) throw new Error("Tytuł musi mieć co najmniej 3 znaki.");
  if (!REALIZACJA_CATEGORIES.includes(category as (typeof REALIZACJA_CATEGORIES)[number])) {
    throw new Error("Wybierz prawidłową kategorię.");
  }

  const slug = await uniqueSlug(title);
  const supabase = createClient();

  const { data, error } = await supabase
    .from("realizacje")
    .insert({ title, slug, category, status: "draft", author_id: profile.id })
    .select("id")
    .single();

  if (error) throw new Error(`Nie udało się utworzyć realizacji: ${error.message}`);

  revalidatePath("/admin/realizacje");
  redirect(`/admin/realizacje/${data.id}`);
}

export async function updateRealizacja(id: string, formData: FormData): Promise<ActionResult> {
  try {
    await requireProfile();

    const title = String(formData.get("title") ?? "").trim();
    const category = String(formData.get("category") ?? "");
    const status = String(formData.get("status") ?? "draft");

    if (title.length < 3) return { ok: false, error: "Tytuł musi mieć co najmniej 3 znaki." };
    if (!REALIZACJA_CATEGORIES.includes(category as (typeof REALIZACJA_CATEGORIES)[number])) {
      return { ok: false, error: "Wybierz prawidłową kategorię." };
    }
    if (status !== "draft" && status !== "published") {
      return { ok: false, error: "Nieprawidłowy status." };
    }

    let slug = String(formData.get("slug") ?? "").trim();
    slug = slug ? await uniqueSlug(slug, id) : await uniqueSlug(title, id);

    const supabase = createClient();
    const { error } = await supabase
      .from("realizacje")
      .update({
        title,
        slug,
        category,
        status,
        short_description: String(formData.get("shortDescription") ?? "") || null,
        full_description: String(formData.get("fullDescription") ?? "") || null,
        service_slug: String(formData.get("serviceSlug") ?? "") || null,
        vehicle_brand: String(formData.get("vehicleBrand") ?? "") || null,
        vehicle_model: String(formData.get("vehicleModel") ?? "") || null,
        vehicle_year: String(formData.get("vehicleYear") ?? "") || null,
        cover_image_url: String(formData.get("coverImageUrl") ?? "") || null,
        cover_image_alt: String(formData.get("coverImageAlt") ?? "") || null,
        before_image_url: String(formData.get("beforeImageUrl") ?? "") || null,
        before_image_alt: String(formData.get("beforeImageAlt") ?? "") || null,
        after_image_url: String(formData.get("afterImageUrl") ?? "") || null,
        after_image_alt: String(formData.get("afterImageAlt") ?? "") || null,
      })
      .eq("id", id);

    if (error) return { ok: false, error: `Nie udało się zapisać: ${error.message}` };

    revalidatePath("/admin/realizacje");
    revalidatePath(`/admin/realizacje/${id}`);
    revalidatePath("/realizacje");
    revalidatePath(`/realizacje/${slug}`);
    revalidatePath("/"); // podgląd realizacji na stronie głównej korzysta z tych samych danych
    const serviceSlug = String(formData.get("serviceSlug") ?? "");
    if (serviceSlug) revalidatePath(`/uslugi/${serviceSlug}`); // sekcja "Realizacje" na podstronie usługi
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Nieznany błąd." };
  }
}

// Usuwanie — WYŁĄCZNIE admin. requireAdmin rzuca błąd dla roli "editor"
// jeszcze zanim jakiekolwiek zapytanie dotknie bazy; RLS w Supabase i tak
// odrzuciłby to samo żądanie, gdyby ktoś obszedł ten serwer akcji.
export async function deleteRealizacja(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const supabase = createClient();

    // Usuń pliki z galerii ze Storage przed usunięciem wiersza (realizacja_images
    // kasuje się kaskadowo w bazie, ale pliki w Storage trzeba usunąć osobno).
    const { data: images } = await supabase
      .from("realizacja_images")
      .select("url")
      .eq("realizacja_id", id);

    if (images && images.length > 0) {
      const paths = images.map((img) => extractStoragePath(img.url)).filter(Boolean) as string[];
      if (paths.length > 0) await supabase.storage.from("realizacje").remove(paths);
    }

    const { error } = await supabase.from("realizacje").delete().eq("id", id);
    if (error) return { ok: false, error: `Nie udało się usunąć: ${error.message}` };

    revalidatePath("/admin/realizacje");
    revalidatePath("/realizacje");
    revalidatePath("/"); // podgląd realizacji na stronie głównej korzysta z tych samych danych
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Nieznany błąd." };
  }
}

export async function addGalleryImage(realizacjaId: string, url: string, alt: string): Promise<ActionResult> {
  try {
    await requireProfile();
    const supabase = createClient();

    const { data: existing } = await supabase
      .from("realizacja_images")
      .select("position")
      .eq("realizacja_id", realizacjaId)
      .order("position", { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextPosition = existing ? existing.position + 1 : 0;

    const { error } = await supabase
      .from("realizacja_images")
      .insert({ realizacja_id: realizacjaId, url, alt, position: nextPosition });

    if (error) return { ok: false, error: error.message };
    revalidatePath(`/admin/realizacje/${realizacjaId}`);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Nieznany błąd." };
  }
}

export async function removeGalleryImage(imageId: string, realizacjaId: string, url: string): Promise<ActionResult> {
  try {
    await requireProfile();
    const supabase = createClient();

    const path = extractStoragePath(url);
    if (path) await supabase.storage.from("realizacje").remove([path]);

    const { error } = await supabase.from("realizacja_images").delete().eq("id", imageId);
    if (error) return { ok: false, error: error.message };

    revalidatePath(`/admin/realizacje/${realizacjaId}`);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Nieznany błąd." };
  }
}

export async function reorderGalleryImage(imageId: string, realizacjaId: string, newPosition: number): Promise<ActionResult> {
  try {
    await requireProfile();
    const supabase = createClient();
    const { error } = await supabase
      .from("realizacja_images")
      .update({ position: newPosition })
      .eq("id", imageId);

    if (error) return { ok: false, error: error.message };
    revalidatePath(`/admin/realizacje/${realizacjaId}`);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Nieznany błąd." };
  }
}

// Publiczny URL Supabase Storage ma postać:
// https://<project>.supabase.co/storage/v1/object/public/realizacje/<path>
// Wyciąga samą <path>, potrzebną do storage.remove().
function extractStoragePath(publicUrl: string): string | null {
  const marker = "/object/public/realizacje/";
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  return publicUrl.slice(idx + marker.length);
}
