import { IconPhone } from "@/components/ui/icons";
import { site } from "@/data/site";

// Pasek widoczny tylko na telefonie — telefon jest najszybszą ścieżką konwersji
// dla klienta, który przegląda stronę w drodze.
export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink-800 bg-ink-950/95 backdrop-blur lg:hidden">
      <a
        href={site.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-paper-100"
      >
        <IconPhone className="h-4 w-4" />
        Zadzwoń
      </a>
      <a
        href="/kontakt"
        className="flex flex-1 items-center justify-center gap-2 border-l border-ink-800 bg-accent py-3.5 text-sm font-semibold text-white"
      >
        Zapytaj o wycenę
      </a>
    </div>
  );
}
