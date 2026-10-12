import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { CookieSettingsLink } from "@/components/cookies/CookieSettingsLink";
import { site } from "@/data/site";

// Kompaktowa stopka: dane kontaktowe i linki prawne (wymagane przy reklamach),
// bez rozbudowanej nawigacji. Dolny odstęp na mobile zostawia miejsce na
// przyklejony pasek „Zadzwoń | Zapytaj”, żeby nie zasłaniał treści.
export function LandingFooter() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950 pb-28 lg:pb-0">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-sm leading-relaxed text-paper-500">
            Kodowanie samochodowe, multimedia i retrofit — {site.name}.
          </p>
          <Link href="/" className="mt-3 inline-block text-sm text-accent-light hover:text-accent">
            Zobacz pełną ofertę ADMIC GARAGE
          </Link>
        </div>

        <div className="text-sm text-paper-500">
          <p className="font-semibold uppercase tracking-wider text-paper-100">Kontakt</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={site.phoneHref} className="hover:text-paper-200">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-paper-200">
                {site.email}
              </a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink-800">
        <Container className="flex flex-col gap-2 py-5 text-xs text-paper-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="flex gap-4">
            <Link href="/polityka-prywatnosci" className="hover:text-paper-300">
              Polityka prywatności
            </Link>
            <Link href="/polityka-cookies" className="hover:text-paper-300">
              Polityka cookies
            </Link>
            <CookieSettingsLink className="hover:text-paper-300" />
          </p>
        </Container>
        <Container className="pb-5 text-xs leading-relaxed text-paper-500">
          <p>
            BMW i Apple CarPlay są znakami towarowymi ich właścicieli. {site.name} nie jest powiązany z BMW AG ani z
            Apple Inc.
          </p>
        </Container>
      </div>
    </footer>
  );
}
