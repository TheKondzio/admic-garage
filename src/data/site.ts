// Jedno miejsce z danymi firmy. Zmiana numeru telefonu, adresu e-mail
// czy linków social media odbywa się TYLKO tutaj — reszta strony korzysta z tych stałych.

export const site = {
  name: "ADMIC GARAGE",
  url: "https://admic-garage.pl",
  phone: "+48 730 421 557",
  phoneHref: "tel:+48730421557",
  email: "admicgarage@gmail.com",
  hours: "Codziennie, godz. 8:00–20:00",
  whatsappHref:
    "https://wa.me/48730421557?text=Cze%C5%9B%C4%87%2C%20chcia%C5%82bym%20zapyta%C4%87%20o...",
  social: {
    instagram: "https://www.instagram.com/admic_garage",
    facebook: "https://www.facebook.com/share/18tiuGJb87/",
  },
  base: {
    city: "Kalwaria Zebrzydowska",
    label: "Siedziba / baza firmy",
  },
  serviceArea: {
    // Kraków to główny, priorytetowy rynek — ma prowadzić w tytułach, badge'u Hero
    // i kolejności w treści. Wadowice i Kalwaria Zebrzydowska to realnie obsługiwane,
    // ale drugoplanowe obszary (baza firmy leży w Kalwarii Zebrzydowskiej).
    primary: "Kraków i okolice",
    secondary: ["Wadowice", "Kalwaria Zebrzydowska"],
    // Pełna lista w kolejności ważności — jedno źródło prawdy dla Hero, sekcji
    // "Zasięg" i danych strukturalnych (areaServed), zawsze z Krakowem na pierwszym miejscu.
    areas: ["Kraków i okolice", "Wadowice", "Kalwaria Zebrzydowska"],
    note: "Dalsze lokalizacje — dojazd możliwy po wcześniejszym uzgodnieniu telefonicznym.",
  },
  tagline: "Kodowanie samochodowe, multimedia, retrofit i mycie detailingowe z dojazdem do klienta",
  // Logo — puste = tekstowe "ADMIC GARAGE" (obecny wygląd). Ustaw np.
  // "/images/logo.svg" albo "/images/logo.png" (plik wrzuć do /public/images/),
  // żeby Navbar i stopka automatycznie pokazały grafikę zamiast tekstu.
  logo: "/images/logo.png",
  // Mapa/grafika obszaru działania w sekcji "Zasięg działania". Puste = pokazuje
  // się placeholder z pinezką. Ustaw np. "/images/mapa-obszaru.jpg" (plik do /public/images/).
  areaMapImage: "/images/mapa.png",
  // Hero na stronie głównej — dwa niezależne, opcjonalne assety:
  // - heroBackgroundImage: duże zdjęcie w tle całej sekcji (pełnoekranowe, przyciemnione gradientem, bez rozmycia — szczegóły auta mają być wyraźnie widoczne)
  // - heroVideo: krótki film w panelu po prawej (autoplay, wyciszony, w pętli)
  // Puste = elegancki placeholder zamiast któregokolwiek z nich. Pliki wrzuć
  // do /public/images/ (zdjęcie) i /public/videos/ (film).
  heroBackgroundImage: "",
  heroVideo: "/videos/hero_film.mp4",
  // Google tag (gtag.js) — współdzielony loader dla Google Analytics (GA4)
  // i Google Ads (śledzenie konwersji). Puste = NIC się nie ładuje i baner
  // zgody na cookies się nie pokazuje (bo nie ma czego zapytać o zgodę —
  // zgodnie z polityką cookies). Żeby aktywować:
  // 1) wklej właściwe ID poniżej,
  // 2) gotowe — GoogleTag.tsx i CookieConsentBanner.tsx w src/components/cookies/
  //    same się aktywują i zaczną prosić o zgodę przed załadowaniem tagu.
  googleTag: {
    ga4Id: "", // np. "G-XXXXXXXXXX" (Google Analytics 4)
    adsId: "", // np. "AW-XXXXXXXXX" (Google Ads — śledzenie konwersji)
  },
} as const;
