# Dokumenty prawne — ADMIC GARAGE (admic-garage.pl)

> **Aktualizacja:** w kodzie strony zbudowano już (na razie nieaktywny)
> mechanizm banera zgody na cookies wraz z obsługą Google Analytics (GA4)
> i Google Ads (`src/components/cookies/`). Aktywuje się go wklejając
> identyfikator GA4/Ads w `src/data/site.ts` — do tego czasu strona
> zachowuje się dokładnie tak, jak opisano w sekcji 3 poniżej (zero
> cookies). Treść polityki cookies na żywej stronie (`/polityka-cookies`)
> została już zaktualizowana o opis tego mechanizmu — ten plik pozostaje
> jako punkt odniesienia z dnia pierwszego audytu.

> **Aktualizacja 2:** formularz kontaktowy ma już podłączoną aktywną
> wysyłkę przez Formspree (nie Resend, jak zakładano w pierwszej wersji
> tego dokumentu), a administrator uzupełnił dane firmy (adres, status
> działalności nierejestrowanej, okres przechowywania). Sekcja 2 poniżej
> została w całości zaktualizowana i odpowiada treści opublikowanej pod
> `/polityka-prywatnosci`. Jedyne pole nadal oznaczone jako do uzupełnienia
> to imię i nazwisko administratora.

> Ten dokument nie stanowi porady prawnej. Fragmenty oznaczone jako
> „wymaga weryfikacji prawnej” powinny zostać sprawdzone przez prawnika
> przed publikacją, szczególnie w zakresie podstaw prawnych przetwarzania,
> okresów przechowywania danych i ewentualnych transferów poza EOG.

---

## 1. ANALIZA STRONY

Audyt wykonany na podstawie rzeczywistego kodu źródłowego serwisu (Next.js 14,
App Router), nie na podstawie domysłów.

### Strony i formularze
Serwis ma dwie strony zbierające dane osobowe:

**A. Pełny formularz kontaktowy** — sekcja „Kontakt” na stronie głównej oraz
strona `/kontakt`. Pola: **imię**, **numer telefonu**, **rodzaj usługi**
(lista wyboru), **marka i model auta**, **wiadomość** (opcjonalna). **Nie
zawiera pola e-mail ani checkboxa zgody** (patrz sekcja 9 — rekomendacja
wdrożeniowa; checkbox dodałem w ramach tej pracy, patrz kod).

**B. Skrócony panel kontaktowy** — na każdej podstronie usługi
(`/uslugi/kodowanie-samochodowe`, `/uslugi/multimedia-retrofit`,
`/uslugi/mycie-detailingowe`). Pola: **imię i nazwisko**, **adres e-mail**,
**telefon**, **wiadomość** (opcjonalna) + **checkbox zgody na przetwarzanie
danych** (wymagany, blokuje wysyłkę jeśli niezaznaczony).

### Backend formularza — stan faktyczny
Oba formularze wysyłają dane do wewnętrznego endpointu `/api/contact`, które
przekazuje je dalej do usługi **Formspree** — **to aktywna integracja**,
formularz realnie wysyła zapytania e-mailem. (Pierwsza wersja tego audytu
opisywała stan sprzed podłączenia wysyłki — od tego czasu backend został
skonfigurowany.)

**Konsekwencja prawna:** dane z formularza są przekazywane do Formspree,
Inc. (USA) i docelowo trafiają na skrzynkę pocztową Administratora. Pełny
opis odbiorców, podstaw prawnych i mechanizmu transferu poza EOG — patrz
sekcja 2 poniżej (Polityka Prywatności, punkty 6–7).

### Cookies
Serwis **nie ustawia żadnych plików cookies** — ani własnych, ani
pochodzących od podmiotów trzecich. Brak logowania, sesji, koszyka czy
panelu ustawień wymagającego cookies.

### Analityka i marketing
**Brak** jakichkolwiek narzędzi: Google Analytics, Meta Pixel, Hotjar,
Microsoft Clarity, Google Tag Manager i inne — żadne z nich nie występują
w kodzie źródłowym.

