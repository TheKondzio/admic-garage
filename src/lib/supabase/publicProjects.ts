import { createPublicClient } from "@/lib/supabase/publicClient";
import { mapRowToProject } from "@/lib/supabase/mapProject";
import type { Project } from "@/types";

export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("realizacje")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => mapRowToProject(row));
}

export async function getPublishedProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createPublicClient();
  const { data: row, error } = await supabase
    .from("realizacje")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !row) return null;

  const { data: images } = await supabase
    .from("realizacja_images")
    .select("*")
    .eq("realizacja_id", row.id)
    .order("position", { ascending: true });

  return mapRowToProject(row, images ?? []);
}

export async function getPublishedProjectsByService(serviceSlug: string, max = 6): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("realizacje")
    .select("*")
    .eq("status", "published")
    .eq("service_slug", serviceSlug)
    .order("created_at", { ascending: false })
    .limit(max);

  if (error || !data) return [];
  return data.map((row) => mapRowToProject(row));
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("realizacje").select("slug").eq("status", "published");
  return (data ?? []).map((r) => r.slug);
}
