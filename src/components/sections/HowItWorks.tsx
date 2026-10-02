import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";
import { Reveal } from "@/components/ui/Reveal";

export function HowItWorks() {
  return (
    <section id="jak-dzialamy" className="bg-ink-900/40 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Proces" title="Jak to działa" align="center" />
        </Reveal>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <li key={step.step} className="relative pl-0">
              <Reveal delay={index * 60}>
                <span className="font-display text-4xl font-bold text-ink-700">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-paper-100">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-300">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
