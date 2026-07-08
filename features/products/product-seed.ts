import type { Category, Product, SiteSettings } from "@/types/domain";

export const demoCategories: Category[] = [
  { id: "cat-bangles", name: "Crafted Bangles", slug: "crafted-bangles", sort_order: 1, is_active: true },
  { id: "cat-clips", name: "Crafted Clips", slug: "crafted-clips", sort_order: 2, is_active: true },
  { id: "cat-bridal", name: "Bridal Sets", slug: "bridal-sets", sort_order: 3, is_active: true },
  { id: "cat-gifts", name: "Return Gifts", slug: "return-gifts", sort_order: 4, is_active: true }
];

export const demoProducts: Product[] = [
  {
    id: "prod-crafted-bangles",
    category_id: "cat-bangles",
    name: "Handcrafted Bangles",
    slug: "handcrafted-bangles",
    description: "Elegant bangles with gold detailing, festive colours, and custom bridal finishes.",
    price_from: 499,
    is_customizable: true,
    is_featured: true,
    is_active: true,
    sort_order: 1,
    categories: demoCategories[0],
    product_media: [{ id: "media-1", product_id: "prod-crafted-bangles", media_type: "image", source_type: "upload", file_path: null, public_url: "/images/hero-products.png", alt_text: "Handcrafted bangles", sort_order: 1 }]
  },
  {
    id: "prod-crafted-clips",
    category_id: "cat-clips",
    name: "Crafted Hair Clips",
    slug: "crafted-hair-clips",
    description: "Decorative clips for weddings, haldi, mehendi, birthdays, and festive gifting.",
    price_from: 199,
    is_customizable: true,
    is_featured: true,
    is_active: true,
    sort_order: 2,
    categories: demoCategories[1],
    product_media: [{ id: "media-2", product_id: "prod-crafted-clips", media_type: "image", source_type: "upload", file_path: null, public_url: "/images/hero-products.png", alt_text: "Crafted hair clips", sort_order: 1 }]
  },
  {
    id: "prod-bridal-accessory-set",
    category_id: "cat-bridal",
    name: "Bridal Accessory Set",
    slug: "bridal-accessory-set",
    description: "Curated bridal pieces for event themes, outfit matching, and premium gifting.",
    price_from: 2499,
    is_customizable: true,
    is_featured: true,
    is_active: true,
    sort_order: 3,
    categories: demoCategories[2],
    product_media: [{ id: "media-3", product_id: "prod-bridal-accessory-set", media_type: "image", source_type: "upload", file_path: null, public_url: "/images/hero-products.png", alt_text: "Bridal accessory set", sort_order: 1 }]
  },
  {
    id: "prod-custom-return-gifts",
    category_id: "cat-gifts",
    name: "Custom Return Gifts",
    slug: "custom-return-gifts",
    description: "Simple, graceful pieces for weddings, poojas, and family functions.",
    price_from: 149,
    is_customizable: true,
    is_featured: false,
    is_active: true,
    sort_order: 4,
    categories: demoCategories[3],
    product_media: [{ id: "media-4", product_id: "prod-custom-return-gifts", media_type: "image", source_type: "upload", file_path: null, public_url: "/images/hero-products.png", alt_text: "Custom return gifts", sort_order: 1 }]
  }
];

export const demoSettings: SiteSettings = {
  id: "site",
  brand_name: "Navishi Designs",
  hero_eyebrow: "Handcrafted bridal elegance",
  hero_title: "Navishi Designs",
  hero_subtitle: "Premium handmade bangles, clips, bridal accessories, and festive gifts.",
  whatsapp_number: "919999999999",
  instagram_url: null,
  about_text: "Navishi Designs creates handcrafted accessories and gifting pieces for meaningful celebrations."
};
