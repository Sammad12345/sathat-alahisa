import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { hasLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata({ params }: PageProps<"/[lang]/credits">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { credits } = getDictionary(lang);
  return {
    title: credits.title,
    description: credits.description,
    robots: { index: false },
    alternates: {
      canonical: localePath(lang, "/credits"),
      languages: { ar: localePath("ar", "/credits"), en: localePath("en", "/credits") },
    },
  };
}

const LICENSES = {
  "by-2.0": { name: "CC BY 2.0", url: "https://creativecommons.org/licenses/by/2.0/" },
  "by-sa-3.0": { name: "CC BY-SA 3.0", url: "https://creativecommons.org/licenses/by-sa/3.0/" },
  "by-sa-4.0": { name: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/" },
} as const;

type Use = "hero" | "breakdown" | "accident" | "intercity" | "gallery" | "area" | "contact";

// Illustrative third-party images only; the business's own photos need no attribution.
const credits: { use: Use; title: string; author: string; source: string; license: keyof typeof LICENSES }[] = [
  { use: "hero", title: "Modern Ford Tow Truck", author: "Kragar888", source: "https://commons.wikimedia.org/w/index.php?curid=159205186", license: "by-sa-4.0" },
  { use: "breakdown", title: "Car in the middle of the wilderness in the middle of the night in Tulppio", author: "JIP", source: "https://commons.wikimedia.org/w/index.php?curid=42184726", license: "by-sa-3.0" },
  { use: "accident", title: "Bergingstruck met auto (tow truck with car)", author: "Wikimedia Commons contributor", source: "https://commons.wikimedia.org/w/index.php?curid=747302", license: "by-sa-3.0" },
  { use: "intercity", title: "Highway60SaudiArabia", author: "King Eliot", source: "https://commons.wikimedia.org/w/index.php?curid=23371181", license: "by-sa-3.0" },
  { use: "gallery", title: "Car being loaded onto a towing truck in a garage", author: "Shixart1985", source: "https://commons.wikimedia.org/w/index.php?curid=186889526", license: "by-2.0" },
  { use: "area", title: "Sunset in Dammam 04", author: "കാക്കര", source: "https://commons.wikimedia.org/w/index.php?curid=25007369", license: "by-sa-3.0" },
  { use: "contact", title: "Night hour still on the road", author: "ThusoMotlasuping", source: "https://commons.wikimedia.org/w/index.php?curid=89155390", license: "by-sa-4.0" },
];

export default async function CreditsPage({ params }: PageProps<"/[lang]/credits">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.credits;

  return (
    <>
      <Header lang={lang} path="/credits" common={dict.common} nav={dict.nav} message={dict.messages.general} />
      <main id="main" className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40">
        <a href={localePath(lang)} className="inline-flex items-center gap-2 text-sm text-silver-500 transition-colors hover:text-white">
          <ArrowRight className="size-4 ltr:-scale-x-100" strokeWidth={1.6} aria-hidden="true" />
          {t.back}
        </a>
        <h1 className="mt-10 font-display text-4xl font-bold text-white sm:text-5xl">{t.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-silver-500">{t.intro}</p>
        <ul className="mt-12 border-t border-white/10">
          {credits.map((c) => (
            <li key={c.source} className="grid gap-2 border-b border-white/10 py-6 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <p className="text-sm text-silver-500">{t.uses[c.use]}</p>
              <p dir="ltr" className="text-start text-sm leading-7 text-silver-300 sm:rtl:text-end">
                <a href={c.source} target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  {c.title}
                </a>{" "}
                — {c.author} —{" "}
                <a href={LICENSES[c.license].url} target="_blank" rel="noopener noreferrer license" className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  {LICENSES[c.license].name}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </main>
      <Footer lang={lang} dict={dict.footer} common={dict.common} nav={dict.nav} message={dict.messages.general} onHome={false} />
    </>
  );
}
