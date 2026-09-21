import { getGoogleReviews } from "@/lib/googlePlaces";
import { StarRating } from "@/components/ui/StarRating";

// Server Component — dane pobierane w trakcie renderowania na serwerze
// (patrz src/lib/googlePlaces.ts), klucz API nigdy nie trafia do przeglądarki.
// Jeśli dane niedostępne z jakiegokolwiek powodu (brak konfiguracji, błąd
// API, limit, brak opinii) — komponent zwraca null i po prostu znika z
// layoutu, zamiast pokazywać puste miejsce albo zmyślone dane.
export async function GoogleReviewsCard() {
  const reviews = await getGoogleReviews();
  if (!reviews) return null;

  return (
    <div className="relative overflow-hidden rounded border border-ink-800 bg-ink-900 p-5 shadow-[0_0_40px_-15px_rgba(47,111,237,0.35)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-paper-100">Google</p>
          <p className="text-xs text-paper-500">Google Reviews</p>
        </div>
        <StarRating rating={reviews.rating} />
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-3xl font-bold text-paper-100">
          {reviews.rating.toFixed(1)}
        </span>
        {/* "opinii" to poprawny dopełniacz zarówno l. pojedynczej, jak i mnogiej
            po "na podstawie" — nie trzeba osobnej logiki odmiany. */}
        <span className="text-sm text-paper-400">
          na podstawie {reviews.userRatingCount} opinii
        </span>
      </div>

      {reviews.googleMapsUri && (
        <a
          href={reviews.googleMapsUri}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-light transition-colors hover:text-accent"
        >
          Zobacz opinie Google →
        </a>
      )}
    </div>
  );
}
