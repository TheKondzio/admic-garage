import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LegalH2, LegalP, LegalUl, LegalLi, LegalTable, ToDo } from "@/components/legal/LegalPrimitives";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Zasady przetwarzania danych osobowych w serwisie ADMIC GARAGE — formularze kontaktowe, prawa użytkownika, kontakt w sprawach danych osobowych.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: true, follow: true },
};

// Treść oparta wyłącznie na faktycznym audycie kodu strony (brak cookies,
// brak analytics, formularz kontaktowy bez podłączonego backendu wysyłki).
// Miejsca oznaczone <ToDo> wymagają uzupełnienia przez administratora —
// nie są zgadywane. Nie stanowi porady prawnej — patrz nota na dole strony.
export default function PolitykaPrywatnosci() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "Polityka prywatności" }]} />

      <section className="py-16 sm:py-20">
        <Container className="max-w-2xl">
          <h1 className="font-display text-3xl font-semibold text-paper-100">Polityka prywatności</h1>
          <p className="mt-3 text-sm text-paper-500">
            Ten dokument nie stanowi porady prawnej. Fragmenty oznaczone jako wymagające
            weryfikacji prawnej powinny zostać sprawdzone przez prawnika przed publikacją.
          </p>

          <LegalH2>1. Administrator danych</LegalH2>
          <LegalP>
            Administratorem danych osobowych przetwarzanych w związku z korzystaniem z serwisu{" "}
            {site.url} jest:
          </LegalP>
          <LegalP>
            <strong className="text-paper-100">ADMIC GARAGE</strong>
            <br />
            <ToDo>pełna nazwa firmy / imię i nazwisko przedsiębiorcy zgodnie z wpisem do CEIDG/KRS</ToDo>
            <br />
            <ToDo>adres siedziby</ToDo>
            <br />
            NIP: <ToDo>NIP</ToDo>
            <br />
            REGON: <ToDo>REGON</ToDo>
          </LegalP>
          <LegalP>zwany dalej „Administratorem”.</LegalP>

          <LegalH2>2. Kontakt w sprawach danych osobowych</LegalH2>
          <LegalP>Z Administratorem można skontaktować się:</LegalP>
          <LegalUl>
            <LegalLi>e-mail: {site.email}</LegalLi>
            <LegalLi>telefon: {site.phone}</LegalLi>
          </LegalUl>
          <LegalP>
            Administrator nie powołał Inspektora Ochrony Danych — kontakt w sprawach ochrony
            danych odbywa się bezpośrednio z Administratorem.{" "}
            <span className="text-paper-500">
              (Wymaga weryfikacji prawnej: potwierdzić, czy przy skali działalności obowiązek
              powołania IOD nie ma zastosowania.)
            </span>
          </LegalP>

          <LegalH2>3. Jakie dane przetwarzamy i skąd pochodzą</LegalH2>
          <LegalP>
            Dane przetwarzane w serwisie pochodzą wyłącznie bezpośrednio od użytkownika, który
            dobrowolnie podaje je w formularzu kontaktowym. Serwis nie pozyskuje danych z innych
            źródeł.
          </LegalP>
          <LegalTable
            headers={["Dane", "Formularz pełny (/kontakt)", "Panel na podstronie usługi"]}
            rows={[
              ["Imię (i nazwisko)", "✅", "✅"],
              ["Adres e-mail", "—", "✅"],
              ["Numer telefonu", "✅", "✅"],
              ["Rodzaj usługi", "✅", "— (wynika z kontekstu podstrony)"],
              ["Marka i model samochodu", "✅", "—"],
              ["Treść wiadomości", "✅ (opcjonalnie)", "✅ (opcjonalnie)"],
            ]}
          />
          <LegalP>
            Jeżeli użytkownik skontaktuje się bezpośrednio telefonicznie, przez WhatsApp lub
            e-mailem (z pominięciem formularza), Administrator przetwarza dane podane w takiej
            korespondencji na tych samych zasadach ochrony danych.
          </LegalP>

          <LegalH2>4. Cele i podstawy prawne przetwarzania</LegalH2>
          <LegalTable
            headers={["Cel", "Podstawa prawna"]}
            rows={[
              [
                "Udzielenie odpowiedzi na zapytanie przesłane przez formularz, przygotowanie wyceny",
                "art. 6 ust. 1 lit. b RODO — działania na żądanie osoby, której dane dotyczą, przed zawarciem umowy",
              ],
              [
                "Kontakt w celu realizacji usługi po jej ustaleniu",
                "art. 6 ust. 1 lit. b RODO — wykonanie/przygotowanie umowy",
              ],
              [
                "Ewentualne dochodzenie lub obrona przed roszczeniami",
                "art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes Administratora",
              ],
            ]}
          />
          <LegalP>
            <span className="text-paper-500">
              Wymaga weryfikacji prawnej: potwierdzić dobór podstaw prawnych, w szczególności czy
              w przypadku kontaktu wyłącznie informacyjnego nie powinna zostać zastosowana
              podstawa zgody (art. 6 ust. 1 lit. a RODO) obok lub zamiast lit. b.
            </span>
          </LegalP>

          <LegalH2>5. Okres przechowywania danych</LegalH2>
          <LegalP>
            Dane z formularza są przechowywane w skrzynce pocztowej Administratora oraz
            (przejściowo, w celu dostarczenia wiadomości) w systemie dostawcy formularza —
            Formspree — przez okres <ToDo>okres przechowywania — do ustalenia przez administratora, najlepiej z prawnikiem</ToDo>.
          </LegalP>

          <LegalH2>6. Odbiorcy danych</LegalH2>
          <LegalP>
            Dane przesłane przez formularz kontaktowy trafiają do skrzynki e-mail Administratora
            za pośrednictwem usługi{" "}
            <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-accent">
              Formspree
            </a>{" "}
            (Formspree, Inc.), która pełni rolę podmiotu przetwarzającego — odbiera zgłoszenie
            z formularza i przekazuje je e-mailem, bez samodzielnego wykorzystywania danych do
            innych celów. Pośrednio odbiorcą jest też dostawca skrzynki pocztowej Administratora
            ({site.email}) — <ToDo>czy to zwykłe konto Gmail, czy Google Workspace dla firm</ToDo>.
          </LegalP>

          <LegalH2>7. Podmioty przetwarzające dane</LegalH2>
          <LegalUl>
            <LegalLi>
              <strong className="text-paper-100">Formspree, Inc.</strong> (USA) — odbiera i
              przekazuje dalej dane z formularza kontaktowego. Formspree deklaruje zgodność z
              RODO i opiera się na standardowych klauzulach umownych (SCC) jako mechanizmie
              transferu danych; posiada certyfikat SOC 2 Type II.{" "}
              <span className="text-paper-500">
                (Wymaga weryfikacji prawnej: potwierdzenie aktualnych warunków przetwarzania
                Formspree i ewentualne podpisanie z nimi umowy powierzenia — Formspree udostępnia
                gotową umowę DPA na żądanie.)
              </span>
            </LegalLi>
            <LegalLi>Dostawca hostingu serwisu: <ToDo>hosting</ToDo></LegalLi>
            <LegalLi>Dostawca domeny: <ToDo>domena</ToDo></LegalLi>
            <LegalLi>Dostawca poczty e-mail Administratora: <ToDo>poczta e-mail</ToDo></LegalLi>
          </LegalUl>
          <LegalP>
            Z każdym podmiotem przetwarzającym dane w imieniu Administratora powinna zostać
            zawarta umowa powierzenia przetwarzania danych osobowych zgodna z art. 28 RODO.
          </LegalP>

          <LegalH2>8. Przekazywanie danych poza Europejski Obszar Gospodarczy (EOG)</LegalH2>
          <LegalP>
            Formspree, Inc. ma siedzibę w USA i przetwarza dane na infrastrukturze Amazon Web
            Services zlokalizowanej w Stanach Zjednoczonych — oznacza to, że dane podane
            w formularzu (imię, telefon, ewentualnie e-mail i treść wiadomości) są przekazywane
            poza EOG. Formspree wskazuje standardowe klauzule umowne (SCC) jako podstawę takiego
            transferu.{" "}
            <span className="text-paper-500">
              (Wymaga weryfikacji prawnej: ocena wystarczalności tego mechanizmu transferu po
              wyroku Schrems II, ewentualnie rozważenie udziału Formspree w mechanizmie EU-US
              Data Privacy Framework, jeśli dotyczy.)
            </span>
          </LegalP>


          <LegalH2>9. Prawa użytkownika</LegalH2>
          <LegalP>Osobie, której dane dotyczą, przysługuje prawo do:</LegalP>
          <LegalUl>
            <LegalLi>dostępu do swoich danych,</LegalLi>
            <LegalLi>sprostowania (poprawienia) danych,</LegalLi>
            <LegalLi>usunięcia danych,</LegalLi>
            <LegalLi>ograniczenia przetwarzania,</LegalLi>
            <LegalLi>przenoszenia danych,</LegalLi>
            <LegalLi>wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie Administratora,</LegalLi>
            <LegalLi>cofnięcia zgody w dowolnym momencie, jeżeli przetwarzanie odbywa się na podstawie zgody — bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem.</LegalLi>
          </LegalUl>
          <LegalP>Realizacja powyższych praw odbywa się poprzez kontakt na adres {site.email}.</LegalP>

          <LegalH2>10. Prawo do wniesienia skargi</LegalH2>
          <LegalP>
            Użytkownikowi przysługuje prawo wniesienia skargi do organu nadzorczego — Prezesa
            Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa, jeżeli uzna, że
            przetwarzanie jego danych narusza przepisy RODO.
          </LegalP>

          <LegalH2>11. Profilowanie i zautomatyzowane podejmowanie decyzji</LegalH2>
          <LegalP>
            Serwis nie stosuje profilowania ani zautomatyzowanego podejmowania decyzji
            wywołujących skutki prawne wobec użytkownika — potwierdza to brak narzędzi
            analitycznych, śledzących i marketingowych w kodzie strony.
          </LegalP>

          <LegalH2>12. Zabezpieczenia danych</LegalH2>
          <LegalP>
            Administrator stosuje odpowiednie środki techniczne i organizacyjne w celu ochrony
            danych osobowych, w tym połączenie szyfrowane (HTTPS){" "}
            <ToDo>potwierdzenie wdrożenia certyfikatu SSL na docelowym hostingu</ToDo> oraz
            ograniczenie dostępu do danych wyłącznie do osób upoważnionych.
          </LegalP>

          <LegalH2>13. Formularze kontaktowe — szczegóły</LegalH2>
          <LegalP>
            Serwis udostępnia dwa formularze kontaktowe opisane w sekcji 3 powyżej. Pola
            oznaczone jako wymagane muszą zostać wypełnione, aby formularz mógł zostać wysłany;
            pole „wiadomość” jest w obu formularzach opcjonalne. Wysłanie formularza wymaga
            dodatkowo zaznaczenia checkboxa zgody na przetwarzanie danych w celu udzielenia
            odpowiedzi.
          </LegalP>

          <LegalH2>14. Komunikacja e-mailowa</LegalH2>
          <LegalP>
            Jeżeli użytkownik napisze bezpośrednio na adres {site.email} (z pominięciem
            formularza), jego adres e-mail oraz treść wiadomości będą przetwarzane w celu
            udzielenia odpowiedzi, na podstawie art. 6 ust. 1 lit. b lub f RODO.
          </LegalP>

          <LegalH2>15. Analityka i statystyki</LegalH2>
          <LegalP>
            Serwis nie wykorzystuje żadnych narzędzi analitycznych ani statystycznych (np. Google
            Analytics) — potwierdza to audyt kodu źródłowego. W razie wdrożenia takich narzędzi
            w przyszłości, niniejsza polityka oraz{" "}
            <Link href="/polityka-cookies" className="text-accent-light hover:text-accent">
              polityka cookies
            </Link>{" "}
            zostaną zaktualizowane przed ich uruchomieniem.
          </LegalP>

          <LegalH2>16. Zewnętrzne usługi i integracje</LegalH2>
          <LegalP>
            Aktualnie serwis wykorzystuje jedną zewnętrzną integrację: Formspree, do obsługi
            formularza kontaktowego (patrz sekcje 6–8). Poza tym korzysta wyłącznie z
            samodzielnie hostowanych zasobów (fonty ładowane lokalnie przez Next.js, brak
            osadzonych map, filmów z YouTube/Vimeo, wtyczek społecznościowych, reCAPTCHA ani
            systemów płatności). Ewentualne przyszłe integracje (np. Google Analytics, Google
            Ads) zostaną opisane w zaktualizowanej wersji niniejszej polityki przed ich
            wdrożeniem.
          </LegalP>

          <LegalH2>17. Kontakt w sprawach ochrony danych</LegalH2>
          <LegalP>
            We wszystkich sprawach związanych z przetwarzaniem danych osobowych prosimy o kontakt:{" "}
            {site.email} lub telefonicznie: {site.phone}.
          </LegalP>

          <LegalH2>18. Zmiany polityki prywatności</LegalH2>
          <LegalP>
            Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej polityce
            prywatności, w szczególności w związku ze zmianami technologii wykorzystywanych
            w serwisie, przepisów prawa lub sposobu funkcjonowania formularzy kontaktowych.
            Aktualna wersja polityki jest zawsze dostępna pod tym adresem.
          </LegalP>
          <LegalP>
            Data ostatniej aktualizacji: <ToDo>data publikacji</ToDo>
          </LegalP>
        </Container>
      </section>
    </PageShell>
  );
}
