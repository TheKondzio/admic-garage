# Panel administracyjny ADMIC GARAGE — konfiguracja

Ten dokument prowadzi Cię przez **wszystko, czego ja nie mogłem zrobić za
Ciebie** — nie mam dostępu do Twojego konta Supabase ani Vercel, więc kod
jest gotowy, ale te kroki musisz wykonać sam. Zajmie to około 20–30 minut,
jednorazowo.

## Krok 1 — Załóż projekt Supabase

1. Wejdź na [supabase.com](https://supabase.com), załóż konto (może być przez GitHub).
2. Kliknij „New project”. Wybierz organizację, nadaj nazwę (np. `admic-garage`),
   ustaw silne hasło do bazy (zapisz je gdzieś bezpiecznie) i wybierz region
   najbliższy Polsce (np. Frankfurt — `eu-central-1`).
3. Poczekaj ok. 2 minuty, aż projekt się utworzy.

## Krok 2 — Uruchom schemat bazy danych

1. W panelu Supabase wejdź w **SQL Editor** (ikona po lewej) → „New query”.
2. Otwórz plik `supabase/schema.sql` z tego projektu, skopiuj **całą**
   zawartość, wklej do edytora SQL i kliknij **Run**.
3. Powinieneś zobaczyć „Success. No rows returned” — to tworzy tabele
   (`profiles`, `realizacje`, `realizacja_images`) oraz reguły bezpieczeństwa
   (RLS), które pilnują, kto może co zobaczyć/zmienić.

## Krok 3 — Storage na zdjęcia

1. W panelu Supabase wejdź w **Storage** → „New bucket”.
2. Nazwa bucketu: **dokładnie** `realizacje` (mała litera, bez spacji — kod
   się na to powołuje).
3. Zaznacz **Public bucket: TAK** (odwiedzający stronę muszą móc oglądać
   zdjęcia; kto może je *wgrywać/usuwać* i tak pilnują osobne reguły).
4. Wróć do **SQL Editor**, wklej i uruchom **tylko sekcję „STORAGE”** na
   samym dole `supabase/schema.sql` (trzy polityki `create policy` dla
   `storage.objects`) — to musi być zrobione PO utworzeniu bucketu.

## Krok 4 — Załóż swoje pierwsze konto (admin)

1. W Supabase: **Authentication** → **Users** → „Add user” → „Create new user”.
2. Podaj swój e-mail i hasło (zaznacz „Auto Confirm User”, żeby nie trzeba
   było potwierdzać e-maila).
3. Kliknij „Create user” — konto dostanie automatycznie rolę `editor`
   (dzięki triggerowi z `schema.sql`). Żeby nadać sobie `admin` (potrzebne
   do usuwania realizacji), wróć do **SQL Editor** i uruchom (zamień e-mail
   na swój):
   ```sql
   update profiles set role = 'admin' where email = 'twoj@email.pl';
   ```
4. Dla znajomych, którzy mają tylko dodawać/edytować (bez usuwania) — powtórz
   krok 1–2 i **nie** uruchamiaj dla nich powyższego zapytania — zostają
   automatycznie jako `editor`.

## Krok 5 — Zmienne środowiskowe

1. W Supabase: **Project Settings** (ikona zębatki) → **API**.
2. Skopiuj dwie wartości:
   - **Project URL** → to Twoje `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** klucz (w sekcji „Project API keys”) → to Twoje
     `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Lokalnie:** skopiuj `.env.local.example` do `.env.local`, wklej tam
   te dwie wartości.
4. **Na Vercelu:** wejdź w projekt → **Settings** → **Environment Variables**
   → dodaj obie zmienne (dokładnie takie same nazwy) → **Redeploy**, żeby
   zaczęły obowiązywać.

**Które zmienne są bezpieczne do ujawnienia, a które nie:**
`NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY` są **celowo
publiczne** (widoczne w przeglądarce) — to normalne i bezpieczne w Supabase,
bo realne uprawnienia pilnuje RLS w bazie, nie te klucze. **Nigdy** nie
dodawaj do tego projektu klucza `service_role` (widoczny w tym samym miejscu
w Supabase) — ten klucz omija RLS całkowicie i nie jest nigdzie w tym
projekcie potrzebny.

## Krok 6 — Sprawdź lokalnie

```bash
npm install
npm run dev
```

Wejdź na `http://localhost:3000/admin/login`, zaloguj się kontem z kroku 4.

## Krok 7 — (opcjonalnie) Przenieś swoje 3 obecne realizacje do bazy

Masz już 3 realizacje w starym systemie (VW Atlas, Audi Q5, Audi A4). Żeby
się nie zdublowały ani nie zniknęły: w **SQL Editor** uruchom zawartość
`supabase/seed-existing-realizacje.sql`. Zanim to zrobisz, sprawdź uwagę na
górze tego pliku dot. rozszerzenia pliku VW Atlas (`.jpg` vs `.jpeg`).

## Krok 8 — Wdrożenie na Vercel

Jeśli masz już projekt podłączony do Vercela (z wcześniejszej konfiguracji):
wystarczy `git push` — Vercel przebuduje stronę automatycznie, **pod
warunkiem że zmienne środowiskowe z kroku 5 są już ustawione w Vercelu**.

## Krok 9 — Sprawdź działanie panelu po wdrożeniu

Otwórz `https://[twoja-domena]/admin/login` i przejdź całą ścieżkę:
zaloguj się → „Dodaj realizację” → wypełnij tytuł i kategorię → na kolejnym
ekranie wgraj zdjęcie główne → zapisz → ustaw status na „Opublikowana” →
sprawdź, czy realizacja pojawiła się na `/realizacje`.

---

## Jak działa panel — krótkie wyjaśnienie

- **Logowanie:** e-mail + hasło przez Supabase Auth. Middleware (`src/middleware.ts`)
  blokuje dostęp do `/admin/*` dla niezalogowanych na poziomie edge'a —
  zanim jakikolwiek kod strony w ogóle się wykona.
- **Role:** `admin` i `editor`, przechowywane w tabeli `profiles`. Sprawdzane
  **po stronie serwera** w każdej akcji zapisu (`src/lib/actions/realizacje.ts`)
  i dodatkowo wymuszane przez RLS w bazie — nawet gdyby ktoś ominął nasz
  kod, baza i tak odrzuci nieuprawnione zapytanie.
- **Dodawanie realizacji:** dwuetapowe — najpierw tytuł+kategoria (żeby jak
  najszybciej dostać ID rekordu), potem pełna edycja ze zdjęciami.
- **Upload zdjęć:** bezpośrednio z przeglądarki do Supabase Storage (nie
  przez serwer Vercela — szybciej, bez limitów rozmiaru requestu).
- **Publikacja:** ustawienie statusu na „Opublikowana” w formularzu edycji.
  Wersje robocze nie są nigdzie widoczne publicznie (RLS to gwarantuje).
- **Integracja ze stroną:** `/realizacje` i `/realizacje/[slug]` są teraz
  **w pełni dynamiczne** — czytają dane z bazy przy każdym wejściu, więc
  nowa realizacja pojawia się natychmiast, bez redeployu. Sekcje-podglądy
  (strona główna, podstrony usług) zostają statyczne dla wydajności, ale
  odświeżają się automatycznie co godzinę (ISR).

## Znane uproszczenia (świadome decyzje, nie błędy)

- **Wskaźnik postępu uploadu** pokazuje tylko stan „Wysyłanie…”, nie pasek
  procentowy — biblioteka kliencka Supabase Storage nie udostępnia prostego
  hooka postępu przy zwykłym `upload()`. Rozbudowa o pasek % wymagałaby
  ręcznej implementacji przez `XMLHttpRequest`, co uznałem za nadmiarowe na
  start.
- **Uprawnienia „edytor edytuje tylko przydzielone treści”** z Twojego
  briefu (punkt 5) — w tej wersji `editor` może edytować **każdą**
  realizację, nie tylko własne. Pełne „przydzielanie” treści do konkretnych
  osób to osobna funkcja (wymagałaby np. tabeli przypisań) — nie wdrożyłem
  jej, żeby nie komplikować MVP, ale schemat bazy (`author_id`) jest gotowy
  pod taką rozbudowę w przyszłości.
- **Zarządzanie kategoriami z panelu** — kategorie są obecnie stałą listą
  w kodzie (`REALIZACJA_CATEGORIES`, te same co reszta strony), nie osobną
  tabelą edytowalną z UI. Zgodne z Twoim briefem („Nie twórz kategorii,
  które nie odpowiadają rzeczywistej ofercie” — 4 kategorie to i tak cała
  oferta), ale jeśli zechcesz dodawać kategorie samodzielnie z panelu w
  przyszłości, to osobna, mniejsza funkcja do dobudowania.
- **Pozostałe moduły z punktu 14 briefu** (usługi, FAQ, teksty sekcji,
  dane kontaktowe z poziomu panelu) — zgodnie z Twoim briefem („nie musisz
  wdrażać wszystkiego od razu”) nie zostały zrobione. Te treści nadal
  edytuje się w plikach `src/data/*.ts`, tak jak dotychczas.
