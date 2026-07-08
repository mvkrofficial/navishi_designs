import { redirect } from "next/navigation";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

export async function getCurrentAdmin() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { email: "demo-admin@navishi.local", demo: true };

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return null;
  return { email: user.email ?? "admin", demo: false };
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin && hasSupabaseEnv()) redirect("/login");
  return admin;
}

export async function signInAdmin(formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) redirect("/admin");

  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || "")
  });

  if (error) redirect("/login?error=Invalid%20admin%20login");
  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}
