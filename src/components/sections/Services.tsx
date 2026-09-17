import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { confirmedServices } from "@/data/services";

export function Services() {
  return (
    <section id="uslugi" className="bg-ink-950 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Co robimy"
          title="Nasze usługi"
          description="Trzy jasne kategorie: mycie detailingowe, kodowanie samochodowe i multimedia z retrofitem. Kliknij usługę, żeby zobaczyć pełne informacje, proces i FAQ."
        />

        <div className="mt-12">
          <ServiceGrid services={confirmedServices} size="lg" />
        </div>
      </Container>
    </section>
  );
}
