import type { SupabaseClient } from "@supabase/supabase-js";
import type { SiteSettings } from "@/types/domain";
import { demoSettings } from "@/features/products/product-seed";

export class SettingsRepository {
  constructor(private readonly supabase: SupabaseClient | null) {}

  async get() {
    if (!this.supabase) return demoSettings;
    const { data, error } = await this.supabase
      .from("site_settings")
      .select("*")
      .eq("id", "site")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (data ?? demoSettings) as SiteSettings;
  }

  async update(input: Omit<SiteSettings, "id">) {
    if (!this.supabase) return;
    const { error } = await this.supabase
      .from("site_settings")
      .upsert({ id: "site", ...input });
    if (error) throw new Error(error.message);
  }
}
