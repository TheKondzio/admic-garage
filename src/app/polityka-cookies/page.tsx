import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LegalH2, LegalP, LegalUl, LegalLi, LegalTable, ToDo } from "@/components/legal/LegalPrimitives";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Polityka cookies",
  description:
    "Informacje o plikach cookies wykorzystywanych w serwisie ADMIC GARAGE (Google Analytics 4 i Google Ads — wyłącznie za zgodą) oraz o zmianie zgody.",
  path: "/polityka-cookies",
});

// Treść odpowiada stanowi faktycznemu: w site.ts są aktywne identyfikatory
// Google Analytics 4 i Google Ads, a tagi Google ładują się WYŁĄCZNIE po zgodzie
// z banera (components/cookies/). Zgodę można zmienić linkiem „Ustawienia cookies”
// w stopce. Nazwy i czasy życia cookies pochodzą z oficjalnego zestawienia Google
// (https://business.safety.google/adscookies/) — nie są zgadywane.
export default function PolitykaCookies() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "Polityka cookies" }]} />

      <section className="py-16 sm:py-20">
        <Container className="max-w-2xl">
          <h1 className="font-display text-3xl font-semibold text-paper-100">Polityka cookies</h1>
          <p className="mt-3 text-sm text-paper-500">
            Ten dokument nie stanowi porady prawnej. Fragmenty wymagające weryfikacji prawnej
            zostały odpowiednio oznaczone.
          </p>

          <LegalH2>1. Czym są cookies</LegalH2>
          <LegalP>
            Cookies (ciasteczka) to małe pliki tekstowe zapisywane przez przeglądarkę internetową
            na urządzeniu użytkownika podczas odwiedzania strony internetowej. Wykorzystywane są
            zwykle do zapamiętywania preferencji użytkownika, utrzymywania sesji lub zbierania
            anonimowych statystyk ruchu.
          </LegalP>

          <LegalH2>2. Jakie cookies wykorzystuje serwis {site.url}</LegalH2>
          <LegalP>
            <strong className="text-paper-100">Bez Twojej zgody serwis nie ustawia cookies
            analitycznych ani marketingowych</strong> i nie wysyła żadnych żądań do serwerów Google.
            Zgodę (analityczną i/lub marketingową) wyrażasz w banerze przy pierwszej wizycie. Zapisujemy
            ją w pamięci przeglądarki (localStorage), a nie w cookie.
          </LegalP>
          <LegalP>
            Po wyrażeniu zgody ładujemy znacznik Google (gtag.js), który — zależnie od wybranych
            kategorii — może ustawiać poniższe cookies. Nazwy i czasy życia podajemy za oficjalnym
            zestawieniem Google ({" "}
            <a
              href="https://business.safety.google/adscookies/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light hover:text-accent"
            >
              business.safety.google/adscookies
            </a>
            ); Google może je zmieniać.
          </LegalP>
          <LegalTable
            headers={["Nazwa", "Dostawca", "Cel", "Rodzaj", "Okres przechowywania"]}
            rows={[
              ["_ga", "Google", "Statystyki odwiedzin (Google Analytics 4) — rozróżnianie użytkowników", "Analityczne (za zgodą)", "2 lata"],
              ["_ga_<identyfikator>", "Google", "Statystyki odwiedzin (Google Analytics 4) — stan sesji", "Analityczne (za zgodą)", "2 lata"],
              ["_gcl_au", "Google", "Pomiar skuteczności reklam (Google Ads)", "Marketingowe (za zgodą)", "90 dni"],
              ["_gcl_aw", "Google", "Pomiar skuteczności reklam — zapamiętanie kliknięcia w reklamę (gdy adres zawiera identyfikator kliknięcia)", "Marketingowe (za zgodą)", "90 dni"],
            ]}
          />
          <LegalP>
            Google może w związku z tymi narzędziami ustawiać również inne cookies (np. należące do
            domen google.com / doubleclick.net, takie jak IDE — wg Google 13 miesięcy w EOG). Pełny,
            aktualny wykaz prowadzi Google pod adresem podanym wyżej.
          </LegalP>
          <LegalP>
            Cookies niezbędne: serwis nie ustawia własnych cookies niezbędnych do działania
            publicznej części strony. Panel administracyjny (/admin, dla zalogowanych redaktorów)
            używa cookies sesji logowania.
          </LegalP>

          <LegalH2>3. Zgoda użytkownika i jej zmiana</LegalH2>
          <LegalP>
            Przy pierwszej wizycie wyświetlamy baner z trzema równorzędnymi opcjami: zaakceptowanie
            wszystkich cookies, odrzucenie niekoniecznych albo dostosowanie preferencji. Kategorie
            opcjonalne są domyślnie wyłączone. Brak zgody nie ogranicza korzystania z serwisu.
          </LegalP>
          <LegalP>
            Swoją decyzję możesz w każdej chwili zmienić lub wycofać, klikając „Ustawienia cookies”
            w stopce serwisu. Po wycofaniu zgody usuń także istniejące cookies w ustawieniach
            przeglądarki (patrz sekcja 4) — wygasają one samoczynnie po okresach podanych w tabeli.
          </LegalP>

          <LegalH2>4. Ustawienia przeglądarki</LegalH2>
          <LegalP>
            Niezależnie od banera możesz samodzielnie zarządzać cookies w ustawieniach przeglądarki
            — zablokować ich zapisywanie, usunąć istniejące pliki lub ustawić powiadomienia przy
            próbie ich zapisania. Instrukcje znajdziesz w pomocy przeglądarki (Chrome, Firefox,
            Safari, Edge).
          </LegalP>

          <LegalH2>5. Kontakt</LegalH2>
          <LegalP>
            Pytania dotyczące niniejszej polityki cookies prosimy kierować na adres: {site.email}.
          </LegalP>
          <LegalP>
            Data ostatniej aktualizacji: <ToDo>data wdrożenia tej wersji</ToDo>
          </LegalP>
        </Container>
      </section>
    </PageShell>
  );
}
