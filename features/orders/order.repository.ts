import type { SupabaseClient } from "@supabase/supabase-js";
import type { Order, OrderStatus } from "@/types/domain";

export type OrderInput = {
  lead_id?: string | null;
  product_id?: string | null;
  status: OrderStatus;
  quoted_price?: number | null;
  advance_paid?: number | null;
  delivery_date?: string | null;
  notes?: string | null;
};

export class OrderRepository {
  constructor(private readonly supabase: SupabaseClient | null) {}

  async list() {
    if (!this.supabase) return [] as Order[];
    const { data, error } = await this.supabase
      .from("orders")
      .select("*, leads(customer_name, phone), products(name, slug)")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as Order[];
  }

  async create(input: OrderInput) {
    if (!this.supabase) return;
    const { error } = await this.supabase.from("orders").insert(input);
    if (error) throw new Error(error.message);
  }
}