### Fonty
Fonty Inter i Sora są ładowane przez `next/font/google` — Next.js pobiera
i hostuje pliki fontów samodzielnie w trakcie budowania strony. **Przeglądarka
użytkownika nie łączy się bezpośrednio z serwerami Google** przy wyświetlaniu
fontów (brak przekazywania adresu IP do Google z tego tytułu).

### Mapy
Sekcja „Obszar działania” zawiera wyłącznie wizualny placeholder — **nie ma
osadzonej mapy Google Maps** ani żadnego innego dostawcy map.

### Wideo
Hero na stronie głównej ma przygotowane miejsce na plik wideo **hostowany
lokalnie** (self-hosted `.mp4`), **nie** na osadzony YouTube/Vimeo. Plik
obecnie nie jest ustawiony (placeholder tekstowy).

### reCAPTCHA
Brak.

### Płatności, konta użytkowników
Brak. Serwis jest wyłącznie informacyjny — nie ma sklepu, koszyka, rezerwacji
online z płatnością, logowania ani konta klienta.

### Social media
Linki do Instagrama, Facebooka i WhatsApp to zwykłe linki wychodzące
(`<a href>`), **nie** osadzone widżety/pluginy społecznościowe — nie ładują
żadnych skryptów ani cookies tych platform na stronie ADMIC GARAGE.

### Dane strukturalne (JSON-LD)
Strona zawiera dane strukturalne Schema.org (LocalBusiness, Service,
FAQPage, BreadcrumbList) — wyłącznie publiczne dane o firmie (nazwa,
telefon, godziny, obszar działania), bez danych osobowych użytkowników.

### Elementy nieustalone z kodu źródłowego
Hosting, dostawca domeny, pełna nazwa prawna i forma działalności, adres
siedziby, NIP, REGON — żadne z tych informacji nie występują w kodzie ani
treści strony. Oznaczone poniżej jako **[DO UZUPEŁNIENIA]**.

---

## 2. POLITYKA PRYWATNOŚCI

*(Stan finalny — zgodny z tym, co jest już opublikowane na `/polityka-prywatnosci`.
Administrator uzupełnił dane firmy; jedyne pozostałe pole do wypełnienia to imię
i nazwisko, oznaczone poniżej jako [DO UZUPEŁNIENIA].)*

### 1. Administrator danych

Administratorem danych osobowych przetwarzanych w związku z korzystaniem z serwisu
admic-garage.pl jest:

Michał Kądzioła
prowadzący/a działalność nierejestrowaną pod marką ADMIC GARAGE
Adres: Ogrodowa 6A, Kalwaria Zebrzydowska
NIP: Brak (działalność nierejestrowana na podstawie art. 5 ustawy Prawo przedsiębiorców)
REGON: Brak

zwany/a dalej „Administratorem”.

### 2. Kontakt w sprawach danych osobowych

Z Administratorem można skontaktować się:
- e-mail: admicgarage@gmail.com
- telefon: +48 730 421 557

Administrator nie powołał Inspektora Ochrony Danych — kontakt w sprawach ochrony
danych odbywa się bezpośrednio z Administratorem.

### 3. Jakie dane przetwarzamy i skąd pochodzą

Dane przetwarzane w serwisie pochodzą wyłącznie bezpośrednio od użytkownika, który
dobrowolnie podaje je w formularzu kontaktowym. Serwis nie pozyskuje danych z innych
źródeł.

| Dane | Formularz pełny (/kontakt) | Panel na podstronie usługi |
|---|---|---|
| Imię (i nazwisko) | ✅ | ✅ |
| Adres e-mail | — | ✅ |
| Numer telefonu | ✅ | ✅ |
| Rodzaj usługi | ✅ | — (wynika z kontekstu podstrony) |
| Marka i model samochodu | ✅ | — |
| Treść wiadomości | ✅ (opcjonalnie) | ✅ (opcjonalnie) |

Jeżeli użytkownik skontaktuje się bezpośrednio telefonicznie, przez WhatsApp lub
e-mailem, Administrator przetwarza dane podane w takiej rozmowie/korespondencji na
tych samych zasadach ochrony danych.

### 4. Cele i podstawy prawne przetwarzania

