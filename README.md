# ADMIC GARAGE — serwis usługowy

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Homepage sprzedaje i kieruje
do konkretnej usługi; każda usługa ma własną, rozbudowaną podstronę z pełnym
opisem, procesem, FAQ i realizacjami. Zero fikcyjnych danych — usługi bez
potwierdzenia oferty są jawnie oznaczone i wyłączone z indeksowania.

## Uruchomienie lokalnie

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # build produkcyjny (sprawdza typy i lint)
npm start            # uruchomienie builda produkcyjnego
```

Build produkcyjny pobiera fonty Inter i Sora z Google Fonts w trakcie
kompilacji — potrzebny jest dostęp do internetu na maszynie budującej projekt
(typowe dla Vercel/Netlify).

## Mapa strony

```
/                           homepage — skrót oferty, kieruje do podstron
/uslugi                     katalog wszystkich usług (digital + detailing)
/uslugi/[slug]               podstrona usługi (pełny opis / TODO-placeholder)
/realizacje                  portfolio z filtrowaniem po kategorii
/realizacje/[slug]            szczegóły pojedynczej realizacji
/obszar-dzialania             dedykowana strona obszaru działania
/faq                           pełne FAQ + linki do FAQ per usługa
/kontakt                       dedykowana strona kontaktowa (formularz)
/polityka-prywatnosci          szkic polityki prywatności
```

## Architektura — system usług

**Jeden plik danych rządzi wszystkim: `src/data/services.ts`.**

```ts
{
  slug: "kodowanie-samochodowe",
  confirmed: true,        // false = uczciwy placeholder zamiast podstrony
  tileTitle, tileDescription,      // kafel na homepage i w /uslugi
  heroTitle, heroSubtitle,          // hero podstrony
  intro, forWho, whatWeDo, ...       // pełna treść podstrony
  subSections: [...],                 // wyraźny podział na grupy (np. marki: BMW & MINI / VAG / Mercedes-Benz),
                                        // każda z id-kotwicą, do której skacze podpozycja w dropdownie nawigacji
  faq: [...],                         // FAQ specyficzne dla usługi
  relatedSlugs: ["multimedia-retrofit"], // "może Cię zainteresować"
}
```

Trzy główne, potwierdzone kategorie: **Mycie detailingowe** (obejmuje pranie
tapicerki — to nie osobna usługa, tylko jej część), **Kodowanie samochodowe**
(BMW & MINI / VAG / Mercedes-Benz jako `subSections`) i **Multimedia &
Retrofit** (CarPlay & Android Auto / Retrofit jako `subSections`). Plus 4
usługi „do potwierdzenia" (korekta lakieru, zabezpieczenie lakieru,
przyciemnianie szyb, folie PPF) w dropdownie pod etykietą „Pozostałe usługi".

`src/components/services/ServicePageTemplate.tsx` renderuje z tego obiektu
kompletną podstronę (hero → dla kogo → co robimy → proces → realizacje → FAQ →
powiązane usługi → kontakt). Sekcje, dla których nie podano danych, po prostu
się nie renderują — nic nie jest wymyślane.

**Żeby dodać nową usługę:**
1. Dopisz obiekt do `services.ts` z `confirmed: true` i treścią.
2. Gotowe — podstrona `/uslugi/nowy-slug` powstaje automatycznie
   (`generateStaticParams`), pojawia się w navbarze, w `/uslugi`, w stopce
   i w sitemapie. Zero zmian w komponentach.

**Usługa niepotwierdzona** (`confirmed: false`) dostaje tylko `slug`,
`tileTitle`, `tileDescription` — podstrona pokazuje uczciwy komunikat
"do potwierdzenia" zamiast wymyślonej treści, ma `robots: noindex` i nie
trafia do sitemapy. Żeby ją aktywować: zmień na `confirmed: true` i uzupełnij
pola tak jak w istniejących usługach.

## Architektura — system realizacji

`src/data/projects.ts` — jeden obiekt `Project` z polem `service` (slug usługi)
trafia automatycznie do:
- `/realizacje` (grid z filtrowaniem po kategorii),
- `/realizacje/[slug]` (strona szczegółów),
- sekcji "Realizacje: [usługa]" na odpowiedniej podstronie usługi.

Tablica jest celowo pusta — brak prawdziwych zdjęć oznacza uczciwy placeholder
("Realizacje wkrótce" + link do Instagrama/Facebooka), a nie fikcyjne wpisy.
Dodanie realizacji: wrzuć zdjęcia do `/public/images/projects/<slug>/`,
dopisz obiekt do tablicy — reszta (grid, filtr, strona szczegółów, sekcja na
podstronie usługi) działa automatycznie.

## Nawigacja

`src/data/nav.ts` generuje dropdown "Usługi" bezpośrednio z `services.ts`
(potwierdzone na górze, niepotwierdzone na dole z etykietą "wkrótce") — jedno
źródło prawdy, zero ręcznego duplikowania listy. Dropdown (desktop) i akordeon
(mobile) są zawsze obecne w DOM — widoczność przełącza CSS, więc linki są
w pełni indeksowalne przez wyszukiwarki niezależnie od JS.

## Formularz kontaktowy

Nadal **nie wysyła e-maili** — to celowe. `src/app/api/contact/route.ts`
waliduje dane i zwraca 501 z jasnym komunikatem, dopóki nie podłączysz
backendu (gotowy szkielet pod Resend w komentarzu w pliku).

## Jak dodawać zdjęcia

Wszystkie miejsca na zdjęcia są już podłączone w kodzie (przez `next/image`) —
wystarczy wrzucić plik do `/public/images/` i wpisać jego ścieżkę w danych.
Dopóki pole jest puste, pokazuje się elegancki placeholder zamiast błędu.

| Gdzie | Plik z danymi | Pole | Przykład |
|---|---|---|---|
| Tło całej sekcji hero (pełnoekranowe, przyciemnione, rozmyte) | `src/data/site.ts` | `heroBackgroundImage` | `"/images/hero-bg.jpg"` |
| Film w panelu po prawej w hero (autoplay, wyciszony, w pętli) | `src/data/site.ts` | `heroVideo` | `"/videos/hero.mp4"` (plik do `public/videos/`) |
| Kafel usługi (homepage + `/uslugi`) | `src/data/services.ts` | `tileImage` na danej usłudze | `"/images/services/kodowanie.jpg"` |
| Tło hero na podstronie usługi | `src/data/services.ts` | `heroImage` na danej usłudze | `"/images/services/kodowanie-hero.jpg"` |
| Kafel realizacji (`/realizacje` + podglądy) | `src/data/projects.ts` | `coverImage` na danej realizacji | `"/images/projects/bmw-g20/cover.jpg"` |

Krok po kroku (np. tło hero na stronie głównej):
1. Wrzuć plik do `public/images/`, np. `public/images/hero-bg.jpg`.
2. W `src/data/site.ts` ustaw `heroBackgroundImage: "/images/hero-bg.jpg"` (ścieżka zaczyna
   się od `/images/...`, bez `public` — Next.js serwuje zawartość `public/`
   spod korzenia domeny).
3. Odśwież `npm run dev` — zdjęcie pojawi się automatycznie.

Dla usług i realizacji działa identycznie — po prostu edytujesz odpowiedni
obiekt w `services.ts` / `projects.ts` zamiast `site.ts`.

**Logo** to na razie tekst w `Navbar.tsx` / `Footer.tsx` (nie plik graficzny) —
jeśli chcesz wstawić logo w formie obrazka, podmień ten fragment na
`<Image src="/images/logo.svg" ... />` w obu plikach.

**Format i rozmiar:** `.jpg` lub `.webp`, szerokość min. 1600 px dla zdjęć
hero (pełna szerokość ekranu), min. 800 px dla kafli usług i realizacji.
Next.js sam zoptymalizuje rozmiar i format przy wyświetlaniu.

## Formularz kontaktowy, Google Analytics i Google Ads

**1. Formularz kontaktowy — ✅ działa.**
Podłączony pod [Formspree](https://formspree.io) (`src/app/api/contact/route.ts`,
endpoint `https://formspree.io/f/mwlewpdw`). Oba formularze w serwisie
(pełny na `/kontakt` i skrócony panel na podstronach usług) realnie wysyłają
teraz zapytania e-mailem na skrzynkę skonfigurowaną w panelu Formspree.

