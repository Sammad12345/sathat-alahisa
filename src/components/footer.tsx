import { Phone } from "lucide-react";
import { CurrentYear } from "@/components/current-year";
import { BrandMark, WhatsAppIcon } from "@/components/icons";
import { type Locale, localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ar";
import { BUSINESS_NAME, PHONE_DISPLAY, TEL_HREF, whatsappHref } from "@/lib/site";

export function Footer({
  lang,
  dict,
  common,
  nav,
  message,
  onHome = true,
}: {
  lang: Locale;
  dict: Dictionary["footer"];
  common: Dictionary["common"];
  nav: Dictionary["nav"];
  message: string;
  onHome?: boolean;
}) {
  const home = localePath(lang);

  return (
    <footer className="border-t border-white/[0.07] bg-obsidian">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12 lg:px-10 lg:py-20">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <BrandMark className="size-10 text-silver-300" />
            <p lang="ar" className="font-display text-lg font-semibold text-white">{BUSINESS_NAME}</p>
          </div>
          <p className="mt-6 max-w-sm text-[15px] leading-8 text-silver-500">{dict.about}</p>
        </div>

        <nav aria-label={dict.navLabel} className="md:col-span-3">
          <h2 className="text-xs tracking-wide text-silver-600">{dict.pageHeading}</h2>
          <ul className="mt-5 space-y-3">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={onHome ? link.href : `${home}${link.href}`} className="text-[15px] text-silver-300 transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-xs tracking-wide text-silver-600">{dict.contactHeading}</h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a href={TEL_HREF} className="inline-flex items-center gap-3 text-[15px] text-silver-300 transition-colors hover:text-white">
                <Phone className="size-4 text-silver-500" strokeWidth={1.6} aria-hidden="true" />
                <span dir="ltr" className="tabular-nums">{PHONE_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[15px] text-silver-300 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="size-4 text-emerald-bright" />
                {common.whatsappCta}
                <span className="sr-only">{common.newTabShort}</span>
              </a>
            </li>
            <li className="text-[15px] leading-7 text-silver-500">
              {dict.area}
              <br />
              <span className="text-sm text-silver-600">{dict.areaNote}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-silver-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>
            © <CurrentYear /> <span lang="ar">{BUSINESS_NAME}</span>. {dict.rights}
          </p>
          <a href={localePath(lang, "/credits")} className="transition-colors hover:text-silver-300">
            {dict.credits}
          </a>
        </div>
      </div>
    </footer>
  );
}
