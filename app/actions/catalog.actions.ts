"use server";

import { saveCategory } from "@/features/categories/category.service";
import { createLead, updateLeadStatus } from "@/features/leads/lead.service";
import { createOrder } from "@/features/orders/order.service";
import { addDriveMedia, saveProduct, uploadProductMedia } from "@/features/products/product.service";
import { saveSettings } from "@/features/settings/settings.service";
import { signInAdmin, signOutAdmin } from "@/features/settings/auth.service";

export async function saveCategoryAction(formData: FormData) {
  await saveCategory(formData);
}

export async function saveProductAction(formData: FormData) {
  await saveProduct(formData);
}

export async function addDriveMediaAction(formData: FormData) {
  await addDriveMedia(formData);
}

export async function uploadProductMediaAction(formData: FormData) {
  await uploadProductMedia(formData);
}

export async function createLeadAction(formData: FormData) {
  await createLead(formData);
}

export async function updateLeadStatusAction(formData: FormData) {
  await updateLeadStatus(formData);
}

export async function createOrderAction(formData: FormData) {
  await createOrder(formData);
}

export async function saveSettingsAction(formData: FormData) {
  await saveSettings(formData);
}

export async function signInAction(formData: FormData) {
  await signInAdmin(formData);
}

export async function signOutAction() {
  await signOutAdmin();
}
