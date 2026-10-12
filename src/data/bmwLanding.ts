import type { FaqItem } from "@/types";
import { site } from "@/data/site";

// Treść i konfiguracja landing page'a /carplay-i-kodowanie-bmw (ruch z Google Ads):
// aktywacja Apple CarPlay w BMW + zdalne kodowanie BMW.
//
// ZASADA: wpisane jest tu wyłącznie to, co (a) wynika z Twoich wytycznych,
// (b) już podajesz na admic-garage.pl albo (c) potwierdzają co najmniej dwa
// niezależne źródła. Nie ma tu cen, czasów realizacji, gwarancji, opinii ani
// liczby klientów.
//
// WERYFIKACJA TABELI KOMPATYBILNOŚCI (październik 2026)
// Inspiracja zawierała listy liter wersji oprogramowania (np. „NBTevo_A, C, D…”)
// ze statusem „fullscreen możliwy”. Po sprawdzeniu źródeł tych list NIE da się
// potwierdzić: sklepy z aktywacją podają różne, sprzeczne zakresy (jedno: H–M
// wymaga aktualizacji, N–O i P–Y mają pełny ekran; drugie: G–W można podnieść do
// ID6 z pełnym ekranem; trzecie: A–E to ID4, F–I to ID5/6), a dokumentacji BMW
// z takim podziałem brak. Dlatego strona NIE pokazuje statusów per litera.
// Potwierdzone w co najmniej dwóch źródłach i użyte tutaj:
//  - ID5 i ID6 to generacje NBT EVO z interfejsem w poziomych kafelkach
//    (Wikipedia: iDrive; NBT 2012, NBT EVO ID5/ID6 2016, MGU 2018);
//  - ścieżka do wersji: Nawigacja → Opcje → Ustawienia → Pozycja i wersja →
//    Informacje o wersji (nazwy mogą się różnić zależnie od wersji i języka);
//  - napis wersji NBT EVO ma postać „NBTevo_…”;
//  - w ID4 CarPlay zwykle nie jest dostępny fabrycznie i najczęściej wymaga
//    najpierw aktualizacji oprogramowania jednostki;
//  - pełny ekran zależy od wersji oprogramowania, a nie od samego rocznika.
// Jeśli kiedyś wpiszesz własne, sprawdzone w praktyce listy wersji, dodaj je do
// `versionGroups` (puste = ukryte) — pojawią się na kartach same.

export type CompatStatus = "possible" | "verify" | "update";

export type CompatCard = {
  id: string;
  numeral: string;
  name: string;
  sub: string;
  recognize: string;
  status: CompatStatus;
  statusLabel: string;
  statusText: string;
  fullScreen: string;
  fullScreenStatus?: CompatStatus;
  fullScreenLabel?: string;
  versionGroups: Array<{ versions: string; status: CompatStatus; label: string }>;
};

