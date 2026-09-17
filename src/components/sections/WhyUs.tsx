import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    title: "Szeroka znajomość systemów",
    description:
      "Pracujemy z systemami multimedialnymi i elektroniką wielu marek. Dzięki doświadczeniu potrafimy dobrać rozwiązanie do konkretnego modelu i jego wyposażenia.",
  },
  {
    title: "Dopasowanie do konkretnego auta",
    description:
      "Nie korzystamy z jednego schematu dla wszystkich. Sprawdzamy model, rocznik i zastosowaną jednostkę, aby dobrać rozwiązanie, które rzeczywiście pasuje do Twojego auta.",
  },
  {
    title: "Od konsultacji do gotowego rozwiązania",
    description:
      "Najpierw ustalamy, czego potrzebujesz i co jest możliwe w Twoim samochodzie. Następnie dobieramy zakres prac i realizujemy go kompleksowo.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-ink-900/40 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Dlaczego ADMIC GARAGE" title="Na czym możesz polegać" />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded border border-ink-800 bg-ink-800 sm:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="bg-ink-950 p-6 sm:p-8">
              <h3 className="font-display text-base font-semibold text-paper-100">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-300">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
