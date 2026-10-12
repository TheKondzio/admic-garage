import type { Metadata } from "next";
import { site } from "@/data/site";

// Domyślny obraz udostępniania (Facebook, WhatsApp, LinkedIn, X) — plik
// public/og-image.jpg, 1200x630.
export const defaultOgImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "ADMIC GARAGE — kodowanie samochodowe, multimedia, detailing",
};

type PageMetaInput = {
  title: string; // bez nazwy marki — szablon z layoutu dopisze „| ADMIC GARAGE”
  description: string;
  path: string; // np. "/uslugi" — adres kanoniczny i og:url
  absoluteTitle?: boolean; // true = tytuł wpisany w całości (bez szablonu)
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  noindex?: boolean;
};

// Jedno miejsce składające metadane podstrony. Dlaczego nie samo `title` +
// `description` w każdej stronie: Next.js NIE dziedziczy pól openGraph z layoutu
// (jeśli strona ma własny `openGraph`, zastępuje go w całości), a bez własnego
// openGraph podstrona dostawała og:url i og:title strony głównej oraz og:image
// bez pliku. Tu każdy adres dostaje własny canonical, og:url, og:title i obraz.
export function pageMetadata({ title, description, path, absoluteTitle, images, noindex }: PageMetaInput): Metadata {
  const shareTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const ogImages = images && images.length > 0 ? images : [defaultOgImage];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      locale: "pl_PL",
      siteName: site.name,
      url: `${site.url}${path}`,
      title: shareTitle,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: ogImages.map((i) => i.url),
    },
  };
}
