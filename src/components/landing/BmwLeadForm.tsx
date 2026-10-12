"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { IconPhone } from "@/components/ui/icons";
import { IconCheck } from "@/components/landing/LandingIcons";
import { bmwLanding, bmwWhatsappHref } from "@/data/bmwLanding";
import { site } from "@/data/site";
import { trackConversion, trackEvent } from "@/lib/tracking";

// Formularz „Sprawdź moje BMW”: model, rocznik, wersja iDrive (opcjonalnie),
// usługa (CarPlay, kodowanie lub obie), VIN (opcjonalnie), kontakt i zgoda.
// Dane trafiają do istniejącego /api/contact (Formspree). Sukces pokazujemy
// WYŁĄCZNIE po odpowiedzi 2xx z serwera — wtedy też idzie generate_lead i
// konwersja Ads. Przyciski z atrybutami data-prefill-* (karty iDrive, hero)
// ustawiają tu wybrane pola, zanim użytkownik przewinie do formularza.

type Values = {
  model: string;
  year: string;
  idrive: string;
  version: string;
  vin: string;
  name: string;
  contact: string;
  message: string;
  services: string[];
};

type Errors = Partial<Record<keyof Values | "consent", string>>;
type Status = "idle" | "sending" | "success" | "error";

const initialValues: Values = {
  model: "",
  year: "",
  idrive: "",
  version: "",
  vin: "",
  name: "",
  contact: "",
  message: "",
  services: [],
};

const { form: formCopy } = bmwLanding;

const VIN_PATTERN = /^[A-HJ-NPR-Z0-9]{17}$/i; // 17 znaków, bez liter I, O, Q
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const FIELD_ORDER: Array<keyof Values | "consent"> = ["services", "model", "year", "name", "contact", "vin", "consent"];

export function isEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function isPhone(value: string) {
  const v = value.trim();
  return /^\+?[\d\s()-]+$/.test(v) && v.replace(/\D/g, "").length >= 9;
}

export function validate(v: Values, consent: boolean, now = new Date()): Errors {
  const e: Errors = {};
  const year = Number(v.year.trim());

  if (v.model.trim().length < 2) e.model = "Podaj model BMW, np. 320d F30.";
  if (!/^\d{4}$/.test(v.year.trim()) || year < 1990 || year > now.getFullYear() + 1)
    e.year = "Podaj rocznik jako 4 cyfry, np. 2018.";
  if (v.services.length === 0) e.services = "Wybierz, czym jesteś zainteresowany.";
  if (v.name.trim().length < 2) e.name = "Podaj imię (min. 2 znaki).";
  if (!v.contact.trim()) e.contact = "Podaj telefon lub e-mail, żebyśmy mogli odpowiedzieć.";
  else if (!isEmail(v.contact) && !isPhone(v.contact)) e.contact = "To nie wygląda na numer telefonu ani adres e-mail.";
  if (v.vin.trim() && !VIN_PATTERN.test(v.vin.trim()))
    e.vin = "VIN ma 17 znaków (bez liter I, O, Q). Możesz też zostawić to pole puste.";
  if (!consent) e.consent = "Zaznacz zgodę, żeby wysłać zapytanie.";
  return e;
}

const inputClasses =
  "w-full rounded border border-ink-700 bg-ink-950 px-3.5 py-3 text-base text-paper-100 placeholder:text-paper-500 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:py-2.5 sm:text-sm aria-[invalid=true]:border-red-400";

