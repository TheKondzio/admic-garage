"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconPhone, IconWhatsapp, IconMail } from "@/components/ui/icons";
import { serviceOptions } from "@/data/services";
import { site } from "@/data/site";

type FormState = {
  name: string;
  phone: string;
  service: string;
  car: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

const initialState: FormState = {
  name: "",
  phone: "",
  service: "",
  car: "",
  message: "",
};

function validate(form: FormState, consent: boolean) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (form.name.trim().length < 2) errors.name = "Podaj imię (min. 2 znaki).";
  if (!/^[\d +()-]{7,}$/.test(form.phone.trim())) errors.phone = "Podaj poprawny numer telefonu.";
  if (!form.service) errors.service = "Wybierz rodzaj usługi.";
  if (form.car.trim().length < 2) errors.car = "Podaj markę i model auta.";
  return { errors, consentError: !consent ? "Zaznacz zgodę, żeby wysłać wiadomość." : undefined };
}

export function Contact() {
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
        body: JSON.stringify(form),
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
    <section id="kontakt" className="bg-ink-900/40 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Kontakt"
          title="Zapytaj o wycenę"
          description="Wypełnij formularz albo skontaktuj się bezpośrednio — odpisujemy zwykle w ciągu kilku godzin."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={handleSubmit} noValidate className="rounded border border-ink-800 bg-ink-900 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Imię" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputClasses}
                  placeholder="Jan Kowalski"
                />
              </Field>

              <Field label="Numer telefonu" error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputClasses}
                  placeholder="+48 600 000 000"
                  type="tel"
                />
              </Field>

              <Field label="Rodzaj usługi" error={errors.service}>
                <select
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className={inputClasses}
                >
                  <option value="">Wybierz usługę…</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Marka i model auta" error={errors.car}>
                <input
                  value={form.car}
                  onChange={(e) => update("car", e.target.value)}
                  className={inputClasses}
                  placeholder="np. BMW F30, rocznik 2016"
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Wiadomość (opcjonalnie)">
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={inputClasses}
                  rows={4}
                  placeholder="Opisz krótko, na czym Ci zależy…"
                />
              </Field>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-paper-500">
              Administratorem Twoich danych osobowych jest ADMIC GARAGE. Dane podane w formularzu
              przetwarzamy wyłącznie w celu udzielenia odpowiedzi na Twoje zapytanie. Szczegóły w{" "}
              <Link href="/polityka-prywatnosci" className="text-accent-light hover:text-accent">
                polityce prywatności
              </Link>
              .
            </p>

            <label className="mt-4 flex items-start gap-2.5 text-xs leading-relaxed text-paper-400">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-600 bg-ink-950 accent-accent"
              />
              <span>
                Wyrażam zgodę na przetwarzanie moich danych osobowych podanych w formularzu przez
                ADMIC GARAGE w celu udzielenia odpowiedzi na moje zapytanie. *
              </span>
            </label>
            {consentError && <p className="mt-1.5 text-xs text-red-400">{consentError}</p>}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 inline-flex w-full items-center justify-center rounded bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "Wysyłanie…" : "Wyślij zapytanie"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-sm font-medium text-emerald-400">
                Dziękujemy! Zapytanie zostało wysłane — odezwiemy się wkrótce.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm font-medium text-amber-400">
                Coś poszło nie tak przy wysyłaniu. Spróbuj ponownie za chwilę albo zadzwoń
                bezpośrednio — dane kontaktowe są poniżej.
              </p>
            )}
          </form>

          <div className="flex flex-col gap-4">
            <ContactCard
              icon={<IconPhone className="h-5 w-5" />}
              title="Zadzwoń"
              value={site.phone}
              href={site.phoneHref}
              note={site.hours}
            />
            <ContactCard
              icon={<IconWhatsapp className="h-5 w-5" />}
              title="WhatsApp"
              value="Napisz na WhatsApp"
              href={site.whatsappHref}
            />
            <ContactCard
              icon={<IconMail className="h-5 w-5" />}
              title="E-mail"
              value={site.email}
              href={`mailto:${site.email}`}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

const inputClasses =
  "w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-100 placeholder:text-paper-500 focus:border-accent focus:outline-none";

function Field({
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

function ContactCard({
  icon,
  title,
  value,
  href,
  note,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
  note?: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded border border-ink-800 bg-ink-900 p-5 transition-colors hover:border-accent/60"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-ink-800 text-accent-light">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-paper-500">{title}</p>
        <p className="text-sm font-medium text-paper-100">{value}</p>
        {note && <p className="text-xs text-paper-500">{note}</p>}
      </div>
    </a>
  );
}
