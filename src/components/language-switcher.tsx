"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { type Locale, switchPath } from "@/i18n/config";

const OPTIONS: { locale: Locale; label: string; short: string }[] = [
  { locale: "ar", label: "العربية", short: "عربي" },
  { locale: "en", label: "English", short: "EN" },
];

/**
 * Shared switching behaviour. Each option is a real link; the proxy stores the choice in a
 * cookie so returning visitors land on the language they picked last.
 */
function useLanguageSwitch() {
  // Keep the visitor on the same section when switching.
  const [hash, setHash] = useState("");
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    // Undo the exit fade if the browser restores this page from the back/forward cache.
    const restore = () => document.documentElement.classList.remove("is-switching");
    window.addEventListener("hashchange", sync);
    window.addEventListener("pageshow", restore);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("pageshow", restore);
    };
  }, []);

  /** Brief fade-out before loading the other language (skipped for modified clicks and reduced motion). */
  const onSwitch = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    const target = event.currentTarget.href;
    document.documentElement.classList.add("is-switching");
    window.setTimeout(() => window.location.assign(target), 200);
  };

  return { hash, onSwitch };
}

/** Full-width "العربية | English" tabs, used inside the mobile menu panel. */
export function LanguageSwitcher({
  lang,
  path,
  label,
  tone = "onLight",
  className = "",
}: {
  lang: Locale;
  path: string;
  label: string;
  tone?: "onDark" | "onLight";
  className?: string;
}) {
  const { hash, onSwitch } = useLanguageSwitch();
  const dark = tone === "onDark";

  return (
    <nav aria-label={label} className={className}>
      <ul
        className={`flex h-12 w-full items-center rounded-[3px] border ${
          dark ? "border-white/25 bg-white/[0.06]" : "border-line bg-paper"
        }`}
      >
        {OPTIONS.map((option, i) => {
          const active = option.locale === lang;
          return (
            <li key={option.locale} className="flex h-full flex-1 items-center">
              {i > 0 && <span aria-hidden="true" className={`h-4 w-px ${dark ? "bg-white/25" : "bg-line"}`} />}
              <a
                href={`${switchPath(option.locale, path)}${hash}`}
                hrefLang={option.locale}
                lang={option.locale}
                aria-current={active ? "true" : undefined}
                onClick={active ? undefined : onSwitch}
                className={`flex h-full w-full items-center justify-center px-3.5 text-[15px] transition-colors ${
                  active
                    ? dark
                      ? "font-semibold text-white"
                      : "font-semibold text-brand-blue"
                    : dark
                      ? "text-white/60 hover:text-white"
                      : "text-slate-light hover:text-brand-blue"
                }`}
              >
                {option.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * Compact navbar dropdown: shows the current language; opens a two-option menu.
 * Disclosure pattern with arrow-key navigation, Escape to close, and outside-click dismissal.
 */
export function LanguageDropdown({
  lang,
  path,
  label,
  tone = "onDark",
  align = "end",
}: {
  lang: Locale;
  path: string;
  label: string;
  /** Surface behind the trigger: over the dark hero, or on the light (scrolled) header. */
  tone?: "onDark" | "onLight";
  /** Which edge of the trigger the menu lines up with (it opens toward the page centre). */
  align?: "start" | "end";
}) {
  const { hash, onSwitch } = useLanguageSwitch();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const current = OPTIONS.find((o) => o.locale === lang) ?? OPTIONS[0];
  const dark = tone === "onDark";

  const items = () => Array.from(root.current?.querySelectorAll<HTMLAnchorElement>("[data-lang-option]") ?? []);

  // Close on outside pointer/touch and when focus leaves the control.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onFocus = (e: FocusEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    // Move focus to the active option when the menu opens.
    (items().find((a) => a.getAttribute("aria-current")) ?? items()[0])?.focus();
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  const onTriggerKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onMenuKey = (e: KeyboardEvent<HTMLUListElement>) => {
    const list = items();
    const index = list.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      trigger.current?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      list[(index + step + list.length) % list.length]?.focus();
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      list[e.key === "Home" ? 0 : list.length - 1]?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={root} className="relative shrink-0">
      <button
        ref={trigger}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${label}: ${current.label}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKey}
        className={`inline-flex h-10 items-center gap-1 rounded-[3px] border px-2 text-[13px] font-semibold transition-colors duration-300 min-[360px]:gap-1.5 min-[360px]:px-2.5 sm:gap-2 sm:px-3 ${
          dark
            ? "border-white/25 bg-white/[0.06] text-white backdrop-blur-sm hover:border-white/50"
            : "border-line bg-paper text-ink hover:border-brand-blue hover:text-brand-blue"
        } ${open ? (dark ? "border-white/60" : "border-brand-blue text-brand-blue") : ""}`}
      >
        <Globe className={`hidden size-4 sm:block ${dark ? "text-white/80" : "text-brand-blue"}`} strokeWidth={1.6} aria-hidden="true" />
        <span lang={current.locale}>
          <span className="hidden sm:inline">{current.label}</span>
          <span className="sm:hidden">{current.short}</span>
        </span>
        <ChevronDown
          className={`size-3.5 transition-transform duration-300 ease-out-expo ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      <ul
        id={menuId}
        hidden={!open}
        aria-label={label}
        onKeyDown={onMenuKey}
        className={`absolute top-full z-50 mt-2 min-w-[11rem] overflow-hidden rounded-[3px] border border-line bg-paper py-1.5 shadow-[0_18px_40px_-16px_rgb(23_23_23/0.35)] ${
          align === "start" ? "start-0" : "end-0"
        }`}
      >
        {OPTIONS.map((option) => {
          const active = option.locale === lang;
          return (
            <li key={option.locale}>
              <a
                data-lang-option
                href={`${switchPath(option.locale, path)}${hash}`}
                hrefLang={option.locale}
                lang={option.locale}
                dir={option.locale === "ar" ? "rtl" : "ltr"}
                aria-current={active ? "true" : undefined}
                onClick={(e) => {
                  if (active) {
                    e.preventDefault();
                    setOpen(false);
                    trigger.current?.focus();
                    return;
                  }
                  onSwitch(e);
                }}
                className={`flex h-11 items-center justify-between gap-4 border-s-2 px-4 text-[15px] outline-none transition-colors focus-visible:bg-mist focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue ${
                  active
                    ? "border-brand-red bg-mist font-semibold text-brand-blue"
                    : "border-transparent text-ink hover:bg-mist hover:text-brand-blue"
                }`}
              >
                {option.label}
                {active && <Check className="size-4 text-brand-red" strokeWidth={2.2} aria-hidden="true" />}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
