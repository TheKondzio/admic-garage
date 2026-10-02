import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

// width/height poniżej służą wyłącznie next/image do optymalizacji pliku —
// realny wyświetlany rozmiar kontroluje className (h-8/h-9 + w-auto), więc
// proporcje Twojego pliku logo zostaną zachowane niezależnie od tych liczb.
export function Logo({ className }: { className?: string }) {
  if (site.logo) {
    return (
      <Image
        src={site.logo}
        alt={site.name}
        width={160}
        height={40}
        className={cn("h-8 w-auto object-contain", className)}
        priority
      />
    );
  }

  return (
    <span className={cn("font-display text-lg font-bold tracking-wide text-paper-100", className)}>
      ADMIC <span className="text-accent">GARAGE</span>
    </span>
  );
}
