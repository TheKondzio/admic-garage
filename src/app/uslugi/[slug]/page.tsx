import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { ServiceComingSoon } from "@/components/services/ServiceComingSoon";
import { services, getServiceBySlug } from "@/data/services";
import { site } from "@/data/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  if (!service.confirmed) {
    return {
      title: service.tileTitle,
      description: "Usługa w trakcie potwierdzania oferty.",
      alternates: { canonical: `/uslugi/${service.slug}` },
      robots: { index: false, follow: true },
    };
  }

  return {
    title: service.metaTitle ?? service.tileTitle,
    description: service.metaDescription ?? service.tileDescription,
    alternates: { canonical: `/uslugi/${service.slug}` },
    openGraph: {
      title: service.metaTitle ?? service.tileTitle,
      description: service.metaDescription ?? service.tileDescription,
      url: `${site.url}/uslugi/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  if (!service.confirmed) {
    return (
      <PageShell>
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Usługi", href: "/uslugi" },
            { label: service.navLabel },
          ]}
        />
        <ServiceComingSoon service={service} />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <ServicePageTemplate service={service} />
    </PageShell>
  );
}
