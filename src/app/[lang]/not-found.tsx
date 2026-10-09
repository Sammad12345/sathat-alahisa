import { lang as getLang } from "next/root-params";
import { BrandMark } from "@/components/icons";
import { DEFAULT_LOCALE, hasLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function NotFound() {
  const value = await getLang();
  const lang = hasLocale(value) ? value : DEFAULT_LOCALE;
  const t = getDictionary(lang).notFound;

  return (
    <main className="grain relative isolate flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <BrandMark className="size-12 text-silver-500" />
      <p dir="ltr" className="mt-10 font-display text-sm tabular-nums tracking-[0.3em] text-silver-600">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">{t.title}</h1>
      <p className="mt-5 max-w-md text-base leading-8 text-silver-500">{t.body}</p>
      <a
        href={localePath(lang)}
        className="mt-10 inline-flex h-12 items-center rounded-[3px] border border-white/20 px-6 text-[15px] text-silver-100 transition-colors hover:border-white/50"
      >
        {t.home}
      </a>
    </main>
  );
}
