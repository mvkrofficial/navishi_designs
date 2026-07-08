import type { SupabaseClient } from "@supabase/supabase-js";
import type { Lead, LeadStatus } from "@/types/domain";

export type LeadInput = {
  customer_name: string;
  phone: string;
  whatsapp?: string | null;
  product_id?: string | null;
  order_type: string;
  notes?: string | null;
  status?: LeadStatus;
};

export class LeadRepository {
  constructor(private readonly supabase: SupabaseClient | null) {}

  async list() {
    if (!this.supabase) return [] as Lead[];
    const { data, error } = await this.supabase
      .from("leads")
      .select("*, products(name, slug)")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as Lead[];
  }

  async create(input: LeadInput) {
    if (!this.supabase) return;
    const { error } = await this.supabase.from("leads").insert(input);
    if (error) throw new Error(error.message);
  }

  async updateStatus(id: string, status: LeadStatus) {
    if (!this.supabase) return;
    const { error } = await this.supabase.from("leads").update({ status }).eq("id", id);
    if (error) throw new Error(error.message);
  }
}
