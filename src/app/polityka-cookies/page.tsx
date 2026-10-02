import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LegalH2, LegalP, LegalUl, LegalLi, LegalTable, ToDo } from "@/components/legal/LegalPrimitives";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Polityka cookies",
  description: "Informacje o plikach cookies wykorzystywanych w serwisie ADMIC GARAGE.",
  alternates: { canonical: "/polityka-cookies" },
  robots: { index: true, follow: true },
};

// Audyt kodu źródłowego potwierdza: serwis nie ustawia obecnie żadnych
// cookies (brak analytics, marketingu, logowania, koszyka). Treść poniżej
// odzwierciedla ten rzeczywisty stan, zamiast opisywać cookies, których
// strona nie posiada.
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
            <strong className="text-paper-100">
              Serwis, w swoim obecnym kształcie, nie wykorzystuje żadnych plików cookies
            </strong>{" "}
            — ani niezbędnych, ani analitycznych, funkcjonalnych czy marketingowych. Potwierdza to
            pełny audyt kodu źródłowego strony: brak logowania, sesji, koszyka, narzędzi
            analitycznych oraz jakichkolwiek skryptów podmiotów trzecich, które ustawiałyby
            cookies.
          </LegalP>
          <LegalTable
            headers={["Nazwa", "Dostawca", "Cel", "Rodzaj", "Okres przechowywania"]}
            rows={[["—", "—", "Brak cookies do wykazania na dzień publikacji", "—", "—"]]}
          />

          <LegalH2>3. Mechanizm zgody jest już przygotowany</LegalH2>
          <LegalP>
            Serwis ma wbudowany, gotowy do aktywacji mechanizm banera zgody na cookies wraz
            z obsługą Google Analytics (GA4) i Google Ads. Dopóki administrator nie skonfiguruje
            identyfikatora GA4 i/lub Google Ads, baner pozostaje ukryty, a żaden skrypt Google nie
            jest ładowany — zgodnie ze stanem opisanym w sekcji 2 powyżej. W momencie aktywacji:
          </LegalP>
          <LegalUl>
            <LegalLi>baner zgody pojawi się automatycznie przy pierwszej wizycie,</LegalLi>
            <LegalLi>skrypt Google (gtag.js) załaduje się dopiero po wyrażeniu odpowiedniej zgody (analitycznej dla GA4, marketingowej dla Google Ads) — nie wcześniej,</LegalLi>
            <LegalLi>użytkownik będzie mógł w każdej chwili zmienić swoją decyzję,</LegalLi>
            <LegalLi>niniejsza polityka zostanie zaktualizowana o pełną tabelę konkretnych cookies ustawianych przez Google (nazwa, cel, okres przechowywania) — dokładna lista zależy od zachowania samego narzędzia Google i zostanie uzupełniona po aktywacji.</LegalLi>
          </LegalUl>
          <LegalP>
            Aktywacja: <ToDo>data uruchomienia + identyfikatory GA4/Google Ads</ToDo>.
          </LegalP>

          <LegalH2>4. Zgoda użytkownika</LegalH2>
          <LegalP>
            Ponieważ serwis nie ustawia obecnie żadnych cookies wymagających zgody, na stronie nie
            jest wyświetlany baner z prośbą o zgodę na cookies. Zgodnie z ustawą Prawo
            telekomunikacyjne oraz RODO, obowiązek uzyskania zgody dotyczy cookies innych niż
            niezbędne do świadczenia usługi — dopóki takie nie występują, żądanie zgody byłoby
            bezprzedmiotowe.
          </LegalP>

          <LegalH2>5. Ustawienia przeglądarki</LegalH2>
          <LegalP>
            Mimo że serwis obecnie nie korzysta z cookies, użytkownik może w dowolnym momencie
            samodzielnie zarządzać ustawieniami cookies w swojej przeglądarce internetowej —
            zablokować ich zapisywanie, usunąć istniejące pliki cookies lub ustawić powiadomienia
            przy próbie ich zapisania. Instrukcje zarządzania cookies dostępne są w
            ustawieniach/pomocy każdej popularnej przeglądarki (Chrome, Firefox, Safari, Edge).
          </LegalP>

          <LegalH2>6. Kontakt</LegalH2>
          <LegalP>
            Pytania dotyczące niniejszej polityki cookies prosimy kierować na adres: {site.email}.
          </LegalP>
          <LegalP>
            Data ostatniej aktualizacji: <ToDo>data publikacji</ToDo>
          </LegalP>
        </Container>
      </section>
    </PageShell>
  );
}
