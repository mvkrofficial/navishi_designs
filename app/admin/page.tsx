import Link from "next/link";
import { listCategories } from "@/features/categories/category.service";
import { listLeads } from "@/features/leads/lead.service";
import { listOrders } from "@/features/orders/order.service";
import { listAdminProducts } from "@/features/products/product.service";

export default async function AdminOverviewPage() {
  const [products, categories, leads, orders] = await Promise.all([
    listAdminProducts(),
    listCategories(),
    listLeads(),
    listOrders()
  ]);

  return (
    <>
      <div className="admin-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Admin overview</h1>
        </div>
        <Link className="button primary" href="/admin/products">
          Add products
        </Link>
      </div>
      <section className="admin-grid">
        <Metric label="Products" value={products.length} />
        <Metric label="Categories" value={categories.length} />
        <Metric label="Leads" value={leads.length} />
        <Metric label="Orders" value={orders.length} />
        <Metric label="New leads" value={leads.filter((lead) => lead.status === "new").length} />
        <Metric label="Active products" value={products.filter((product) => product.is_active).length} />
      </section>
    </>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <p>{label}</p>
    </div>
  );
}
