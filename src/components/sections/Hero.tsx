import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-ink-950">
      {/* TŁO SEKCJI — docelowo jedno duże, realistyczne zdjęcie samochodu/warsztatu
          (site.heroBackgroundImage). Diagonalny tonalny gradient poniżej to
          świadomy "przygotowany", premium wygląd zanim zdjęcie się pojawi —
          nie płaski kolor, ale bez blasku/neonu. */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#050505_0%,#0b0b0d_50%,#15171c_100%)]" />

      {site.heroBackgroundImage && (
        <Image
          src={site.heroBackgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Przyciemnienie zdjęcia — jeden subtelny gradient, znacznie lżejszy niż
          poprzednio, żeby maska, szyba, reflektor i droga w tle były wyraźnie
          widoczne. Na desktopie tekst siedzi po lewej, więc gradient biegnie
          poziomo (ciemniej z lewej, dużo jaśniej z prawej). Na mobile treść
          układa się w pionowym stosie (tekst na górze), więc gradient biegnie
          pionowo (ciemniej u góry, jaśniej niżej). */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/75 via-black/35 to-black/10 lg:block" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/10 lg:hidden" />

      <Container className="relative flex flex-col gap-10 py-20 sm:py-28 lg:flex-row lg:items-center lg:gap-16 lg:py-32">
        <div className="max-w-xl">
          <p className="mb-6 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-paper-400">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {site.serviceArea.primary} · dojazd do klienta
          </p>

          <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-paper-100 sm:text-6xl">
            Twój samochód. <span className="text-accent">Więcej możliwości.</span>
          </h1>

          <p className="mt-7 text-lg leading-relaxed text-paper-300">
            Kodowanie samochodowe, multimedia i retrofit oraz mycie detailingowe — z dojazdem do
            klienta w Krakowie, Wadowicach i okolicy. Bazujemy w {site.base.city}.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#kontakt" variant="primary" className="shadow-lg shadow-accent/25">
              Zapytaj o usługę
            </Button>
            <Button href="#uslugi" variant="secondary">Zobacz ofertę</Button>
          </div>
        </div>

        {/* Panel po prawej — film w akcji (kodowanie / diagnostyka / detailing).
            Ustaw site.heroVideo w src/data/site.ts, żeby pokazać realny materiał. */}
        <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded border border-ink-800 bg-ink-900 shadow-card lg:aspect-[3/4]">
          {site.heroVideo ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={site.heroVideo} type="video/mp4" />
            </video>
          ) : (
            <div className="flex h-full items-center justify-center text-center">
              <p className="px-8 text-sm text-paper-500">
                [ Miejsce na film — kodowanie, diagnostyka lub detailing w akcji ]
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
