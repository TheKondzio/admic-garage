import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/auth";
import { RealizacjaEditForm } from "@/components/admin/RealizacjaEditForm";

export default async function EditRealizacjaPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const profile = await getCurrentProfile();

  const { data: realizacja } = await supabase.from("realizacje").select("*").eq("id", params.id).single();
  if (!realizacja) notFound();

  const { data: images } = await supabase
    .from("realizacja_images")
    .select("*")
    .eq("realizacja_id", params.id)
    .order("position", { ascending: true });

  return (
    <RealizacjaEditForm
      realizacja={realizacja}
      images={images ?? []}
      canDelete={profile?.role === "admin"}
    />
  );
}
