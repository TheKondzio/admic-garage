import { NextRequest, NextResponse } from "next/server";

// Formularz jest podłączony pod Formspree (https://formspree.io) — oba
// formularze w serwisie (pełny na /kontakt i skrócony panel na podstronach
// usług) wysyłają dane tutaj, a stąd trafiają dalej do Formspree, które
// przekazuje je e-mailem na skrzynkę skonfigurowaną w panelu Formspree.
//
// ID formularza jest domyślnie wpisane poniżej, ale można je nadpisać
// zmienną środowiskową FORMSPREE_ENDPOINT (np. gdyby trzeba było podmienić
// formularz bez zmiany kodu — patrz .env.local.example).
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/mwlewpdw";

// Dozwolone pola formularzy (pełny /kontakt, panel usług, landing BMW) wraz z
// maksymalną długością. Wszystko spoza listy jest ODRZUCANE — dzięki temu nikt
// nie wstrzyknie specjalnych pól Formspree (np. _next, _cc, _redirect) ani nie
// prześle dowolnie dużego ładunku.
const ALLOWED_FIELDS: Record<string, number> = {
  name: 100,
  phone: 40,
  email: 160,
  service: 120,
  car: 120,
  model: 120,
  year: 20,
  idrive: 60,
  idrive_version: 60,
  vin: 30,
  message: 3000,
  source: 80,
  page: 200,
  utm_source: 120,
  utm_medium: 120,
  utm_campaign: 160,
  utm_term: 160,
  utm_content: 160,
};

const MAX_BODY_BYTES = 20_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  if (typeof value === "string") return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
  if (typeof value === "number" || typeof value === "boolean") return String(value).slice(0, max);
  return "";
}

export async function POST(req: NextRequest) {
  const raw = await req.text().catch(() => "");
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Zbyt duże zapytanie." }, { status: 413 });
  }
  let body: Record<string, unknown> | null = null;
  try {
    const parsed = JSON.parse(raw);
    body = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    body = null;
  }

  // Pułapka na boty (honeypot): ukryte pole `_gotcha`, którego człowiek nie
  // widzi i nie wypełnia. Jeśli ma wartość, to bot — odpowiadamy sukcesem
  // (żeby go nie uczyć), ale niczego nie wysyłamy dalej.
  if (body && body._gotcha) {
    return NextResponse.json({ ok: true });
  }

  // Wystarczy jedna droga kontaktu: telefon LUB e-mail (landing BMW ma jedno
  // pole „telefon lub e-mail”). Imię jest wymagane zawsze.
  const fields: Record<string, string> = {};
  if (body) {
    for (const [key, max] of Object.entries(ALLOWED_FIELDS)) {
      const v = clean(body[key], max);
      if (v) fields[key] = v;
    }
  }
  if (!fields.name || (!fields.phone && !fields.email)) {
    return NextResponse.json({ error: "Brak wymaganych danych (imię i telefon lub e-mail)." }, { status: 400 });
  }
  if (fields.email && !EMAIL_RE.test(fields.email)) {
    return NextResponse.json({ error: "Nieprawidłowy adres e-mail." }, { status: 400 });
  }

  // _subject i _replyto to specjalne pola Formspree: temat maila oraz adres
  // „Odpowiedz do”. Pole `source` trafia do tematu, żeby od razu rozpoznać
  // formularz. Temat budujemy z oczyszczonych wartości (bez łamania linii).
  const sourceTag = fields.source ? ` [${fields.source.replace(/[\r\n]+/g, " ")}]` : "";
  const payload: Record<string, string> = {
    ...fields,
    _subject: `ADMIC GARAGE${sourceTag} — nowe zapytanie od ${fields.name.replace(/[\r\n]+/g, " ")}`,
  };
  if (fields.email) payload._replyto = fields.email;

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      console.error("Formspree error:", res.status, data);
      return NextResponse.json(
        { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później lub zadzwoń." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Formspree request failed:", err);
    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później lub zadzwoń." },
      { status: 502 }
    );
  }
}
