import type { Category, Product } from "@/types/domain";
import { saveProductAction } from "@/app/actions/catalog.actions";

export function ProductForm({
  product,
  categories
}: {
  product?: Product;
  categories: Category[];
}) {
  return (
    <form className="form-grid panel" action={saveProductAction}>
      <input type="hidden" name="id" value={product?.id ?? ""} />
      <label>
        Name
        <input name="name" defaultValue={product?.name} required />
      </label>
      <label>
        Slug
        <input name="slug" defaultValue={product?.slug} placeholder="auto-generated if empty" />
      </label>
      <label>
        Category
        <select name="category_id" defaultValue={product?.category_id ?? ""}>
          <option value="">Uncategorized</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Price from
        <input name="price_from" type="number" min="0" defaultValue={product?.price_from ?? ""} />
      </label>
      <label>
        Display order
        <input name="sort_order" type="number" defaultValue={product?.sort_order ?? 100} />
      </label>
      <label className="full">
        Description
        <textarea name="description" rows={4} defaultValue={product?.description} required />
      </label>
      <label>
        <span>
          <input name="is_customizable" type="checkbox" defaultChecked={product?.is_customizable ?? true} /> Customizable
        </span>
      </label>
      <label>
        <span>
          <input name="is_featured" type="checkbox" defaultChecked={product?.is_featured ?? false} /> Featured
        </span>
      </label>
      <label>
        <span>
          <input name="is_active" type="checkbox" defaultChecked={product?.is_active ?? true} /> Active
        </span>
      </label>
      <div className="actions full">
        <button className="button primary" type="submit">
          {product ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
