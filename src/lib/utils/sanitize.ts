export function sanitizeText(text: string): string {
  if (!text) return "";
  // Strip HTML tag syntax
  return text
    .replace(/<[^>]*>/g, "")
    // Escape common characters to avoid basic HTML injection
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
