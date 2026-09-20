import type { Service, ServiceOption } from "@/types";

// Jedna usługa = jeden obiekt. `confirmed: true` renderuje pełną podstronę
// przez ServicePageTemplate. `confirmed: false` renderuje uczciwy placeholder
// (ServiceComingSoon) zamiast wymyślonej treści.
//
// STRUKTURA (przebudowana): 3 główne, potwierdzone kategorie — mycie
// detailingowe, kodowanie samochodowe (z podziałem na marki) i multimedia &
// retrofit — plus usługi lakiernicze/foliowanie jako "pozostałe", do
// potwierdzenia. Wcześniejszy podział na 5 osobnych usług (detailing +
// pranie tapicerki jako oddzielna pozycja; kodowanie ograniczone do BMW/MINI;
// CarPlay i retrofit jako dwie osobne usługi) nie odzwierciedlał realnej
// oferty — pranie tapicerki to element mycia detailingowego, a kodowanie
// obejmuje też VAG i Mercedes-Benz, nie tylko BMW/MINI.
//
// Kolejność w tej tablicy = kolejność kafli na homepage i w /uslugi.

export const services: Service[] = [
  // ============================ MYCIE DETAILINGOWE ==========================
  {
    slug: "mycie-detailingowe",
    group: "detailing",
    icon: "detailing",
    navLabel: "Mycie detailingowe",
    confirmed: true,

    tileTitle: "Mycie detailingowe",
    tileDescription: "Mycie, pielęgnacja wnętrza i pranie tapicerki.",
    tileImage: "/images/mycie_main.JPEG", // ścieżka np. "/images/services/mycie-detailingowe-tile.jpg"

    heroTitle: "Mycie detailingowe",
    heroImage: "", // ścieżka np. "/images/services/mycie-detailingowe-hero.jpg"
    heroSubtitle: "Mycie detailingowe, kompleksowe czyszczenie wnętrza oraz pranie tapicerki.",
    metaTitle: "Mycie detailingowe Kraków — mycie, wnętrze, pranie tapicerki",
    metaDescription:
      "Mycie detailingowe w Krakowie i okolicach: mycie zewnętrzne, czyszczenie wnętrza, pranie tapicerki, pielęgnacja skóry, czyszczenie felg. Dojazd do klienta.",

    intro: [
      "Mycie detailingowe w ADMIC GARAGE to kompleksowa usługa — mycie i pielęgnacja karoserii, dokładne czyszczenie wnętrza oraz głębokie pranie tapicerki w jednej wizycie.",
      "Pranie tapicerki nie jest osobną usługą, tylko naturalną częścią mycia detailingowego — dotyczy to zarówno tapicerki materiałowej, jak i foteli czy podsufitki. Możesz też zamówić samo pranie tapicerki, bez pełnego zakresu — zakres zawsze ustalamy indywidualnie.",
    ],
    forWho: [
      "Chcesz, żeby auto wyglądało i pachniało jak nowe — na zewnątrz i wewnątrz.",
      "Tapicerka ma widoczne plamy lub zabrudzenia, których nie usunie odkurzanie.",
      "Wnętrze pachnie nieprzyjemnie mimo regularnego sprzątania.",
      "Kupiłeś auto z drugiej ręki i chcesz odświeżyć je przed pierwszą jazdą.",
      "Zależy Ci na regularnej pielęgnacji auta z dojazdem, bez wizyty w myjni.",
    ],
    whatWeDo: [
      "Mycie ręczne zewnętrzne i mycie silnika",
      "Odkurzanie i czyszczenie wnętrza",
      "Pranie tapicerki, foteli i podsufitki",
      "Pielęgnacja skóry i ozonowanie wnętrza",
      "Czyszczenie felg, opon, usuwanie nieprzyjemnych zapachów",
    ],
    benefits: [
      "Czyste, zadbane wnętrze bez konieczności wizyty w myjni",
      "Usunięcie zabrudzeń i zapachów u źródła, nie ich maskowanie",
      "Zadbana skóra, felgi i tapicerka w jednej wizycie",
      "Możliwość zamówienia samego prania tapicerki, jeśli to jedyne, czego potrzebujesz",
    ],
    process: [
      { step: 1, title: "Kontakt i zakres", description: "Ustalamy zakres — pełne mycie detailingowe czy np. samo pranie tapicerki." },
      { step: 2, title: "Wycena", description: "Przedstawiamy indywidualną wycenę na podstawie stanu i wielkości auta." },
      { step: 3, title: "Termin i miejsce", description: "Umawiamy dogodny termin, z dojazdem do Ciebie." },
      { step: 4, title: "Realizacja", description: "Wykonujemy uzgodniony zakres — mycie, wnętrze, tapicerkę." },
    ],
    priceNote: "Indywidualna wycena po ustaleniu zakresu i stanu samochodu.",
    faq: [
      {
        question: "Czy pranie tapicerki to osobna usługa, czy część mycia detailingowego?",
        answer:
          "Pranie tapicerki jest standardowym elementem mycia detailingowego — wykonujemy je razem z resztą zakresu. Możesz też zamówić wyłącznie pranie tapicerki, bez mycia zewnętrznego, jeśli to jedyne, czego potrzebujesz.",
      },
      {
        question: "Czy dojeżdżacie na mycie detailingowe, czy trzeba przyjechać do Was?",
        answer: "Dojeżdżamy do Ciebie — Kraków i okolice to nasz priorytet, obsługujemy też Wadowice i okolice Kalwarii Zebrzydowskiej.",
      },
      {
        question: "Ile czasu zajmuje pranie tapicerki?",
        answer: "Zależy od wielkości auta i stanu tapicerki — dokładny czas ustalamy przy wycenie, żeby podać realny termin, a nie orientacyjny.",
      },
    ],
    relatedSlugs: ["kodowanie-samochodowe", "multimedia-retrofit"],
  },

  // ========================= KODOWANIE SAMOCHODOWE ==========================
  {
    slug: "kodowanie-samochodowe",
    group: "digital",
    icon: "code",
    navLabel: "Kodowanie samochodowe",
    confirmed: true,

    tileTitle: "Kodowanie samochodowe",
    tileDescription: "BMW • MINI • VAG • Mercedes-Benz",
    tileImage: "/images/kodowanie_main.JPEG", // ścieżka np. "/images/services/kodowanie-samochodowe-tile.jpg"

    heroTitle: "Kodowanie samochodowe",
    heroImage: "", // ścieżka np. "/images/services/kodowanie-samochodowe-hero.jpg"
    heroSubtitle: "Odblokuj funkcje, które już znajdują się w Twoim samochodzie — BMW, MINI, VAG i Mercedes-Benz.",
    metaTitle: "Kodowanie samochodowe Kraków — BMW, MINI, VAG, Mercedes-Benz",
    metaDescription:
      "Kodowanie samochodowe w Krakowie i okolicach: BMW, MINI, VAG i Mercedes-Benz. Ukryte funkcje, CarPlay, diagnostyka. Sprawdź możliwości swojego auta.",

    intro: [
      "Kodowanie to włączenie funkcji, które producent wbudował w samochód, ale nie aktywował fabrycznie w danej wersji wyposażenia — dzieje się to poprzez zmianę ustawień w komputerach pokładowych, a nie ingerencję mechaniczną.",
      "Pracujemy z czterema markami: BMW, MINI, VAG (Volkswagen, Audi, Škoda, SEAT) oraz Mercedes-Benz. Zakres dostępnych funkcji różni się między markami, modelami i zastosowaną elektroniką — dlatego poniżej rozdzieliliśmy to na grupy.",
    ],
    forWho: [
      "Masz BMW, MINI, auto z grupy VAG lub Mercedesa-Benz i chcesz sprawdzić, co jeszcze potrafi zrobić.",
      "Brakuje Ci funkcji, o której wiesz, że istnieje w Twoim modelu, ale nie jest włączona.",
      "Chcesz doposażyć auto bez wymiany podzespołów na nowe.",
      "Nie wiesz, czy dana funkcja w ogóle jest dostępna w Twoim egzemplarzu.",
    ],
    whatWeDo: [
      "Odblokowanie ukrytych funkcji fabrycznych",
      "Zmiana wybranych ustawień fabrycznych",
      "Kodowanie jednostek i modułów elektroniki",
      "Diagnostyka — odczyt i kasowanie błędów",
      "Aktywacja CarPlay / Android Auto tam, gdzie umożliwia to dana jednostka",
    ],
    subSectionsHeading: "Marki i systemy",
    subSections: [
      {
        id: "bmw-mini",
        title: "BMW & MINI",
        description:
          "Najszerszy zakres kodowania spośród obsługiwanych marek. Pracujemy z jednostkami NBT, NBT EVO, MGU i starszym CIC.",
        items: [
          "Aktywacja Apple CarPlay / Android Auto",
          "Ukryte funkcje fabryczne (m.in. digital speedometer, video in motion)",
          "Kodowanie jednostek multimedialnych",
          "Retrofity i konwersje modułów",
        ],
      },
      {
        id: "vag",
        title: "VAG",
        description:
          "Volkswagen, Audi, Škoda i SEAT — kodowanie modułów i aktywacja funkcji dostępnych w danym egzemplarzu.",
        items: [
          "Aktywacja ukrytych funkcji fabrycznych",
          "Kodowanie modułów elektroniki",
          "Diagnostyka i odczyt błędów",
        ],
      },
      {
        id: "mercedes-benz",
        title: "Mercedes-Benz",
        description: "Kodowanie i aktywacja funkcji fabrycznych dostępnych w systemach elektroniki Mercedes-Benz.",
        items: [
          "Aktywacja ukrytych funkcji fabrycznych",
          "Kodowanie modułów elektroniki",
          "Diagnostyka i odczyt błędów",
        ],
      },
    ],
    compatibilityNote:
      "Możliwości zależą od marki, konkretnego modelu, rocznika, wyposażenia oraz zastosowanej elektroniki. Przed wykonaniem usługi zawsze sprawdzamy kompatybilność telefonicznie lub na miejscu — niezależnie od marki.",
    benefits: [
      "Dostęp do funkcji fabrycznych, za które nie płacisz dodatkowo producentowi",
      "Możliwość personalizacji wybranych ustawień auta",
      "Diagnostyka, która pokazuje realny stan elektroniki",
      "Wszystkie cztery marki w jednym miejscu — nie musisz szukać osobnego warsztatu dla każdej z nich",
    ],
    process: [
      { step: 1, title: "Podajesz markę i model", description: "Marka, model, rocznik i — jeśli wiesz — zastosowana jednostka elektroniki." },
      { step: 2, title: "Sprawdzamy możliwości", description: "Mówimy wprost, co da się aktywować w Twoim egzemplarzu." },
      { step: 3, title: "Ustalamy zakres", description: "Wspólnie wybieramy, które funkcje aktywujemy." },
      { step: 4, title: "Ustalamy termin", description: "Umawiamy dogodny termin i miejsce — z dojazdem do Ciebie." },
      { step: 5, title: "Wykonujemy kodowanie", description: "Kodujemy auto i sprawdzamy działanie aktywowanych funkcji razem z Tobą." },
    ],
    priceNote: "Indywidualna wycena po sprawdzeniu marki, modelu, rocznika i zastosowanej elektroniki.",
    faq: [
      {
        question: "Czy kodujecie tylko BMW i MINI?",
        answer:
          "Nie — kodujemy też auta z grupy VAG (Volkswagen, Audi, Škoda, SEAT) oraz Mercedes-Benz. Zakres dostępnych funkcji różni się między markami — w BMW i MINI jest zwykle najszerszy, ale każdą markę i model sprawdzamy indywidualnie.",
      },
      {
        question: "Czy kodowanie jest bezpieczne i legalne?",
        answer:
          "Tak. Aktywujemy wyłącznie funkcje fabrycznie wbudowane w auto przez producenta, korzystając z profesjonalnego sprzętu. Procedury są odwracalne i nie wpływają negatywnie na gwarancję ani działanie pojazdu.",
      },
      {
        question: "Czy muszę przyjechać do warsztatu?",
        answer:
          "Nie — dojeżdżamy do Ciebie w Krakowie i okolicy, a także do Wadowic. Nasza baza to Kalwaria Zebrzydowska. Dalsze lokalizacje ustalamy indywidualnie telefonicznie.",
      },
      {
        question: "Skąd wiadomo, jakie funkcje da się aktywować w moim aucie?",
        answer:
          "Zależy to od marki, modelu, rocznika i zastosowanej elektroniki — dlatego zawsze sprawdzamy to indywidualnie, telefonicznie lub na miejscu, zanim podamy zakres i wycenę.",
      },
    ],
    relatedSlugs: ["multimedia-retrofit", "mycie-detailingowe"],
  },

  // =========================== MULTIMEDIA & RETROFIT =========================
  {
    slug: "multimedia-retrofit",
    group: "digital",
    icon: "retrofit",
    navLabel: "Multimedia & Retrofit",
    confirmed: true,

    tileTitle: "Multimedia & Retrofit",
    tileDescription: "CarPlay • Android Auto • Retrofit • Wirtualne kokpity",
    tileImage: "/images/multimedia_main.JPEG", // ścieżka np. "/images/services/multimedia-retrofit-tile.jpg"

    heroTitle: "Multimedia & Retrofit",
    heroImage: "", // ścieżka np. "/images/services/multimedia-retrofit-hero.jpg"
    heroSubtitle: "CarPlay, Android Auto, nowe ekrany i wirtualne kokpity — modernizacja multimediów Twojego auta.",
    metaTitle: "Multimedia i retrofit Kraków — CarPlay, ekrany, wirtualny kokpit",
    metaDescription:
      "Montaż CarPlay/Android Auto, wymiana ekranu multimedialnego, wirtualny kokpit i retrofit. Kraków i okolice, dojazd do klienta.",

    intro: [
      "Apple CarPlay i Android Auto to sposób na wyświetlenie ekranu telefonu na multimedialnym ekranie samochodu — nawigacja, muzyka, połączenia i wiadomości bez trzymania telefonu w ręku.",
      "Retrofit to z kolei modernizacja samochodu poprzez doposażenie go w rozwiązania, których wcześniej nie posiadał — większy ekran, cyfrowe liczniki czy wirtualny kokpit zamiast analogowych zegarów. Do tej kategorii należy też konwersja aut sprowadzonych z USA na polską specyfikację.",
      "Jeśli Twoje auto obsługuje aktywację CarPlay przez kodowanie (np. BMW, MINI, VAG, Mercedes-Benz), zobacz też stronę kodowania samochodowego — tutaj skupiamy się na rozwiązaniach sprzętowych i modernizacji, dostępnych niezależnie od marki.",
    ],
    forWho: [
      "Masz starsze auto bez fabrycznego CarPlay.",
      "Chcesz korzystać z nawigacji z telefonu zamiast fabrycznej mapy.",
      "Zależy Ci na większym, nowocześniejszym ekranie multimedialnym.",
      "Chcesz cyfrowy licznik / wirtualny kokpit zamiast analogowych zegarów.",
      "Sprowadziłeś auto z USA i potrzebujesz dopasowania do polskiej specyfikacji.",
    ],
    whatWeDo: [
      "Montaż boxu CarPlay / Android Auto — niezależnie od marki auta",
      "Wymiana ekranu multimedialnego na większy, z systemem Linux",
      "Montaż wirtualnego kokpitu / wymiana liczników na cyfrowe",
      "Retrofity modułów i doposażenie zgodnie z modelem auta",
      "Konwersja samochodu z USA na polską specyfikację",
    ],
    subSectionsHeading: "Co obejmuje ta usługa",
    subSections: [
      {
        id: "carplay",
        title: "CarPlay & Android Auto",
        description:
          "Zewnętrzny box CarPlay/Android Auto podłączany do oryginalnego ekranu — rozwiązanie dla aut bez natywnej aktywacji przez kodowanie, praktycznie niezależnie od marki i rocznika.",
        items: [
          "Montaż boxu CarPlay / Android Auto",
          "Podłączenie do oryginalnego ekranu, bez zmian w wyglądzie deski rozdzielczej",
          "Aktualizacje map i oprogramowania",
        ],
      },
      {
        id: "retrofit",
        title: "Retrofit",
        description: "Doposażenie auta w rozwiązania, których wcześniej nie miało — dobierane indywidualnie do modelu.",
        items: [
          "Wymiana ekranu multimedialnego na większy",
          "Wirtualny kokpit / cyfrowe liczniki",
          "Konwersja auta z USA na polską specyfikację",
        ],
      },
    ],
    compatibilityNote:
      "To, które rozwiązanie pasuje do Twojego auta, zależy od modelu, rocznika i obecnego wyposażenia. Sprawdzamy to zawsze przed wyceną — nie obiecujemy z góry jednego rozwiązania.",
    benefits: [
      "Wygodniejsza nawigacja z telefonu zamiast fabrycznej mapy",
      "Nowocześniejszy ekran i multimedia bez wymiany całego samochodu",
      "Czytelniejsze, cyfrowe wskazania zamiast analogowych liczników",
      "Auto z USA dopasowane do polskich warunków i przepisów",
    ],
    process: [
      { step: 1, title: "Podajesz model i rocznik", description: "Na tej podstawie wstępnie oceniamy dostępne rozwiązania." },
      { step: 2, title: "Analiza samochodu", description: "Sprawdzamy obecne wyposażenie i jednostkę multimedialną." },
      { step: 3, title: "Dobór rozwiązania i wycena", description: "Proponujemy rozwiązanie dopasowane do Twojego auta i przedstawiamy wycenę." },
      { step: 4, title: "Montaż i konfiguracja", description: "Wykonujemy montaż i konfigurujemy nowe elementy." },
      { step: 5, title: "Test", description: "Sprawdzamy działanie razem z Tobą przed odbiorem." },
    ],
    priceNote: "Indywidualna wycena — zależy od wybranego rozwiązania i zakresu retrofitu.",
    faq: [
      {
        question: "Czy CarPlay będzie działał w moim samochodzie?",
        answer:
          "Prawdopodobnie tak — box CarPlay/Android Auto montujemy praktycznie niezależnie od marki i rocznika. Jeśli Twoje auto obsługuje aktywację przez kodowanie, to tańsza opcja — sprawdzamy obie możliwości przed wyceną.",
      },
      {
        question: "Czym różni się to od kodowania?",
        answer:
          "Kodowanie aktywuje CarPlay jako funkcję fabryczną w obsługiwanych markach (zobacz stronę kodowania samochodowego). Tutaj chodzi o rozwiązania sprzętowe — box CarPlay, nowy ekran, wirtualny kokpit — dostępne niezależnie od tego, czy dana marka obsługuje kodowanie tej funkcji.",
      },
      {
        question: "Czy mój samochód nadaje się do retrofitu?",
        answer: "Zależy od modelu, rocznika i obecnego wyposażenia — to sprawdzamy indywidualnie przed wyceną.",
      },
      {
        question: "Na czym polega konwersja auta z USA?",
        answer: "To dopasowanie samochodu sprowadzonego z USA do polskiej specyfikacji — zakres ustalamy indywidualnie po sprawdzeniu konkretnego egzemplarza.",
      },
    ],
    relatedSlugs: ["kodowanie-samochodowe", "mycie-detailingowe"],
  },
];

