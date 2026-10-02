import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { CtaBand } from "@/components/services/CtaBand";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Obszar działania",
  description:
    "ADMIC GARAGE — kodowanie samochodowe, multimedia i retrofit, mycie detailingowe z dojazdem do klienta. Kraków i okolice, Wadowice, baza w Kalwarii Zebrzydowskiej.",
  alternates: { canonical: "/obszar-dzialania" },
};

export default function ObszarDzialaniaPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "Obszar działania" }]} />
      <ServiceArea />
      <section className="border-t border-ink-800 bg-ink-900/40 py-14">
        <Container>
          <CtaBand title="Nie jesteś pewien, czy dojedziemy do Ciebie?" />
        </Container>
      </section>
    </PageShell>
  );
}