| Cel | Podstawa prawna |
|---|---|
| Udzielenie odpowiedzi na zapytanie przesłane przez formularz, przygotowanie wyceny | art. 6 ust. 1 lit. b RODO — działania podejmowane na żądanie osoby, której dane dotyczą, przed zawarciem umowy |
| Kontakt w celu realizacji usługi po jej ustaleniu | art. 6 ust. 1 lit. b RODO — wykonanie/przygotowanie umowy |
| Ewentualne dochodzenie lub obrona przed roszczeniami | art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes Administratora |

### 5. Okres przechowywania danych

Formularz kontaktowy ma podłączoną aktywną wysyłkę (patrz punkt 6) — dane z zapytania
są przechowywane w skrzynce pocztowej Administratora przez okres prowadzenia
korespondencji oraz ustaleń dotyczących usługi, a następnie przez okres 12 miesięcy
na potrzeby ewentualnego ponownego kontaktu lub do czasu upływu okresu przedawnienia
potencjalnych roszczeń.

### 6. Odbiorcy danych i podmioty przetwarzające

Formularz kontaktowy przekazuje dane do skrzynki e-mail Administratora za
pośrednictwem usługi **Formspree** (Formspree, Inc.) — to aktywna integracja,
działająca na stronie od momentu jej wdrożenia, a nie plan na przyszłość. Odbiorcami
danych w imieniu Administratora są wyłącznie podmioty zapewniające obsługę techniczną
serwisu:

- **Formspree, Inc.** (USA) — odbiera i przekazuje dalej dane z formularza kontaktowego.
- **Google Ireland Limited** — dostawca usługi pocztowej (Gmail), na którą trafiają wiadomości z formularza.
- **Vercel Inc.** — dostawca hostingu i infrastruktury serwisu.

Z podmiotami przetwarzającymi dane w imieniu Administratora zostaną zawarte umowy
powierzenia przetwarzania danych osobowych zgodne z art. 28 RODO.

### 7. Przekazywanie danych poza Europejski Obszar Gospodarczy (EOG)

Formspree, Inc. i Vercel Inc. mają siedzibę w USA. Formspree deklaruje zgodność
z RODO i opiera się na standardowych klauzulach umownych (SCC) jako mechanizmie
transferu danych, a także posiada certyfikat SOC 2 Type II. W przypadku wszystkich
wymienionych dostawców (Google, Vercel, Formspree) przekazywanie danych do państw
trzecich odbywa się w oparciu o odpowiednie mechanizmy prawne, takie jak decyzje
Komisji Europejskiej stwierdzające odpowiedni poziom ochrony (np. EU-US Data Privacy
Framework) lub Standardowe Klauzule Umowne (SCC).

*[Wymaga weryfikacji prawnej: ocena wystarczalności tego mechanizmu transferu po
wyroku Schrems II.]*

### 8. Prawa użytkownika

Osobie, której dane dotyczą, przysługuje prawo do:
- dostępu do swoich danych,
- sprostowania (poprawienia) danych,
- usunięcia danych („prawo do bycia zapomnianym”),
- ograniczenia przetwarzania,
- przenoszenia danych,
- wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie Administratora,
- cofnięcia zgody w dowolnym momencie (jeśli przetwarzanie odbywa się na podstawie zgody).

Realizacja powyższych praw odbywa się poprzez kontakt na adres: admicgarage@gmail.com.

### 9. Prawo do wniesienia skargi

Użytkownikowi przysługuje prawo wniesienia skargi do organu nadzorczego — Prezesa
Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa), jeżeli uzna, że
przetwarzanie jego danych narusza przepisy RODO.

### 10. Profilowanie

Serwis nie stosuje profilowania ani zautomatyzowanego podejmowania decyzji
wywołujących skutki prawne wobec użytkownika. Serwis nie wykorzystuje obecnie żadnych
narzędzi analitycznych ani marketingowych (np. Google Analytics, Google Ads) — jeśli
zostaną wdrożone w przyszłości, niniejsza polityka oraz polityka cookies zostaną
zaktualizowane przed ich uruchomieniem. (W kodzie strony jest już przygotowany,
nieaktywny mechanizm banera zgody na taką ewentualność — patrz aktualizacja na
początku tego dokumentu.)

### 11. Zabezpieczenia danych

