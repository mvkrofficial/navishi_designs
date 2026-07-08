import type { Product } from "@/types/domain";
import { addDriveMediaAction, uploadProductMediaAction } from "@/app/actions/catalog.actions";

export function MediaForms({ products }: { products: Product[] }) {
  return (
    <div className="grid">
      <form className="form-grid panel" action={uploadProductMediaAction}>
        <div className="full">
          <p className="eyebrow">Upload media</p>
          <h3>Product image/video</h3>
        </div>
        <ProductSelect products={products} />
        <label>
          Sort order
          <input name="sort_order" type="number" defaultValue={100} />
        </label>
        <label className="full">
          File
          <input name="file" type="file" accept="image/*,video/*" required />
        </label>
        <label className="full">
          Alt text
          <input name="alt_text" />
        </label>
        <div className="actions full">
          <button className="button primary" type="submit">
            Upload
          </button>
        </div>
      </form>

      <form className="form-grid panel" action={addDriveMediaAction}>
        <div className="full">
          <p className="eyebrow">Drive link</p>
          <h3>Add image/video from Google Drive</h3>
          <p className="muted">
            Good for now while we are not using S3. Use shareable links. Each product can have multiple images and videos.
          </p>
        </div>
        <ProductSelect products={products} />
        <label>
          Media type
          <select name="media_type">
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </label>
        <label className="full">
          Drive image/video URL
          <input name="drive_url" required />
        </label>
        <label>
          Sort order
          <input name="sort_order" type="number" defaultValue={100} />
        </label>
        <label>
          Alt text
          <input name="alt_text" />
        </label>
        <div className="actions full">
          <button className="button primary" type="submit">
            Add Drive Link
          </button>
        </div>
      </form>
    </div>
  );
}

function ProductSelect({ products }: { products: Product[] }) {
  return (
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
  );
}
