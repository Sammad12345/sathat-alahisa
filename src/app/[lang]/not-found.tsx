import { lang as getLang } from "next/root-params";
import { BrandMark } from "@/components/icons";
import { DEFAULT_LOCALE, hasLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function NotFound() {
  const value = await getLang();
  const lang = hasLocale(value) ? value : DEFAULT_LOCALE;
  const t = getDictionary(lang).notFound;

  return (
    <main className="relative isolate flex min-h-dvh bg-mist flex-col items-center justify-center px-4 text-center">
      <BrandMark className="size-12 text-brand-blue" />
      <p dir="ltr" className="mt-10 font-display text-sm tabular-nums tracking-[0.3em] text-brand-red">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-brand-blue sm:text-5xl">{t.title}</h1>
      <p className="mt-5 max-w-md text-base leading-8 text-slate">{t.body}</p>
      <a
        href={localePath(lang)}
        className="mt-10 inline-flex h-12 items-center rounded-[3px] bg-brand-blue px-6 text-[15px] font-medium text-white transition-colors hover:bg-brand-blue-dark"
      >
        {t.home}
      </a>
    </main>
  );
}
