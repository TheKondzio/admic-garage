import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    /*
     * Dopasowuje wyłącznie ścieżki /admin/* — reszta serwisu (strona
     * publiczna) w ogóle nie przechodzi przez to middleware, więc nie ma
     * żadnego wpływu na wydajność ani zachowanie reszty strony.
     */
  ],
};
