# Navishi Designs

Production-oriented catalogue and admin CMS for Navishi Designs.

## Stack

- Next.js App Router
- Supabase Postgres for data
- Supabase Auth for admin login
- Supabase Storage for product images/videos
- Vercel deployment

## Architecture

```txt
app/                    Next.js routes and server-action controllers
components/site/        Public website components
components/admin/       Admin dashboard components
features/*              Domain services and repositories
lib/supabase/           Supabase server/browser clients
supabase/schema.sql     Tables, RLS policies, seed data, storage bucket
types/domain.ts         Shared domain types
```

The UI does not talk to Supabase directly. Pages call services; services call repositories.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Without Supabase env vars, the public catalogue uses demo data and admin opens in demo mode. Real writes need Supabase configured.

## Supabase Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Create an admin user in Supabase Auth.
5. Insert that user into `profiles` with role `admin`:

```sql
insert into profiles (id, email, role)
values ('AUTH_USER_ID_HERE', 'admin@example.com', 'admin');
```

6. Add these env vars locally and in Vercel:

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Admin Features

- Login/logout
- Add/edit categories
- Add/edit products
- Add multiple images/videos per product
- Save Google Drive image/video links against products
- Upload product images/videos to Supabase Storage when storage is configured
- View and update leads
- Open WhatsApp from the lead dashboard with a prefilled reply message
- Create orders from leads
- Update website settings

## Google Drive Import

Drive links are okay for the first version. The current implementation stores Drive URLs as media records, so a product can have multiple image/video links immediately.

Full extraction can be a later workflow:

1. Admin pastes Drive folder/file link.
2. Server extracts Drive file IDs.
3. Server downloads via Google Drive API.
4. Server uploads files into Supabase Storage.
5. Database stores the Supabase file URL and metadata.

This keeps Supabase Storage as the final source of truth for public media.

## Customer Enquiry Flow

Customers do not see admin screens or WhatsApp business controls. They only submit an enquiry. Admins see the enquiry in `/admin/leads` and can click `Reply` to open WhatsApp with a prefilled message:

```txt
Hi <name>, thank you for showing interest in Navishi Designs.
I saw your enquiry for <product>.
May I know exactly what you are looking for, your preferred colour/theme, quantity, and event date?
```
