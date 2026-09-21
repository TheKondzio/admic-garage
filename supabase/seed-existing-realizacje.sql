-- ============================================================================
-- Jednorazowa migracja 3 istniejących realizacji (z src/data/projects.ts) do
-- bazy. Uruchom PO schema.sql, w Supabase SQL Editor.
--
-- UWAGA: cover_image_url dla VW Atlas wskazuje na "kodowanie.jpg" — wcześniej
-- ustaliliśmy, że masz niezgodność .jpg/.jpeg do potwierdzenia. Sprawdź, czy
-- ten plik faktycznie istnieje pod /public/images/projects/kodowanie-vw-atlas/
-- (te zdjęcia ZOSTAJĄ jako zwykłe pliki w /public — migracja nie przenosi ich
-- do Supabase Storage, tylko przepisuje ścieżki do bazy; nowe realizacje
-- dodane przez panel będą już używać Storage).
-- ============================================================================

insert into realizacje (
  slug, title, category, service_slug, vehicle_brand, vehicle_model,
  short_description, cover_image_url, cover_image_alt,
  before_image_url, before_image_alt, after_image_url, after_image_alt,
  status
) values
(
  'kodowanie-vw-atlas',
  'VW Atlas — kodowanie i wymiana akumulatora',
  'Kodowanie samochodowe',
  'kodowanie-samochodowe',
  'VW', 'Atlas',
  'Kodowanie modułów oraz wymiana akumulatora w VW Atlas.',
  '/images/projects/kodowanie-vw-atlas/kodowanie.jpeg',
  'VW Atlas — kodowanie modułów sterujących na stanowisku diagnostycznym',
  null, null, null, null,
  'published'
),
(
  'wymiana-ekranu-q5',
  'Audi Q5 — wymiana ekranu',
  'Multimedia & Retrofit',
  'multimedia-retrofit',
  'Audi', 'Q5',
  'Wymiana fabrycznego ekranu na większy, z aktywacją Apple CarPlay i Android Auto.',
  '/images/projects/wymiana-ekranu-q5/glowne.jpeg',
  'Audi Q5 — duży ekran wielofunkcyjny po wymianie',
  '/images/projects/wymiana-ekranu-q5/przed.jpeg',
  'Audi Q5 — oryginalny, mniejszy ekran multimedialny przed wymianą',
  '/images/projects/wymiana-ekranu-q5/po.jpeg',
  'Audi Q5 — nowy, większy ekran zamontowany w desce rozdzielczej',
  'published'
),
(
  'kodowanie-carplay-a4',
  'Audi A4 — kodowanie CarPlay i Android Auto',
  'Kodowanie samochodowe',
  'kodowanie-samochodowe',
  'Audi', 'A4',
  'Aktywacja Apple CarPlay i Android Auto w seryjnej jednostce multimedialnej.',
  '/images/projects/kodowanie-carplay-a4/android.jpeg',
  'Audi A4 — Android Auto uruchomiony na ekranie multimedialnym',
  '/images/projects/kodowanie-carplay-a4/przed.jpeg',
  'Audi A4 — ekran multimedialny przed aktywacją CarPlay',
  '/images/projects/kodowanie-carplay-a4/po.jpeg',
  'Audi A4 — CarPlay aktywowany na ekranie po kodowaniu',
  'published'
)
on conflict (slug) do nothing;
