import { saveCategoryAction } from "@/app/actions/catalog.actions";
import { listCategories } from "@/features/categories/category.service";

export default async function AdminCategoriesPage() {
  const categories = await listCategories();

  return (
    <>
      <div className="admin-header">
        <div>
          <p className="eyebrow">Catalogue CMS</p>
          <h1>Categories</h1>
        </div>
      </div>
      <section className="two-column">
        <form className="form-grid panel" action={saveCategoryAction}>
          <label>
            Name
            <input name="name" required />
          </label>
          <label>
            Slug
            <input name="slug" placeholder="auto-generated if empty" />
          </label>
          <label>
            Sort order
            <input name="sort_order" type="number" defaultValue={100} />
          </label>
          <label>
            <span>
              <input name="is_active" type="checkbox" defaultChecked /> Active
            </span>
          </label>
          <div className="actions full">
            <button className="button primary" type="submit">
              Add Category
            </button>
          </div>
        </form>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>{category.sort_order}</td>
                  <td>{category.is_active ? "Active" : "Hidden"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
