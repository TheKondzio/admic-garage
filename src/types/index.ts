// ============================================================================
// USŁUGI — centralny model danych. Jeden obiekt Service = jeden kafel na
// homepage/w katalogu /uslugi + (jeśli confirmed: true) jedna w pełni
// zbudowana podstrona pod /uslugi/[slug], renderowana przez wspólny szablon
// ServicePageTemplate. Nowa usługa = nowy wpis tutaj, bez nowego komponentu.
// ============================================================================

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Highlight = {
  title: string;
  description: string;
};

// Wewnętrzny podział usługi na wyraźne grupy (np. marki przy kodowaniu,
// warianty przy multimediach). `id` to kotwica (#id) na podstronie usługi —
// te same id są używane w dropdownie nawigacji, więc kliknięcie podpozycji
// w menu przewija od razu do właściwej grupy na stronie.
export type SubSection = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export type ServiceGroup = "digital" | "detailing";

export type Service = {
  slug: string;
  group: ServiceGroup;
  icon: string; // klucz do components/ui/icons.tsx
  navLabel: string; // krótka nazwa do navbaru / dropdownu

  // Czy usługa jest faktycznie potwierdzona w ofercie ADMIC GARAGE.
  // false => podstrona renderuje uczciwy placeholder ("do potwierdzenia")
  // zamiast wymyślonej treści, i jest wyłączona z sitemap/indeksowania.
  confirmed: boolean;

  // --- treść kafla (homepage + /uslugi) ---
  tileTitle: string;
  tileDescription: string; // 1 zdanie
  tileImage?: string; // ścieżka w /public, np. "/images/services/detailing/tile.jpg" — pokazuje się na kaflu (homepage + /uslugi)

  // --- treść podstrony (tylko gdy confirmed: true) ---
  heroImage?: string; // zdjęcie w tle pełnoszerokościowego hero na podstronie usługi
  heroTitle?: string;
  heroSubtitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  intro?: string[]; // proste wyjaśnienie "czym to jest", jeden akapit = jeden string
  forWho?: string[]; // "Dla kogo jest ta usługa?" — pytania/sytuacje
  whatWeDo?: string[]; // "Co dokładnie robimy?"
  scope?: string[]; // "Zakres usługi"
  highlights?: Highlight[]; // np. popularne funkcje / warianty rozwiązania
  subSectionsHeading?: string; // nagłówek nad grupami, np. "Marki i systemy"
  subSections?: SubSection[]; // wyraźny podział usługi na grupy (marki / warianty)
  compatibilityNote?: string; // zastrzeżenie o braku gwarancji kompatybilności
  benefits?: string[]; // "Co zyskujesz?" — konkrety, nie hasła
  process?: ProcessStep[]; // "Jak wygląda realizacja?"
  priceNote?: string; // zawsze "wycena indywidualna" — nigdy zmyślona cena
  faq?: FaqItem[]; // FAQ specyficzne dla tej usługi
  relatedSlugs?: string[]; // powiązane usługi (max 3 pokazywane)
};

// ============================================================================
// REALIZACJE — jedna definicja rekordu obsługuje zarówno grid w /realizacje,
// jak i stronę szczegółów /realizacje/[slug], oraz sekcję "realizacje
// związane z tą usługą" na każdej podstronie usługi (filtrowanie po `service`).
// ============================================================================

export type ProjectCategory =
  | "Kodowanie samochodowe"
  | "Multimedia & Retrofit"
  | "Mycie detailingowe"
  | "Inne";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  service?: string; // slug usługi z services.ts, do filtrowania powiązanych realizacji
  vehicle?: string; // np. "BMW G20"
  date?: string; // np. "2026-03"
  description?: string;
  coverImage?: string;
  images?: string[];
  beforeImage?: string;
  afterImage?: string;
};

export type ServiceOption = {
  value: string;
  label: string;
};

// ============================================================================
// NAWIGACJA
// ============================================================================

export type NavSubChild = {
  label: string;
  href: string;
};

export type NavChild = {
  label: string;
  href: string;
  badge?: string; // np. "wkrótce" dla usług niepotwierdzonych
  children?: NavSubChild[]; // np. marki wewnątrz "Kodowanie samochodowe"
  groupLabel?: string; // ustawione = renderuje etykietę-separator NAD tą pozycją (np. "Pozostałe usługi")
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};
