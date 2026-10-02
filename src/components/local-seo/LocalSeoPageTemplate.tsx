import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { site } from "@/data/site";
import type { LocalSeoPage } from "@/data/localSeo";
import { localSeoPages } from "@/data/localSeo";

const areaStatusLabel: Record<LocalSeoPage["areaStatus"], string> = {
  siedziba: "Siedziba",
  priorytet: "Priorytet",
  regularnie: "Regularnie",
  "po uzgodnieniu": "Po uzgodnieniu",
};

export function LocalSeoPageTemplate({ page }: { page: LocalSeoPage }) {
  // Realne kafle usług — te same dane co na /uslugi, nie duplikujemy treści.
  const relevantServices = services.filter(
    (s) => s.confirmed && (s.slug === "kodowanie-samochodowe" || s.slug === "mycie-detailingowe")
  );

  const otherCities = localSeoPages.filter((p) => p.slug !== page.slug).slice(0, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Kodowanie samochodowe i detailing — ${page.city}`,
    description: page.metaDescription,
    provider: { "@type": "AutoRepair", name: site.name, url: site.url },
    areaServed: { "@type": "City", name: page.city },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />

      <Breadcrumbs
        items={[{ label: "Strona główna", href: "/" }, { label: `Kodowanie i detailing — ${page.city}` }]}
      />

      {/* HERO — bez animacji wejścia (element krytyczny dla LCP tej strony). */}
      <section className="relative overflow-hidden border-b border-ink-800 bg-ink-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,111,237,0.14),transparent_55%),linear-gradient(180deg,#0b0b0d_0%,#0a0b0d_75%)]" />
        <Container className="relative flex flex-col items-center py-16 text-center sm:py-20">
          <span className="mb-4 rounded-full border border-ink-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-paper-300">
            {areaStatusLabel[page.areaStatus]} · {page.city}
          </span>
          <h1 className="max-w-2xl font-display text-3xl font-bold leading-tight text-paper-100 sm:text-4xl">
            {page.heroTitle}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-paper-300">{page.heroSubtitle}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="#kontakt" variant="primary">Zapytaj o wycenę</Button>
            <Button href="/uslugi" variant="secondary">Zobacz wszystkie usługi</Button>
          </div>
        </Container>
      </section>

      {/* INTRO */}
      <section className="bg-ink-950 py-14 sm:py-16">
        <Container className="max-w-2xl">
          <Reveal>
            {page.intro.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-base leading-relaxed text-paper-300 first:mt-0">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* USŁUGI */}
      <section className="border-t border-ink-800 bg-ink-900/40 py-14 sm:py-16">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Nasze usługi"
              title={`Kodowanie samochodowe i detailing — ${page.city}`}
              description="Kliknij usługę, żeby zobaczyć pełny zakres, proces i FAQ."
            />
            <div className="mt-8">
              <ServiceGrid services={relevantServices} size="lg" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink-800 bg-ink-950 py-14 sm:py-16">
        <Container className="max-w-2xl">
          <Reveal>
            <SectionHeading title={`Pytania — ${page.city}`} align="center" />
            <div className="mt-8">
              <FaqAccordion items={page.faq} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* POWIĄZANE LOKALIZACJE */}
      {otherCities.length > 0 && (
        <section className="border-t border-ink-800 bg-ink-900/40 py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading title="Działamy też w pobliżu" />
              <div className="mt-6 flex flex-wrap gap-3">
                {otherCities.map((p) => (
                  <Button key={p.slug} href={`/${p.slug}`} variant="secondary">
                    {p.city}
                  </Button>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* KONTAKT */}
      <Contact />
    </>
  );
}
