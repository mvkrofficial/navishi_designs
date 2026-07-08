import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { LeadStatus } from "@/types/domain";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase/server";
import { LeadRepository } from "./lead.repository";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function publicLeadRepo() {
  const supabase = createSupabaseServiceClient();
  if (!supabase) {
    throw new Error("Supabase service client is not configured. Check Vercel env variables.");
  }
  return new LeadRepository(supabase);
}

function adminRepo() {
  return new LeadRepository(createSupabaseServiceClient() ?? createSupabaseServerClient());
}

export async function listLeads() {
  return adminRepo().list();
}

export async function createLead(formData: FormData) {
  const productId = String(formData.get("product_id") || "");

  await publicLeadRepo().create({
    customer_name: String(formData.get("customer_name") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    whatsapp: String(formData.get("whatsapp") || "").trim() || null,
    product_id: uuidPattern.test(productId) ? productId : null,
    order_type: String(formData.get("order_type") || "WhatsApp order"),
    notes: String(formData.get("notes") || "").trim() || null,
    status: "new"
  });

  revalidatePath("/admin/leads");
  redirect("/?enquiry=sent#orders");
}

export async function updateLeadStatus(formData: FormData) {
  await adminRepo().updateStatus(
    String(formData.get("id")),
    String(formData.get("status")) as LeadStatus
  );
  revalidatePath("/admin/leads");
}
