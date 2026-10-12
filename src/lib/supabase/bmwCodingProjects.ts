import { createPublicClient } from "@/lib/supabase/publicClient";
import { mapRowToProject } from "@/lib/supabase/mapProject";
import type { Project } from "@/types";

// Realizacje pokazywane na landing page /carplay-i-kodowanie-bmw: wyłącznie
// OPUBLIKOWANE, z kategorii „Kodowanie samochodowe” i wyłącznie marki BMW.
//
// Marka BMW jest rozpoznawana po polu „marka pojazdu” (vehicle_brand, bez
// względu na wielkość liter; „BMW”, „bmw” i np. „BMW M” przechodzą). Jeśli to pole jest puste, sprawdzany jest początek
// tytułu realizacji (np. „BMW G20 — …”). Wpisy innych marek (MINI, VAG,
// Mercedes-Benz itd.) są pomijane. Dodatkowo pokazujemy tylko realizacje
// z okładką — sekcja ma pokazywać, jak wygląda efekt, a nie puste kafelki.
//
// Przy błędzie zapytania (np. brak połączenia z bazą) zwracamy pustą listę,
// a strona po prostu ukrywa sekcję — nic nie jest wymyślane.

const CODING_CATEGORY = "Kodowanie samochodowe";

const startsWithBmw = (text: string | null) => /^\s*bmw\b/i.test(text ?? "");

export async function getPublishedBmwCodingProjects(max = 6): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("realizacje")
    .select("*")
    .eq("status", "published")
    .eq("category", CODING_CATEGORY)
    .order("created_at", { ascending: false })
    .limit(60);

  if (error || !data) return [];

  return data
    .filter((row) => (row.vehicle_brand?.trim() ? startsWithBmw(row.vehicle_brand) : startsWithBmw(row.title)))
    .map((row) => mapRowToProject(row))
    .filter((project) => Boolean(project.coverImage))
    .slice(0, max);
}
