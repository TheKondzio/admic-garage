import type { Metadata } from "next";
import type { SVGProps } from "react";
import { Container } from "@/components/ui/Container";
import { IconChevronDown, IconPhone, IconWhatsapp } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { StickyMobileBar } from "@/components/landing/StickyMobileBar";
import { LandingTracking } from "@/components/landing/LandingTracking";
import { BmwLeadForm } from "@/components/landing/BmwLeadForm";
import { BmwProjects } from "@/components/landing/BmwProjects";
import { Todo } from "@/components/landing/Todo";
import { IconCheck } from "@/components/landing/LandingIcons";
import { getPublishedBmwCodingProjects } from "@/lib/supabase/bmwCodingProjects";
import { bmwLanding as c, bmwWhatsappHref, type CompatStatus } from "@/data/bmwLanding";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const pageUrl = `${site.url}${c.path}`;

// Realizacje z bazy: odświeżane po zapisie w panelu (revalidatePath w actions)
// oraz co godzinę jako zabezpieczenie.
export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: c.meta.title,
  absoluteTitle: true,
  description: c.meta.description,
  path: c.path,
});

const provider = { "@type": "AutoRepair", "@id": `${site.url}/#business`, name: site.name, url: site.url };

const servicesJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Aktywacja Apple CarPlay w BMW",
    serviceType: "Aktywacja Apple CarPlay",
    description: c.carplay.intro,
    url: `${pageUrl}#carplay`,
    provider,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Zdalne kodowanie BMW",
    serviceType: "Zdalne kodowanie samochodów BMW",
    description: c.coding.lead,
    url: `${pageUrl}#kodowanie`,
    provider,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: c.faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Strona główna", item: site.url },
    { "@type": "ListItem", position: 2, name: "Apple CarPlay i kodowanie BMW", item: pageUrl },
  ],
};

// ---------------------------------------------------------------------------
// JEDEN STYL CAŁEJ STRONY (te same stałe w każdej sekcji):
//  - ciemne tło marki ADMIC; sekcje na przemian ink-950 / ink-900 z cienką ramką,
//  - karty: rounded-xl, ramka ink-700, tło o stopień ciemniejsze lub jaśniejsze
//    od sekcji; przyciski i pola: zaokrąglenie marki (10 px),
//  - nagłówki Sora extrabold w jednej skali, treść Inter,
//  - akcent niebieski (CTA, linki), statusy z ikonami (nie samym kolorem).
// ---------------------------------------------------------------------------
const sectionBase = "py-16 sm:py-24";
const h2Class =
  "font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-paper-100 sm:text-4xl lg:text-5xl";
const leadClass = "mt-5 max-w-2xl text-base leading-relaxed text-paper-300 sm:text-lg";
const h3Class = "font-display text-lg font-bold text-paper-100";
const bodyClass = "text-sm leading-relaxed text-paper-400";
const cardOnDark = "rounded-xl border border-ink-700 bg-ink-900"; // na sekcji ink-950
const cardOnAlt = "rounded-xl border border-ink-700 bg-ink-950"; // na sekcji ink-900

const primaryCta =
  "inline-flex min-h-[48px] items-center justify-center rounded bg-accent px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const secondaryCta =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded border border-ink-600 px-6 py-3 text-sm font-semibold tracking-wide text-paper-100 transition-colors hover:border-paper-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-300";

// Ikony statusów: status nigdy nie jest przekazywany samym kolorem.
function IconQuestion(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1-1.5 2M12 17v.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" {...props}>
      <path d="M12 19V6M6.5 11.5L12 6l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const statusStyle: Record<CompatStatus, { cls: string; Icon: (p: SVGProps<SVGSVGElement>) => JSX.Element }> = {
  possible: { cls: "border-accent/40 bg-accent/10 text-accent-light", Icon: IconCheck },
  verify: { cls: "border-amber-400/40 bg-amber-400/10 text-amber-300", Icon: IconQuestion },
  update: { cls: "border-orange-400/40 bg-orange-400/10 text-orange-300", Icon: IconArrowUp },
};

