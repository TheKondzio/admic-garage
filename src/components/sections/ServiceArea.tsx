import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconPin } from "@/components/ui/icons";
import { site } from "@/data/site";

const areas = [
  {
    title: "Kraków i okolice",
    description: "Główny obszar działania — centrum, dzielnice i okolice. Pracujemy tu na co dzień.",
    tag: "Priorytet",
  },
  {
    title: "Wadowice",
    description: "Blisko naszej bazy — dojeżdżamy regularnie.",
    tag: "Regularnie",
  },
  {
    title: site.base.city,
    description: "Nasza baza — siedziba firmy ADMIC GARAGE.",
    tag: "Siedziba",
  },
  {
    title: "Inne lokalizacje",
    description: "Poza wskazanymi obszarami — dojazd możliwy po wcześniejszym uzgodnieniu telefonicznym.",
    tag: "Po uzgodnieniu",
  },
];

export function ServiceArea() {
  return (
    <section id="obszar" className="bg-ink-900/40 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Zasięg działania"
          title="Dojeżdżamy do Ciebie"
          description={`Kraków i okolice to nasz priorytet — pracujemy tam na co dzień. Dojeżdżamy też regularnie do Wadowic, a nasza baza to ${site.base.city}. ${site.serviceArea.note}`}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Mapa/grafika obszaru działania — ustaw site.areaMapImage, żeby pokazać realny obraz. */}
          <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded border border-ink-800 bg-ink-900">
            {site.areaMapImage ? (
              <Image
                src={site.areaMapImage}
                alt="Mapa obszaru działania ADMIC GARAGE"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-paper-500">
                <IconPin className="h-8 w-8" />
                <p className="text-sm">Mapa obszaru działania — do uzupełnienia</p>
              </div>
            )}
          </div>

          <div className="grid gap-4">
            {areas.map((area) => (
              <div key={area.title} className="rounded border border-ink-800 bg-ink-900 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-semibold text-paper-100">
                    {area.title}
                  </h3>
                  <span className="rounded-full border border-ink-700 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-paper-300">
                    {area.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-paper-300">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
