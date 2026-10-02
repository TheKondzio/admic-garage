export type RealizacjaStatus = "draft" | "published";

export type RealizacjaRow = {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  full_description: string | null;
  category: string;
  service_slug: string | null;
  vehicle_brand: string | null;
  vehicle_model: string | null;
  vehicle_year: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  before_image_url: string | null;
  before_image_alt: string | null;
  after_image_url: string | null;
  after_image_alt: string | null;
  status: RealizacjaStatus;
  author_id: string | null;
  created_at: string;
  updated_at: string;
};

export type RealizacjaImageRow = {
  id: string;
  realizacja_id: string;
  url: string;
  alt: string;
  position: number;
};

export type RealizacjaWithImages = RealizacjaRow & {
  realizacja_images: RealizacjaImageRow[];
};

// Kategorie zgodne z realną ofertą (te same co w services.ts) — jedno miejsce
// do rozszerzenia w przyszłości, jeśli dojdzie nowa kategoria.
export const REALIZACJA_CATEGORIES = [
  "Kodowanie samochodowe",
  "Multimedia & Retrofit",
  "Mycie detailingowe",
  "Inne",
] as const;
