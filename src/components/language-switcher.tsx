"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { type Locale, switchPath } from "@/i18n/config";

const OPTIONS: { locale: Locale; label: string; short: string }[] = [
  { locale: "ar", label: "العربية", short: "عربي" },
  { locale: "en", label: "English", short: "EN" },
];

/**
 * "العربية | English" segmented switch. Each option is a real link; the proxy stores the
 * choice in a cookie so returning visitors land on the language they picked last.
 */
export function LanguageSwitcher({
  lang,
  path,
  label,
  size = "compact",
  className = "",
}: {
  lang: Locale;
  path: string;
  label: string;
  size?: "compact" | "full";
  className?: string;
}) {
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

  const full = size === "full";

  return (
    <nav aria-label={label} className={className}>
      <ul
        className={`flex items-center rounded-[3px] border border-white/15 bg-white/[0.03] backdrop-blur-sm ${
          full ? "h-12 w-full" : "h-10"
        }`}
      >
        {OPTIONS.map((option, i) => {
          const active = option.locale === lang;
          return (
            <li key={option.locale} className={`flex h-full items-center ${full ? "flex-1" : ""}`}>
              {i > 0 && <span aria-hidden="true" className="h-4 w-px bg-white/20" />}
              <a
                href={`${switchPath(option.locale, path)}${hash}`}
                hrefLang={option.locale}
                lang={option.locale}
                aria-current={active ? "true" : undefined}
                onClick={active ? undefined : onSwitch}
                className={`flex h-full items-center justify-center px-2.5 text-[13px] transition-colors sm:px-3.5 ${
                  full ? "w-full text-[15px]" : ""
                } ${active ? "font-semibold text-white" : "text-silver-500 hover:text-white"}`}
              >
                <span className={full ? "" : "hidden sm:inline"}>{option.label}</span>
                {!full && <span className="sm:hidden">{option.short}</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
