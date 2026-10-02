import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/types";

export function ServiceComingSoon({ service }: { service: Service }) {
  return (
    <section className="bg-ink-950 py-20 sm:py-28">
      <Container className="max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-light">
          Do potwierdzenia
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-paper-100 sm:text-4xl">
          {service.tileTitle}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-paper-300">
          Ta usługa nie jest jeszcze potwierdzona jako część aktualnej oferty ADMIC GARAGE —
          strona jest przygotowana pod treść, ale celowo nie zawiera opisu, którego nie
          moglibyśmy potwierdzić. Jeśli interesuje Cię ta usługa, zapytaj bezpośrednio —
          odpowiemy, czy i kiedy ją realizujemy.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/kontakt" variant="primary">
            Zapytaj o dostępność
          </Button>
          <Button href="/uslugi" variant="secondary">
            Zobacz pełną ofertę
          </Button>
        </div>
      </Container>
    </section>
  );
}
