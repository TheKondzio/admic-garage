import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/types";

// Pełnoszerokościowe hero — jeśli `service.heroImage` jest ustawione, pokazuje
// realne zdjęcie w tle; jeśli nie, warstwowy ciemny gradient w tonacji marki,
// żeby sekcja nie wyglądała na pustą, a tekst był w pełni czytelny.
export function ServiceHero({ service }: { service: Service }) {
  return (
    <section className="relative overflow-hidden border-b border-ink-800 bg-ink-950">
      {service.heroImage ? (
        <Image
          src={service.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,111,237,0.16),transparent_55%),linear-gradient(180deg,#15171d_0%,#0a0b0d_75%)]"
        />
      )}
      {/* Przyciemnienie — zapewnia czytelność tekstu niezależnie od jasności zdjęcia. */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink-950/55" />

      <Container className="relative flex flex-col items-center py-20 text-center sm:py-28">
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.1] text-paper-100 sm:text-5xl">
          {service.heroTitle}
        </h1>
        {service.heroSubtitle && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper-300">
            {service.heroSubtitle}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="#panel-kontaktowy" variant="primary">
            Zapytaj o wycenę
          </Button>
          <Button href="/realizacje" variant="secondary">
            Zobacz realizacje
          </Button>
        </div>
      </Container>
    </section>
  );
}
