import { createBrowserClient } from "@supabase/ssr";

// Klient używany w komponentach klienckich ("use client") — np. formularz
// logowania, upload zdjęć bezpośrednio z przeglądarki do Storage.
// NEXT_PUBLIC_* zmienne są celowo publiczne — anon key jest bezpieczny do
// ujawnienia w przeglądarce, bo wszystkie realne uprawnienia egzekwuje RLS
// w bazie (patrz supabase/schema.sql), a nie ten klucz.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"
  );
}
