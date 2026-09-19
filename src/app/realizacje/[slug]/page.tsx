import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/services/CtaBand";
import { BeforeAfter } from "@/components/projects/BeforeAfter";
import { RelatedServices } from "@/components/services/RelatedServices";
import { IconCamera } from "@/components/ui/icons";
import { projects, getProjectBySlug, getCoverAlt, getBeforeAlt, getAfterAlt } from "@/data/projects";
import { getServiceBySlug } from "@/data/services";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description ?? `Realizacja ADMIC GARAGE: ${project.title}.`,
    alternates: { canonical: `/realizacje/${project.slug}` },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const relatedService = project.service ? getServiceBySlug(project.service) : undefined;

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: "/" },
          { label: "Realizacje", href: "/realizacje" },
          { label: project.title },
        ]}
      />

      <section className="bg-ink-950 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-light">
            {project.category}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-paper-100 sm:text-4xl">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-paper-300">
            {project.vehicle && <span>{project.vehicle}</span>}
            {project.date && <span>{project.date}</span>}
          </div>
          {project.description && (
            <p className="mt-6 text-base leading-relaxed text-paper-300">{project.description}</p>
          )}
        </Container>
      </section>

      <section className="border-t border-ink-800 bg-ink-900/40 py-16">
        <Container>
          <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded border border-ink-800 bg-ink-900 text-paper-500">
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={getCoverAlt(project)}
                fill
                sizes="(min-width: 1024px) 1100px, 100vw"
                className="object-cover"
              />
            ) : (
              <IconCamera className="h-10 w-10" />
            )}
          </div>

          {project.images && project.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.images.map((image) => (
                <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded border border-ink-800 bg-ink-900">
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 33vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {(project.beforeImage || project.afterImage) && (
        <section className="border-t border-ink-800 bg-ink-950 py-16">
          <Container>
            <h2 className="mb-6 font-display text-xl font-semibold text-paper-100">Przed / Po</h2>
            <BeforeAfter
              beforeImage={project.beforeImage}
              beforeAlt={getBeforeAlt(project)}
              afterImage={project.afterImage}
              afterAlt={getAfterAlt(project)}
            />
          </Container>
        </section>
      )}

      <section className="border-t border-ink-800 bg-ink-900/40 py-14">
        <Container>
          <CtaBand title="Chcesz podobny efekt w swoim aucie?" />
        </Container>
      </section>

      {relatedService && (
        <section className="border-t border-ink-800 bg-ink-950 py-16 sm:py-20">
          <Container>
            <RelatedServices services={[relatedService]} />
          </Container>
        </section>
      )}
    </PageShell>
  );
}
