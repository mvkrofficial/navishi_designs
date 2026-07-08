import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Navishi Designs home">
        <Image className="brand-mark" src="/images/navishi-logo.png" alt="" width={76} height={76} />
        <span className="brand-name">Navishi Designs</span>
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        <Link href="/#products">Products</Link>
        <Link href="/#orders">Enquiry</Link>
      </nav>
    </header>
  );
}