- **Pierwsze zgłoszenie:** Formspree wysyła jednorazowy e-mail z prośbą o
  potwierdzenie adresu odbiorczego — trzeba go kliknąć, inaczej kolejne
  wiadomości nie dotrą.
- **Limit darmowego planu:** 50 zgłoszeń/miesiąc.
- **Zmiana formularza bez ruszania kodu:** skopiuj `.env.local.example` do
  `.env.local`, wpisz tam nowy endpoint w `FORMSPREE_ENDPOINT` — nadpisze
  domyślny z kodu.

**2. Google Analytics (GA4) i Google Ads — nieaktywne, gotowe do wklejenia ID:**
W `src/data/site.ts` w obiekcie `googleTag` wklej odpowiednie ID:
```ts
googleTag: {
  ga4Id: "G-XXXXXXXXXX",   // Google Analytics 4
  adsId: "AW-XXXXXXXXX",    // Google Ads — śledzenie konwersji
},
```
To jedyna potrzebna zmiana. Po jej zapisaniu automatycznie:
- na stronie pojawi się baner zgody na cookies (`CookieConsentBanner.tsx`),
- gtag.js (Google Analytics + Google Ads) załaduje się **dopiero po
  wyrażeniu zgody przez odwiedzającego** — zgodnie z RODO i Prawem
  telekomunikacyjnym, nie wcześniej,