Administrator stosuje odpowiednie środki techniczne i organizacyjne w celu ochrony
danych osobowych, w tym szyfrowanie połączenia za pomocą certyfikatu SSL (HTTPS) oraz
dostęp do skrzynki odbiorczej zabezpieczony uwierzytelnianiem dwuskładnikowym.

### 12. Zmiany polityki prywatności

Aktualna wersja polityki jest zawsze dostępna pod adresem
admic-garage.pl/polityka-prywatnosci.

Data ostatniej aktualizacji: 18 września 2026 r.

---


## 3. POLITYKA COOKIES

*(Gotowy tekst do umieszczenia pod adresem `/polityka-cookies`.)*

### 1. Czym są cookies

Cookies (ciasteczka) to małe pliki tekstowe zapisywane przez przeglądarkę
internetową na urządzeniu użytkownika podczas odwiedzania strony
internetowej. Wykorzystywane są zwykle do zapamiętywania preferencji
użytkownika, utrzymywania sesji lub zbierania anonimowych statystyk ruchu.

### 2. Jakie cookies wykorzystuje serwis admic-garage.pl

**Serwis admic-garage.pl, w swoim obecnym kształcie, nie wykorzystuje
żadnych plików cookies** — ani niezbędnych, ani analitycznych,
funkcjonalnych, czy marketingowych. Zostało to potwierdzone poprzez pełny
audyt kodu źródłowego strony: brak logowania, sesji, koszyka, narzędzi
analitycznych oraz jakichkolwiek skryptów podmiotów trzecich, które
ustawiałyby cookies.

Poniższa tabela pozostaje pusta, ponieważ żadne cookies obecnie nie
występują:

| Nazwa | Dostawca | Cel | Rodzaj | Okres przechowywania |
|---|---|---|---|---|
| [DO UZUPEŁNIENIA — brak cookies do wykazania na dzień publikacji] | — | — | — | — |

### 3. Co się stanie, jeśli w przyszłości pojawią się cookies

Jeżeli Administrator zdecyduje się w przyszłości na wdrożenie narzędzi
wymagających cookies (np. Google Analytics do statystyk odwiedzin, Meta
Pixel do reklam, mapy Google z własnymi cookies, itp.), niniejsza polityka
cookies zostanie **zaktualizowana przed uruchomieniem** takich narzędzi
i będzie zawierać:
- pełną tabelę konkretnych cookies (nazwa, dostawca, cel, rodzaj, okres
  przechowywania),
- podział na kategorie: niezbędne, analityczne/statystyczne, marketingowe,
  funkcjonalne,
- działający baner cookies umożliwiający wyrażenie i wycofanie zgody
  (gotowe treści takiego banera — patrz sekcja 5 tego dokumentu — są
  przygotowane z wyprzedzeniem, do wdrożenia razem z pierwszym
  narzędziem wymagającym zgody).

### 4. Zgoda użytkownika

Ponieważ serwis nie ustawia obecnie żadnych cookies wymagających zgody
(tj. innych niż ściśle niezbędne — a i takich obecnie nie ma), na stronie
**nie jest wyświetlany baner z prośbą o zgodę na cookies**. Zgodnie z
ustawą Prawo telekomunikacyjne oraz RODO, obowiązek uzyskania zgody
dotyczy cookies innych niż niezbędne do świadczenia usługi — dopóki takie
nie występują, żądanie zgody byłoby bezprzedmiotowe.

### 5. Ustawienia przeglądarki

Mimo że serwis obecnie nie korzysta z cookies, użytkownik może w dowolnym
momencie samodzielnie zarządzać ustawieniami cookies w swojej przeglądarce
internetowej — zablokować ich zapisywanie, usunąć istniejące pliki cookies
lub ustawić powiadomienia przy próbie ich zapisania. Instrukcje zarządzania
cookies dostępne są w ustawieniach/pomocy każdej popularnej przeglądarki
(Chrome, Firefox, Safari, Edge).

### 6. Kontakt

Pytania dotyczące niniejszej polityki cookies prosimy kierować na adres:
admicgarage@gmail.com.

Data ostatniej aktualizacji: [DO UZUPEŁNIENIA — data publikacji].

---

## 4. FORMULARZE I ZGODY

