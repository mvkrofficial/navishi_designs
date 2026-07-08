import type { SupabaseClient } from "@supabase/supabase-js";
import type { Product, ProductMedia } from "@/types/domain";
import { demoProducts } from "./product-seed";

export type ProductInput = {
  category_id?: string | null;
  name: string;
  slug: string;
  description: string;
  price_from?: number | null;
  is_customizable: boolean;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
};

export class ProductRepository {
  constructor(private readonly supabase: SupabaseClient | null) {}

  async listPublic() {
    if (!this.supabase) return demoProducts.filter((product) => product.is_active);

    const { data, error } = await this.supabase
      .from("products")
      .select("*, categories(*), product_media(*)")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as Product[];
  }

  async listAdmin() {
    if (!this.supabase) return demoProducts;

    const { data, error } = await this.supabase
      .from("products")
      .select("*, categories(*), product_media(*)")
      .order("sort_order", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as Product[];
  }

  async findBySlug(slug: string) {
    if (!this.supabase) return demoProducts.find((product) => product.slug === slug) ?? null;

    const { data, error } = await this.supabase
      .from("products")
      .select("*, categories(*), product_media(*)")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Product | null;
  }

  async create(input: ProductInput) {
    if (!this.supabase) return;
    const { error } = await this.supabase.from("products").insert(input);
    if (error) throw new Error(error.message);
  }

  async update(id: string, input: ProductInput) {
    if (!this.supabase) return;
    const { error } = await this.supabase.from("products").update(input).eq("id", id);
    if (error) throw new Error(error.message);
  }

  async createMedia(input: Omit<ProductMedia, "id" | "created_at">) {
    if (!this.supabase) return;
    const { error } = await this.supabase.from("product_media").insert(input);
    if (error) throw new Error(error.message);
  }
}
