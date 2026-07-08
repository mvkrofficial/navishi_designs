import { revalidatePath } from "next/cache";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase/server";
import { SettingsRepository } from "./settings.repository";

function repo() {
  return new SettingsRepository(createSupabaseServiceClient() ?? createSupabaseServerClient());
}

export async function getSiteSettings() {
  return repo().get();
}

export async function saveSettings(formData: FormData) {
  await repo().update({
    brand_name: String(formData.get("brand_name") || "").trim(),
    hero_eyebrow: String(formData.get("hero_eyebrow") || "").trim(),
    hero_title: String(formData.get("hero_title") || "").trim(),
    hero_subtitle: String(formData.get("hero_subtitle") || "").trim(),
    whatsapp_number: String(formData.get("whatsapp_number") || "").trim(),
    instagram_url: String(formData.get("instagram_url") || "").trim() || null,
    about_text: String(formData.get("about_text") || "").trim()
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
