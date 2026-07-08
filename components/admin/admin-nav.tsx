import Image from "next/image";
import Link from "next/link";
import { signOutAction } from "@/app/actions/catalog.actions";

const links = [
  ["Overview", "/admin"],
  ["Leads", "/admin/leads"],
  ["Orders", "/admin/orders"],
  ["Products", "/admin/products"],
  ["Categories", "/admin/categories"],
  ["Settings", "/admin/settings"]
];

export function AdminNav({ email }: { email?: string }) {
  return (
    <aside className="admin-sidebar">
      <Link className="brand" href="/admin">
        <Image className="brand-mark" src="/images/navishi-logo.png" alt="" width={76} height={76} />
        <span>Admin</span>
      </Link>
      <p className="muted">{email}</p>
      <nav>
        {links.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
        <form action={signOutAction}>
          <button type="submit">Sign out</button>
        </form>
      </nav>
    </aside>
  );
}
