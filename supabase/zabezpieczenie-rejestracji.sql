-- ============================================================================
-- OPCJONALNE zabezpieczenie panelu /admin — uruchom RAZ w Supabase:
-- Dashboard → SQL Editor → New query → wklej → Run.
--
-- Problem: schemat z schema.sql nadaje KAŻDEMU nowemu kontu w Supabase Auth rolę
-- "editor", a "editor" może dodawać i edytować realizacje. Jeśli w projekcie
-- włączona jest publiczna rejestracja, obcy mógłby założyć konto i dostać
-- uprawnienia edytora.
--
-- Zalecane DWA kroki (wystarczy jeden, najlepiej oba):
-- 1) Dashboard → Authentication → Sign In / Providers (lub Settings) →
--    wyłącz "Allow new users to sign up". Konta zakładasz wtedy ręcznie
--    (Authentication → Users → Add user).
-- 2) Ten skrypt: nowe konta dostają rolę "pending" (bez żadnych uprawnień),
--    a rolę "editor"/"admin" nadajesz ręcznie.
--
-- Istniejące konta (w tym Twoje) NIE są zmieniane.
-- ============================================================================

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('admin', 'editor', 'pending'));

alter table public.profiles alter column role set default 'pending';

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'pending');
  return new;
end;
$$ language plpgsql security definer;

-- Nadanie roli ręcznie (podmień e-mail):
--   update public.profiles set role = 'editor' where email = 'ktos@example.com';
--   update public.profiles set role = 'admin'  where email = 'ty@example.com';
