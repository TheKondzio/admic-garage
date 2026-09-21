import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// Klient używany w Server Components / Server Actions — odczytuje sesję
// zalogowanego użytkownika z cookies. Używa anon key (nie service role) —
// więc nadal podlega RLS jako zalogowany użytkownik, tak jak być powinno.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Wywołane z Server Component (nie z akcji/route handlera) —
            // middleware.ts i tak odświeży sesję przy następnym żądaniu,
            // więc ten błąd jest bezpieczny do zignorowania.
          }
        },
      },
    }
  );
}
