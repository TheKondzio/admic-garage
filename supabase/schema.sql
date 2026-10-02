-- ============================================================================
-- ADMIC GARAGE — schemat bazy dla panelu administracyjnego
-- Uruchom całość RAZ w Supabase: Dashboard → SQL Editor → New query → wklej
-- całą zawartość tego pliku → Run.
-- ============================================================================

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- PROFILE (role użytkowników — rozszerza wbudowaną tabelę auth.users)
-- ----------------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

-- Nowe konto (założone w Supabase Auth) automatycznie dostaje wiersz w
-- profiles z rolą "editor". Rolę "admin" nadajesz sobie ręcznie SQL-em
-- (patrz README_PANEL.md, krok 4) — żaden formularz w panelu nie pozwala
-- samodzielnie zmienić sobie roli na wyższą (ochrona przed eskalacją uprawnień).
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'editor');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table profiles enable row level security;

create policy "Użytkownik widzi własny profil"
  on profiles for select
  using (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- REALIZACJE
-- ----------------------------------------------------------------------------
create table if not exists realizacje (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text,
  full_description text,
  category text not null,
  service_slug text, -- odpowiada slugowi usługi z serwisu publicznego (np. "kodowanie-samochodowe")
  vehicle_brand text,
  vehicle_model text,
  vehicle_year text,
  cover_image_url text,
  cover_image_alt text,
  before_image_url text,
  before_image_alt text,
  after_image_url text,
  after_image_alt text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  author_id uuid references profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists realizacje_status_idx on realizacje (status);
create index if not exists realizacje_category_idx on realizacje (category);
create index if not exists realizacje_service_idx on realizacje (service_slug);

-- ----------------------------------------------------------------------------
-- GALERIA ZDJĘĆ (poza zdjęciem głównym oraz przed/po)
-- ----------------------------------------------------------------------------
create table if not exists realizacja_images (
  id uuid primary key default gen_random_uuid(),
  realizacja_id uuid not null references realizacje (id) on delete cascade,
  url text not null,
  alt text not null default '',
  position int not null default 0
);

create index if not exists realizacja_images_realizacja_idx on realizacja_images (realizacja_id);

-- ----------------------------------------------------------------------------
-- FUNKCJA POMOCNICZA: sprawdza rolę zalogowanego użytkownika
-- ----------------------------------------------------------------------------
create or replace function public.current_user_role()
returns text as $$
  select role from public.profiles where id = auth.uid();
$$ language sql security definer stable;

-- ----------------------------------------------------------------------------
-- RLS: realizacje
-- Publiczność (w tym niezalogowani odwiedzający stronę) widzi WYŁĄCZNIE
-- opublikowane realizacje. Zalogowani admin/editor widzą i edytują wszystko —
-- oprócz usuwania, które jest zarezerwowane dla admina (zgodnie z briefem:
-- rola "editor" nie ma uprawnienia do usuwania).
-- ----------------------------------------------------------------------------
alter table realizacje enable row level security;

create policy "Publiczne — tylko opublikowane"
  on realizacje for select
  using (status = 'published');

create policy "Admin/editor widzi wszystko"
  on realizacje for select
  using (public.current_user_role() in ('admin', 'editor'));

create policy "Admin/editor dodaje"
  on realizacje for insert
  with check (public.current_user_role() in ('admin', 'editor'));

create policy "Admin/editor edytuje"
  on realizacje for update
  using (public.current_user_role() in ('admin', 'editor'))
  with check (public.current_user_role() in ('admin', 'editor'));

create policy "Tylko admin usuwa"
  on realizacje for delete
  using (public.current_user_role() = 'admin');

-- ----------------------------------------------------------------------------
-- RLS: realizacja_images — te same zasady, tyle że sprawdzane wprost po roli
-- (nie trzeba sprawdzać właściciela realizacji nadrzędnej — każdy admin/editor
-- może zarządzać galerią każdej realizacji, zgodnie z uproszczonym modelem
-- uprawnień z briefu; patrz uwaga w README_PANEL.md o rozszerzeniu na
-- "przydzielone treści" w przyszłości).
-- ----------------------------------------------------------------------------
alter table realizacja_images enable row level security;

create policy "Publiczne — obrazy opublikowanych realizacji"
  on realizacja_images for select
  using (
    exists (select 1 from realizacje r where r.id = realizacja_id and r.status = 'published')
  );

create policy "Admin/editor widzi wszystkie obrazy"
  on realizacja_images for select
  using (public.current_user_role() in ('admin', 'editor'));

create policy "Admin/editor zarządza obrazami"
  on realizacja_images for all
  using (public.current_user_role() in ('admin', 'editor'))
  with check (public.current_user_role() in ('admin', 'editor'));

-- ----------------------------------------------------------------------------
-- updated_at — automatyczna aktualizacja przy każdym UPDATE
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_realizacje_updated_at on realizacje;
create trigger set_realizacje_updated_at
  before update on realizacje
  for each row execute procedure public.set_updated_at();

-- ============================================================================
-- STORAGE — bucket na zdjęcia realizacji
-- Uruchom to jako osobny krok PO utworzeniu bucketu "realizacje" w
-- Supabase Dashboard → Storage → New bucket → nazwa: realizacje, Public: TAK.
-- (Public = odwiedzający stronę mogą OGLĄDAĆ zdjęcia; polityki poniżej i tak
-- ograniczają, kto może je WGRYWAĆ/USUWAĆ.)
-- ============================================================================
create policy "Publiczny odczyt zdjęć realizacji"
  on storage.objects for select
  using (bucket_id = 'realizacje');

create policy "Admin/editor wgrywa zdjęcia"
  on storage.objects for insert
  with check (
    bucket_id = 'realizacje'
    and public.current_user_role() in ('admin', 'editor')
  );

create policy "Admin/editor usuwa zdjęcia"
  on storage.objects for delete
  using (
    bucket_id = 'realizacje'
    and public.current_user_role() in ('admin', 'editor')
  );
