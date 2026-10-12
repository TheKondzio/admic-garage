import { site } from "@/data/site";
import { getStoredConsent } from "@/lib/cookieConsent";

// Śledzenie zdarzeń landing page'a. Działa w trzech warstwach i w żadnej nie
// zakłada, że gtag istnieje:
//
// 1) dataLayer.push({ event, ... }) — format zgodny z Google Tag Manager. Jeśli
//    kiedyś dodasz GTM, zdarzenia są już gotowe (wyzwalacze „Zdarzenie własne”
//    o nazwach z listy poniżej), bez zmian w kodzie strony.
// 2) gtag('event', ...) — zdarzenia GA4. gtag istnieje WYŁĄCZNIE po zgodzie
//    użytkownika w banerze cookies (patrz components/cookies/GoogleTag.tsx),
//    więc bez zgody ta warstwa po prostu nic nie robi.
// 3) gtag('event', 'conversion', { send_to }) — konwersja Google Ads, tylko
//    gdy w site.googleTag.conversions jest wpisana etykieta I użytkownik wyraził
//    zgodę MARKETINGOWĄ (sama zgoda analityczna nie wystarcza).
//
// Do analityki NIE wysyłamy danych osobowych (imienia, telefonu, VIN-u, e-maila).

type Params = Record<string, string | number | boolean | undefined>;

export type TrackedEvent =
  | "form_start" // pierwsze kliknięcie/wpisanie w formularzu
  | "generate_lead" // poprawnie wysłany formularz (zdarzenie rekomendowane w GA4)
  | "click_to_call" // kliknięcie numeru telefonu
  | "click_whatsapp" // kliknięcie WhatsApp
  | "click_email" // kliknięcie e-maila
  | "cta_click"; // kliknięcie przycisku CTA (parametr cta_id mówi które)

// "lead_bmw" = wysłany formularz na /carplay-i-kodowanie-bmw.
export type ConversionKey = "lead_bmw" | "phone" | "whatsapp";

export function trackEvent(name: TrackedEvent, params: Params = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

export function trackConversion(key: ConversionKey) {
  if (typeof window === "undefined") return;
  const sendTo = site.googleTag.conversions[key];
  if (!sendTo) return; // etykieta nie została jeszcze wpisana w site.ts
  // gtag istnieje już przy samej zgodzie analitycznej, więc to nie wystarcza:
  // konwersja Google Ads wymaga WYRAŹNIEJ zgody marketingowej.
  if (getStoredConsent()?.marketing !== true) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: sendTo });
}
