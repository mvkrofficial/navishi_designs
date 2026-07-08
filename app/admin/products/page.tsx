import Image from "next/image";
import { MediaForms } from "@/components/admin/media-form";
import { ProductForm } from "@/components/admin/product-form";
import { listCategories } from "@/features/categories/category.service";
import { listAdminProducts } from "@/features/products/product.service";
import { formatPrice } from "@/lib/utils/format";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([listAdminProducts(), listCategories()]);

  return (
    <>
      <div className="admin-header">
        <div>
          <p className="eyebrow">Catalogue CMS</p>
          <h1>Products</h1>
        </div>
      </div>
      <section className="two-column">
        <div className="grid">
          <ProductForm categories={categories} />
          <MediaForms products={products} />
        </div>
        <div className="grid">
          {products.map((product) => (
            <article className="card" key={product.id}>
              <div className="card-body">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">{product.categories?.name || "Uncategorized"}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <span className="status-pill">{product.is_active ? "active" : "hidden"}</span>
                </div>
                <p>{product.description}</p>
                <p className="price">{formatPrice(product.price_from)}</p>
                <div className="grid">
                  {product.product_media?.map((media) =>
                    media.media_type === "video" ? (
                      <video key={media.id} className="product-media" src={media.public_url} muted />
                    ) : (
                      <Image key={media.id} className="product-media" src={media.public_url} alt={media.alt_text || product.name} width={500} height={320} />
                    )
                  )}
                </div>
                <ProductForm product={product} categories={categories} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
