import Image from "next/image";
import { signInAction } from "@/app/actions/catalog.actions";

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <main className="login-page">
      <form className="panel login-card form-grid" action={signInAction}>
        <div className="full">
          <Image className="hero-logo" src="/images/navishi-logo.png" alt="Navishi Designs logo" width={180} height={180} />
          <p className="eyebrow">Admin login</p>
          <h1>Navishi Designs</h1>
          {searchParams.error ? <p className="muted">{searchParams.error}</p> : null}
        </div>
        <label className="full">
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="full">
          Password
          <input name="password" type="password" autoComplete="current-password" required />
        </label>
        <div className="actions full">
          <button className="button primary" type="submit">
            Sign in
          </button>
        </div>
      </form>
    </main>
  );
}
