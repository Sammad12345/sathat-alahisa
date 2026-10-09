"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandMark, WhatsAppIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { type Locale, localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ar";
import { BUSINESS_NAME, PHONE_DISPLAY, TEL_HREF, whatsappHref } from "@/lib/site";

export function Header({
  lang,
  path,
  common,
  nav,
  message,
}: {
  lang: Locale;
  path: string;
  common: Dictionary["common"];
  nav: Dictionary["nav"];
  message: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const home = localePath(lang);
  // Section anchors only exist on the home page.
  const navHref = (hash: string) => (path === "/" ? hash : `${home}${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;
  // Top-right in both directions: beside the brand in RTL, in the action group in LTR.
  const switcher = <LanguageSwitcher lang={lang} path={path} label={nav.language} />;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid
          ? "border-b border-white/[0.07] bg-obsidian/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-obsidian"
      >
        {common.skipToContent}
      </a>

      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-[height] duration-500 sm:gap-6 sm:px-6 lg:px-10 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <a href={path === "/" ? "#top" : home} className="flex min-w-0 items-center gap-3 text-silver-100" aria-label={`${BUSINESS_NAME} — ${common.home}`}>
            <BrandMark className="hidden size-9 shrink-0 text-silver-300 min-[400px]:block" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span lang="ar" className="truncate font-display text-[14px] font-semibold sm:text-base">{BUSINESS_NAME}</span>
              <span className="hidden text-[11px] tracking-wide text-silver-500 sm:block">{common.tagline}</span>
            </span>
          </a>
          {lang === "ar" && switcher}
        </div>

        <nav aria-label={nav.main} className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={navHref(link.href)}
                  className="relative py-2 text-[15px] text-silver-300 transition-colors hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-[right] after:scale-x-0 after:bg-white/60 after:transition-transform after:duration-500 hover:after:scale-x-100 ltr:after:origin-[left]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={TEL_HREF}
            className="hidden items-center gap-2 text-sm text-silver-300 transition-colors hover:text-white xl:flex"
          >
            <Phone className="size-4" strokeWidth={1.6} aria-hidden="true" />
            <span dir="ltr" className="tabular-nums">{PHONE_DISPLAY}</span>
          </a>
          {lang === "en" && switcher}
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-10 items-center gap-2 rounded-[3px] border border-emerald-brand/60 bg-emerald-brand/10 px-3 text-sm font-medium text-white transition-colors hover:bg-emerald-brand sm:px-4"
          >
            <WhatsAppIcon className="size-[18px] text-emerald-bright transition-colors group-hover:text-white" />
            <span className="hidden sm:inline">{common.whatsapp}</span>
            <span className="sr-only sm:hidden">{common.whatsappCta}</span>
          </a>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.close : nav.open}
            className="inline-flex size-10 items-center justify-center rounded-[3px] border border-white/15 text-silver-100 transition-colors hover:border-white/40 lg:hidden"
          >
            {open ? <X className="size-5" strokeWidth={1.6} /> : <Menu className="size-5" strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panel}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/[0.07] bg-obsidian px-4 pb-10 pt-6 sm:px-6 lg:hidden"
      >
        <nav aria-label={nav.mobile}>
          <ul className="flex flex-col">
            {nav.links.map((link, i) => (
              <li key={link.href} className="border-b border-white/[0.07]">
                <a
                  href={navHref(link.href)}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 font-display text-2xl text-silver-100"
                >
                  {link.label}
                  <span dir="ltr" className="text-xs tabular-nums text-silver-600">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher lang={lang} path={path} label={nav.language} size="full" className="mt-8" />
        <div className="mt-4 grid gap-3">
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-[3px] bg-emerald-brand font-medium text-white"
          >
            <WhatsAppIcon className="size-5" />
            {common.whatsappCta}
          </a>
          <a
            href={TEL_HREF}
            className="inline-flex h-14 items-center justify-center gap-3 rounded-[3px] border border-white/20 font-medium text-silver-100"
          >
            <Phone className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
            {common.call}
            <span dir="ltr" className="tabular-nums text-silver-500">{PHONE_DISPLAY}</span>
          </a>
        </div>
        <p className="mt-10 text-sm text-silver-500">
          {common.location.a} • {common.location.b}
        </p>
      </div>
    </header>
  );
}
