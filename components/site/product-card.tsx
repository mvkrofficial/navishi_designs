import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/domain";
import { formatPrice } from "@/lib/utils/format";

export function ProductCard({ product }: { product: Product }) {
  const media = product.product_media?.[0];

  return (
    <article className="card">
      {media?.media_type === "video" ? (
        <video className="product-media" src={media.public_url} muted playsInline />
      ) : (
        <Image
          className="product-media"
          src={media?.public_url || "/images/hero-products.png"}
          alt={media?.alt_text || product.name}
          width={640}
          height={420}
        />
      )}
      <div className="card-body">
        <p className="eyebrow">{product.categories?.name || "Handcrafted"}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span className="price">{formatPrice(product.price_from)}</span>
        <div className="actions">
          <Link className="button ghost" href={`/products/${product.slug}`}>
            View
          </Link>
          <Link className="button primary" href={`/#orders?product=${product.id}`}>
            Enquire
          </Link>
        </div>
      </div>
    </article>
  );
}
