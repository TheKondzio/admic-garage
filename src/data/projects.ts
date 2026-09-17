import type { Project, ProjectCategory } from "@/types";

export const projectCategories: ProjectCategory[] = [
  "Kodowanie samochodowe",
  "Multimedia & Retrofit",
  "Mycie detailingowe",
  "Inne",
];

// Realizacje są celowo puste — pokazujemy uczciwy placeholder zamiast
// wymyślonych zdjęć. Żeby dodać prawdziwą realizację:
// 1) wrzuć zdjęcia do /public/images/projects/<slug>/
// 2) dopisz obiekt do tej tablicy — pola `category` i `service` (slug z
//    services.ts) decydują, gdzie realizacja się pojawi: w /realizacje,
//    w filtrze kategorii oraz w sekcji "Realizacje związane z tą usługą"
//    na odpowiedniej podstronie usługi.
// Grid, filtrowanie, strona szczegółów /realizacje/[slug] i sekcje
// powiązanych realizacji na podstronach usług obsłużą nowy wpis automatycznie.
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
  //   images: ["/images/projects/bmw-g20-carplay-2026/1.jpg"],
  // },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByService(serviceSlug: string, max = 6): Project[] {
  return projects.filter((p) => p.service === serviceSlug).slice(0, max);
}
