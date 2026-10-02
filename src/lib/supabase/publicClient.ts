import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Używany WYŁĄCZNIE do publicznych, anonimowych odczytów (opublikowane
// realizacje) — celowo NIE korzysta z cookies() jak src/lib/supabase/server.ts.
// next/headers cookies() automatycznie wymusza pełne dynamiczne renderowanie
// całej trasy w Next.js App Router — dla stron publicznych (homepage, /uslugi)
// to niepotrzebna utrata statycznego generowania/ISR, bo te zapytania i tak
// nie zależą od sesji użytkownika (widoczność danych pilnuje RLS w bazie:
// "Publiczne — tylko opublikowane", patrz supabase/schema.sql).
//
// Nie używaj tego klienta do niczego związanego z zalogowanym użytkownikiem
// (panel /admin) — tam zawsze src/lib/supabase/server.ts.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key",
    { auth: { persistSession: false } }
  );
}
