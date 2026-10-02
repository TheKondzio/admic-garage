import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { IconCamera } from "@/components/ui/icons";
import type { Project } from "@/types";
import { site } from "@/data/site";
import { getCoverAlt } from "@/data/projects";

export function ProjectPreview({ projects, allHref = "/realizacje" }: { projects: Project[]; allHref?: string }) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded border border-dashed border-ink-700 bg-ink-900/50 px-6 py-14 text-center">
        <IconCamera className="h-8 w-8 text-paper-500" />
        <p className="text-sm font-medium text-paper-200">Realizacje wkrótce</p>
        <p className="max-w-sm text-sm text-paper-500">
          W międzyczasie zobacz nasze prace na{" "}
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-accent">
            Instagramie
          </a>{" "}
          i{" "}
          <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-accent">
            Facebooku
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} slug={project.slug} title={project.title} category={project.category} vehicle={project.vehicle} coverImage={project.coverImage} coverImageAlt={getCoverAlt(project)} />
        ))}
      </div>
      <div className="mt-6">
        <Link href={allHref} className="text-sm font-semibold text-accent-light hover:text-accent">
          Zobacz wszystkie realizacje →
        </Link>
      </div>
    </div>
  );
}