function StatusChip({ status, children }: { status: CompatStatus; children: string }) {
  const { cls, Icon } = statusStyle[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${cls}`}>
      <Icon className="h-4 w-4 shrink-0" />
      {children}
    </span>
  );
}

export default async function BmwCarplayCodingPage() {
  const { hero, carplay, compat, coding, process, finalCta } = c;
  const projects = await getPublishedBmwCodingProjects(6);

  return (
    <>
      <a
        href="#tresc"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Przejdź do treści
      </a>

      <LandingHeader />

      <main id="tresc">
        {/* ================================ 1. HERO ================================ */}
        <section className="relative overflow-hidden border-b border-ink-800 bg-ink-950">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(47,111,237,0.18),transparent_55%),linear-gradient(180deg,#15171d_0%,#0a0b0d_80%)]"
          />
          <Container className="relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-24">
            <div>
              <h1 className="font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-tight text-paper-100 sm:text-6xl sm:leading-[1.04]">
                {hero.h1}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-paper-300 sm:text-lg">{hero.lead}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#carplay" data-track="hero_carplay" className={primaryCta}>
                  {hero.ctaPrimary}
                </a>
                <a
                  href="#formularz"
                  data-track="hero_coding"
                  data-prefill-service="kodowanie"
                  className={secondaryCta}
                >
                  {hero.ctaSecondary}
                </a>
              </div>
              <p className="mt-5 max-w-xl text-sm text-paper-500">{hero.note}</p>
            </div>

            <div className="space-y-4">
              {hero.tiles.map((tile, i) => (
                <a
                  key={tile.id}
                  href={tile.href}
                  data-track={`hero_tile_${tile.id}`}
                  style={{ animationDelay: `${i * 120}ms` }}
                  className="enter-rise group block rounded-xl border border-ink-700 bg-ink-900/80 p-6 transition-colors hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-7"
                >
                  <p className={`${h3Class} text-xl`}>{tile.title}</p>
                  <p className={`mt-2 ${bodyClass}`}>{tile.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-light group-hover:text-accent">
                    {tile.link}
                    <span aria-hidden="true">→</span>
                  </span>
                </a>
              ))}
            </div>
          </Container>
        </section>

        {/* ============================ 2. APPLE CARPLAY BMW ============================ */}
        <section id="carplay" className={`scroll-mt-20 bg-ink-950 ${sectionBase}`}>
          <Container>
            <h2 className={`max-w-3xl ${h2Class}`}>{carplay.title}</h2>
            <p className={leadClass}>{carplay.intro}</p>

            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {carplay.benefits.map((b) => (
                <li key={b.title} className={`${cardOnDark} p-6`}>
                  <h3 className={h3Class}>{b.title}</h3>
                  <p className={`mt-2 ${bodyClass}`}>{b.text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* ---- Tabela kompatybilności ---- */}
        <section id="kompatybilnosc" className={`scroll-mt-20 border-y border-ink-800 bg-ink-900 ${sectionBase}`}>
          <Container>
            <h2 className={`max-w-3xl ${h2Class}`}>{compat.title}</h2>
            <p className={leadClass}>{compat.lead}</p>

            {/* Wspólna ścieżka do wersji — jedna dla obu kart */}
            <div className={`mt-10 ${cardOnAlt} p-5 sm:p-6`}>
              <p className={h3Class}>Jak sprawdzić wersję w samochodzie</p>
              <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium">
                {compat.versionPath.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="rounded-md border border-ink-700 bg-ink-800 px-2.5 py-1.5 text-paper-100">
                      {step}
                    </span>
                    {i < compat.versionPath.length - 1 && (
                      <span aria-hidden="true" className="text-paper-500">
                        ›
                      </span>
                    )}
                  </li>
                ))}
              </ol>
              <p className={`mt-4 ${bodyClass}`}>{compat.versionPathNote}</p>
            </div>

            {/* Dwie duże karty generacji */}
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {compat.cards.map((card) => (
                <article key={card.id} className={`flex flex-col ${cardOnAlt} p-6 sm:p-8`}>
                  <div className="flex items-end gap-5">
                    <p
                      aria-hidden="true"
                      className="font-display text-[5.5rem] font-extrabold leading-[0.8] tracking-tighter text-paper-100 sm:text-[7.5rem]"
                    >
                      {card.numeral}
                    </p>
                    <div className="pb-1">
                      <h3 className="font-display text-2xl font-bold text-paper-100">{card.name}</h3>
                      <p className="mt-1 text-sm text-paper-400">{card.sub}</p>
                    </div>
                  </div>

                  <p className={`mt-7 ${h3Class} text-base`}>Jak rozpoznasz</p>
                  <p className={`mt-1.5 ${bodyClass}`}>{card.recognize}</p>

                  <div className="mt-6 space-y-4 border-t border-ink-700 pt-6">
                    <div>
                      <StatusChip status={card.status}>{card.statusLabel}</StatusChip>
                      <p className="mt-3 text-sm leading-relaxed text-paper-200">{card.statusText}</p>
                    </div>

                    <div>
                      {card.fullScreenStatus && card.fullScreenLabel && (
                        <StatusChip status={card.fullScreenStatus}>{card.fullScreenLabel}</StatusChip>
                      )}
                      <p className={`${card.fullScreenStatus ? "mt-3" : ""} ${bodyClass}`}>{card.fullScreen}</p>
                    </div>

                    {card.versionGroups.length > 0 && (
                      <ul className="space-y-2">
                        {card.versionGroups.map((group) => (
                          <li key={group.versions} className="text-sm text-paper-200">
                            <span className="inline-block rounded-md border border-ink-700 bg-ink-800 px-2 py-1 font-mono text-xs font-semibold">
                              {group.versions}
                            </span>
                            <span className="ml-2 font-medium">{group.label}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-auto pt-8">
                    <a
                      href="#formularz"
                      data-track={`compat_${card.id}`}
                      data-prefill-idrive={card.id}
                      data-prefill-service="carplay"
                      className={secondaryCta}
                    >
                      {compat.cardCta}
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <Todo>
              listy wersji oprogramowania per generacja (data/bmwLanding.ts → cards[].versionGroups) — wpisz je tylko z
              własnych, sprawdzonych danych; liczby z inspiracji nie są potwierdzone
            </Todo>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <p className={bodyClass}>{compat.versionNote}</p>
              <p className={bodyClass}>{compat.yearNote}</p>
            </div>

            <dl className="mt-8 grid gap-6 border-t border-ink-700 pt-8 md:grid-cols-2">
              {compat.others.map((o) => (
                <div key={o.name}>
                  <dt className={h3Class}>{o.name}</dt>
                  <dd className={`mt-1.5 ${bodyClass}`}>{o.text}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 border-t border-ink-700 pt-8">
              <p className={h3Class}>{compat.legendTitle}</p>
              <ul className="mt-4 grid gap-5 md:grid-cols-3">
                {compat.legend.map((item) => (
                  <li key={item.status}>
                    <StatusChip status={item.status}>{item.label}</StatusChip>
                    <p className={`mt-2 ${bodyClass}`}>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <a href="#formularz" data-track="compat_cta" className={primaryCta}>
                {compat.cta}
              </a>
            </div>
          </Container>
        </section>

        {/* ========================== 3. ZDALNE KODOWANIE BMW ========================== */}
        <section id="kodowanie" className={`scroll-mt-20 bg-ink-950 ${sectionBase}`}>
          <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className={h2Class}>{coding.title}</h2>
              <p className={leadClass}>{coding.lead}</p>

              <p className={`mt-8 ${h3Class} text-base`}>{coding.examplesTitle}</p>
              <ul className="mt-3 space-y-2.5">
                {coding.examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-3 text-sm leading-relaxed text-paper-300">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                    {ex}
                  </li>
                ))}
              </ul>

              <a
                href="#formularz"
                data-track="coding_cta"
                data-prefill-service="kodowanie"
                className={`${primaryCta} mt-8`}
              >
                {c.hero.ctaSecondary}
              </a>
            </div>

            <div className="space-y-5">
              <div className={`${cardOnDark} p-6`}>
                <h3 className={h3Class}>{coding.scopeTitle}</h3>
                <p className={`mt-2 ${bodyClass} text-paper-300`}>{coding.scopeText}</p>
              </div>
              <div className={`${cardOnDark} p-6`}>
                <h3 className={h3Class}>{coding.gearTitle}</h3>
                <p className={`mt-2 ${bodyClass} text-paper-300`}>{coding.gearText}</p>
              </div>
            </div>
          </Container>
        </section>

        {/* ===================== REALIZACJE KODOWANIA BMW (z bazy) ===================== */}
        <BmwProjects
          projects={projects}
          title={c.projects.title}
          lead={c.projects.lead}
          cardLink={c.projects.cardLink}
          className={`border-y border-ink-800 bg-ink-900 ${sectionBase}`}
          titleClassName={h2Class}
          leadClassName={leadClass}
        />

        {/* ============================== 4. JAK TO DZIAŁA ============================== */}
        <section className={`bg-ink-950 ${sectionBase}`}>
          <Container>
            <h2 className={h2Class}>{process.title}</h2>
            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {process.steps.map((step, index) => (
                <li key={step.title} className={`${cardOnDark} p-6`}>
                  <span aria-hidden="true" className="font-display text-4xl font-extrabold text-paper-600">
                    {index + 1}
                  </span>
                  <h3 className={`mt-3 ${h3Class}`}>{step.title}</h3>
                  <p className={`mt-2 ${bodyClass}`}>{step.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* ============================ 5. FORMULARZ WERYFIKACJI ============================ */}
        <section className={`border-y border-ink-800 bg-ink-900 ${sectionBase}`}>
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
            <div>
              <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-paper-100 sm:text-4xl">
                Wyślij dane auta, a my sprawdzimy resztę
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  "Sprawdzimy kompatybilność Twojego BMW.",
                  "Odpowiemy telefonicznie lub e-mailem, tak jak wolisz.",
                  "Wysłanie zapytania nie zobowiązuje do zakupu usługi.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-paper-300 sm:text-base">
                    <IconCheck className="mt-1 h-4 w-4 shrink-0 text-accent-light" />
                    {line}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-paper-500">Wolisz porozmawiać od razu?</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a href={site.phoneHref} data-track="form_side_phone" className={secondaryCta}>
                  <IconPhone className="h-5 w-5" />
                  {site.phone}
                </a>
                <a
                  href={bmwWhatsappHref}
                  data-track="form_side_whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryCta}
                >
                  <IconWhatsapp className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div id="formularz" className="scroll-mt-24 lg:scroll-mt-28">
              <BmwLeadForm />
            </div>
          </Container>
        </section>

        {/* ================================== 6. FAQ ================================== */}
        <section id="faq" className={`scroll-mt-20 bg-ink-950 ${sectionBase}`}>
          <Container className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-paper-100 sm:text-4xl">
              {c.faqTitle}
            </h2>
            {/* Natywne <details>: działa bez JavaScriptu (szybciej, lepsze Core Web Vitals),
                a cała treść odpowiedzi jest w HTML, więc zgadza się z danymi FAQPage. */}
            <div className="mt-8 divide-y divide-ink-700 border-y border-ink-700">
              {c.faq.map((item) => (
                <details key={item.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-base font-semibold text-paper-100 sm:text-lg">{item.question}</h3>
                    <IconChevronDown className="h-5 w-5 shrink-0 text-paper-500 transition-transform group-open:rotate-180 group-open:text-accent-light motion-reduce:transition-none" />
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-paper-300 sm:text-base">{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* ============================== 7. KOŃCOWE CTA ============================== */}
        <section className={`border-t border-ink-800 bg-ink-900 ${sectionBase}`}>
          <Container className="max-w-3xl">
            <h2 className={h2Class}>{finalCta.title}</h2>
            <p className={leadClass}>{finalCta.text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#formularz" data-track="final_cta" className={primaryCta}>
                {finalCta.button}
              </a>
              <a href={site.phoneHref} data-track="final_phone" className={secondaryCta}>
                <IconPhone className="h-5 w-5" />
                {site.phone}
              </a>
            </div>
          </Container>
        </section>
      </main>

      <LandingFooter />
      <StickyMobileBar />
      <LandingTracking />

      {servicesJsonLd.map((data) => (
        <JsonLd key={data.name} data={data} />
      ))}
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
    </>
  );
}
