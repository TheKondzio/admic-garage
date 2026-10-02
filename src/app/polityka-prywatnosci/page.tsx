import type { Metadata } from "next";
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

// Treść uzupełniona przez administratora (dane firmy, okresy przechowywania,
// odbiorcy, zabezpieczenia). Jedna korekta względem dostarczonego tekstu:
// formularz kontaktowy ma już podłączoną, aktywną wysyłkę przez Formspree
// (nie Resend "po wdrożeniu", jak zakładał wcześniejszy szkic) — poprawione
// w sekcjach 5–7, żeby dokument odpowiadał faktycznemu stanowi serwisu.
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
            ]}
          />

          <LegalH2>5. Okres przechowywania danych</LegalH2>
          <LegalP>
            Formularz kontaktowy ma podłączoną aktywną wysyłkę (patrz sekcja 6) — dane z zapytania
            są przechowywane w skrzynce pocztowej Administratora przez okres prowadzenia
            korespondencji oraz ustaleń dotyczących usługi, a następnie przez okres 12 miesięcy na
            potrzeby ewentualnego ponownego kontaktu lub do czasu upływu okresu przedawnienia
            potencjalnych roszczeń.
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
          </LegalUl>
          <LegalP>
            Z podmiotami przetwarzającymi dane w imieniu Administratora zostaną zawarte umowy
            powierzenia przetwarzania danych osobowych zgodne z art. 28 RODO.
          </LegalP>

          <LegalH2>7. Przekazywanie danych poza Europejski Obszar Gospodarczy (EOG)</LegalH2>
          <LegalP>
            Formspree, Inc. i Vercel Inc. mają siedzibę w USA. Formspree deklaruje zgodność
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
            <LegalLi>cofnięcia zgody w dowolnym momencie (jeśli przetwarzanie odbywa się na podstawie zgody).</LegalLi>
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
            Serwis nie stosuje profilowania ani zautomatyzowanego podejmowania decyzji
            wywołujących skutki prawne wobec użytkownika. Serwis nie wykorzystuje obecnie żadnych
            narzędzi analitycznych ani marketingowych (np. Google Analytics, Google Ads) — jeśli
            zostaną wdrożone w przyszłości, niniejsza polityka oraz{" "}
            <a href="/polityka-cookies" className="text-accent-light hover:text-accent">polityka cookies</a>{" "}
            zostaną zaktualizowane przed ich uruchomieniem.
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
          <LegalP>Data ostatniej aktualizacji: 18 września 2026 r.</LegalP>
        </Container>
      </section>
    </PageShell>
  );
}
