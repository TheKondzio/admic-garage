import Image from "next/image";
import Link from "next/link";
import { IconCamera } from "@/components/ui/icons";

type ProjectCardProps = {
  slug: string;
  title: string;
  category: string;
  vehicle?: string;
  coverImage?: string;
};

export function ProjectCard({ slug, title, category, vehicle, coverImage }: ProjectCardProps) {
  return (
    <Link
      href={`/realizacje/${slug}`}
      className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded border border-ink-800 bg-ink-900"
    >
      {coverImage ? (
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        // Miejsce na zdjęcie realizacji — ustaw `coverImage` w projects.ts, gdy pojawi się prawdziwa fotografia.
        <div className="absolute inset-0 flex items-center justify-center text-paper-600 transition-transform duration-500 group-hover:scale-105">
          <IconCamera className="h-8 w-8" />
        </div>
      )}
      <div className="relative bg-gradient-to-t from-ink-950/95 to-transparent p-4">
        {vehicle && <p className="text-xs font-semibold uppercase tracking-wide text-paper-300">{vehicle}</p>}
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-light">{category}</p>
        <p className="text-sm font-medium text-paper-100">{title}</p>
        <span className="mt-1 inline-block text-xs font-semibold text-accent-light group-hover:text-accent">
          Zobacz realizację →
        </span>
      </div>
    </Link>
  );
}
