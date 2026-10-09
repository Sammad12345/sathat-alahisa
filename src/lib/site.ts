// Business details and contact links. All visible copy lives in src/i18n/dictionaries.

// The official name is kept exactly as supplied by the client, including its zero-width
// joiners (U+200D) after each "ه" that precedes "يدرولك" or "فوف" (they render invisibly).
export const BUSINESS_NAME = "سطحه الاحساءه\u200Dيدرولك اله\u200Dفوف ه\u200Dيدرولك";

// Client-supplied location, kept verbatim for reference only. Its wording is unclear, so it
// is NOT shown on the site; the site names only the confirmed service area (Al-Ahsa / Al-Hofuf).
export const CLIENT_LOCATION_RAW = "الاحساء اله\u200Dفوف المبرسلوى الدارم الرارض جبل مخاسن بفق";

export const PHONE_E164 = "+966541264317";
export const PHONE_DISPLAY = "+966 54 126 4317";
export const WHATSAPP_NUMBER = "966541264317";

export const TEL_HREF = `tel:${PHONE_E164}`;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
