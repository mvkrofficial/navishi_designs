import { revalidatePath } from "next/cache";
import type { OrderStatus } from "@/types/domain";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase/server";
import { OrderRepository } from "./order.repository";

function repo() {
  return new OrderRepository(createSupabaseServiceClient() ?? createSupabaseServerClient());
}

export async function listOrders() {
  return repo().list();
}

export async function createOrder(formData: FormData) {
  const quotedPrice = String(formData.get("quoted_price") || "").trim();
  const advancePaid = String(formData.get("advance_paid") || "").trim();

  await repo().create({
    lead_id: String(formData.get("lead_id") || "") || null,
    product_id: String(formData.get("product_id") || "") || null,
    status: String(formData.get("status") || "draft") as OrderStatus,
    quoted_price: quotedPrice ? Number(quotedPrice) : null,
    advance_paid: advancePaid ? Number(advancePaid) : null,
    delivery_date: String(formData.get("delivery_date") || "") || null,
    notes: String(formData.get("notes") || "").trim() || null
  });

  revalidatePath("/admin/orders");
}