// ==================== USŁUGI WYŁĄCZONE (na żądanie) ========================
// Wyłączone na razie na prośbę klienta — nie chce jeszcze pokazywać sekcji
// "Pozostałe usługi" w nawigacji. Żeby przywrócić dowolną z nich: wklej jej
// obiekt z powrotem do tablicy `services` powyżej (przed zamykającym `];`).
// Automatycznie pojawi się wtedy w dropdownie nawigacji (pod etykietą
// "Pozostałe usługi"), w katalogu /uslugi i — jeśli ustawisz confirmed: true
// oraz uzupełnisz treść — jako pełna podstrona.
//
// {
//   slug: "korekta-lakieru",
//   group: "detailing",
//   icon: "detailing",
//   navLabel: "Korekta lakieru",
//   confirmed: false,
//   tileTitle: "Korekta lakieru",
//   tileDescription: "Usługa do potwierdzenia.",
// },
// {
//   slug: "zabezpieczenie-lakieru",
//   group: "detailing",
//   icon: "detailing",
//   navLabel: "Zabezpieczenie lakieru",
//   confirmed: false,
//   tileTitle: "Zabezpieczenie lakieru",
//   tileDescription: "Usługa do potwierdzenia.",
// },
// {
//   slug: "przyciemnianie-szyb",
//   group: "detailing",
//   icon: "detailing",
//   navLabel: "Przyciemnianie szyb",
//   confirmed: false,
//   tileTitle: "Przyciemnianie szyb",
//   tileDescription: "Usługa do potwierdzenia.",
// },
// {
//   slug: "folie-ochronne-ppf",
//   group: "detailing",
//   icon: "detailing",
//   navLabel: "Folie ochronne PPF",
//   confirmed: false,
//   tileTitle: "Folie ochronne PPF",
//   tileDescription: "Usługa do potwierdzenia.",
// },

