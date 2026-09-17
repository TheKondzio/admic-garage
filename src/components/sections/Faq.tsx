import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqItems } from "@/data/faq";
import Link from "next/link";

// Homepage pokazuje skrót najważniejszych pytań ogólnych — pełna lista
// (plus pytania per usługa) jest na dedykowanej stronie /faq.
const homepageFaq = faqItems.slice(0, 4);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function Faq() {
  return (
    <section id="faq" className="bg-ink-950 py-20 sm:py-28">
      <JsonLd data={jsonLd} />
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Pytania i odpowiedzi"
          title="Często zadawane pytania"
          align="center"
        />

        <div className="mt-10">
          <FaqAccordion items={homepageFaq} />
        </div>

        <div className="mt-6 text-center">
          <Link href="/faq" className="text-sm font-semibold text-accent-light hover:text-accent">
            Zobacz pełne FAQ →
          </Link>
        </div>
      </Container>
    </section>
  );
}
