import { createClient } from "@/lib/supabase/server";

export type UserProfile = {
  id: string;
  email: string | null;
  role: "admin" | "editor";
};

// Używane w Server Components (layout panelu, dashboard) i w Server Actions
// PRZED każdą operacją zapisu — to jest realna kontrola uprawnień po stronie
// serwera, niezależna od tego, co pokazuje/ukrywa interfejs.
export async function getCurrentProfile(): Promise<UserProfile | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, role")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  return profile as UserProfile;
}

export async function requireProfile(): Promise<UserProfile> {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Brak zalogowanego użytkownika.");
  return profile;
}

export async function requireAdmin(): Promise<UserProfile> {
  const profile = await requireProfile();
  if (profile.role !== "admin") {
    throw new Error("Ta operacja wymaga uprawnień administratora.");
  }
  return profile;
}
