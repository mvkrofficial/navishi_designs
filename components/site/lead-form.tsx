import type { Product } from "@/types/domain";
import { createLeadAction } from "@/app/actions/catalog.actions";

export function LeadForm({ products }: { products: Product[] }) {
  return (
    <form className="form-grid" action={createLeadAction}>
      <label>
        Name
        <input name="customer_name" autoComplete="name" required />
      </label>
      <label>
        Phone / WhatsApp number
        <input name="phone" autoComplete="tel" required />
      </label>
      <label>
        Product
        <select name="product_id" required>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Order type
        <select name="order_type" required>
          <option value="WhatsApp order">WhatsApp order</option>
          <option value="Custom design enquiry">Custom design enquiry</option>
          <option value="Bulk / event order">Bulk / event order</option>
        </select>
      </label>
      <label className="full">
        Notes
        <textarea name="notes" rows={4} placeholder="Colour, size, event date, quantity, or custom idea" />
      </label>
      <div className="actions full">
        <button className="button primary" type="submit">
          Send Enquiry
        </button>
      </div>
    </form>
  );
}