export const confirmedServices = services.filter((s) => s.confirmed);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(service: Service, max = 3): Service[] {
  if (!service.relatedSlugs) return [];
  return service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => Boolean(s) && s!.confirmed)
    .slice(0, max);
}

// Lista rozwijana w formularzu kontaktowym (pełny formularz na /kontakt) —
// osobna od `services`, bo tu potrzebne są warianty i marki, których nie ma
// jako oddzielnych podstron, a nie każda usługa musi tu wystąpić.
export const serviceOptions: ServiceOption[] = [
  { value: "mycie-detailingowe", label: "Mycie detailingowe" },
  { value: "pranie-tapicerki", label: "Pranie tapicerki (samodzielnie)" },
  { value: "kodowanie-bmw-mini", label: "Kodowanie — BMW / MINI" },
  { value: "kodowanie-vag", label: "Kodowanie — VAG (VW / Audi / Škoda / SEAT)" },
  { value: "kodowanie-mercedes", label: "Kodowanie — Mercedes-Benz" },
  { value: "box-carplay", label: "Montaż boxu CarPlay / Android Auto" },
  { value: "wymiana-ekranu", label: "Wymiana ekranu multimedialnego" },
  { value: "wirtualny-kokpit", label: "Wirtualny kokpit / wymiana liczników" },
  { value: "konwersja-usa", label: "Konwersja auta z USA" },
  { value: "diagnostyka", label: "Diagnostyka" },
  { value: "inne", label: "Inne / nie wiem — doradźcie" },
];
