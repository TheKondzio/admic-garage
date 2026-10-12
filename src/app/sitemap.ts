import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { confirmedServices } from "@/data/services";
import { localSeoPages } from "@/data/localSeo";
import { getAllPublishedSlugs } from "@/lib/supabase/publicProjects";

// Sitemap odświeżana co godzinę — bez tego Next.js zamraża ją w momencie builda i
// nowe realizacje dodane w panelu nie trafiałyby do niej do następnego deployu.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/uslugi`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/realizacje`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/obszar-dzialania`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/kontakt`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/carplay-i-kodowanie-bmw`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/polityka-prywatnosci`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/polityka-cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Tylko potwierdzone usługi — podstrony "do potwierdzenia" (confirmed: false)
  // mają robots: { index: false } i celowo nie trafiają do sitemap.
  const serviceRoutes: MetadataRoute.Sitemap = confirmedServices.map((s) => ({
    url: `${site.url}/uslugi/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Realizacje — pobrane z bazy (tylko opublikowane), żeby nowe wpisy
  // dodane w panelu trafiały do sitemapy bez ponownego builda.
  const projectSlugs = await getAllPublishedSlugs();
  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${site.url}/realizacje/${slug}`,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  // Lokalne podstrony SEO (kodowanie + detailing per miasto).
  const localSeoRoutes: MetadataRoute.Sitemap = localSeoPages.map((p) => ({
    url: `${site.url}/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...localSeoRoutes];
}
