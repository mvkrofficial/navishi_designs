import type { SupabaseClient } from "@supabase/supabase-js";
import type { Category } from "@/types/domain";
import { demoCategories } from "@/features/products/product-seed";

export type CategoryInput = Omit<Category, "id" | "created_at">;

export class CategoryRepository {
  constructor(private readonly supabase: SupabaseClient | null) {}

  async list() {
    if (!this.supabase) return demoCategories;
    const { data, error } = await this.supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as Category[];
  }

  async create(input: CategoryInput) {
    if (!this.supabase) return;
    const { error } = await this.supabase.from("categories").insert(input);
    if (error) throw new Error(error.message);
  }

  async update(id: string, input: CategoryInput) {
    if (!this.supabase) return;
    const { error } = await this.supabase.from("categories").update(input).eq("id", id);
    if (error) throw new Error(error.message);
  }
}
