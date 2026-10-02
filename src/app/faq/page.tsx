import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqItems } from "@/data/faq";
import { confirmedServices } from "@/data/services";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Najczęstsze pytania o usługi ADMIC GARAGE: kodowanie samochodowe, multimedia, retrofit, mycie detailingowe, obszar działania i wycenę.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "FAQ" }]} />

      <section className="bg-ink-950 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Pytania i odpowiedzi" title="FAQ" align="center" />
          <div className="mt-10">
            <FaqAccordion items={faqItems} defaultOpenIndex={null} />
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-800 bg-ink-900/40 py-16">
        <Container className="max-w-3xl text-center">
          <p className="text-sm text-paper-300">
            Masz pytanie o konkretną usługę? Każda podstrona ma własne FAQ:
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {confirmedServices
              .filter((s) => s.faq)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/uslugi/${s.slug}#faq`}
                  className="text-sm font-semibold text-accent-light hover:text-accent"
                >
                  {s.navLabel}
                </Link>
              ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
