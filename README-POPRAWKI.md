# ADMIC GARAGE — paczka poprawek SEO / Google Ads / technicznych

## Jak wgrać
1. Zrób kopię projektu (albo commit w git).
2. Skopiuj zawartość tego folderu na wierzch projektu (pliki w tych samych ścieżkach; nadpisz istniejące). **`.env.local` nie jest w paczce i nie zmieniaj go.**
3. Z folderu projektu uruchom `USUN-STARE-PLIKI.ps1` (usuwa stare landingi — bez tego build się wywala na 3 błędach TypeScript).
4. `npm run build` → jeśli OK, wdrażasz (push na Vercel).
5. `public/videos/hero_film.mp4` zastępuje Twój plik 34,5 MB wersją 2,4 MB (ta sama treść, skompresowana). Oryginał zachowaj u siebie, jeśli chcesz.

## Co zrobiono
**Zgody i Google Ads / GA4**
- Consent Mode v2: domyślnie wszystkie 4 sygnały `denied`, aktualizacja po wyborze użytkownika; skrypt Google ładuje się dopiero po zgodzie.
- Przełączniki analityki i marketingu w banerze są domyślnie wyłączone; „Odrzuć” wygląda tak samo wyraźnie jak „Akceptuję”.
- Link „Ustawienia cookies” w obu stopkach — zgodę można zmienić tak łatwo, jak ją wyrażono.
- Konwersje Ads wysyłane tylko przy zgodzie marketingowej i tylko po realnie wysłanym formularzu.
- Tag Ads (`AW-…`) konfigurowany tylko przy zgodzie marketingowej; sama analityka nie uruchamia Ads.
- Polityka prywatności i cookies przepisane tak, by odpowiadały temu, co strona faktycznie robi.

**SEO**
- Każda podstrona ma jeden `<h1>`, własny canonical, `og:url`, `og:title`, `og:image` (nowy `og-image.jpg` 1200×630), twitter card.
- Krótsze tytuły (≤ ~60 znaków), nowy tytuł strony głównej.
- `sitemap.xml` odświeża się co godzinę (wcześniej zamrożony przy buildzie) i nie podaje sztucznego `lastModified`; `robots.txt` blokuje `/admin` i `/api/`.
- Usługi „Kodowanie” i „Multimedia” linkują do landingu BMW; własna strona 404; `favicon.ico`.
- Film hero: 34,5 MB → 2,4 MB + obraz `poster` (szybszy LCP).

**Treści**
- Usunięte niepotwierdzone obietnice: „odwracalne / nie wpływa na gwarancję”, „certyfikowany sprzęt”, „odpowiadamy w ciągu kilku godzin”, obietnice terminów i dojazdu na stronach miast. FAQ mówi teraz, że zakres zależy od auta i że gwarancji nie obiecujemy.
- Dopisana informacja o znakach towarowych BMW/Apple w stopce landingu (**potwierdź brzmienie**).

**Formularze i bezpieczeństwo**
- `/api/contact`: biała lista pól z limitami długości, odrzucanie wstrzykniętych pól Formspree (`_next`, `_cc`, `_redirect`…), limit rozmiaru, walidacja e-maila, temat maila bez łamania linii.
- Ukryty honeypot w formularzu na `/kontakt` i w panelu usług; zdarzenie `generate_lead` po udanej wysyłce (bez danych osobowych).
- `next.config.mjs`: nagłówki bezpieczeństwa (nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS), `poweredByHeader: false`, przekierowania starych landingów.
- Panel: tylko role `admin`/`editor` wchodzą; opcjonalny `supabase/zabezpieczenie-rejestracji.sql` (nowe konta dostają rolę `pending`).

## Co sprawdzone (w środowisku testowym)
`tsc` bez błędów · `next lint` bez uwag · `next build` OK · crawl 18 podstron (H1, canonical, og, tytuły) · 40 testów landingu BMW · 14 testów zgód cookies · 19 testów formularzy (honeypot, błąd 502 bez fałszywego sukcesu, brak PII w analityce) · test API na atrapie Formspree (nic nie poszło do prawdziwego) · Lighthouse mobile: SEO 100, dostępność 96–100, best practices 100, wydajność 81 (strona główna, wideo) / 96.
Build testowany ze zastępczymi fontami (sandbox nie ma dostępu do Google Fonts) — u Ciebie fonty ładują się normalnie.

## NIE sprawdzone / wymaga Ciebie
1. **Wpisz brakujące dane na stronach polityk** — w tekście są widoczne znaczniki `[DO UZUPEŁNIENIA …]`: imię i nazwisko/nazwa administratora, daty aktualizacji, okres przechowywania w GA4, czy Ads używa remarketingu/Customer Match. Do czasu uzupełnienia widzą je odwiedzający.
2. **Konwersje Google Ads**: w koncie nie ma skonfigurowanej żadnej konwersji. Utwórz je (formularz, telefon, WhatsApp), skopiuj `send_to` (np. `AW-18396266222/abc…`) do `src/data/site.ts` → `googleTag.conversions`. Puste = nic nie jest wysyłane. Po wdrożeniu sprawdź w Google Ads → Diagnostyka tagu / Podgląd, czy Consent Mode jest wykrywany.
3. **Supabase**: wyłącz „Allow new users to sign up” (Authentication → Sign In / Providers) i ewentualnie uruchom `supabase/zabezpieczenie-rejestracji.sql`. Tego nie mogłem sprawdzić w Twoim projekcie.
4. **Formspree** — plan darmowy ma limit zgłoszeń miesięcznie; sprawdź skrzynkę i limit. Dostarczania maili nie testowałem.
5. Sprawdź w Search Console, że sitemap `/sitemap.xml` jest wczytana, i zgłoś nowe adresy.
6. Zweryfikuj brzmienie noty o znakach towarowych i opisy w FAQ/usługach — to Twoje usługi, ja tylko usunąłem to, czego nie mogłem potwierdzić.

## Świadomie NIE zrobione
- Aktualizacja Next.js 14 → 15.5+ (wymaga przepisania m.in. `params` na async; osobne zadanie). Vercel deklaruje ochronę na poziomie platformy przed dwiema krytycznymi lukami, ale to nie zastępuje aktualizacji.
- Decyzja o 6 stronach miast (ryzyko „doorway pages”): zostawiłem, usunąłem tylko niepotwierdzone obietnice. Warto je z czasem uzupełnić realnymi realizacjami z danego regionu.
- Zmiana H1 strony głównej na frazę z „kodowanie” — zostawiony obecny nagłówek marki.
- Content-Security-Policy (wymaga testów na żywo z Google Tag, Vercel i Supabase).
- Zapis `gclid` w formularzu.