function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-paper-200">
        {label}
        {optional && <span className="ml-1.5 font-normal text-paper-500">(opcjonalnie)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-paper-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function BmwLeadForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const startedRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  // Po wysłaniu fokus ląduje na komunikacie — czytnik ekranu go odczyta, a osoba
  // na telefonie zobaczy potwierdzenie bez szukania go na stronie.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  // Delegowane kliknięcia przycisków z data-prefill-idrive / data-prefill-service
  // (karty iDrive, przyciski w hero): ustawiają pola formularza.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-prefill-idrive],[data-prefill-service]");
      if (!el) return;
      const idrive = el.dataset.prefillIdrive;
      const service = el.dataset.prefillService;
      setValues((prev) => ({
        ...prev,
        idrive: idrive ?? prev.idrive,
        services: service && !prev.services.includes(service) ? [...prev.services, service] : prev.services,
      }));
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function setField<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleService(value: string) {
    setField(
      "services",
      values.services.includes(value) ? values.services.filter((s) => s !== value) : [...values.services, value]
    );
  }

  function handleFocusCapture() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("form_start", { form: bmwLanding.source });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return; // blokada podwójnego wysłania

    const found = validate(values, consent);
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(`bmw-${firstInvalid}`)?.focus();
      return;
    }

    // Pułapka na boty: pole niewidoczne dla ludzi. Jeśli jest wypełnione, nic nie
    // wysyłamy i NIE zgłaszamy konwersji (to nie jest prawdziwe zapytanie).
    const honeypot = String(new FormData(e.currentTarget).get("_gotcha") ?? "");
    if (honeypot) {
      setStatus("success");
      return;
    }

    setStatus("sending");

    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    UTM_KEYS.forEach((key) => {
      const v = params.get(key);
      if (v) utm[key] = v;
    });

    const contact = values.contact.trim();
    const contactIsEmail = isEmail(contact);
    const model = values.model.trim();
    const year = values.year.trim();
    const serviceLabels = formCopy.serviceOptions.filter((o) => values.services.includes(o.value)).map((o) => o.label);
    const idriveLabel = formCopy.idriveOptions.find((o) => o.value === values.idrive)?.label;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: contactIsEmail ? undefined : contact,
          email: contactIsEmail ? contact : undefined,
          car: `BMW ${model}, ${year}`,
          model,
          year,
          idrive: values.idrive ? idriveLabel : undefined,
          idrive_version: values.version.trim() || undefined,
          vin: values.vin.trim().toUpperCase() || undefined,
          service: serviceLabels.join(", "),
          message: values.message.trim() || undefined,
          source: bmwLanding.source,
          page: window.location.pathname,
          ...utm,
          consent: "tak",
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      // Do analityki trafia tylko wybrana usługa, generacja iDrive i rodzaj kontaktu —
      // bez imienia, telefonu, e-maila, VIN-u, wersji oprogramowania i treści wiadomości.
      trackEvent("generate_lead", {
        form: bmwLanding.source,
        services: values.services.join(","),
        idrive: values.idrive || "nieznany",
        contact_type: contactIsEmail ? "email" : "phone",
      });
      trackConversion("lead_bmw");

      setStatus("success");
      setValues(initialValues);
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-emerald-500/40 bg-ink-900 p-6 outline-none sm:p-8"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <IconCheck className="h-5 w-5" />
        </span>
        <p className="mt-4 font-display text-xl font-semibold text-paper-100">Dziękujemy, zapytanie zostało wysłane.</p>
        <p className="mt-3 text-sm leading-relaxed text-paper-300">
          Sprawdzimy kompatybilność Twojego BMW i skontaktujemy się z Tobą, używając podanego telefonu lub adresu e-mail.
        </p>
        <p className="mt-5 text-sm text-paper-400">Wolisz porozmawiać od razu?</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <a
            href={site.phoneHref}
            data-track="success_phone"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded border border-ink-600 px-5 py-3 text-sm font-semibold text-paper-100 hover:border-paper-300"
          >
            <IconPhone className="h-5 w-5" />
            {site.phone}
          </a>
          <a
            href={bmwWhatsappHref}
            data-track="success_whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center rounded border border-ink-600 px-5 py-3 text-sm font-semibold text-paper-100 hover:border-paper-300"
          >
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={handleFocusCapture}
      noValidate
      aria-labelledby="bmw-form-title"
      className="rounded-xl border border-ink-700 bg-ink-900 p-5 shadow-card sm:p-8"
    >
      <h3 id="bmw-form-title" className="font-display text-xl font-bold leading-snug text-paper-100 sm:text-2xl">
        {formCopy.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-paper-400">{formCopy.lead}</p>

      <fieldset
        id="bmw-services"
        tabIndex={-1}
        className="mt-6 outline-none"
        aria-describedby={errors.services ? "bmw-services-error" : undefined}
      >
        <legend className="mb-1.5 block text-sm font-medium text-paper-200">Czym jesteś zainteresowany?</legend>
        <div className="grid grid-cols-2 gap-2">
          {formCopy.serviceOptions.map((option) => (
            <label
              key={option.value}
              className="relative flex min-h-[48px] cursor-pointer items-center gap-2.5 rounded border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-paper-300 transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:checked]:text-paper-100 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/60"
            >
              <input
                type="checkbox"
                name="services"
                value={option.value}
                checked={values.services.includes(option.value)}
                onChange={() => toggleService(option.value)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-ink-600 text-[11px] font-bold leading-none text-white peer-checked:border-accent peer-checked:bg-accent peer-checked:after:content-['✓']"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        <p className="mt-1.5 text-xs text-paper-500">Możesz wybrać obie usługi.</p>
        {errors.services && (
          <p id="bmw-services-error" className="mt-1.5 text-xs font-medium text-red-400">
            {errors.services}
          </p>
        )}
      </fieldset>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field id="bmw-model" label="Model BMW" error={errors.model}>
          <input
            id="bmw-model"
            name="model"
            value={values.model}
            onChange={(e) => setField("model", e.target.value)}
            className={inputClasses}
            autoComplete="off"
            placeholder="np. 320d F30"
            aria-invalid={Boolean(errors.model)}
            aria-describedby={errors.model ? "bmw-model-error" : undefined}
            required
          />
        </Field>
        <Field id="bmw-year" label="Rocznik" error={errors.year}>
          <input
            id="bmw-year"
            name="year"
            inputMode="numeric"
            maxLength={4}
            value={values.year}
            onChange={(e) => setField("year", e.target.value.replace(/\D/g, ""))}
            className={inputClasses}
            autoComplete="off"
            placeholder="np. 2018"
            aria-invalid={Boolean(errors.year)}
            aria-describedby={errors.year ? "bmw-year-error" : undefined}
            required
          />
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field id="bmw-idrive" label="Wersja iDrive" optional hint="Jeśli nie wiesz, zostaw „Nie wiem”. Sprawdzimy to.">
          <select
            id="bmw-idrive"
            name="idrive"
            value={values.idrive}
            onChange={(e) => setField("idrive", e.target.value)}
            className={inputClasses}
            aria-describedby="bmw-idrive-hint"
          >
            {formCopy.idriveOptions.map((o) => (
              <option key={o.value || "unknown"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="bmw-version" label="Wersja z menu" optional hint="Napis z pola wersji, np. „NBTevo_…”.">
          <input
            id="bmw-version"
            name="version"
            value={values.version}
            onChange={(e) => setField("version", e.target.value)}
            className={inputClasses}
            autoComplete="off"
            spellCheck={false}
            aria-describedby="bmw-version-hint"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field
          id="bmw-vin"
          label="VIN"
          optional
          hint="Przyspiesza sprawdzenie wyposażenia. Znajdziesz go w dowodzie rejestracyjnym (pole E)."
          error={errors.vin}
        >
          <input
            id="bmw-vin"
            name="vin"
            value={values.vin}
            onChange={(e) => setField("vin", e.target.value)}
            className={`${inputClasses} uppercase placeholder:normal-case`}
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            maxLength={17}
            placeholder="17 znaków"
            aria-invalid={Boolean(errors.vin)}
            aria-describedby={errors.vin ? "bmw-vin-error" : "bmw-vin-hint"}
          />
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field id="bmw-name" label="Imię" error={errors.name}>
          <input
            id="bmw-name"
            name="name"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            className={inputClasses}
            autoComplete="given-name"
            placeholder="Jan"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "bmw-name-error" : undefined}
            required
          />
        </Field>
        <Field id="bmw-contact" label="Telefon lub e-mail" error={errors.contact}>
          <input
            id="bmw-contact"
            name="contact"
            value={values.contact}
            onChange={(e) => setField("contact", e.target.value)}
            className={inputClasses}
            autoComplete="email"
            placeholder="telefon lub e-mail"
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? "bmw-contact-error" : undefined}
            required
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field id="bmw-message" label="Dodatkowe informacje" optional>
          <textarea
            id="bmw-message"
            name="message"
            value={values.message}
            onChange={(e) => setField("message", e.target.value)}
            className={inputClasses}
            rows={2}
            placeholder="Np. którą funkcję chcesz aktywować"
          />
        </Field>
      </div>

      {/* Pułapka na boty (Formspree rozpoznaje pole _gotcha). Niewidoczna dla ludzi. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <p className="mt-5 text-xs leading-relaxed text-paper-500">
        Administratorem Twoich danych osobowych jest ADMIC GARAGE. Dane z formularza (w tym dane auta, a jeśli je podasz,
        VIN i wersję oprogramowania) przetwarzamy wyłącznie w celu udzielenia odpowiedzi na Twoje zapytanie. Szczegóły w{" "}
        <Link href="/polityka-prywatnosci" className="text-accent-light underline underline-offset-2 hover:text-accent">
          polityce prywatności
        </Link>
        .
      </p>

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-paper-400">
        <input
          id="bmw-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
          }}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink-600 bg-ink-950 accent-accent"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "bmw-consent-error" : undefined}
        />
        <span>
          Wyrażam zgodę na przetwarzanie moich danych osobowych podanych w formularzu przez ADMIC GARAGE w celu
          udzielenia odpowiedzi na moje zapytanie. *
        </span>
      </label>
      {errors.consent && (
        <p id="bmw-consent-error" className="mt-1.5 text-xs font-medium text-red-400">
          {errors.consent}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded bg-accent px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
      >
        {status === "sending" ? "Wysyłanie…" : formCopy.submit}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-paper-500">{formCopy.afterNote}</p>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm font-semibold text-amber-400">
          Nie udało się wysłać zapytania. Spróbuj ponownie za chwilę albo zadzwoń: {site.phone}.
        </p>
      )}
    </form>
  );
}
