"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { site } from "@/data/site";
import { CONSENT_EVENT, getStoredConsent, type ConsentState } from "@/lib/cookieConsent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const { ga4Id, adsId } = site.googleTag;

// Ładuje gtag.js i konfiguruje GA4/Google Ads DOPIERO gdy:
// 1) w site.ts jest ustawione przynajmniej jedno ID, ORAZ
// 2) użytkownik wyraził odpowiednią zgodę w bannerze cookies.
// Bez spełnienia obu warunków ten komponent nic nie robi — strona
// zachowuje się dokładnie tak jak dziś (zero cookies, zero requestów do Google).
export function GoogleTag() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
    function onChange(e: Event) {
      setConsent((e as CustomEvent<ConsentState>).detail);
    }
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const primaryId = ga4Id || adsId;
  if (!primaryId) return null; // brak skonfigurowanego ID — nic się nie renderuje

  const wantsAnalytics = Boolean(consent?.analytics) && Boolean(ga4Id);
  const wantsMarketing = Boolean(consent?.marketing) && Boolean(adsId);
  if (!wantsAnalytics && !wantsMarketing) return null; // brak zgody — nic się nie ładuje

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`} strategy="afterInteractive" />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${wantsAnalytics ? `gtag('config', '${ga4Id}');` : ""}
          ${wantsMarketing ? `gtag('config', '${adsId}');` : ""}
        `}
      </Script>
    </>
  );
}
