import type { FaqItem } from "@/types";

export type AreaStatus = "siedziba" | "priorytet" | "regularnie" | "po uzgodnieniu";

export type LocalSeoPage = {
  slug: string; // pełny segment URL, np. "detailing-i-kodowanie-wadowice"
  city: string;
  areaStatus: AreaStatus;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string[];
  faq: FaqItem[];
};

// UWAGA (decyzja redakcyjna): treść mówi o "kodowaniu samochodowym", a nie
// wyłącznie o BMW i MINI, mimo że tak sformułowano briefing — serwis
// kodowanie-samochodowe obejmuje realnie 4 marki (BMW, MINI, VAG,
// Mercedes-Benz), a wcześniej w tym projekcie celowo usunięto sformułowania
// sugerujące obsługę wyłącznie BMW/MINI. Zachowuję tu spójność z resztą
// strony, żeby nie wprowadzić z powrotem tego samego problemu.
//
// Lista miast była kilka razy korygowana na prośbę klienta — Oświęcim,
// Zator i Bielsko-Biała zostały zastąpione Wieliczką, Myślenicami i Tarnowem.
// Stare adresy przekierowują (next.config.mjs), żeby nic nie kończyło się 404.

export const localSeoPages: LocalSeoPage[] = [
  {
    slug: "detailing-i-kodowanie-krakow",
    city: "Kraków",
    areaStatus: "priorytet",
    metaTitle: "Detailing i kodowanie samochodowe Kraków",
    metaDescription:
      "Kodowanie samochodowe i mycie detailingowe w Krakowie — dojazd do klienta, pracujemy tu na co dzień. Sprawdź ofertę ADMIC GARAGE.",
    heroTitle: "Detailing i kodowanie samochodowe w Krakowie",
    heroSubtitle: "Kraków i okolice to nasz priorytet — pracujemy tu na co dzień, z pełną elastycznością terminów.",
    intro: [
      "Jeśli szukasz kodowania samochodowego lub mycia detailingowego w Krakowie, jesteśmy tu praktycznie codziennie — nie musisz czekać na „wolny termin dojazdu”, jak w przypadku dalszych lokalizacji.",
      "Obie usługi wykonujemy z dojazdem — przyjeżdżamy pod Twój dom, biuro lub parking w dogodnym dla Ciebie miejscu na terenie Krakowa i okolic.",
    ],
    faq: [
      {
        question: "Jak szybko możecie dojechać do mnie w Krakowie?",
        answer: "Kraków to nasz główny obszar działania — zwykle udaje się znaleźć termin w ciągu kilku dni, czasem szybciej. Zadzwoń, sprawdzimy najbliższy wolny termin.",
      },
      {
        question: "Czy dojazd na terenie Krakowa jest dodatkowo płatny?",
        answer: "W obrębie Krakowa i najbliższych okolic dojazd jest standardowym elementem naszej usługi — dokładne warunki potwierdzamy przy ustalaniu wyceny.",
      },
      {
        question: "Czy mogę zamówić kodowanie i detailing w jednej wizycie?",
        answer: "Tak, jeśli zakres obu usług na to pozwala, możemy je zrealizować podczas jednej wizyty — powiedz nam o tym przy pierwszym kontakcie.",
      },
    ],
  },
  {
    slug: "detailing-i-kodowanie-wadowice",
    city: "Wadowice",
    areaStatus: "regularnie",
    metaTitle: "Detailing i kodowanie samochodowe Wadowice",
    metaDescription:
      "Kodowanie samochodowe i mycie detailingowe w Wadowicach — dojeżdżamy regularnie, blisko naszej bazy w Kalwarii Zebrzydowskiej.",
    heroTitle: "Detailing i kodowanie samochodowe w Wadowicach",
    heroSubtitle: "Wadowice leżą blisko naszej bazy w Kalwarii Zebrzydowskiej — dojeżdżamy tu regularnie.",
    intro: [
      "Wadowice to jedna z lokalizacji, w których bywamy najczęściej — dzięki bliskości naszej bazy w Kalwarii Zebrzydowskiej dojazd zajmuje nam dosłownie chwilę.",
      "Oferujemy zarówno kodowanie samochodowe (aktywacja ukrytych funkcji, CarPlay, diagnostyka), jak i mycie detailingowe z praniem tapicerki — z dojazdem pod wskazany adres.",
    ],
    faq: [
      {
        question: "Czy w Wadowicach dojazd jest szybszy niż w dalszych lokalizacjach?",
        answer: "Tak — Wadowice sąsiadują z naszą bazą w Kalwarii Zebrzydowskiej, więc zwykle łatwiej dopasować termin niż przy dalszych dojazdach.",
      },
      {
        question: "Jakie marki obsługujecie w ramach kodowania?",
        answer: "Kodowanie wykonujemy dla BMW, MINI, aut z grupy VAG oraz Mercedes-Benz. Zakres funkcji zależy od modelu i zastosowanej elektroniki.",
      },
      {
        question: "Czy mogę zamówić samo pranie tapicerki, bez pełnego detailingu?",
        answer: "Tak, pranie tapicerki wykonujemy też jako samodzielną usługę, bez konieczności zamawiania pełnego zakresu mycia detailingowego.",
      },
    ],
  },
  {
    slug: "detailing-i-kodowanie-kalwaria-zebrzydowska",
    city: "Kalwaria Zebrzydowska",
    areaStatus: "siedziba",
    metaTitle: "Detailing i kodowanie samochodowe Kalwaria Zebrzydowska",
    metaDescription:
      "Kodowanie samochodowe i mycie detailingowe w Kalwarii Zebrzydowskiej — tu mieści się nasza baza. Krótki czas oczekiwania na termin.",
    heroTitle: "Detailing i kodowanie samochodowe w Kalwarii Zebrzydowskiej",
    heroSubtitle: "Kalwaria Zebrzydowska to nasza baza — tu masz nas najbliżej.",
    intro: [
      "Kalwaria Zebrzydowska to miejsce, z którego wyruszamy na każdy dojazd — jeśli mieszkasz w okolicy, czas oczekiwania na termin jest zwykle najkrótszy z całego obszaru działania.",
      "Wykonujemy tu zarówno kodowanie samochodowe, jak i mycie detailingowe — z dojazdem pod wskazany adres.",
    ],
    faq: [
      {
        question: "Czy w Kalwarii Zebrzydowskiej można umówić się szybciej niż w innych miastach?",
        answer: "Zazwyczaj tak — to nasza baza, więc logistycznie najłatwiej dopasować tu wolny termin.",
      },
      {
        question: "Czy przyjmujecie klientów stacjonarnie w Kalwarii Zebrzydowskiej?",
        answer: "Nie prowadzimy stacjonarnego punktu przyjęć — wszystkie usługi realizujemy z dojazdem pod wskazany adres, także tutaj.",
      },
      {
        question: "Jak umówić wizytę w Kalwarii Zebrzydowskiej?",
        answer: "Zadzwoń lub napisz przez formularz — podaj markę, model i rocznik auta oraz to, jakiej usługi potrzebujesz, a zaproponujemy termin.",
      },
    ],
  },
  {
    slug: "detailing-i-kodowanie-wieliczka",
    city: "Wieliczka",
    areaStatus: "po uzgodnieniu",
    metaTitle: "Detailing i kodowanie samochodowe Wieliczka",
    metaDescription:
      "Kodowanie samochodowe i mycie detailingowe w Wieliczce — dojazd po wcześniejszym uzgodnieniu telefonicznym. Sprawdź ofertę ADMIC GARAGE.",
    heroTitle: "Detailing i kodowanie samochodowe w Wieliczce",
    heroSubtitle: "Do Wieliczki dojeżdżamy po wcześniejszym uzgodnieniu terminu.",
    intro: [
      "Wieliczka sąsiaduje z Krakowem — dojeżdżamy tu po wcześniejszym uzgodnieniu telefonicznym, często przy okazji wizyty w Krakowie i najbliższej okolicy.",
      "Zakres jest taki sam jak w Krakowie czy Wadowicach — kodowanie samochodowe oraz mycie detailingowe, z dojazdem pod wskazany adres.",
    ],
    faq: [
      {
        question: "Czy dojeżdżacie do Wieliczki?",
        answer: "Tak, po wcześniejszym uzgodnieniu telefonicznym — zadzwoń, ustalimy dogodny termin.",
      },
      {
        question: "Czy dojazd do Wieliczki wpływa na cenę usługi?",
        answer: "Warunki dojazdu poza główny obszar działania ustalamy indywidualnie przy wycenie — zależy od zakresu usługi i terminu.",
      },
      {
        question: "Czy w Wieliczce można zamówić tylko jedną z usług?",
        answer: "Tak, kodowanie i detailing można zamówić osobno — nie musisz korzystać z obu naraz.",
      },
    ],
  },
  {
    slug: "detailing-i-kodowanie-myslenice",
    city: "Myślenice",
    areaStatus: "po uzgodnieniu",
    metaTitle: "Detailing i kodowanie samochodowe Myślenice",
    metaDescription:
      "Kodowanie samochodowe i mycie detailingowe w Myślenicach — dojazd po wcześniejszym uzgodnieniu telefonicznym. Sprawdź ofertę ADMIC GARAGE.",
    heroTitle: "Detailing i kodowanie samochodowe w Myślenicach",
    heroSubtitle: "Do Myślenic dojeżdżamy po wcześniejszym uzgodnieniu terminu.",
    intro: [
      "Myślenice leżą niedaleko naszej bazy w Kalwarii Zebrzydowskiej — dojeżdżamy tu po wcześniejszym uzgodnieniu telefonicznym, często łącząc wizytę z inną realizacją w okolicy.",
      "Oferujemy zarówno kodowanie samochodowe, jak i mycie detailingowe — zakres i wycenę ustalamy indywidualnie po rozmowie.",
    ],
    faq: [
      {
        question: "Czy dojeżdżacie do Myślenic?",
        answer: "Tak, po wcześniejszym uzgodnieniu telefonicznym — zadzwoń, sprawdzimy najbliższy dogodny termin.",
      },
      {
        question: "Czy w Myślenicach można zamówić tylko detailing, bez kodowania?",
        answer: "Tak, każdą z usług można zamówić osobno — nie musisz korzystać z obu naraz.",
      },
      {
        question: "Jak wygląda ustalenie terminu w Myślenicach?",
        answer: "Podajesz nam markę, model i rocznik auta oraz to, czego potrzebujesz — na tej podstawie proponujemy termin i wycenę.",
      },
    ],
  },
  {
    slug: "detailing-i-kodowanie-tarnow",
    city: "Tarnów",
    areaStatus: "po uzgodnieniu",
    metaTitle: "Detailing i kodowanie samochodowe Tarnów",
    metaDescription:
      "Kodowanie samochodowe i mycie detailingowe w Tarnowie — dojazd po wcześniejszym uzgodnieniu telefonicznym. Sprawdź ofertę ADMIC GARAGE.",
    heroTitle: "Detailing i kodowanie samochodowe w Tarnowie",
    heroSubtitle: "Do Tarnowa dojeżdżamy po wcześniejszym uzgodnieniu terminu.",
    intro: [
      "Tarnów leży dalej od naszej bazy niż większość obsługiwanych miejscowości — dojeżdżamy tu po wcześniejszym uzgodnieniu telefonicznym, najlepiej z odpowiednim wyprzedzeniem.",
      "Zakres usług jest identyczny jak bliżej naszej bazy: kodowanie samochodowe oraz mycie detailingowe, z dojazdem pod wskazany adres.",
    ],
    faq: [
      {
        question: "Czy dojeżdżacie do Tarnowa?",
        answer: "Tak, po wcześniejszym uzgodnieniu telefonicznym — zadzwoń, ustalimy dogodny termin.",
      },
      {
        question: "Czy dojazd do Tarnowa wydłuża czas oczekiwania na termin?",
        answer: "Może się zdarzyć, że termin w dalszej lokalizacji trzeba dopasować do innych realizacji w okolicy — im wcześniej się odezwiesz, tym łatwiej to zaplanować.",
      },
      {
        question: "Czy w Tarnowie obsługujecie inne marki niż BMW i MINI?",
        answer: "Tak — kodujemy też auta z grupy VAG oraz Mercedes-Benz, a detailing wykonujemy niezależnie od marki.",
      },
    ],
  },
];

export function getLocalSeoPageBySlug(slug: string): LocalSeoPage | undefined {
  return localSeoPages.find((p) => p.slug === slug);
}
