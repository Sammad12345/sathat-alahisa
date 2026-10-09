import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE } from "@/i18n/config";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Arabic (default) is served at the root; English lives under /en.
 * - /en/*  → served as-is and remembered as the preferred language.
 * - /ar/*  → the language switcher's Arabic target: remember Arabic, redirect to the root URL.
 * - other  → English visitors (by saved cookie) are sent to /en, everyone else gets Arabic.
 */
export function proxy(request: NextRequest) {
  const { pathname, search, hash } = request.nextUrl;
  const remember = (res: NextResponse, locale: string) => {
    res.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    return res;
  };

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const res = NextResponse.next();
    return request.cookies.get(LOCALE_COOKIE)?.value === "en" ? res : remember(res, "en");
  }

  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    url.search = search;
    url.hash = hash;
    return remember(NextResponse.redirect(url), "ar");
  }

  if (request.cookies.get(LOCALE_COOKIE)?.value === "en") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: skip Next internals, metadata files and anything with a file extension.
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
