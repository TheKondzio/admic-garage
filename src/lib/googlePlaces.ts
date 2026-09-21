// Pobiera ocenę i liczbę opinii Google dla ADMIC GARAGE przez Places API
// (New) — Place Details. Uruchamiane WYŁĄCZNIE po stronie serwera (ta
// funkcja jest importowana tylko przez Server Components), więc klucz API
// nigdy nie trafia do przeglądarki.
//
// Dlaczego Place Details (New), a nie starsze Places API: Google oznaczyło
// oryginalne Places API jako "Legacy" i od pewnego czasu nie pozwala go
// włączyć w nowych projektach — Places API (New) to jedyna aktualna droga.

import { unstable_cache } from "next/cache";

export type GoogleReviewsData = {
  displayName: string;
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
};

// WAŻNE o cache'owaniu: gdyby to był zwykły fetch() z next.revalidate,
// Next.js zastosowałby dla całej trasy NAJKRÓTSZY interwał odświeżania
// znaleziony gdziekolwiek na tej stronie — a strona główna ma już 1h ISR
// (dla podglądu realizacji z bazy), co po cichu skróciłoby odświeżanie
// opinii Google z zamierzonych 24h do 1h. unstable_cache() daje temu
// wywołaniu WŁASNY, niezależny cache — zawsze co 24h, bez względu na to,
// co jeszcze pobiera dana strona.
const getCachedReviews = unstable_cache(
  async (): Promise<GoogleReviewsData | null> => fetchGoogleReviews(),
  ["google-reviews"],
  { revalidate: 86400 } // 24h
);

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null; // sprawdzone PRZED cache — brak konfiguracji nie tworzy pustego wpisu w cache
  return getCachedReviews();
}

async function fetchGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,googleMapsUri",
      },
      cache: "no-store", // cache'owanie robi unstable_cache() wyżej — jedno źródło prawdy o interwale
    });

    if (!res.ok) {
      // Nieprawidłowy klucz, zły Place ID, przekroczony limit, błąd serwera
      // Google — we wszystkich tych przypadkach traktujemy to tak samo:
      // brak danych, widget się nie pokazuje. Log dla siebie w konsoli
      // serwera (nie widoczny dla odwiedzających), żeby dało się zdiagnozować.
      console.error(`Google Places API: HTTP ${res.status} — ${await res.text().catch(() => "")}`);
      return null;
    }

    const data = await res.json();

    if (typeof data.rating !== "number" || typeof data.userRatingCount !== "number") {
      // Miejsce istnieje, ale nie ma jeszcze żadnych opinii/oceny w Google —
      // uczciwie pokazujemy "brak danych" zamiast zera, które wyglądałoby
      // jak prawdziwa (zła) ocena.
      return null;
    }

    return {
      displayName: data.displayName?.text ?? "ADMIC GARAGE",
      rating: data.rating,
      userRatingCount: data.userRatingCount,
      googleMapsUri: data.googleMapsUri ?? "",
    };
  } catch (err) {
    // Timeout, brak sieci, tymczasowa niedostępność usługi.
    console.error("Google Places API: nie udało się pobrać danych", err);
    return null;
  }
}
