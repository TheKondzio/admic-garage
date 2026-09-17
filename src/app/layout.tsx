import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { confirmedServices } from "@/data/services";
import { GoogleTag } from "@/components/cookies/GoogleTag";
import { CookieConsentBanner } from "@/components/cookies/CookieConsentBanner";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin", "latin-ext"], variable: "--font-sora", weight: ["600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ADMIC GARAGE — Kodowanie samochodowe, multimedia, detailing | Kraków",
    template: "%s | ADMIC GARAGE",
  },
  description:
    "Kodowanie samochodowe (BMW, MINI, VAG, Mercedes-Benz), CarPlay i Android Auto, retrofit oraz mycie detailingowe z dojazdem do klienta w Krakowie i okolicy. Obsługujemy też Wadowice i Kalwarię Zebrzydowską — naszą bazę.",
  keywords: [
    "kodowanie samochodowe Kraków",
    "kodowanie BMW Kraków",
    "kodowanie MINI Kraków",
    "kodowanie VAG Kraków",
    "kodowanie Mercedes Kraków",
    "CarPlay Kraków",
    "retrofit samochodowy Kraków",
    "detailing Kraków",
    "montaż CarPlay Kraków",
    "konwersja auta z USA",
    "detailing Kalwaria Zebrzydowska",
  ],
  authors: [{ name: "ADMIC GARAGE" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: site.url,
    siteName: site.name,
    title: "ADMIC GARAGE — Kodowanie samochodowe, multimedia, detailing | Kraków",
    description:
      "Kodowanie samochodowe (BMW, MINI, VAG, Mercedes-Benz), CarPlay, retrofit i mycie detailingowe z dojazdem do klienta. Kraków i okolice, także Wadowice i Kalwaria Zebrzydowska.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ADMIC GARAGE — kodowanie samochodowe, multimedia, detailing" }], // TODO: dodać docelowy obraz 1200x630
  },
  twitter: {
    card: "summary_large_image",
    title: "ADMIC GARAGE — Kodowanie samochodowe, multimedia, detailing",
    description: "Kodowanie samochodowe, CarPlay, retrofit i mycie detailingowe z dojazdem do klienta.",
  },
  robots: { index: true, follow: true },
  // TODO: po podłączeniu Google Search Console wklej kod weryfikacyjny, np.:
  // verification: { google: "TWÓJ_KOD_WERYFIKACYJNY" },
};

// LocalBusiness — dane zgodne wyłącznie z tym, co jest realnie oferowane i podane
// na stronie (bez wymyślonych ocen, adresu warsztatu czy współrzędnych).
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  areaServed: site.serviceArea.areas.map((area) => ({
    "@type": "Place",
    name: area,
  })),
  address: {
    "@type": "PostalAddress",
    addressLocality: site.base.city,
    addressCountry: "PL",
  },
  openingHours: "Mo-Su 08:00-20:00",
  sameAs: [site.social.instagram, site.social.facebook],
  makesOffer: confirmedServices.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.tileTitle,
      description: service.metaDescription ?? service.tileDescription,
      url: `${site.url}/uslugi/${service.slug}`,
    },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
        <GoogleTag />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