export const bmwLanding = {
  path: "/carplay-i-kodowanie-bmw",
  // Trafia do tematu e-maila z formularza (Formspree).
  source: "lp-bmw-carplay-kodowanie",

  meta: {
    // `absolute` omija szablon "%s | ADMIC GARAGE" z layout.tsx.
    title: "Aktywacja CarPlay i zdalne kodowanie BMW | ADMIC GARAGE",
    description:
      "Aktywacja Apple CarPlay w BMW (w tym pełny ekran, gdzie pozwala system) i zdalne kodowanie. Rozpoznaj swój iDrive i sprawdź kompatybilność auta.",
  },

  hero: {
    h1: "Apple CarPlay i zdalne kodowanie w Twoim BMW",
    lead:
      "Sprawdzamy kompatybilność Twojego BMW, zanim cokolwiek ustalimy. Aktywujemy Apple CarPlay, w tym pełny ekran tam, gdzie pozwala na to system, oraz konfigurujemy funkcje dostępne w Twoim aucie.",
    ctaPrimary: "Sprawdź kompatybilność CarPlay",
    ctaSecondary: "Zapytaj o kodowanie BMW",
    note: "Najpierw sprawdzamy Twoje auto, potem ustalamy cenę i sposób realizacji.",
    tiles: [
      {
        id: "carplay",
        title: "Apple CarPlay w BMW",
        text: "Nawigacja, muzyka i wiadomości z iPhone’a na ekranie auta. To, czy i jak się da, zależy od wersji iDrive.",
        link: "Rozpoznaj swój iDrive",
        href: "#carplay",
      },
      {
        id: "coding",
        title: "Zdalne kodowanie BMW",
        text: "Aktywacja i konfiguracja funkcji dostępnych w Twoim aucie. Zakres zależy od modelu, wyposażenia i oprogramowania.",
        link: "Zobacz, jak to działa",
        href: "#kodowanie",
      },
    ],
  },

  carplay: {
    title: "Apple CarPlay w BMW",
    intro:
      "Apple CarPlay wyświetla aplikacje z iPhone’a, m.in. nawigację, muzykę i wiadomości, na ekranie systemu multimedialnego w Twoim BMW.",
    benefits: [
      {
        title: "iPhone na ekranie auta",
        text: "Nawigacja, muzyka i wiadomości z telefonu, bez trzymania go w ręku.",
      },
      {
        title: "Pełny ekran tam, gdzie pozwala system",
        text: "W obsługiwanych konfiguracjach CarPlay może zająć cały ekran, a nie jego część.",
      },
      {
        title: "Ocena przed realizacją",
        text: "Każde BMW sprawdzamy osobno: system, wersję oprogramowania i konfigurację auta.",
      },
    ],
  },

  compat: {
    title: "Jaki masz iDrive?",
    lead:
      "Od generacji systemu zależy, czy i jak da się uruchomić CarPlay, w tym pełny ekran. Rozpoznaj swój system i wyślij nam wynik — resztą zajmiemy się my.",
    versionPath: [
      "Wejdź w Nawigację",
      "Wybierz Opcje",
      "Przejdź do Ustawień",
      "Otwórz pozycję i wersję",
      "Wybierz Informacje o wersji",
    ],
    versionPathNote:
      "Nazwy pozycji mogą się różnić zależnie od wersji systemu i języka. Nie możesz tego znaleźć? Wyślij VIN, a sprawdzimy to za Ciebie.",
    cards: [
      {
        id: "idrive-4",
        numeral: "4",
        name: "iDrive 4",
        sub: "NBT i NBT EVO ID4",
        recognize:
          "Ekran główny bez poziomych kafelków (wskazówka orientacyjna — pewną odpowiedź daje wersja z menu).",
        status: "verify" as CompatStatus,
        statusLabel: "Wymaga weryfikacji",
        statusText:
          "W tej generacji CarPlay zwykle nie jest dostępny fabrycznie. Czy da się go uruchomić w Twoim aucie, oceniamy po sprawdzeniu. Może być potrzebna aktualizacja oprogramowania jednostki.",
        fullScreen: "Pełnego ekranu nie obiecujemy bez sprawdzenia wersji oprogramowania.",
        versionGroups: [] as Array<{ versions: string; status: CompatStatus; label: string }>,
      },
      {
        id: "idrive-5-6",
        numeral: "5/6",
        name: "iDrive 5/6",
        sub: "NBT EVO ID5 i ID6",
        recognize: "Ekran główny z poziomymi kafelkami.",
        status: "possible" as CompatStatus,
        statusLabel: "Zwykle możliwe po sprawdzeniu",
        statusText:
          "W tej generacji aktywacja CarPlay jest zwykle wykonalna, ale potwierdzamy ją dla konkretnego auta.",
        fullScreen:
          "Pełny ekran zależy od wersji oprogramowania. W części jednostek wymaga najpierw aktualizacji, dlatego prosimy o wersję z menu albo VIN.",
        fullScreenStatus: "update" as CompatStatus,
        fullScreenLabel: "Pełny ekran: może wymagać aktualizacji",
        versionGroups: [] as Array<{ versions: string; status: CompatStatus; label: string }>,
      },
    ] as CompatCard[],
    cardCta: "To mój system. Sprawdź moje BMW",
    versionNote:
      "Samej wersji oprogramowania (napis w stylu „NBTevo_…”) nie oceniamy z tabelki: warunki różnią się między wersjami, więc sprawdzamy ją indywidualnie. Podaj ją w formularzu albo wyślij VIN.",
    yearNote: "Rocznik nie rozstrzyga o kompatybilności. Dwa BMW z tego samego roku mogą mieć różne systemy.",
    others: [
      {
        name: "iDrive 7 i nowsze (MGU)",
        text: "CarPlay jest zwykle dostępny fabrycznie. Jeśli go nie ma albo nie działa, sprawdzamy auto indywidualnie.",
      },
      {
        name: "Starsze systemy (np. CIC)",
        text: "Natywna aktywacja zwykle nie wchodzi w grę. Oceniamy inne rozwiązania indywidualnie.",
      },
    ],
    legendTitle: "Co oznaczają statusy",
    legend: [
      { status: "possible" as CompatStatus, label: "Zwykle możliwe po sprawdzeniu", text: "Ta generacja zwykle się nadaje, ale potwierdzamy dla Twojego auta." },
      { status: "verify" as CompatStatus, label: "Wymaga weryfikacji", text: "Zanim cokolwiek obiecamy, sprawdzamy system i konfigurację." },
      { status: "update" as CompatStatus, label: "Może wymagać aktualizacji", text: "Funkcja może wymagać wcześniejszej aktualizacji oprogramowania jednostki." },
    ],
    cta: "Sprawdź swoje BMW",
  },

  coding: {
    title: "Zdalne kodowanie BMW",
    lead:
      "Kodowanie włącza funkcje, które producent przewidział w oprogramowaniu, ale które nie są aktywne w Twoim aucie. To zmiana ustawień w sterownikach, a nie ingerencja mechaniczna.",
    scopeTitle: "Zakres zależy od Twojego BMW",
    scopeText:
      "Nie każda funkcja jest dostępna w każdym modelu, rocznik i wyposażenie mają znaczenie, a to samo auto może różnić się wersją oprogramowania. Dlatego przed realizacją sprawdzamy, co jest możliwe w Twoim egzemplarzu, i nie obiecujemy funkcji, której nie potwierdziliśmy.",
    // Wyłącznie przykłady, które już podajesz na admic-garage.pl
    // (usługa „Kodowanie samochodowe” → BMW & MINI).
    examplesTitle: "Przykładowe funkcje (zależnie od auta)",
    examples: [
      "Apple CarPlay i Android Auto, tam gdzie umożliwia to jednostka multimedialna",
      "Ukryte funkcje fabryczne, np. cyfrowy prędkościomierz",
    ],
    gearTitle: "Sprzęt i połączenie",
    gearText:
      "Wymagania zależą od modelu i metody. W wielu BMW serii F, G i I zdalne kodowanie wymaga laptopa, kabla ENET i stabilnego internetu. W innych modelach metoda może być inna. Wskażemy ją po sprawdzeniu auta, przed realizacją.",
  },

  process: {
    title: "Jak to działa?",
    steps: [
      { title: "Przesyłasz informacje o BMW", text: "Model, rocznik, wersję iDrive (jeśli ją znasz) i usługę, która Cię interesuje." },
      { title: "Sprawdzamy kompatybilność", text: "Weryfikujemy system i możliwe funkcje w Twoim aucie." },
      { title: "Ustalamy warunki", text: "Cenę, wymagania techniczne i sposób realizacji." },
      { title: "Realizujemy usługę", text: "Po uzgodnieniu warunków." },
    ],
  },

  // Sekcja z realizacjami: dane z bazy (patrz lib/supabase/bmwCodingProjects.ts),
  // pokazuje się TYLKO gdy są opublikowane realizacje kodowania marki BMW.
  projects: {
    title: "Kodowanie BMW: nasze realizacje",
    lead: "Wybrane realizacje kodowania w BMW z naszego portfolio.",
    cardLink: "Zobacz realizację",
  },

  form: {
    title: "Sprawdź moje BMW",
    lead: "Wypełnij kilka pól. Odpowiemy, co jest możliwe w Twoim aucie.",
    submit: "Sprawdź moje BMW",
    afterNote: "Wysłanie formularza nie jest zamówieniem ani zobowiązaniem do zakupu usługi.",
    idriveOptions: [
      { value: "", label: "Nie wiem" },
      { value: "idrive-4", label: "iDrive 4" },
      { value: "idrive-5-6", label: "iDrive 5/6" },
      { value: "idrive-7-plus", label: "iDrive 7 lub nowszy" },
      { value: "starszy", label: "Starszy (np. CIC)" },
    ],
    serviceOptions: [
      { value: "carplay", label: "Apple CarPlay" },
      { value: "kodowanie", label: "Kodowanie BMW" },
    ],
  },

  faqTitle: "Najczęstsze pytania",
  faq: [
    {
      question: "Skąd wiadomo, czy moje BMW jest kompatybilne z CarPlay?",
      answer:
        "To zależy od systemu multimedialnego, wersji jego oprogramowania i konfiguracji auta, a nie od samego rocznika. Rozpoznaj swój iDrive według opisu powyżej albo wyślij nam model, rocznik i VIN. Sprawdzimy to, zanim ustalimy warunki.",
    },
    {
      question: "Czy mogę mieć pełnoekranowy CarPlay?",
      answer:
        "W niektórych konfiguracjach tak, tam gdzie pozwala na to system. Zależy to od wersji oprogramowania jednostki, a czasem najpierw potrzebna jest jego aktualizacja. Czy jest to możliwe w Twoim BMW, ustalamy po sprawdzeniu auta, bez obietnic z góry.",
    },
    {
      question: "Jak sprawdzić wersję iDrive w moim BMW?",
      answer:
        "W iDrive 4 i 5/6 zwykle znajdziesz ją w Nawigacji: Opcje → Ustawienia → pozycja i wersja → Informacje o wersji. Nazwy pozycji mogą się różnić zależnie od wersji systemu i języka. Ekran główny z poziomymi kafelkami wskazuje na iDrive 5/6, ale pewną odpowiedź daje wersja z menu albo VIN.",
    },
    {
      question: "Na czym polega zdalne kodowanie BMW?",
      answer:
        "Kodowanie włącza funkcje przewidziane przez producenta w oprogramowaniu auta, ale nieaktywne w Twoim egzemplarzu. To zmiana ustawień w sterownikach, wykonywana zdalnie, jeśli Twoje BMW i dana funkcja się do tego nadają. Zakres zależy od modelu, wyposażenia i wersji oprogramowania.",
    },
    {
      question: "Jakiego sprzętu potrzebuję?",
      answer:
        "To zależy od modelu i metody. W wielu BMW serii F, G i I zdalne kodowanie wymaga laptopa, kabla ENET i stabilnego internetu, ale nie jest to jedno rozwiązanie dla wszystkich BMW. Co będzie potrzebne w Twoim przypadku, powiemy po sprawdzeniu auta i przed realizacją.",
    },
    {
      question: "Ile to kosztuje?",
      answer: `Cena zależy od auta, wybranej usługi i sposobu realizacji, dlatego nie podajemy jej bez sprawdzenia. Wyślij formularz albo zadzwoń: ${site.phone}. Cenę i warunki ustalamy po sprawdzeniu kompatybilności.`,
    },
    {
      question: "Jak wygląda realizacja?",
      answer:
        "Przesyłasz informacje o swoim BMW, my sprawdzamy kompatybilność i możliwe funkcje, potem ustalamy cenę, wymagania techniczne i sposób realizacji. Usługę wykonujemy po uzgodnieniu warunków.",
    },
  ] satisfies FaqItem[],

  finalCta: {
    title: "Sprawdź, co możesz aktywować w swoim BMW",
    text: "Wyślij model, rocznik i, jeśli znasz, wersję iDrive. Resztę sprawdzimy my.",
    button: "Sprawdź moje BMW",
  },
};

export const bmwWhatsappHref = `${site.whatsappHref.split("?")[0]}?text=${encodeURIComponent(
  "Cześć, chcę sprawdzić moje BMW pod kątem CarPlay / kodowania. Model, rocznik i wersja iDrive (jeśli znam): "
)}`;
