import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types";
import { cn } from "@/lib/cn";

export function ServiceTile({ service, size = "md" }: { service: Service; size?: "md" | "lg" }) {
  const href = `/uslugi/${service.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded border border-ink-800 bg-ink-900",
        size === "lg" ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[4/3]"
      )}
    >
      {service.tileImage ? (
        <Image
          src={service.tileImage}
          alt={service.tileTitle}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        // Miejsce na docelowe zdjęcie usługi — ustaw `tileImage` w services.ts, gdy
        // pojawi się realna fotografia. Gradient poniżej to świadomy substytut, nie ozdobnik.
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(160deg,#1a1d24_0%,#0a0b0d_70%)] transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent"
      />

      {!service.confirmed && (
        <span className="absolute right-4 top-4 rounded-full border border-ink-600 bg-ink-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-paper-300">
          Wkrótce
        </span>
      )}

      <div className="relative p-6">
        <h3 className="font-display text-xl font-semibold text-paper-100">
          {service.tileTitle}
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-paper-300">
          {service.tileDescription}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-light group-hover:text-accent">
          Zobacz szczegóły →
        </span>
      </div>
    </Link>
  );
}
