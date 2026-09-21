import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { LogoutButton } from "@/components/admin/LogoutButton";

// Middleware.ts już blokuje /admin/* dla niezalogowanych na poziomie
// edge'a — to tutaj to DRUGA, niezależna warstwa kontroli (typowa dobra
// praktyka: nigdy nie polegaj wyłącznie na jednym miejscu sprawdzania
// uprawnień). Dodatkowo pobiera profil (z rolą), żeby pokazać go w interfejsie.
export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-ink-950 text-paper-100">
      <header className="flex items-center justify-between border-b border-ink-800 px-5 py-4">
        <p className="font-display text-base font-bold">
          ADMIC <span className="text-accent">GARAGE</span>{" "}
          <span className="font-sans text-sm font-normal text-paper-500">— panel</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs text-paper-500">
            {profile.email} ·{" "}
            <span className="font-semibold uppercase text-paper-300">{profile.role}</span>
          </span>
          <LogoutButton />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        <AdminSidebar />
        <main className="min-w-0 flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
