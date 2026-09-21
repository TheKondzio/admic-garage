import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { Reveal } from "@/components/ui/Reveal";
import { getPublishedProjects } from "@/lib/supabase/publicProjects";

export async function Portfolio() {
  const projects = await getPublishedProjects();

  return (
    <section id="realizacje" className="bg-ink-950 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Portfolio"
            title="Nasze realizacje"
            description="Kodowanie, CarPlay, retrofit i detailing — pełne portfolio z podziałem na kategorie znajdziesz na osobnej stronie."
          />
          <div className="mt-10">
            <ProjectPreview projects={projects.slice(0, 6)} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
