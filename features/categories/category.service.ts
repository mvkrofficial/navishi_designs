import { revalidatePath } from "next/cache";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils/slug";
import { CategoryRepository } from "./category.repository";

function repo() {
  return new CategoryRepository(createSupabaseServiceClient() ?? createSupabaseServerClient());
}

export async function listCategories() {
  return repo().list();
}

export async function saveCategory(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const input = {
    name,
    slug: String(formData.get("slug") || slugify(name)),
    sort_order: Number(formData.get("sort_order") || 100),
    is_active: formData.get("is_active") === "on"
  };

  if (id) await repo().update(id, input);
  else await repo().create(input);

  revalidatePath("/");
  revalidatePath("/admin/categories");
}
