import { IconPhone } from "@/components/ui/icons";
import { site } from "@/data/site";

// Zastępuje dawny pełnoszerokościowy pasek (StickyMobileCta) — usunięty,
// żeby nie było dwóch konkurujących elementów kontaktowych na mobile.
// Zero JS: to zwykły link, cały efekt (puls, hover) to gotowe klasy Tailwind.
// `motion-safe:` / `motion-reduce:` respektują prefers-reduced-motion bez
// dodatkowego kodu.
export function FloatingPhoneButton() {
  return (
    <a
      href={site.phoneHref}
      aria-label={`Zadzwoń do ${site.name} — ${site.phone}`}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-black/40 transition-transform duration-200 hover:scale-105 active:scale-95 lg:hidden"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-accent opacity-75 motion-safe:animate-ping motion-reduce:hidden"
      />
      <IconPhone className="relative h-6 w-6" />
    </a>
  );
}
