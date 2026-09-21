// Renderuje 5 gwiazdek na podstawie oceny (np. 4.8 → 4 pełne + 1 połówka).
// Złoty kolor gwiazdek to świadomy, jednorazowy wyjątek od niebieskiej
// palety akcentu strony — tak proszono w tym zadaniu, a gwiazdki oceny
// w kolorze złotym/żółtym to też ugruntowana konwencja rozpoznawana przez
// użytkowników (Google samo tak je koloruje).
export function StarRating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    if (rating >= value) return "full";
    if (rating >= value - 0.5) return "half";
    return "empty";
  });

  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {stars.map((state, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4">
          <defs>
            <linearGradient id={`star-half-${i}`}>
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="50%" stopColor="#3a3f4b" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M10 1.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.8l-5.2 2.7 1-5.8L1.6 7.6l5.8-.8L10 1.5z"
            fill={state === "full" ? "#facc15" : state === "half" ? `url(#star-half-${i})` : "#3a3f4b"}
            fillOpacity={state === "empty" ? 0.4 : 1}
          />
        </svg>
      ))}
    </div>
  );
}
