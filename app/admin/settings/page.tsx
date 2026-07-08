import { saveSettingsAction } from "@/app/actions/catalog.actions";
import { getSiteSettings } from "@/features/settings/settings.service";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <div className="admin-header">
        <div>
          <p className="eyebrow">Website content</p>
          <h1>Settings</h1>
        </div>
      </div>
      <form className="form-grid panel" action={saveSettingsAction}>
        <label>
          Brand name
          <input name="brand_name" defaultValue={settings.brand_name} required />
        </label>
        <label>
          WhatsApp number
          <input name="whatsapp_number" defaultValue={settings.whatsapp_number} required />
        </label>
        <label>
          Hero eyebrow
          <input name="hero_eyebrow" defaultValue={settings.hero_eyebrow} required />
        </label>
        <label>
          Hero title
          <input name="hero_title" defaultValue={settings.hero_title} required />
        </label>
        <label className="full">
          Hero subtitle
          <textarea name="hero_subtitle" rows={3} defaultValue={settings.hero_subtitle} required />
        </label>
        <label className="full">
          About text
          <textarea name="about_text" rows={4} defaultValue={settings.about_text} required />
        </label>
        <label className="full">
          Instagram URL
          <input name="instagram_url" defaultValue={settings.instagram_url ?? ""} />
        </label>
        <div className="actions full">
          <button className="button primary" type="submit">
            Save Settings
          </button>
        </div>
      </form>
    </>
  );
}
