import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";

export function Portfolio() {
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