### 4.1 Informacja przy formularzu kontaktowym (oba formularze)

Krótki tekst do umieszczenia bezpośrednio przy formularzu (np. pod polem
wiadomości, nad przyciskiem wysyłki):

> Administratorem Twoich danych osobowych jest ADMIC GARAGE. Dane podane
> w formularzu przetwarzamy wyłącznie w celu udzielenia odpowiedzi na
> Twoje zapytanie. Szczegóły znajdziesz w [polityce prywatności](/polityka-prywatnosci).

### 4.2 Checkboxy — dokładna treść

Zgodnie z zasadą „żadnej zgody na wszystko w jednym checkboxie” — poniżej
rozdzielone warianty:

**Checkbox WYMAGANY** (formularz panelu na podstronie usługi — już
wdrożony w kodzie; rekomendowany również w formularzu pełnym na
`/kontakt`, gdzie obecnie go brakowało — dodany w ramach tej pracy):

> ☐ Wyrażam zgodę na przetwarzanie moich danych osobowych podanych
> w formularzu przez ADMIC GARAGE w celu udzielenia odpowiedzi na moje
> zapytanie, zgodnie z [polityką prywatności](/polityka-prywatnosci). *

*(Pole wymagane — formularz nie wysyła się bez zaznaczenia.)*

**Checkbox OPCJONALNY:**

Serwis nie zbiera obecnie żadnych danych, które wymagałyby dodatkowej,
opcjonalnej zgody (np. na przechowywanie danych dłużej niż to konieczne do
obsługi zapytania) — nie ma więc obecnie potrzeby dodawania opcjonalnego
checkboxa. **[DO UZUPEŁNIENIA, jeśli Administrator zdecyduje się np. na
budowanie bazy kontaktów do przyszłych ofert — wtedy potrzebny byłby
osobny checkbox, patrz niżej.]**

**Checkbox MARKETINGOWY:**

Serwis **nie wysyła newslettera ani ofert marketingowych** — nie ma więc
obecnie zastosowania. Gdyby Administrator chciał w przyszłości wysyłać
informacje handlowe (np. o promocjach), wymagany byłby osobny, **niepowiązany
z wysłaniem formularza**, checkbox o treści zbliżonej do:

> ☐ Wyrażam zgodę na otrzymywanie od ADMIC GARAGE informacji handlowych
> drogą elektroniczną (e-mail/SMS) zgodnie z ustawą o świadczeniu usług
> drogą elektroniczną oraz Prawem telekomunikacyjnym. Zgodę mogę wycofać
> w każdej chwili.

*(Do aktywowania wyłącznie w momencie faktycznego wdrożenia takiej
funkcjonalności — nie wcześniej. [DO WERYFIKACJI PRAWNEJ przed wdrożeniem.])*

---

## 5. BANER COOKIES

**Uwaga:** zgodnie z sekcją 3 („Polityka cookies”) serwis obecnie **nie
wymaga wyświetlania banera cookies**, ponieważ nie ustawia żadnych plików
cookies. Poniższe treści są przygotowane z wyprzedzeniem — do wdrożenia
dopiero w momencie, gdy na stronie pojawi się pierwsze narzędzie
wymagające zgody (np. Google Analytics).

**Tekst informacyjny:**

> Używamy plików cookies, aby zapewnić prawidłowe działanie strony oraz —
> za Twoją zgodą — do celów statystycznych. Możesz zaakceptować wszystkie
> cookies, odrzucić te niekonieczne lub dostosować swoje preferencje.

**Przyciski:**

- `Akceptuję wszystkie`
- `Odrzuć niekonieczne`
- `Ustawienia cookies`

**Treść panelu ustawień cookies:**

> Wybierz, na jakie kategorie plików cookies wyrażasz zgodę. Cookies
> niezbędne są zawsze aktywne, ponieważ zapewniają podstawowe działanie
> strony.

Proponowana struktura kategorii (do aktywacji wraz z pierwszym realnym
narzędziem w danej kategorii):

