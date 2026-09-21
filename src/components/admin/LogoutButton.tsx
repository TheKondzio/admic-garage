"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded border border-ink-700 px-3 py-2 text-xs font-semibold text-paper-300 transition-colors hover:border-paper-300 hover:text-paper-100"
    >
      Wyloguj się
    </button>
  );
}
