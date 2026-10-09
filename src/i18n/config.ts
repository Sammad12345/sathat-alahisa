export const LOCALES = ["ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ar";
export const LOCALE_COOKIE = "lang";

export const hasLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Public URL for a page. Arabic (default) lives at the root, English under /en. */
export function localePath(locale: Locale, path: string = "/") {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Link target that switches language; /ar/* is redirected to the root by the proxy after saving the choice. */
export function switchPath(locale: Locale, path: string = "/") {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
