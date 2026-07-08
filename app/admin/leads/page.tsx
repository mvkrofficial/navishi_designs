import { updateLeadStatusAction } from "@/app/actions/catalog.actions";
import { listLeads } from "@/features/leads/lead.service";
import { formatDate } from "@/lib/utils/format";
import type { LeadStatus } from "@/types/domain";

const statuses: LeadStatus[] = ["new", "contacted", "quoted", "confirmed", "completed", "cancelled"];

function cleanWhatsappNumber(value: string | null | undefined) {
  return (value || "").replace(/\D/g, "");
}

function buildWhatsappReplyUrl({
  name,
  phone,
  product
}: {
  name: string;
  phone: string;
  product?: string;
}) {
  const message = [
    `Hi ${name}, thank you for showing interest in Navishi Designs.`,
    product ? `I saw your enquiry for ${product}.` : "I saw your enquiry.",
    "May I know exactly what you are looking for, your preferred colour/theme, quantity, and event date?"
  ].join("\n");

  return `https://wa.me/${cleanWhatsappNumber(phone)}?text=${encodeURIComponent(message)}`;
}

export default async function AdminLeadsPage() {
  const leads = await listLeads();

  return (
    <>
      <div className="admin-header">
        <div>
          <p className="eyebrow">Customer enquiries</p>
          <h1>Leads</h1>
        </div>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Type</th>
              <th>Notes</th>
              <th>WhatsApp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{formatDate(lead.created_at)}</td>
                <td>{lead.customer_name}</td>
                <td>
                  <a href={`https://wa.me/${lead.whatsapp || lead.phone}`} target="_blank" rel="noreferrer">
                    {lead.phone}
                  </a>
                </td>
                <td>{lead.products?.name || "-"}</td>
                <td>{lead.order_type}</td>
                <td>{lead.notes || "-"}</td>
                <td>
                  <a
                    className="button primary"
                    href={buildWhatsappReplyUrl({
                      name: lead.customer_name,
                      phone: lead.whatsapp || lead.phone,
                      product: lead.products?.name
                    })}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Reply
                  </a>
                </td>
                <td>
                  <form action={updateLeadStatusAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <select name="status" defaultValue={lead.status}>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button className="button ghost" type="submit">
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {!leads.length ? (
              <tr>
                <td colSpan={8}>No leads yet.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
