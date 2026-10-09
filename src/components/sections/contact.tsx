import { Phone } from "lucide-react";
import Image from "next/image";
import nightRoad from "@/assets/photos/cta-night-road.jpg";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppButton } from "@/components/ui/buttons";
import { Reveal } from "@/components/ui/reveal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ar";
import { PHONE_DISPLAY, TEL_HREF } from "@/lib/site";

export function Contact({
  lang,
  dict,
  form,
  common,
  services,
  message,
}: {
  lang: Locale;
  dict: Dictionary["final"];
  form: Dictionary["form"];
  common: Dictionary["common"];
  services: string[];
  message: string;
}) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="grain relative isolate overflow-hidden bg-obsidian">
      <Image
        src={nightRoad}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[35%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-obsidian/60" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-obsidian via-obsidian/40 to-obsidian" />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <Reveal className="lg:col-span-5 lg:pt-6">
          <p className="flex items-center gap-3 text-sm text-silver-300">
            <span className="h-px w-8 bg-white/40" aria-hidden="true" />
            {dict.eyebrow}
          </p>
          <h2 id="contact-title" className="mt-8 text-balance font-display text-4xl font-bold leading-[1.25] sm:text-5xl sm:leading-[1.2]">
            <span className="text-metal">{dict.title[0]}</span>
            <br />
            <span className="text-metal">{dict.title[1]}</span>
          </h2>
          <p className="mt-8 max-w-md text-base leading-8 text-silver-300 sm:text-lg sm:leading-9">{dict.body}</p>

          <div className="mt-12 border-t border-white/10 pt-10">
            <h3 className="text-xs tracking-wide text-silver-500">{dict.directHeading}</h3>
            <WhatsAppButton message={message} newTabLabel={common.newTab} className="mt-5 w-full sm:w-auto">
              {dict.cta}
            </WhatsAppButton>
            <a href={TEL_HREF} className="group mt-8 flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white/40">
                <Phone className="size-5 text-silver-300" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs text-silver-500">{dict.orCall}</span>
                <span dir="ltr" className="font-display text-2xl font-semibold tabular-nums text-white transition-colors group-hover:text-silver-300 sm:text-3xl rtl:text-right">
                  {PHONE_DISPLAY}
                </span>
              </span>
            </a>
            <p className="mt-6 text-sm text-silver-500">{dict.directNote}</p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-7">
          <div className="border border-white/10 bg-graphite-950/95 p-6 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)] sm:p-10">
            <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">{form.heading}</h3>
            <div className="mt-4">
              <ContactForm lang={lang} dict={form} services={services} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
