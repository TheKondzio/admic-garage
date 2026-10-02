import type { Project, ProjectCategory } from "@/types";
import { site } from "@/data/site";

export const projectCategories: ProjectCategory[] = [
  "Kodowanie samochodowe",
  "Multimedia & Retrofit",
  "Mycie detailingowe",
  "Inne",
];

// Dobry `alt` = opisuje KONKRETNIE co widać (marka, model, czynność), krótko,
// bez upychania słów kluczowych. Te funkcje używane są tylko wtedy, gdy
// nie wpiszesz własnego `coverImageAlt` / `beforeImageAlt` / `afterImageAlt`
// przy danej realizacji — jeśli wpiszesz własny, zawsze wygrywa Twoja wersja.
export function getCoverAlt(project: Project): string {
  return project.coverImageAlt || `${project.title} — ${site.name}`;
}

export function getBeforeAlt(project: Project): string {
  return project.beforeImageAlt || `${project.title} — przed`;
}

export function getAfterAlt(project: Project): string {
  return project.afterImageAlt || `${project.title} — po`;
}

// Realizacje są celowo puste — pokazujemy uczciwy placeholder zamiast
// wymyślonych zdjęć. Żeby dodać prawdziwą realizację:
// 1) wrzuć zdjęcia do /public/images/projects/<slug>/
// 2) dopisz obiekt do tej tablicy — pola `category` i `service` (slug z
//    services.ts) decydują, gdzie realizacja się pojawi: w /realizacje,
//    w filtrze kategorii oraz w sekcji "Realizacje związane z tą usługą"
//    na odpowiedniej podstronie usługi.
// Grid, filtrowanie, strona szczegółów /realizacje/[slug] i sekcje
// powiązanych realizacji na podstronach usług obsłużą nowy wpis automatycznie.
//
// WAŻNE: `slug` musi być unikalny dla każdej realizacji — Next.js buduje
// z niego adres URL (/realizacje/<slug>), więc dwa wpisy z tym samym
// slugiem powodują błąd builda.
export const projects: Project[] = [
  // Przykład docelowego wpisu (odkomentuj i uzupełnij, gdy pojawią się zdjęcia):
  // {
  //   slug: "bmw-g20-carplay-2026",
  //   title: "BMW G20 — aktywacja CarPlay",
  //   category: "Multimedia & Retrofit",
  //   service: "multimedia-retrofit",
  //   vehicle: "BMW G20",
  //   date: "2026-03",
  //   description: "Aktywacja Apple CarPlay przez kodowanie jednostki EVO.",
  //   coverImage: "/images/projects/bmw-g20-carplay-2026/cover.jpg",
  //   coverImageAlt: "BMW G20 — deska rozdzielcza z aktywnym Apple CarPlay",
  //   images: [
  //     { src: "/images/projects/bmw-g20-carplay-2026/1.jpg", alt: "Podłączenie jednostki EVO podczas kodowania BMW G20" },
  //     { src: "/images/projects/bmw-g20-carplay-2026/2.jpg", alt: "Ekran multimedialny BMW G20 z uruchomionym CarPlay" },
  //   ],
  // },

 ];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByService(serviceSlug: string, max = 6): Project[] {
  return projects.filter((p) => p.service === serviceSlug).slice(0, max);
}
