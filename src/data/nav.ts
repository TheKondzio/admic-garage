import { services } from "@/data/services";
import type { NavChild } from "@/types";

// Dropdown "Usługi" — generowany z services.ts, więc struktura (w tym
// podpozycje marek/wariantów z `subSections`) jest zawsze zgodna z treścią
// podstron, bez ręcznego duplikowania listy w dwóch miejscach.
const confirmed = services.filter((s) => s.confirmed);
const unconfirmed = services.filter((s) => !s.confirmed);

const serviceChildren: NavChild[] = [
  ...confirmed.map((s) => ({
    label: s.navLabel,
    href: `/uslugi/${s.slug}`,
    children: s.subSections?.map((sub) => ({
      label: sub.title,
      href: `/uslugi/${s.slug}#${sub.id}`,
    })),
  })),
  ...unconfirmed.map((s, index) => ({
    label: s.navLabel,
    href: `/uslugi/${s.slug}`,
    badge: "wkrótce",
    // Etykieta-separator "Pozostałe usługi" nad pierwszą niepotwierdzoną
    // pozycją — oddziela je wizualnie od trzech głównych, potwierdzonych usług.
    groupLabel: index === 0 ? "Pozostałe usługi" : undefined,
  })),
];

export const navLinks = [
  { label: "Usługi", href: "/uslugi", children: serviceChildren },
  { label: "Realizacje", href: "/realizacje" },
  { label: "Jak działamy", href: "/#jak-dzialamy" },
  { label: "Obszar działania", href: "/obszar-dzialania" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];
