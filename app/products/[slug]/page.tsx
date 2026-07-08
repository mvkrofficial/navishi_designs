import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { getProductBySlug } from "@/features/products/product.service";
import { formatPrice } from "@/lib/utils/format";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="section two-column">
        <div className="grid">
          {(product.product_media?.length ? product.product_media : []).map((media) =>
            media.media_type === "video" ? (
              <video key={media.id} className="hero-image" src={media.public_url} controls />
            ) : (
              <Image
                key={media.id}
                className="hero-image"
                src={media.public_url}
                alt={media.alt_text || product.name}
                width={900}
                height={700}
              />
            )
          )}
          {!product.product_media?.length && (
            <Image className="hero-image" src="/images/hero-products.png" alt={product.name} width={900} height={700} />
          )}
        </div>
        <section className="panel">
          <p className="eyebrow">{product.categories?.name || "Product"}</p>
          <h1>{product.name}</h1>
          <p className="muted">{product.description}</p>
          <p className="price">{formatPrice(product.price_from)}</p>
          <div className="actions">
            <Link className="button primary" href={`/#orders?product=${product.id}`}>
              Enquire Now
            </Link>
            <Link className="button ghost" href="/">
              Back to Shop
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
