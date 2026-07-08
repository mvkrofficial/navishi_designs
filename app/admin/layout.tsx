import { AdminNav } from "@/components/admin/admin-nav";
import { requireAdmin } from "@/features/settings/auth.service";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="admin-shell">
      <AdminNav email={admin?.email} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
