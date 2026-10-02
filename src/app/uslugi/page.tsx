import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { services } from "@/data/services";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Usługi",
  description:
    "Pełna oferta ADMIC GARAGE: kodowanie samochodowe (BMW, MINI, VAG, Mercedes-Benz), multimedia i retrofit, mycie detailingowe. Kraków i okolice, dojazd do klienta.",
  alternates: { canonical: "/uslugi" },
};

export default function UslugiPage() {
  const digital = services.filter((s) => s.group === "digital");
  const detailing = services.filter((s) => s.group === "detailing");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services
      .filter((s) => s.confirmed)
      .map((s, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${site.url}/uslugi/${s.slug}`,
        name: s.tileTitle,
      })),
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "Usługi" }]} />

      <section className="bg-ink-950 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Usługi ADMIC GARAGE"
            title="Od kodowania i multimediów po detailing i modernizację samochodu"
          />
        </Container>
      </section>

      <section className="border-t border-ink-800 bg-ink-950 pb-20">
        <Container>
          <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-paper-500">
            Digital — kodowanie i multimedia
          </p>
          <ServiceGrid services={digital} size="lg" />
        </Container>
      </section>

      <section className="border-t border-ink-800 bg-ink-900/40 py-16 sm:py-20">
        <Container>
          <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-paper-500">
            Detailing
          </p>
          <ServiceGrid services={detailing} size="lg" />
        </Container>
      </section>
    </PageShell>
  );
}
