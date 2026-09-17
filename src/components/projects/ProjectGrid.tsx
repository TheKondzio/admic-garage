"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { IconCamera } from "@/components/ui/icons";
import type { Project, ProjectCategory } from "@/types";
import { site } from "@/data/site";

export function ProjectGrid({ projects, categories }: { projects: Project[]; categories: ProjectCategory[] }) {
  const [active, setActive] = useState<string>("Wszystkie");

  const filtered = useMemo(
    () => (active === "Wszystkie" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded border border-dashed border-ink-700 bg-ink-900/50 px-6 py-16 text-center">
        <IconCamera className="h-8 w-8 text-paper-500" />
        <p className="text-sm font-medium text-paper-200">Realizacje wkrótce</p>
        <p className="max-w-sm text-sm text-paper-500">
          Portfolio jest w przygotowaniu. W międzyczasie zobacz nasze prace na{" "}
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
      <div className="flex flex-wrap gap-2">
        {["Wszystkie", ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
              active === category
                ? "border-accent bg-accent text-white"
                : "border-ink-700 text-paper-300 hover:border-paper-300 hover:text-paper-100"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} slug={project.slug} title={project.title} category={project.category} vehicle={project.vehicle} coverImage={project.coverImage} />
        ))}
      </div>
    </div>
  );
}
