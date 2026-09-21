import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projectCategories } from "@/data/projects";
import { getPublishedProjects } from "@/lib/supabase/publicProjects";

export const metadata: Metadata = {
  title: "Realizacje",
  description:
    "Realizacje ADMIC GARAGE: kodowanie samochodowe, multimedia i retrofit, mycie detailingowe. Portfolio z podziałem na kategorie.",
  alternates: { canonical: "/realizacje" },
};

// Strona jest teraz DYNAMICZNA — dane pochodzą z Supabase w czasie żądania,
// więc realizacja dodana w panelu /admin pojawia się tu od razu, bez
// ponownego builda/deployu.
export const dynamic = "force-dynamic";

export default async function RealizacjePage() {
  const projects = await getPublishedProjects();

  return (
    <PageShell>
      <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "Realizacje" }]} />

      <section className="bg-ink-950 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Portfolio"
            title="Nasze realizacje"
            description="Każde auto traktujemy indywidualnie. Filtruj po kategorii, żeby zobaczyć konkretny rodzaj pracy."
          />
        </Container>
      </section>

      <section className="border-t border-ink-800 bg-ink-950 pb-20">
        <Container>
          <ProjectGrid projects={projects} categories={projectCategories} />
        </Container>
      </section>
    </PageShell>
  );
}
