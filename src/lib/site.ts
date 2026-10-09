// Business details and contact links. All visible copy lives in src/i18n/dictionaries.

// The official name is kept exactly as supplied, including the zero-width
// joiner (U+200D) between "اله" and "فوف". It renders identically to "الهفوف".
export const BUSINESS_NAME = "سطحه الاحساء اله‍فوف";

export const PHONE_E164 = "+966593798655";
export const PHONE_DISPLAY = "+966 59 379 8655";
export const WHATSAPP_NUMBER = "966593798655";

export const TEL_HREF = `tel:${PHONE_E164}`;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
