export function formatDate(dateString) {
  return new Date(Date.parse(dateString)).toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "short",
  });
}
