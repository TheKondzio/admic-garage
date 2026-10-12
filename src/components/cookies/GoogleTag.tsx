"use client";

import { useEffect, useRef, useState } from "react";
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

// gtag MUSI wkładać do dataLayer obiekt `arguments` (nie zwykłą tablicę) — tak
// działa oficjalny snippet Google; inaczej komendy są ignorowane.
function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      (window.dataLayer as unknown[]).push(arguments);
    };
  }
  return window.gtag;
}

// Ładuje gtag.js DOPIERO gdy użytkownik wyraził zgodę (analityczną dla GA4,
// marketingową dla Google Ads) i w site.ts jest odpowiednie ID. Bez zgody
// nie ma żadnego żądania do Google.
//
// Consent Mode v2: przed pierwszą komendą ustawiamy stan domyślny „denied” dla
// wszystkich czterech sygnałów, a zaraz po nim wysyłamy aktualny wybór
// użytkownika (`consent update`). Dzięki temu Google dostaje sygnały
// ad_storage / ad_user_data / ad_personalization / analytics_storage również
// po późniejszej zmianie decyzji (np. wycofaniu zgody marketingowej).
export function GoogleTag() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const initialised = useRef(false);
  const configured = useRef({ ga4: false, ads: false });

  useEffect(() => {
    setConsent(getStoredConsent());
    function onChange(e: Event) {
      setConsent((e as CustomEvent<ConsentState>).detail);
    }
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const wantsAnalytics = Boolean(consent?.analytics) && Boolean(ga4Id);
  const wantsMarketing = Boolean(consent?.marketing) && Boolean(adsId);

  useEffect(() => {
    if (!consent || (!ga4Id && !adsId)) return; // brak decyzji albo ID — nic nie robimy

    const gtag = ensureGtag();
    if (!initialised.current) {
      gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
      gtag("js", new Date());
      initialised.current = true;
    }

    const marketing = consent.marketing ? "granted" : "denied";
    gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: marketing,
      ad_user_data: marketing,
      ad_personalization: marketing,
    });

    if (wantsAnalytics && !configured.current.ga4) {
      gtag("config", ga4Id);
      configured.current.ga4 = true;
    }
    if (wantsMarketing && !configured.current.ads) {
      gtag("config", adsId);
      configured.current.ads = true;
    }
  }, [consent, wantsAnalytics, wantsMarketing]);

  if (!wantsAnalytics && !wantsMarketing) return null; // brak zgody — nic się nie ładuje

  const loaderId = wantsAnalytics ? ga4Id : adsId;
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`} strategy="afterInteractive" />;
}