- jeśli chcesz uzupełnić tylko jedno z dwóch ID (np. samo GA4 bez Google
  Ads), po prostu zostaw drugie pole jako `""`.

Zanim to aktywujesz, zaktualizuj `/polityka-cookies` — sekcja 3 tej strony
ma już przygotowany opis tego mechanizmu, ale wymaga uzupełnienia
konkretnej daty uruchomienia (oznaczone `[DO UZUPEŁNIENIA]` w kodzie strony).

**3. Konwersje Google Ads z formularza** (opcjonalnie, po skonfigurowaniu
`adsId` powyżej): w miejscu, gdzie formularz pokazuje komunikat sukcesu
(`status === "success"` w `Contact.tsx` / `ServiceContactPanel.tsx`), dodaj
wywołanie `window.gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/XXXXXXXXX' })`
z dokładnym identyfikatorem etykiety konwersji z panelu Google Ads.

## Co jeszcze wymaga Twojego uzupełnienia

1. **Zdjęcia** — patrz sekcja wyżej.
2. **Logo** — patrz sekcja wyżej.
3. **Google Analytics, Google Ads** — formularz już działa (Formspree); GA4/Ads patrz sekcja wyżej.
4. **4 usługi lakiernicze/foliowanie** (korekta lakieru, zabezpieczenie
   lakieru, przyciemnianie szyb, folie PPF) są obecnie wyłączone na Twoją
   prośbę — zakomentowane na dole `services.ts`. Żeby je przywrócić, wklej
   wybrany obiekt z powrotem do tablicy `services`.
5. **Obraz Open Graph** (`/og-image.jpg`, 1200×630).
6. **Realizacje** — pierwsze prawdziwe wpisy w `data/projects.ts`.

## Deploy

Gotowe pod Vercel — połączenie repozytorium i deploy bez dodatkowej
konfiguracji. Alternatywnie dowolny hosting Node.js (`npm run build && npm start`).
