import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/site/lead-form";
import { ProductCard } from "@/components/site/product-card";
import { SiteHeader } from "@/components/site/site-header";
import { listPublicProducts } from "@/features/products/product.service";
import { getSiteSettings } from "@/features/settings/settings.service";

export default async function HomePage() {
  const [products, settings] = await Promise.all([listPublicProducts(), getSiteSettings()]);

  return (
    <div className="page-shell">
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <Image className="hero-logo" src="/images/navishi-logo.png" alt="Navishi Designs logo" width={280} height={280} />
            <p className="eyebrow">{settings.hero_eyebrow}</p>
            <h1>{settings.hero_title}</h1>
            <p>{settings.hero_subtitle}</p>
            <div className="actions">
              <Link className="button primary" href="#products">
                Shop Products
              </Link>
              <Link className="button ghost" href="#orders">
                Send Enquiry
              </Link>
            </div>
          </div>
          <Image
            className="hero-image"
            src="/images/hero-products.png"
            alt="Elegant bridal and handcrafted products arranged with gold and cream accents"
            width={1823}
            height={863}
            priority
          />
        </section>

        <section className="section alt intro">
          <div>
            <p className="eyebrow">Crafted with love</p>
            <h2>Bangles, clips, bridal accessories, and festive gifting</h2>
          </div>
          <p>{settings.about_text}</p>
        </section>

        <section className="section" id="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Featured products</p>
              <h2>Choose a design type</h2>
            </div>
          </div>
          <div className="grid product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="section alt" id="orders">
          <div className="panel order-panel">
            <div>
              <p className="eyebrow">Enquiry</p>
              <h2>Tell us what you are looking for</h2>
              <p className="panel-copy">
                Share the product, event date, quantity, colour, or custom idea. Our team will reply personally.
              </p>
            </div>
            <LeadForm products={products} />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <p>{settings.brand_name}</p>
        <Link href="#orders">Start an enquiry</Link>
      </footer>
    </div>
  );
}
