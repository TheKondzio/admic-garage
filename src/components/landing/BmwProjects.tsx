import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getCoverAlt } from "@/data/projects";
import type { Project } from "@/types";

// Sekcja „Kodowanie BMW — nasze realizacje” na landing page'u. Dane przychodzą
// z bazy (opublikowane realizacje kodowania marki BMW — patrz
// lib/supabase/bmwCodingProjects.ts). Brak realizacji = sekcja się NIE renderuje
// (żadnych wymyślonych zdjęć ani placeholderów).
export function BmwProjects({
  projects,
  title,
  lead,
  cardLink,
  className,
  titleClassName,
  leadClassName,
}: {
  projects: Project[];
  title: string;
  lead: string;
  cardLink: string;
  className: string;
  titleClassName: string;
  leadClassName: string;
}) {
  if (projects.length === 0) return null;

  return (
    <section id="realizacje" className={className} aria-labelledby="realizacje-title">
      <Container>
        <h2 id="realizacje-title" className={titleClassName}>
          {title}
        </h2>
        <p className={leadClassName}>{lead}</p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Link
                href={`/realizacje/${project.slug}`}
                data-track={`project_${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink-700 bg-ink-950 transition-colors hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
                  <Image
                    src={project.coverImage as string}
                    alt={getCoverAlt(project)}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    // Pierwszy rząd może być widoczny wcześnie, reszta ładuje się leniwie.
                    loading={index < 3 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {project.vehicle && (
                    <p className="font-display text-lg font-bold text-paper-100">{project.vehicle}</p>
                  )}
                  <p className="mt-1 text-sm leading-relaxed text-paper-300">{project.title}</p>
                  {project.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-paper-500">{project.description}</p>
                  )}
                  <span className="mt-auto pt-4 text-sm font-semibold text-accent-light group-hover:text-accent">
                    {cardLink} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
