"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandMark, WhatsAppIcon, WhatsAppLogo } from "@/components/icons";
import { LanguageDropdown, LanguageSwitcher } from "@/components/language-switcher";
import { type Locale, localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ar";
import { BUSINESS_NAME, PHONE_DISPLAY, TEL_HREF, WHATSAPP_NUMBER, whatsappHref } from "@/lib/site";

export function Header({
  lang,
  path,
  common,
  nav,
  message,
  overlay = true,
}: {
  lang: Locale;
  path: string;
  common: Dictionary["common"];
  nav: Dictionary["nav"];
  message: string;
  /** Transparent over a dark hero until scrolled; false for pages that start on a light surface. */
  overlay?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
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

  // Scroll-spy: mark the nav link for the section currently in the middle of the viewport.
  useEffect(() => {
    if (path !== "/") return;
    const sections = nav.links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
          else setActive((current) => (current === `#${entry.target.id}` ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path, nav.links]);

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

  // Light (white) bar once scrolled, when the menu is open, or on pages without a dark hero.
  const light = scrolled || open || !overlay;
  // Top-right in both directions: beside the brand in RTL, in the action group in LTR.
  const switcher = (
    <LanguageDropdown
      lang={lang}
      path={path}
      label={nav.language}
      tone={light ? "onLight" : "onDark"}
      align={lang === "ar" ? "start" : "end"}
    />
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
        light
          ? "border-b border-line bg-paper/95 shadow-[0_8px_24px_-18px_rgb(21_101_192/0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-white"
      >
        {common.skipToContent}
      </a>

      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-[height] duration-500 sm:gap-6 sm:px-6 lg:px-10 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <a
            href={path === "/" ? "#top" : home}
            className={`flex min-w-0 items-center gap-3 transition-colors duration-500 ${light ? "text-brand-blue" : "text-white"}`}
            aria-label={`${BUSINESS_NAME} — ${common.home}`}
          >
            <BrandMark className={`hidden size-9 shrink-0 transition-colors duration-500 min-[400px]:block ${light ? "text-brand-blue" : "text-white"}`} />
            <span className="flex min-w-0 flex-col leading-tight">
              <span lang="ar" className="truncate font-display text-[14px] font-bold sm:text-base">{BUSINESS_NAME}</span>
              <span className={`hidden text-[11px] tracking-wide sm:block ${light ? "text-brand-blue" : "text-white/70"}`}>{common.tagline}</span>
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
                  aria-current={active === link.href ? "location" : undefined}
                  className={`relative py-2 text-[15px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-[right] after:scale-x-0 after:transition-transform after:duration-500 hover:after:scale-x-100 aria-[current=location]:after:scale-x-100 ltr:after:origin-[left] ${
                    light
                      ? "text-ink/80 after:bg-brand-blue hover:text-brand-blue aria-[current=location]:text-brand-blue"
                      : "text-white/85 after:bg-white hover:text-white aria-[current=location]:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {lang === "en" && switcher}
          {/* WhatsApp logo (no number shown): opens a chat with the business. */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${common.whatsappTooltip} ${common.newTabShort}`}
            className="group relative inline-flex size-10 items-center justify-center rounded-full transition-transform duration-300 ease-out-expo hover:scale-105 active:scale-95"
          >
            <WhatsAppLogo className="size-10" />
            <span
              role="tooltip"
              className="pointer-events-none absolute end-0 top-full z-10 mt-2 whitespace-nowrap rounded-[3px] bg-ink px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {common.whatsappTooltip}
            </span>
          </a>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.close : nav.open}
            className={`inline-flex size-10 items-center justify-center rounded-[3px] border transition-colors lg:hidden ${
              light ? "border-line text-brand-blue hover:border-brand-blue" : "border-white/30 text-white hover:border-white/60"
            }`}
          >
            {open ? <X className="size-5" strokeWidth={1.6} /> : <Menu className="size-5" strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panel}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper px-4 pb-10 pt-6 sm:px-6 lg:hidden"
      >
        <nav aria-label={nav.mobile}>
          <ul className="flex flex-col">
            {nav.links.map((link, i) => (
              <li key={link.href} className="border-b border-line">
                <a
                  href={navHref(link.href)}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 font-display text-2xl font-semibold text-brand-blue"
                >
                  {link.label}
                  <span dir="ltr" className="text-xs tabular-nums text-brand-red">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher lang={lang} path={path} label={nav.language} tone="onLight" className="mt-8" />
        <div className="mt-4 grid gap-3">
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-[3px] bg-brand-red font-medium text-white"
          >
            <WhatsAppIcon className="size-5" />
            {common.whatsappCta}
          </a>
          <a
            href={TEL_HREF}
            className="inline-flex h-14 items-center justify-center gap-3 rounded-[3px] border border-brand-blue font-medium text-brand-blue"
          >
            <Phone className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
            {common.call}
            <span dir="ltr" className="tabular-nums opacity-75">{PHONE_DISPLAY}</span>
          </a>
        </div>
        <p className="mt-10 text-sm text-slate">
          {common.location.a} • {common.location.b}
        </p>
      </div>
    </header>
  );
}
