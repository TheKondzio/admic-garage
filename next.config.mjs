/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Podmień na docelowe źródło zdjęć (np. lokalne /public/images albo CDN).
    formats: ["image/avif", "image/webp"],
    // Zdjęcia realizacji wgrywane przez panel /admin lądują w Supabase
    // Storage (zewnętrzna domena) — next/image z założenia blokuje obce
    // hosty, dopóki nie są tu wprost dopuszczone. Wzorzec z gwiazdką
    // obejmuje dowolny projekt *.supabase.co, więc działa też, gdybyś
    // kiedyś odtworzył projekt Supabase pod innym adresem.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Usługi zostały przegrupowane (patrz src/data/services.ts) — stare adresy
  // przekierowujemy na nowe, żeby żaden wcześniej udostępniony/zaindeksowany
  // link nie kończył się błędem 404.
  async redirects() {
    return [
      { source: "/uslugi/kodowanie-bmw-mini", destination: "/uslugi/kodowanie-samochodowe", permanent: true },
      { source: "/uslugi/carplay-android-auto", destination: "/uslugi/multimedia-retrofit", permanent: true },
      { source: "/uslugi/retrofit-konwersje", destination: "/uslugi/multimedia-retrofit", permanent: true },
      { source: "/uslugi/detailing", destination: "/uslugi/mycie-detailingowe", permanent: true },
      { source: "/uslugi/pranie-tapicerki", destination: "/uslugi/mycie-detailingowe", permanent: true },
      // Lista lokalnych podstron miast została skorygowana — te 3 miasta
      // zastąpiono innymi (patrz src/data/localSeo.ts). Nie ma sensownego
      // odpowiednika 1:1 między starym a nowym miastem, więc przekierowujemy
      // na katalog usług zamiast zostawiać 404.
      { source: "/detailing-i-kodowanie-oswiecim", destination: "/uslugi", permanent: true },
      { source: "/detailing-i-kodowanie-zator", destination: "/uslugi", permanent: true },
      { source: "/detailing-i-kodowanie-bielsko-biala", destination: "/uslugi", permanent: true },
    ];
  },
};

export default nextConfig;
