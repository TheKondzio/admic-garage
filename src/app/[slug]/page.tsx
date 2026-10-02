import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { LocalSeoPageTemplate } from "@/components/local-seo/LocalSeoPageTemplate";
import { localSeoPages, getLocalSeoPageBySlug } from "@/data/localSeo";

export function generateStaticParams() {
  return localSeoPages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getLocalSeoPageBySlug(params.slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

// Ten segment [slug] łapie WYŁĄCZNIE nierozpoznane top-level adresy — Next.js
// zawsze w pierwszej kolejności dopasowuje istniejące statyczne foldery
// (np. src/app/kontakt, src/app/faq), więc żadna dotychczasowa strona nie
// jest tym zagrożona. Tutaj obsługujemy tylko znane lokalne podstrony SEO
// (detailing-i-kodowanie-<miasto>) — każdy inny nieznany adres dostaje 404.
export default function CatchAllPage({ params }: { params: { slug: string } }) {
  const page = getLocalSeoPageBySlug(params.slug);
  if (!page) notFound();

  return (
    <PageShell>
      <LocalSeoPageTemplate page={page} />
    </PageShell>
  );
}
