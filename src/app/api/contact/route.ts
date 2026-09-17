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

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  // Wymagane pola wspólne dla obu formularzy w serwisie: pełnego (/kontakt —
  // imię, telefon, usługa, marka auta) i skróconego panelu bocznego na
  // podstronach usług (imię, e-mail, telefon, wiadomość). Reszta pól jest
  // opcjonalna i różni się między formularzami.
  if (!body || !body.name || !body.phone) {
    return NextResponse.json({ error: "Brak wymaganych danych (imię i telefon)." }, { status: 400 });
  }

  // _subject i _replyto to specjalne pola Formspree: ustawiają temat maila
  // oraz adres "Odpowiedz do" (jeśli formularz zebrał e-mail użytkownika —
  // pełny formularz na /kontakt go nie ma, więc _replyto zostanie pominięte).
  const payload: Record<string, unknown> = {
    ...body,
    _subject: `ADMIC GARAGE — nowe zapytanie od ${body.name}`,
  };
  if (body.email) payload._replyto = body.email;

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
