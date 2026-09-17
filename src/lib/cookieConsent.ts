// Prosty mechanizm zgody na cookies — bez zewnętrznych bibliotek.
// Zgoda jest zapisywana w localStorage przeglądarki użytkownika (nie w
// cookie), więc samo jej zapisanie nie wymaga zgody na cookies.
//
// Kategorie: "necessary" jest zawsze true (na razie strona i tak nie ma
// żadnych niezbędnych cookies — pole istnieje na przyszłość). "analytics"
// odpowiada Google Analytics (GA4), "marketing" odpowiada Google Ads.

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentState = ConsentCategories & {
  decidedAt: string; // ISO timestamp — kiedy użytkownik podjął decyzję
};

const STORAGE_KEY = "admic-garage-cookie-consent";

export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

export function storeConsent(categories: Omit<ConsentCategories, "necessary">): ConsentState {
  const state: ConsentState = {
    necessary: true,
    ...categories,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage niedostępny (np. tryb prywatny) — zgoda nie zostanie
    // zapamiętana między wizytami, ale bieżąca sesja i tak dostanie te wartości.
  }
  window.dispatchEvent(new CustomEvent("admic-consent-change", { detail: state }));
  return state;
}

export const CONSENT_EVENT = "admic-consent-change";