| Kategoria | Domyślny stan | Opis |
|---|---|---|
| Niezbędne | Zawsze aktywne, bez możliwości wyłączenia | Cookies konieczne do podstawowego działania strony (obecnie: brak takich cookies) |
| Analityczne / statystyczne | Wyłączone, wymaga zgody | Pomagają zrozumieć, jak użytkownicy korzystają ze strony (np. Google Analytics) |
| Marketingowe | Wyłączone, wymaga zgody | Służą do wyświetlania spersonalizowanych reklam (np. Meta Pixel) |
| Funkcjonalne | Wyłączone, wymaga zgody | Zapamiętują dodatkowe preferencje użytkownika |

Przyciski w panelu: `Zapisz preferencje`, `Akceptuj wszystkie`.

---

## 6. REGULAMIN

**Regulamin serwisu nie jest wymagany i nie został utworzony.**

Uzasadnienie: admic-garage.pl jest wyłącznie stroną
informacyjną/wizytówkową. Serwis nie prowadzi sprzedaży, nie umożliwia
rezerwacji online z płatnością, nie oferuje konta użytkownika ani żadnej
usługi świadczonej drogą elektroniczną w rozumieniu ustawy o świadczeniu
usług drogą elektroniczną, która wymagałaby regulaminu (art. 8 tej ustawy
dotyczy usługodawców świadczących usługi drogą elektroniczną — sam
formularz kontaktowy, bez dalszych funkcjonalności, zazwyczaj nie jest
kwalifikowany jako taka usługa, ale **[DO WERYFIKACJI PRAWNEJ dla pewności,
szczególnie jeśli Administrator planuje w przyszłości dodać rezerwacje
online, płatności lub konto klienta — wtedy regulamin stanie się
wymagany]**).

Jeżeli w przyszłości serwis zyska funkcje takie jak rezerwacja terminu
online, płatności, konto klienta lub inne usługi elektroniczne — należy
wówczas przygotować regulamin uwzględniający te funkcjonalności.

---

## 7. STOPKA — HTML

```html
<section class="made-by" id="madeby">
    <div class="container">
        <p>
            Strona stworzona przez
            <a href="https://www.reworkagency.pl" target="_blank" rel="noopener noreferrer">
                Rework Agency
            </a>
        </p>
    </div>
</section>
```

---

## 8. STOPKA — CSS

Twój oryginalny CSS wykorzystywał zmienne (`--gutter`, `--line`, `--bg`,
`--muted-2`, `--mono`), których obecny projekt admic-garage.pl **nie
definiuje** (strona jest zbudowana na Tailwind CSS z własnym systemem
tokenów kolorów, nie na customowych CSS custom properties o tych nazwach).
Zgodnie z Twoją instrukcją „popraw, jeśli trzeba” — poniższy CSS używa
realnych wartości z obecnego systemu wizualnego strony (ciemne tło
`#0a0b0d`, obramowania `#1a1d24`, przygaszony tekst `#8b909b`, niebieski
akcent `#2f6fed` — dokładnie te same, których używa reszta serwisu), oraz
bezpiecznego stosu fontów monospace systemowych (projekt nie ładuje
żadnego customowego fontu mono, więc nie dokładam nowego, zbędnego
importu). Rozmiar czcionki zmniejszyłem z 1.2rem do rozmiaru spójnego
z resztą stopki (pozostałe elementy stopki — copyright, link do polityki
prywatności — używają ok. 12px), żeby wizualnie pasowało, a nie
dominowało nad resztą stopki.

```css
#madeby.made-by {
  padding: 0.9rem 1.5rem;
  border-top: 1px solid #1a1d24;
  background: #0a0b0d;
  color: #8b909b;
  text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

#madeby.made-by .container {
  width: auto;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

#madeby.made-by p {
  margin: 0;
}

#madeby.made-by a {
  color: #5b8ff9;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.25s ease;
}

#madeby.made-by a:hover {
  color: rgba(91, 143, 249, 0.8);
}

@media (max-width: 480px) {
  #madeby.made-by {
    font-size: 0.68rem;
    letter-spacing: 0.06em;
  }
}
```

**Uwaga:** w rzeczywistym kodzie strony (Next.js + Tailwind) ten sam efekt
wdrożyłem jako komponent React ze stylami narzędziowymi Tailwind
(zachowując literalnie `class="made-by"` i `id="madeby"`, jak wymagałeś) —
patrz plik `src/components/layout/MadeBy.tsx` w projekcie. Powyższy,
czysty HTML/CSS to wersja przenośna, do wykorzystania również poza tym
konkretnym projektem.

