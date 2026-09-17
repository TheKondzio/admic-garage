import type { FaqItem } from "@/types";

// Globalne FAQ (homepage pokazuje pierwsze 4 — patrz components/sections/Faq.tsx —
// pełna lista jest na /faq). Celowo neutralne pod kątem marek: pracujemy z
// BMW, MINI, VAG i Mercedes-Benz (kodowanie) oraz praktycznie każdą marką
// (CarPlay przez box, detailing) — żadna pojedyncza marka nie jest tu
// przedstawiana jako jedyna obsługiwana. Szczegółowe pytania techniczne per
// marka/usługa są na dedykowanych podstronach (np. /uslugi/kodowanie-samochodowe#faq).
export const faqItems: FaqItem[] = [
  {
    question: "Czy dojeżdżacie do Krakowa, Wadowic i Kalwarii Zebrzydowskiej?",
    answer:
      "Tak — Kraków i okolice to nasz priorytet, pracujemy tam na co dzień. Dojeżdżamy też regularnie do Wadowic, a nasza baza to Kalwaria Zebrzydowska. Przyjeżdżamy pod Twój dom, biuro lub parking — Ty nie musisz nigdzie jechać. Dojazd w dalsze miejsce jest możliwy po wcześniejszym uzgodnieniu telefonicznym.",
  },
  {
    question: "Jakie marki i modele obsługujecie?",
    answer:
      "W zakresie kodowania pracujemy z BMW, MINI, autami z grupy VAG (Volkswagen, Audi, Škoda, SEAT) oraz Mercedes-Benz — zakres dostępnych funkcji zależy od modelu i zastosowanej elektroniki. Montaż CarPlay/Android Auto przez box oraz mycie detailingowe wykonujemy praktycznie niezależnie od marki. Jeśli nie jesteś pewny, czy Twoje auto się kwalifikuje — zadzwoń, chętnie doradzimy.",
  },
  {
    question: "Jak sprawdzić, czy w moim aucie zadziała CarPlay?",
    answer:
      "Zależy to od marki, modelu i zastosowanej jednostki multimedialnej. Wystarczy podać nam te dane — telefonicznie potwierdzimy, czy CarPlay da się aktywować przez kodowanie, czy potrzebny będzie montaż boxu CarPlay.",
  },
  {
    question: "Czy kodowanie i przeróbki są bezpieczne i legalne?",
    answer:
      "Tak. Aktywujemy wyłącznie funkcje fabrycznie wbudowane w auto przez producenta, a wszystkie montaże i konwersje wykonujemy profesjonalnym, certyfikowanym sprzętem. Procedury są odwracalne i nie wpływają negatywnie na gwarancję ani działanie pojazdu.",
  },
  {
    question: "Co jeśli moje auto nie obsługuje aktywacji CarPlay przez kodowanie?",
    answer:
      "W jednostkach multimedialnych, które nie obsługują natywnej aktywacji CarPlay przez kodowanie, montujemy dedykowany box CarPlay / Android Auto — zewnętrzny interfejs podłączany do oryginalnego ekranu, bez ingerencji w wygląd deski rozdzielczej. Ten wariant montujemy niezależnie od marki auta.",
  },
  {
    question: "Jak przygotować się do wyceny?",
    answer:
      "Wystarczy, że podasz markę, model i rocznik samochodu oraz to, co chcesz osiągnąć (np. CarPlay, konkretna ukryta funkcja, zakres detailingu). Na tej podstawie przygotujemy orientacyjną wycenę i zaproponujemy termin.",
  },
  {
    question: "Jak wygląda ustalenie terminu i miejsca?",
    answer:
      "Po ustaleniu zakresu usługi wspólnie wybieramy dogodny termin oraz miejsce — najczęściej Twój dom, biuro lub parking w Krakowie i okolicy. Dalsze lokalizacje ustalamy indywidualnie telefonicznie.",
  },
];
