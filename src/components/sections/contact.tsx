import { Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal, SectionEyebrow } from "@/components/ui/reveal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ar";
import { PHONE_DISPLAY, TEL_HREF } from "@/lib/site";

/** Service-request form, laid out like the other editorial sections (heading column + content column). */
export function RequestForm({
  lang,
  final,
  form,
  services,
}: {
  lang: Locale;
  final: Dictionary["final"];
  form: Dictionary["form"];
  services: string[];
}) {
  return (
    <section id="request" aria-labelledby="request-title" className="border-t border-line bg-mist py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <Reveal className="lg:col-span-4">
          <SectionEyebrow index="07">{final.eyebrow}</SectionEyebrow>
          <h2 id="request-title" className="mt-6 text-balance font-display text-4xl font-bold leading-[1.25] text-brand-blue sm:text-5xl">
            {form.heading}
          </h2>
          <p className="mt-6 max-w-sm text-base leading-8 text-slate">{final.directNote}</p>
          <a href={TEL_HREF} className="group mt-8 inline-flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-full border border-brand-blue/30 bg-paper text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
              <Phone className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="text-xs text-slate-light">{final.orCall}</span>
              <span dir="ltr" className="font-display text-xl font-semibold tabular-nums text-ink transition-colors group-hover:text-brand-blue rtl:text-right">
                {PHONE_DISPLAY}
              </span>
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-8">
          <div className="border border-line bg-paper p-6 shadow-[0_30px_60px_-40px_rgb(21_101_192/0.45)] sm:p-10">
            <ContactForm lang={lang} dict={form} services={services} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
