import { IconPhone } from "@/components/ui/icons";
import { site } from "@/data/site";

// Przyklejony pasek na telefonie: „Zadzwoń” | „Zapytaj”. Zero JS w samym
// komponencie (to zwykłe linki). Chowanie paska, gdy formularz jest na ekranie,
// obsługuje LandingTracking przez atrybut data-hidden. `position: fixed` nie
// powoduje przesunięć układu (CLS), a dolny odstęp w stopce zostawia miejsce
// na pasek. Wyłączony od szerokości lg, gdzie formularz jest od razu w hero.
export function StickyMobileBar() {
  return (
    <div
      id="sticky-bar"
      data-hidden="false"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-800 bg-ink-950/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-200 data-[hidden=true]:translate-y-full motion-reduce:transition-none lg:hidden"
    >
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={site.phoneHref}
          data-track="sticky_phone"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded border border-ink-600 text-sm font-semibold text-paper-100 active:bg-ink-800"
        >
          <IconPhone className="h-5 w-5" />
          Zadzwoń
        </a>
        <a
          href="#formularz"
          data-track="sticky_cta"
          className="flex h-12 flex-1 items-center justify-center rounded bg-accent text-sm font-semibold text-white active:bg-accent-dark"
        >
          Zapytaj
        </a>
      </div>
    </div>
  );
}
