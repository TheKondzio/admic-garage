/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Podmień na docelowe źródło zdjęć (np. lokalne /public/images albo CDN).
    formats: ["image/avif", "image/webp"],
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
    ];
  },
};

export default nextConfig;
