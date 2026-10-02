import type { Project } from "@/types";
import type { RealizacjaRow, RealizacjaImageRow } from "@/lib/supabase/dbTypes";

export function mapRowToProject(row: RealizacjaRow, images: RealizacjaImageRow[] = []): Project {
  const vehicle = [row.vehicle_brand, row.vehicle_model].filter(Boolean).join(" ") || undefined;

  return {
    slug: row.slug,
    title: row.title,
    category: row.category as Project["category"],
    service: row.service_slug ?? undefined,
    vehicle,
    date: row.created_at ? row.created_at.slice(0, 7) : undefined, // "2026-09"
    description: row.short_description ?? row.full_description ?? undefined,
    coverImage: row.cover_image_url ?? undefined,
    coverImageAlt: row.cover_image_alt ?? undefined,
    images: images.map((img) => ({ src: img.url, alt: img.alt })),
    beforeImage: row.before_image_url ?? undefined,
    beforeImageAlt: row.before_image_alt ?? undefined,
    afterImage: row.after_image_url ?? undefined,
    afterImageAlt: row.after_image_alt ?? undefined,
  };
}
