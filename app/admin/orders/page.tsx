import { createOrderAction } from "@/app/actions/catalog.actions";
import { listLeads } from "@/features/leads/lead.service";
import { listOrders } from "@/features/orders/order.service";
import { listAdminProducts } from "@/features/products/product.service";
import { formatDate } from "@/lib/utils/format";

export default async function AdminOrdersPage() {
  const [orders, leads, products] = await Promise.all([listOrders(), listLeads(), listAdminProducts()]);

  return (
    <>
      <div className="admin-header">
        <div>
          <p className="eyebrow">Confirmed work</p>
          <h1>Orders</h1>
        </div>
      </div>
      <section className="two-column">
        <form className="form-grid panel" action={createOrderAction}>
          <label>
            Lead
            <select name="lead_id">
              <option value="">No lead</option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.customer_name} - {lead.phone}
                </option>
              ))}
            </select>
          </label>
          <label>
            Product
            <select name="product_id">
              <option value="">No product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select name="status" defaultValue="draft">
              <option value="draft">Draft</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In progress</option>
              <option value="ready">Ready</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
          <label>
            Quoted price
            <input name="quoted_price" type="number" min="0" />
          </label>
          <label>
            Advance paid
            <input name="advance_paid" type="number" min="0" />
          </label>
          <label>
            Delivery date
            <input name="delivery_date" type="date" />
          </label>
          <label className="full">
            Notes
            <textarea name="notes" rows={3} />
          </label>
          <div className="actions full">
            <button className="button primary" type="submit">
              Create Order
            </button>
          </div>
        </form>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Status</th>
                <th>Quote</th>
                <th>Delivery</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{formatDate(order.created_at)}</td>
                  <td>{order.leads?.customer_name || "-"}</td>
                  <td>{order.products?.name || "-"}</td>
                  <td>{order.status}</td>
                  <td>{order.quoted_price ?? "-"}</td>
                  <td>{order.delivery_date || "-"}</td>
                </tr>
              ))}
              {!orders.length ? (
                <tr>
                  <td colSpan={6}>No orders yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
