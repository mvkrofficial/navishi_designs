import { revalidatePath } from "next/cache";
import type { LeadStatus } from "@/types/domain";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase/server";
import { LeadRepository } from "./lead.repository";

function publicRepo() {
  return new LeadRepository(createSupabaseServerClient());
}

function adminRepo() {
  return new LeadRepository(createSupabaseServiceClient() ?? createSupabaseServerClient());
}

export async function listLeads() {
  return adminRepo().list();
}

export async function createLead(formData: FormData) {
  await publicRepo().create({
    customer_name: String(formData.get("customer_name") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    whatsapp: String(formData.get("whatsapp") || "").trim() || null,
    product_id: String(formData.get("product_id") || "") || null,
    order_type: String(formData.get("order_type") || "WhatsApp order"),
    notes: String(formData.get("notes") || "").trim() || null,
    status: "new"
  });

  revalidatePath("/admin/leads");
}

export async function updateLeadStatus(formData: FormData) {
  await adminRepo().updateStatus(
    String(formData.get("id")),
    String(formData.get("status")) as LeadStatus
  );
  revalidatePath("/admin/leads");
}
