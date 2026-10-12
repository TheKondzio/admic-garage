"use client";

import { site } from "@/data/site";
import { openCookieSettings } from "@/lib/cookieConsent";

// Link „Ustawienia cookies” w stopce — otwiera ponownie panel zgód, żeby
// użytkownik mógł zmienić albo wycofać zgodę (wycofanie ma być tak samo łatwe
// jak jej udzielenie). Gdy w site.ts nie ma żadnego ID Google, nie ma czego
// ustawiać, więc link się nie renderuje.
const hasAnyGoogleTag = Boolean(site.googleTag.ga4Id || site.googleTag.adsId);

export function CookieSettingsLink({ className }: { className?: string }) {
  if (!hasAnyGoogleTag) return null;
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Ustawienia cookies
    </button>
  );
}
