import { revalidatePath } from "next/cache";
import type { ProductMedia } from "@/types/domain";
import { slugify } from "@/lib/utils/slug";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase/server";
import { ProductRepository } from "./product.repository";

function repo() {
  return new ProductRepository(createSupabaseServerClient());
}

function adminRepo() {
  return new ProductRepository(createSupabaseServiceClient() ?? createSupabaseServerClient());
}

export async function listPublicProducts() {
  return repo().listPublic();
}

export async function listAdminProducts() {
  return adminRepo().listAdmin();
}

export async function getProductBySlug(slug: string) {
  return repo().findBySlug(slug);
}

export async function saveProduct(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || slugify(name));
  const price = String(formData.get("price_from") || "").trim();

  const input = {
    category_id: String(formData.get("category_id") || "") || null,
    name,
    slug,
    description: String(formData.get("description") || "").trim(),
    price_from: price ? Number(price) : null,
    is_customizable: formData.get("is_customizable") === "on",
    is_featured: formData.get("is_featured") === "on",
    is_active: formData.get("is_active") === "on",
    sort_order: Number(formData.get("sort_order") || 100)
  };

  if (id) await adminRepo().update(id, input);
  else await adminRepo().create(input);

  revalidatePath("/");
  revalidatePath("/admin/products");
}

export async function addDriveMedia(formData: FormData) {
  const publicUrl = String(formData.get("drive_url") || "").trim();
  const productId = String(formData.get("product_id") || "");
  if (!publicUrl || !productId) return;

  const input: Omit<ProductMedia, "id" | "created_at"> = {
    product_id: productId,
    media_type: String(formData.get("media_type") || "image") as ProductMedia["media_type"],
    source_type: "drive_link",
    file_path: null,
    public_url: publicUrl,
    alt_text: String(formData.get("alt_text") || "").trim() || null,
    sort_order: Number(formData.get("sort_order") || 100)
  };

  await adminRepo().createMedia(input);
  revalidatePath("/admin/products");
}

export async function uploadProductMedia(formData: FormData) {
  const supabase = createSupabaseServiceClient();
  const productId = String(formData.get("product_id") || "");
  const file = formData.get("file");
  if (!supabase || !productId || !(file instanceof File) || file.size === 0) return;

  const ext = file.name.split(".").pop() || "bin";
  const path = `${productId}/${crypto.randomUUID()}.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from("product-media")
    .upload(path, file, { upsert: false, contentType: file.type });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("product-media").getPublicUrl(path);
  await new ProductRepository(supabase).createMedia({
    product_id: productId,
    media_type: file.type.startsWith("video/") ? "video" : "image",
    source_type: "upload",
    file_path: path,
    public_url: data.publicUrl,
    alt_text: String(formData.get("alt_text") || "").trim() || null,
    sort_order: Number(formData.get("sort_order") || 100)
  });

  revalidatePath("/");
  revalidatePath("/admin/products");
}
