import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LegalH2, LegalP, LegalUl, LegalLi, LegalTable, ToDo } from "@/components/legal/LegalPrimitives";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Polityka prywatności",
  description:
    "Zasady przetwarzania danych osobowych w serwisie ADMIC GARAGE — formularze kontaktowe, cookies i narzędzia Google (za zgodą), prawa użytkownika, kontakt w sprawach danych osobowych.",
  path: "/polityka-prywatnosci",
});

// Treść uzupełniona przez administratora (dane firmy, okresy przechowywania,
// odbiorcy, zabezpieczenia). Dokument odpowiada faktycznemu stanowi serwisu:
// - formularze wysyłają dane przez Formspree (sekcje 5–7),
// - strona /carplay-i-kodowanie-bmw zbiera dodatkowe pola (model, rocznik, iDrive,
//   VIN, parametry UTM) — sekcja 3,
// - w site.ts są aktywne identyfikatory Google Analytics 4 i Google Ads; tagi
//   ładują się wyłącznie po zgodzie z banera — sekcje 3, 4, 6, 10.
export default function PolitykaPrywatnosci() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "Polityka prywatności" }]} />

      <section className="py-16 sm:py-20">
        <Container className="max-w-2xl">
          <h1 className="font-display text-3xl font-semibold text-paper-100">Polityka prywatności</h1>
          <p className="mt-3 text-sm text-paper-500">
            Ten dokument nie stanowi porady prawnej.
          </p>

          <LegalH2>1. Administrator danych</LegalH2>
          <LegalP>
            Administratorem danych osobowych przetwarzanych w związku z korzystaniem z serwisu{" "}
            {site.url} jest:
          </LegalP>
          <LegalP>
            <ToDo>Imię i Nazwisko</ToDo>
            <br />
            prowadzący/a działalność nierejestrowaną pod marką ADMIC GARAGE
            <br />
            Adres: Ogrodowa 6A, {site.base.city}
            <br />
            NIP: Brak (działalność nierejestrowana na podstawie art. 5 ustawy Prawo przedsiębiorców)
            <br />
            REGON: Brak
          </LegalP>
          <LegalP>zwany/a dalej „Administratorem”.</LegalP>

          <LegalH2>2. Kontakt w sprawach danych osobowych</LegalH2>
          <LegalP>Z Administratorem można skontaktować się:</LegalP>
          <LegalUl>
            <LegalLi>e-mail: {site.email}</LegalLi>
            <LegalLi>telefon: {site.phone}</LegalLi>
          </LegalUl>
          <LegalP>
            Administrator nie powołał Inspektora Ochrony Danych — kontakt w sprawach ochrony
            danych odbywa się bezpośrednio z Administratorem.
          </LegalP>

          <LegalH2>3. Jakie dane przetwarzamy i skąd pochodzą</LegalH2>
          <LegalP>
            Dane z formularzy pochodzą bezpośrednio od użytkownika, który dobrowolnie podaje je
            w formularzu kontaktowym. Dodatkowo — wyłącznie po wyrażeniu zgody w banerze cookies —
            narzędzia Google (Analytics 4 i Google Ads) mogą zbierać dane techniczne o korzystaniu
            z serwisu (patrz niżej oraz{" "}
            <a href="/polityka-cookies" className="text-accent-light hover:text-accent">polityka cookies</a>
            ). Serwis nie pozyskuje danych z innych źródeł.
          </LegalP>
          <LegalTable
            headers={["Dane", "Formularz pełny (/kontakt)", "Panel na podstronie usługi", "Strona /carplay-i-kodowanie-bmw"]}
            rows={[
              ["Imię (i nazwisko)", "✅", "✅", "✅"],
              ["Adres e-mail", "—", "✅", "telefon lub e-mail (jedno z dwojga)"],
              ["Numer telefonu", "✅", "✅", "telefon lub e-mail (jedno z dwojga)"],
              ["Rodzaj usługi", "✅", "— (wynika z kontekstu podstrony)", "✅ (CarPlay i/lub kodowanie)"],
              ["Marka i model samochodu", "✅", "—", "✅ (model BMW)"],
              ["Rocznik samochodu", "—", "—", "✅"],
              ["Wersja iDrive i wersja oprogramowania z menu", "—", "—", "✅ (opcjonalnie)"],
              ["Numer VIN", "—", "—", "✅ (opcjonalnie)"],
              ["Treść wiadomości", "✅ (opcjonalnie)", "✅ (opcjonalnie)", "✅ (opcjonalnie)"],
              ["Parametry linku reklamowego (UTM: źródło, medium, kampania itp.) i adres podstrony", "—", "—", "✅ (jeśli wejście z linku z takimi parametrami)"],
            ]}
          />
          <LegalP>
            Numer VIN identyfikuje konkretny pojazd i może pozwalać pośrednio zidentyfikować jego
            właściciela — podanie go jest dobrowolne i służy wyłącznie sprawdzeniu wyposażenia
            samochodu na potrzeby zapytania.
          </LegalP>
          <LegalP>
            Dane zbierane przez narzędzia Google po zgodzie (cookies i podobne technologie):
            identyfikatory online, adres IP, informacje o urządzeniu i przeglądarce, odwiedzone
            podstrony oraz zdarzenia na stronie (np. kliknięcie numeru telefonu, wysłanie
            formularza — bez treści formularza, imienia, telefonu, e-maila i VIN-u).
          </LegalP>
          <LegalP>
            Jeżeli użytkownik skontaktuje się bezpośrednio telefonicznie, przez WhatsApp lub
            e-mailem, Administrator przetwarza dane podane w takiej rozmowie/korespondencji na
            tych samych zasadach ochrony danych.
          </LegalP>

          <LegalH2>4. Cele i podstawy prawne przetwarzania</LegalH2>
          <LegalTable
            headers={["Cel", "Podstawa prawna"]}
            rows={[
              [
                "Udzielenie odpowiedzi na zapytanie przesłane przez formularz, przygotowanie wyceny",
                "art. 6 ust. 1 lit. b RODO — działania podejmowane na żądanie osoby, której dane dotyczą, przed zawarciem umowy",
              ],
              [
                "Kontakt w celu realizacji usługi po jej ustaleniu",
                "art. 6 ust. 1 lit. b RODO — wykonanie/przygotowanie umowy",
              ],
              [
                "Ewentualne dochodzenie lub obrona przed roszczeniami",
                "art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes Administratora",
              ],
              [
                "Statystyki odwiedzin serwisu (Google Analytics 4) — tylko po zgodzie na cookies analityczne",
                "art. 6 ust. 1 lit. a RODO (zgoda) oraz art. 173 Prawa telekomunikacyjnego",
              ],
              [
                "Pomiar skuteczności reklam (Google Ads) — tylko po zgodzie na cookies marketingowe",
                "art. 6 ust. 1 lit. a RODO (zgoda) oraz art. 173 Prawa telekomunikacyjnego",
              ],
            ]}
          />
          <LegalP>
            Zgodę na cookies analityczne i marketingowe można w każdej chwili zmienić lub wycofać
            przez link „Ustawienia cookies” w stopce serwisu. Wycofanie zgody nie wpływa na
            zgodność z prawem przetwarzania dokonanego przed jej wycofaniem.
          </LegalP>

          <LegalH2>5. Okres przechowywania danych</LegalH2>
          <LegalP>
            Formularz kontaktowy ma podłączoną aktywną wysyłkę (patrz sekcja 6) — dane z zapytania
            są przechowywane w skrzynce pocztowej Administratora przez okres prowadzenia
            korespondencji oraz ustaleń dotyczących usługi, a następnie przez okres 12 miesięcy na
            potrzeby ewentualnego ponownego kontaktu lub do czasu upływu okresu przedawnienia
            potencjalnych roszczeń. Dotyczy to także dodatkowych pól formularza na stronie
            /carplay-i-kodowanie-bmw (model, rocznik, iDrive, VIN, UTM).
          </LegalP>
          <LegalP>
            Dane zbierane przez Google Analytics 4 i Google Ads (po zgodzie) są przechowywane przez
            okres wynikający z ustawień Administratora w tych narzędziach oraz z czasu życia
            poszczególnych cookies (patrz polityka cookies){" "}
            <ToDo>okres przechowywania danych w GA4 ustawiony w koncie Google Analytics</ToDo>.
          </LegalP>

          <LegalH2>6. Odbiorcy danych i podmioty przetwarzające</LegalH2>
          <LegalP>
            Formularz kontaktowy przekazuje dane do skrzynki e-mail Administratora za
            pośrednictwem usługi{" "}
            <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-accent">
              Formspree
            </a>{" "}
            (Formspree, Inc.) — to aktywna integracja, a nie plan na przyszłość. Odbiorcami
            danych w imieniu Administratora są wyłącznie podmioty zapewniające obsługę techniczną
            serwisu:
          </LegalP>
          <LegalUl>
            <LegalLi><strong className="text-paper-100">Formspree, Inc.</strong> (USA) — odbiera i przekazuje dalej dane z formularza kontaktowego.</LegalLi>
            <LegalLi><strong className="text-paper-100">Google Ireland Limited</strong> — dostawca usługi pocztowej (Gmail), na którą trafiają wiadomości z formularza.</LegalLi>
            <LegalLi><strong className="text-paper-100">Vercel Inc.</strong> — dostawca hostingu i infrastruktury serwisu.</LegalLi>
            <LegalLi><strong className="text-paper-100">Google Ireland Limited</strong> (oraz Google LLC, USA) — dostawca narzędzi Google Analytics 4 i Google Ads (statystyki i pomiar reklam); dane trafiają do Google wyłącznie po wyrażeniu zgody w banerze cookies.</LegalLi>
          </LegalUl>
          <LegalP>
            Z podmiotami przetwarzającymi dane w imieniu Administratora zostaną zawarte umowy
            powierzenia przetwarzania danych osobowych zgodne z art. 28 RODO.
          </LegalP>

          <LegalH2>7. Przekazywanie danych poza Europejski Obszar Gospodarczy (EOG)</LegalH2>
          <LegalP>
            Formspree, Inc., Vercel Inc. i Google LLC (w zakresie narzędzi Google Analytics 4 i Google Ads) mają siedzibę w USA lub mogą przetwarzać dane w USA. Formspree deklaruje zgodność
            z RODO i opiera się na standardowych klauzulach umownych (SCC) jako mechanizmie
            transferu danych, a także posiada certyfikat SOC 2 Type II. W przypadku wszystkich
            wymienionych dostawców (Google, Vercel, Formspree) przekazywanie danych do państw
            trzecich odbywa się w oparciu o odpowiednie mechanizmy prawne, takie jak decyzje
            Komisji Europejskiej stwierdzające odpowiedni poziom ochrony (np. EU-US Data Privacy
            Framework) lub Standardowe Klauzule Umowne (SCC).
          </LegalP>

          <LegalH2>8. Prawa użytkownika</LegalH2>
          <LegalP>Osobie, której dane dotyczą, przysługuje prawo do:</LegalP>
          <LegalUl>
            <LegalLi>dostępu do swoich danych,</LegalLi>
            <LegalLi>sprostowania (poprawienia) danych,</LegalLi>
            <LegalLi>usunięcia danych („prawo do bycia zapomnianym”),</LegalLi>
            <LegalLi>ograniczenia przetwarzania,</LegalLi>
            <LegalLi>przenoszenia danych,</LegalLi>
            <LegalLi>wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie Administratora,</LegalLi>
            <LegalLi>cofnięcia zgody w dowolnym momencie (jeśli przetwarzanie odbywa się na podstawie zgody) — m.in. przez link „Ustawienia cookies” w stopce serwisu.</LegalLi>
          </LegalUl>
          <LegalP>Realizacja powyższych praw odbywa się poprzez kontakt na adres: {site.email}.</LegalP>

          <LegalH2>9. Prawo do wniesienia skargi</LegalH2>
          <LegalP>
            Użytkownikowi przysługuje prawo wniesienia skargi do organu nadzorczego — Prezesa
            Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa), jeżeli uzna, że
            przetwarzanie jego danych narusza przepisy RODO.
          </LegalP>

          <LegalH2>10. Profilowanie</LegalH2>
          <LegalP>
            Serwis nie stosuje zautomatyzowanego podejmowania decyzji wywołujących skutki prawne
            wobec użytkownika. Serwis korzysta z Google Analytics 4 (statystyki) i Google Ads
            (pomiar skuteczności reklam), ale tagi tych narzędzi ładują się wyłącznie po
            wyrażeniu odpowiedniej zgody w banerze cookies — bez zgody nie jest wysyłane żadne
            żądanie do serwerów Google. Szczegóły i lista cookies:{" "}
            <a href="/polityka-cookies" className="text-accent-light hover:text-accent">polityka cookies</a>.
          </LegalP>
          <LegalP>
            Zakres działania Google Ads (np. ewentualne listy odbiorców reklam) zależy od ustawień
            konta Administratora{" "}
            <ToDo>potwierdź, czy konto Google Ads używa list remarketingowych lub Customer Match — jeśli tak, dopisz to tutaj</ToDo>.
          </LegalP>

          <LegalH2>11. Zabezpieczenia danych</LegalH2>
          <LegalP>
            Administrator stosuje odpowiednie środki techniczne i organizacyjne w celu ochrony
            danych osobowych, w tym szyfrowanie połączenia za pomocą certyfikatu SSL (HTTPS) oraz
            dostęp do skrzynki odbiorczej zabezpieczony uwierzytelnianiem dwuskładnikowym.
          </LegalP>

          <LegalH2>12. Zmiany polityki prywatności</LegalH2>
          <LegalP>
            Aktualna wersja polityki jest zawsze dostępna pod adresem: {site.url}/polityka-prywatnosci.
          </LegalP>
          <LegalP>
            Data ostatniej aktualizacji: <ToDo>data wdrożenia tych zmian (poprzednia wersja: 18 września 2026 r.)</ToDo>
          </LegalP>
        </Container>
      </section>
    </PageShell>
  );
}
