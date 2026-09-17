import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceContactPanel } from "@/components/services/ServiceContactPanel";
import { RelatedServices } from "@/components/services/RelatedServices";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { getRelatedServices } from "@/data/services";
import { getProjectsByService } from "@/data/projects";
import { site } from "@/data/site";
import type { Service } from "@/types";

export function ServicePageTemplate({ service }: { service: Service }) {
  const related = getRelatedServices(service);
  const projects = getProjectsByService(service.slug);

  const faqJsonLd = service.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.heroTitle ?? service.tileTitle,
    description: service.metaDescription ?? service.tileDescription,
    provider: { "@type": "AutoRepair", name: site.name, url: site.url },
    areaServed: site.serviceArea.areas.map((area) => ({ "@type": "Place", name: area })),
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <Breadcrumbs
        items={[
          { label: "Strona główna", href: "/" },
          { label: "Usługi", href: "/uslugi" },
          { label: service.navLabel },
        ]}
      />

      {/* Hero podstrony usługi celowo BEZ animacji wejścia — to on jest
          krytyczny dla LCP, więc musi się wyrenderować natychmiast. */}
      <ServiceHero service={service} />

      {/* GŁÓWNA CZĘŚĆ: treść (70%) + sticky panel kontaktowy (30%) */}
      <section className="bg-ink-950 py-14 sm:py-20">
        <Container className="max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-12">
            {/* LEWA KOLUMNA — treść */}
            <div className="space-y-14 sm:space-y-16">
              {service.intro && (
                <Reveal>
                  <SectionHeading title="Czym to jest?" />
                  <div className="mt-5 space-y-4">
                    {service.intro.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-relaxed text-paper-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Reveal>
              )}

              {service.subSections && (
                <Reveal>
                  {service.subSectionsHeading && <SectionHeading title={service.subSectionsHeading} />}
                  <div className="mt-5 space-y-5">
                    {service.subSections.map((sub) => (
                      <div
                        key={sub.id}
                        id={sub.id}
                        className="scroll-mt-24 rounded border border-ink-800 bg-ink-900 p-5 transition-colors duration-300 hover:border-ink-700 sm:p-6"
                      >
                        <h3 className="font-display text-lg font-semibold text-paper-100">{sub.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-paper-300">{sub.description}</p>
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {sub.items.map((item) => (
                            <li key={item} className="flex gap-2.5 text-sm text-paper-300">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}

              {service.forWho && (
                <Reveal>
                  <SectionHeading title="Dla kogo jest ta usługa?" />
                  <ul className="mt-5 space-y-3">
                    {service.forWho.map((item) => (
                      <li key={item} className="flex gap-3 text-base text-paper-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {service.whatWeDo && (
                <Reveal>
                  <SectionHeading title="Co dokładnie robimy?" />
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {service.whatWeDo.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 rounded border border-ink-800 bg-ink-900 p-4 text-sm text-paper-200 transition-colors duration-300 hover:border-ink-700"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {service.highlights && (
                <Reveal>
                  <SectionHeading title="Popularne rozwiązania" />
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    {service.highlights.map((h) => (
                      <div key={h.title} className="rounded border border-ink-800 bg-ink-900 p-5 transition-colors duration-300 hover:border-ink-700">
                        <h3 className="font-display text-base font-semibold text-paper-100">{h.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-paper-300">{h.description}</p>
                      </div>
                    ))}
                  </div>
                  {service.compatibilityNote && (
                    <p className="mt-5 rounded border border-ink-800 bg-ink-900/60 p-4 text-sm text-paper-300">
                      {service.compatibilityNote}
                    </p>
                  )}
                </Reveal>
              )}

              {service.benefits && (
                <Reveal>
                  <SectionHeading title="Co zyskujesz?" />
                  <ul className="mt-5 space-y-3">
                    {service.benefits.map((item) => (
                      <li key={item} className="flex gap-3 text-base text-paper-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {service.process && (
                <Reveal>
                  <SectionHeading title="Jak wygląda realizacja?" />
                  <ol className="mt-6 grid gap-6 sm:grid-cols-2">
                    {service.process.map((step) => (
                      <li key={step.step}>
                        <span className="font-display text-2xl font-bold text-ink-700">
                          {String(step.step).padStart(2, "0")}
                        </span>
                        <h3 className="mt-1 font-display text-base font-semibold text-paper-100">{step.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-paper-300">{step.description}</p>
                      </li>
                    ))}
                  </ol>
                  {service.priceNote && (
                    <p className="mt-6 text-sm text-paper-500">
                      <span className="font-semibold text-paper-300">Ile to może kosztować? </span>
                      {service.priceNote}
                    </p>
                  )}
                </Reveal>
              )}

              {service.faq && (
                <Reveal>
                  <div id="faq">
                    <SectionHeading title={`FAQ: ${service.navLabel}`} />
                    <div className="mt-5">
                      <FaqAccordion items={service.faq} />
                    </div>
                  </div>
                </Reveal>
              )}

              {related.length > 0 && (
                <Reveal>
                  <RelatedServices services={related} />
                </Reveal>
              )}
            </div>

            {/* PRAWA KOLUMNA — panel kontaktowy, sticky na desktopie */}
            <div id="panel-kontaktowy" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
              <ServiceContactPanel service={service} />
            </div>
          </div>
        </Container>
      </section>

      {/* GALERIA / REALIZACJE ZWIĄZANE Z TĄ USŁUGĄ — pełna szerokość */}
      <section className="border-t border-ink-800 bg-ink-900/40 py-16 sm:py-20">
        <Container className="max-w-[1200px]">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-paper-100 sm:text-3xl">
              Sprawdź <span className="text-accent">realizacje: {service.navLabel.toLowerCase()}</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-paper-400">
              Każde auto traktujemy indywidualnie — zobacz, jak wygląda ta usługa w praktyce.
            </p>
            <div className="mt-8">
              <ProjectPreview projects={projects} allHref="/realizacje" />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
