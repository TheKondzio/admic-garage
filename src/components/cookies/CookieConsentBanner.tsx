"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { getStoredConsent, storeConsent } from "@/lib/cookieConsent";

const hasAnyGoogleTag = Boolean(site.googleTag.ga4Id || site.googleTag.adsId);

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    // Dopóki żaden Google Tag ID nie jest skonfigurowany, strona nie
    // ustawia żadnych cookies wymagających zgody — baner zostaje ukryty,
    // zgodnie z polityką cookies (patrz /polityka-cookies).
    if (!hasAnyGoogleTag) return;
    if (!getStoredConsent()) setVisible(true);
  }, []);

  if (!hasAnyGoogleTag || !visible) return null;

  function acceptAll() {
    storeConsent({ analytics: true, marketing: true });
    setVisible(false);
  }

  function rejectNonEssential() {
    storeConsent({ analytics: false, marketing: false });
    setVisible(false);
  }

  function savePreferences() {
    storeConsent({ analytics, marketing });
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-ink-800 bg-ink-950/98 backdrop-blur">
      <div className="mx-auto w-full max-w-container px-5 py-5 sm:px-8">
        {!settingsOpen ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-paper-300">
              Używamy plików cookies, aby zapewnić prawidłowe działanie strony oraz — za Twoją
              zgodą — do celów statystycznych i reklamowych. Możesz zaakceptować wszystkie
              cookies, odrzucić te niekonieczne lub dostosować swoje preferencje. Szczegóły w{" "}
              <Link href="/polityka-cookies" className="text-accent-light hover:text-accent">
                polityce cookies
              </Link>
              .
            </p>
            <div className="flex shrink-0 flex-wrap gap-2.5">
              <button
                onClick={() => setSettingsOpen(true)}
                className="rounded border border-ink-700 px-4 py-2.5 text-xs font-semibold text-paper-300 hover:border-paper-300 hover:text-paper-100"
              >
                Ustawienia cookies
              </button>
              <button
                onClick={rejectNonEssential}
                className="rounded border border-ink-700 px-4 py-2.5 text-xs font-semibold text-paper-300 hover:border-paper-300 hover:text-paper-100"
              >
                Odrzuć
              </button>
              <button
                onClick={acceptAll}
                className="rounded bg-accent px-4 py-2.5 text-xs font-semibold text-white hover:bg-accent-dark"
              >
                Akceptuję
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm leading-relaxed text-paper-300">
              Wybierz, na jakie kategorie plików cookies wyrażasz zgodę. Cookies niezbędne są
              zawsze aktywne, ponieważ zapewniają podstawowe działanie strony.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <CategoryToggle label="Niezbędne" description="Zawsze aktywne" checked disabled />
              <CategoryToggle
                label="Analityczne"
                description="Google Analytics — statystyki odwiedzin"
                checked={analytics}
                onChange={setAnalytics}
              />
              <CategoryToggle
                label="Marketingowe"
                description="Google Ads — pomiar skuteczności reklam"
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <button
                onClick={savePreferences}
                className="rounded bg-accent px-4 py-2.5 text-xs font-semibold text-white hover:bg-accent-dark"
              >
                Zapisz preferencje
              </button>
              <button
                onClick={acceptAll}
                className="rounded border border-ink-700 px-4 py-2.5 text-xs font-semibold text-paper-300 hover:border-paper-300 hover:text-paper-100"
              >
                Akceptuj wszystkie
              </button>
              <button
                onClick={() => setSettingsOpen(false)}
                className="rounded px-4 py-2.5 text-xs font-semibold text-paper-500 hover:text-paper-200"
              >
                Wstecz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-2.5 rounded border border-ink-800 bg-ink-900 p-3">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-600 bg-ink-950 accent-accent disabled:opacity-50"
      />
      <span>
        <span className="block text-xs font-semibold text-paper-100">{label}</span>
        <span className="block text-xs text-paper-500">{description}</span>
      </span>
    </label>
  );
}
