import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { IconPhone } from "@/components/ui/icons";
import { Logo } from "@/components/layout/Logo";
import { site } from "@/data/site";

// Odchudzony nagłówek landing page'a: ten sam wygląd co Navbar (wysokość,
// obramowanie, tło), ale zamiast pełnego menu — logo, telefon i jeden przycisk.
// Mniej linków wyprowadzających z reklamowanej strony = więcej zapytań.
export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-800/80 bg-ink-950/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="shrink-0" aria-label={`${site.name} — strona główna`}>
          <Logo />
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={site.phoneHref}
            data-track="header_phone"
            className="hidden items-center gap-2 text-sm font-medium text-paper-200 transition-colors hover:text-paper-100 sm:flex"
          >
            <IconPhone className="h-4 w-4 text-accent-light" />
            {site.phone}
          </a>
          <a
            href="#formularz"
            data-track="header_cta"
            className="hidden items-center justify-center rounded bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
          >
            Sprawdź możliwość
          </a>
          <a
            href={site.phoneHref}
            data-track="header_phone_icon"
            aria-label={`Zadzwoń: ${site.phone}`}
            className="flex h-10 w-10 items-center justify-center rounded border border-ink-700 text-paper-100 transition-colors hover:border-paper-300 sm:hidden"
          >
            <IconPhone className="h-5 w-5" />
          </a>
        </div>
      </Container>
    </header>
  );
}
