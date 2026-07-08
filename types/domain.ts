export type LeadStatus = "new" | "contacted" | "quoted" | "confirmed" | "completed" | "cancelled";
export type OrderStatus = "draft" | "confirmed" | "in_progress" | "ready" | "delivered" | "cancelled";
export type MediaType = "image" | "video";
export type MediaSource = "upload" | "drive_link";

export type Category = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export type ProductMedia = {
  id: string;
  product_id: string;
  media_type: MediaType;
  source_type: MediaSource;
  file_path: string | null;
  public_url: string;
  alt_text: string | null;
  sort_order: number;
  created_at?: string;
};

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string;
  price_from: number | null;
  is_customizable: boolean;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  categories?: Category | null;
  product_media?: ProductMedia[];
};

export type Lead = {
  id: string;
  customer_name: string;
  phone: string;
  whatsapp: string | null;
  product_id: string | null;
  order_type: string;
  notes: string | null;
  status: LeadStatus;
  created_at: string;
  products?: Pick<Product, "name" | "slug"> | null;
};

export type Order = {
  id: string;
  lead_id: string | null;
  product_id: string | null;
  status: OrderStatus;
  quoted_price: number | null;
  advance_paid: number | null;
  delivery_date: string | null;
  notes: string | null;
  created_at: string;
  leads?: Pick<Lead, "customer_name" | "phone"> | null;
  products?: Pick<Product, "name" | "slug"> | null;
};

export type SiteSettings = {
  id: string;
  brand_name: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  whatsapp_number: string;
  instagram_url: string | null;
  about_text: string;
};