---

## 9. LINKI W STOPCE I STRUKTURA PLIKÓW

### Rozmieszczenie w stopce

Najlepiej pasujące miejsce to istniejący dolny pasek stopki (obok
copyrightu), obok już istniejącego linku do polityki prywatności:

```
© 2026 ADMIC GARAGE · Kalwaria Zebrzydowska     Polityka prywatności · Polityka cookies
```

Regulamin **nie jest dodawany** do stopki, ponieważ nie jest wymagany
(patrz sekcja 6).

### Struktura plików/adresów

```
/polityka-prywatnosci     ✅ już istnieje w projekcie — treść zaktualizowana (sekcja 2)
/polityka-cookies         ✅ nowo utworzona w ramach tej pracy (sekcja 3)
/regulamin                — nie tworzony (nie jest wymagany)
```

### Kod linków HTML (odpowiednik w Next.js `<Link>`, wynik renderuje się jako zwykłe `<a href>`)

```html
<a href="/polityka-prywatnosci">Polityka prywatności</a>
<a href="/polityka-cookies">Polityka cookies</a>
```

---

## 10. CHECKLISTA WDROŻENIOWA

Rzeczy, które udało się jednoznacznie ustalić, zostały usunięte z poniższej
listy (adres e-mail, telefon, forma działalności, adres siedziby, NIP/REGON,
hosting — Vercel, dostawca poczty — Gmail/Google Ireland, dostawca wysyłki
formularza — Formspree już aktywny, okres przechowywania, mechanizm
transferu poza EOG, brak cookies/analytics — wszystko to opisane w
dokumentach powyżej).

```
[ ] imię i nazwisko administratora (jedyne pole nieuzupełnione w polityce prywatności)
[ ] dostawca domeny
[ ] data pierwszej publikacji polityk (obecnie wpisana: 18 września 2026 r. — zaktualizować przy realnej publikacji, jeśli inna)
[ ] potwierdzenie wdrożenia HTTPS na docelowym hostingu (Vercel włącza to domyślnie, ale warto zweryfikować po podłączeniu własnej domeny)
[ ] decyzja: czy i kiedy dodać Google Analytics / Google Ads — wtedy aktywuje się gotowy, wbudowany baner cookies (patrz sekcja 5 tego dokumentu)
[ ] umowy powierzenia przetwarzania danych (art. 28 RODO) z Formspree, Google, Vercel — Formspree i Google udostępniają gotowe DPA do zaakceptowania
```

---

## 11. ELEMENTY WYMAGAJĄCE WERYFIKACJI PRAWNEJ

1. Dobór podstaw prawnych przetwarzania danych z formularza (art. 6 ust. 1
   lit. b vs. lit. a RODO) — w zależności od faktycznego charakteru
   kontaktu (przedumowny vs. czysto informacyjny).
2. Ostateczny okres przechowywania danych z zapytań — powiązanie
   z ewentualną odpowiedzialnością za wykonane usługi (rękojmia/gwarancja).
3. Konieczność zawarcia umów powierzenia przetwarzania danych (art. 28
   RODO) z dostawcami hostingu, poczty i przyszłej wysyłki formularza —
   po ich ostatecznym wyborze.
4. Ewentualne transfery danych poza EOG i wymagany mechanizm zgodności
   (np. standardowe klauzule umowne) — zależnie od wybranych dostawców.
5. Potwierdzenie, czy formularz kontaktowy (bez dalszych funkcjonalności)
   kwalifikuje się jako „usługa świadczona drogą elektroniczną” wymagająca
   regulaminu w rozumieniu ustawy o świadczeniu usług drogą elektroniczną.
6. Treść checkboxa zgody marketingowej — do aktywacji i weryfikacji dopiero
   w momencie faktycznego wdrożenia newslettera/wysyłki ofert.
7. Zgodność całości dokumentów z aktualnym stanem prawnym w dniu
   publikacji (przepisy i wytyczne UODO mogą ulec zmianie).
