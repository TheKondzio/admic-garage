import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/data/nav";
import { confirmedServices } from "@/data/services";
import { localSeoPages } from "@/data/localSeo";
import { site } from "@/data/site";
import { MadeBy } from "@/components/layout/MadeBy";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 py-14">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper-500">
            Kodowanie samochodowe, multimedia i retrofit oraz mycie detailingowe z dojazdem do klienta —
            {" "}{site.serviceArea.primary}.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-paper-100">Usługi</p>
          <ul className="mt-4 space-y-2">
            {confirmedServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/uslugi/${s.slug}`} className="text-sm text-paper-500 hover:text-paper-200">
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-paper-100">Lokalne SEO</p>
          <ul className="mt-4 space-y-2">
            {localSeoPages.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="text-sm text-paper-500 hover:text-paper-200">
                  Kodowanie samochodów {p.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-paper-100">Nawigacja</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-paper-500 hover:text-paper-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-paper-100">Kontakt</p>
          <ul className="mt-4 space-y-2 text-sm text-paper-500">
            <li>
              <a href={site.phoneHref} className="hover:text-paper-200">{site.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-paper-200">{site.email}</a>
            </li>
            <li>{site.base.city} · {site.serviceArea.primary}</li>
          </ul>
          <div className="mt-4 flex gap-4">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-paper-500 hover:text-paper-200">
              Instagram
            </a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-paper-500 hover:text-paper-200">
              Facebook
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-ink-800">
        <Container className="flex flex-col gap-3 py-6 text-xs text-paper-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ADMIC GARAGE · {site.base.city}</p>
          <div className="flex gap-4">
            <Link href="/polityka-prywatnosci" className="hover:text-paper-200">
              Polityka prywatności
            </Link>
            <Link href="/polityka-cookies" className="hover:text-paper-200">
              Polityka cookies
            </Link>
          </div>
        </Container>
      </div>

      <MadeBy />
    </footer>
  );
}
