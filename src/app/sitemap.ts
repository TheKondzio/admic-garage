import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { confirmedServices } from "@/data/services";
import { localSeoPages } from "@/data/localSeo";
import { getAllPublishedSlugs } from "@/lib/supabase/publicProjects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/uslugi`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/realizacje`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/obszar-dzialania`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/kontakt`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/polityka-prywatnosci`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/polityka-cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Tylko potwierdzone usługi — podstrony "do potwierdzenia" (confirmed: false)
  // mają robots: { index: false } i celowo nie trafiają do sitemap.
  const serviceRoutes: MetadataRoute.Sitemap = confirmedServices.map((s) => ({
    url: `${site.url}/uslugi/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Realizacje — pobrane z bazy (tylko opublikowane), żeby nowe wpisy
  // dodane w panelu trafiały do sitemapy bez ponownego builda.
  const projectSlugs = await getAllPublishedSlugs();
  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${site.url}/realizacje/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  // Lokalne podstrony SEO (kodowanie + detailing per miasto).
  const localSeoRoutes: MetadataRoute.Sitemap = localSeoPages.map((p) => ({
    url: `${site.url}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...localSeoRoutes];
}
