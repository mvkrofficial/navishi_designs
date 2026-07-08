create extension if not exists "pgcrypto";

create type lead_status as enum ('new', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled');
create type order_status as enum ('draft', 'confirmed', 'in_progress', 'ready', 'delivered', 'cancelled');
create type media_type as enum ('image', 'video');
create type media_source as enum ('upload', 'drive_link');
create type app_role as enum ('admin', 'customer');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role app_role not null default 'customer',
  created_at timestamptz not null default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order int not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text not null default '',
  price_from numeric(12, 2),
  is_customizable boolean not null default true,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 100,
  created_at timestamptz not null default now()
);

create table product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  media_type media_type not null default 'image',
  source_type media_source not null default 'upload',
  file_path text,
  public_url text not null,
  alt_text text,
  sort_order int not null default 100,
  created_at timestamptz not null default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  whatsapp text,
  product_id uuid references products(id) on delete set null,
  order_type text not null default 'WhatsApp order',
  notes text,
  status lead_status not null default 'new',
  created_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  product_id uuid references products(id) on delete set null,
  status order_status not null default 'draft',
  quoted_price numeric(12, 2),
  advance_paid numeric(12, 2),
  delivery_date date,
  notes text,
  created_at timestamptz not null default now()
);

create table site_settings (
  id text primary key default 'site',
  brand_name text not null default 'Navishi Designs',
  hero_eyebrow text not null default 'Handcrafted bridal elegance',
  hero_title text not null default 'Navishi Designs',
  hero_subtitle text not null default 'Premium handmade bangles, clips, bridal accessories, and festive gifts.',
  whatsapp_number text not null default '919999999999',
  instagram_url text,
  about_text text not null default 'Navishi Designs creates handcrafted accessories and gifting pieces for meaningful celebrations.',
  updated_at timestamptz not null default now()
);

create index products_category_idx on products(category_id);
create index products_public_idx on products(is_active, sort_order);
create index product_media_product_idx on product_media(product_id, sort_order);
create index leads_status_idx on leads(status, created_at desc);
create index orders_status_idx on orders(status, created_at desc);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table profiles enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_media enable row level security;
alter table leads enable row level security;
alter table orders enable row level security;
alter table site_settings enable row level security;

create policy "Admins can read profiles" on profiles
  for select using (public.is_admin());

create policy "Public can read active categories" on categories
  for select using (is_active = true);
create policy "Admins manage categories" on categories
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active products" on products
  for select using (is_active = true);
create policy "Admins manage products" on products
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read media for active products" on product_media
  for select using (
    exists (
      select 1 from products
      where products.id = product_media.product_id
        and products.is_active = true
    )
  );
create policy "Admins manage media" on product_media
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can create leads" on leads
  for insert with check (true);
create policy "Admins manage leads" on leads
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins manage orders" on orders
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read site settings" on site_settings
  for select using (id = 'site');
create policy "Admins manage site settings" on site_settings
  for all using (public.is_admin()) with check (public.is_admin());

insert into site_settings (id) values ('site')
on conflict (id) do nothing;

insert into categories (name, slug, sort_order) values
  ('Crafted Bangles', 'crafted-bangles', 1),
  ('Crafted Clips', 'crafted-clips', 2),
  ('Bridal Sets', 'bridal-sets', 3),
  ('Return Gifts', 'return-gifts', 4)
on conflict (slug) do nothing;

insert into products (category_id, name, slug, description, price_from, is_customizable, is_featured, sort_order)
select id, 'Handcrafted Bangles', 'handcrafted-bangles', 'Elegant bangles with gold detailing, festive colours, and custom bridal finishes.', 499, true, true, 1
from categories where slug = 'crafted-bangles'
on conflict (slug) do nothing;

insert into products (category_id, name, slug, description, price_from, is_customizable, is_featured, sort_order)
select id, 'Crafted Hair Clips', 'crafted-hair-clips', 'Decorative clips for weddings, haldi, mehendi, birthdays, and festive gifting.', 199, true, true, 2
from categories where slug = 'crafted-clips'
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public)
values ('product-media', 'product-media', true)
on conflict (id) do nothing;

create policy "Public can read product media bucket" on storage.objects
  for select using (bucket_id = 'product-media');

create policy "Admins can manage product media bucket" on storage.objects
  for all using (bucket_id = 'product-media' and public.is_admin())
  with check (bucket_id = 'product-media' and public.is_admin());
