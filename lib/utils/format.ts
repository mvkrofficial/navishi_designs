export function formatPrice(value: number | null) {
  if (value == null) return "Quote on request";
  return `From Rs. ${value.toLocaleString("en-IN")}`;
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
