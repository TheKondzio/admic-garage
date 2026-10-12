import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

// Własna strona 404 — zamiast domyślnej, bez nawigacji. Next.js sam ustawia
// status 404 i noindex, więc nie trafia do wyszukiwarki.
export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-ink-950 py-24 sm:py-32">
        <Container className="max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-light">Błąd 404</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-paper-100 sm:text-4xl">
            Nie znaleźliśmy tej strony
          </h1>
          <p className="mt-4 text-base leading-relaxed text-paper-300">
            Adres mógł się zmienić albo został wpisany z błędem. Wróć na stronę główną albo zobacz ofertę.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/" variant="primary">Strona główna</Button>
            <Button href="/uslugi" variant="secondary">Usługi</Button>
            <Button href="/kontakt" variant="secondary">Kontakt</Button>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
