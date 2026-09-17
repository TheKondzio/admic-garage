"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { IconPhone } from "@/components/ui/icons";
import { site } from "@/data/site";
import type { Service } from "@/types";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

const initialState: FormState = { name: "", email: "", phone: "", message: "" };

function validate(form: FormState, consent: boolean) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (form.name.trim().length < 2) errors.name = "Podaj imię i nazwisko.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Podaj poprawny adres e-mail.";
  if (!/^[\d +()-]{7,}$/.test(form.phone.trim())) errors.phone = "Podaj poprawny numer telefonu.";
  return { errors, consentError: !consent ? "Zaznacz zgodę, żeby wysłać wiadomość." : undefined };
}

const inputClasses =
  "w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 placeholder:text-paper-500 focus:border-accent focus:outline-none";

// Panel boczny na podstronach usług — celowo krótszy niż pełny formularz na
// /kontakt (imię, e-mail, telefon, wiadomość). Trafia do tego samego
// /api/contact co reszta serwisu, więc funkcjonalność (walidacja, stany,
// brak podłączonego backendu) pozostaje spójna w całym serwisie.
export function ServiceContactPanel({ service }: { service: Service }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { errors: validationErrors, consentError: consentErr } = validate(form, consent);
    setErrors(validationErrors);
    setConsentError(consentErr);
    if (Object.keys(validationErrors).length > 0 || consentErr) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service: service.navLabel }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(initialState);
      setConsent(false);
    } catch {
      // Błąd sieci lub Formspree odrzuciło żądanie — szczegóły w logach serwera.
      setStatus("error");
    }
  }

  return (
    <div className="rounded border border-ink-800 bg-ink-900 p-6 shadow-card sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent-light">
        Zapytaj o wycenę
      </p>
      <h2 className="mt-1 font-display text-xl font-bold text-paper-100">{service.navLabel}</h2>
      <p className="mt-2 text-sm text-paper-400">Odpisujemy zwykle w ciągu kilku godzin.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <PanelField label="Imię i nazwisko" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClasses}
            placeholder="Jan Kowalski"
          />
        </PanelField>

        <PanelField label="Adres e-mail" error={errors.email}>
          <input
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClasses}
            type="email"
            placeholder="jan@przyklad.pl"
          />
        </PanelField>

        <PanelField label="Telefon" error={errors.phone}>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClasses}
            type="tel"
            placeholder="+48 600 000 000"
          />
        </PanelField>

        <PanelField label="Wiadomość (opcjonalnie)">
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={inputClasses}
            rows={3}
            placeholder={`Napisz, na czym Ci zależy w usłudze „${service.navLabel}"…`}
          />
        </PanelField>

        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-paper-400">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-600 bg-ink-950 accent-accent"
          />
          <span>
            Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na
            zapytanie, zgodnie z{" "}
            <Link href="/polityka-prywatnosci" className="text-accent-light hover:text-accent">
              polityką prywatności
            </Link>
            .
          </span>
        </label>
        {consentError && <p className="text-xs text-red-400">{consentError}</p>}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
        >
          {status === "sending" ? "Wysyłanie…" : "Wyślij wiadomość"}
        </button>

        {status === "success" && (
          <p className="text-sm font-medium text-emerald-400">
            Dziękujemy! Odezwiemy się wkrótce.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs leading-relaxed text-amber-400">
            Coś poszło nie tak przy wysyłaniu. Spróbuj ponownie za chwilę albo zadzwoń
            bezpośrednio — to najszybsza droga.
          </p>
        )}
      </form>

      <div className="mt-6 space-y-2 border-t border-ink-800 pt-5">
        <a
          href={site.phoneHref}
          className="flex items-center gap-2 text-sm font-medium text-paper-200 hover:text-paper-100"
        >
          <IconPhone className="h-4 w-4 text-accent-light" />
          {site.phone}
        </a>
        <p className="text-xs text-paper-500">{site.hours}</p>
      </div>
    </div>
  );
}

function PanelField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper-500">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
