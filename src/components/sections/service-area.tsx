import { MapPin } from "lucide-react";
import Image from "next/image";
import areaImage from "@/assets/photos/area-eastern-province.jpg";
import { WhatsAppButton } from "@/components/ui/buttons";
import { Reveal, SectionEyebrow } from "@/components/ui/reveal";
import type { Dictionary } from "@/i18n/dictionaries/ar";

export function ServiceArea({
  dict,
  common,
  message,
}: {
  dict: Dictionary["area"];
  common: Dictionary["common"];
  message: string;
}) {
  return (
    <section aria-labelledby="area-title" className="relative isolate overflow-hidden bg-obsidian py-24 sm:py-32">
      <Image
        src={areaImage}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="grade -z-20 object-cover object-[60%_center] opacity-75"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-l from-obsidian via-obsidian/85 to-obsidian/40 ltr:bg-linear-to-r" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-obsidian via-transparent to-obsidian" />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <Reveal className="lg:col-span-6">
          <SectionEyebrow index="05">{dict.eyebrow}</SectionEyebrow>
          <h2 id="area-title" className="mt-6 text-balance font-display text-4xl font-bold leading-[1.25] text-white sm:text-5xl">
            {dict.title}
          </h2>
          <p className="mt-8 max-w-lg text-base leading-8 text-silver-300 sm:text-lg sm:leading-9">{dict.body}</p>
          <WhatsAppButton message={message} size="md" newTabLabel={common.newTab} className="mt-10">
            {dict.cta}
          </WhatsAppButton>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <ul className="border-t border-white/10">
            {dict.coverage.map((c) => (
              <li key={c.place} className="flex items-center justify-between gap-6 border-b border-white/10 py-6">
                <div className="flex items-center gap-4">
                  <MapPin className="size-5 shrink-0 text-silver-500" strokeWidth={1.4} aria-hidden="true" />
                  <span className="font-display text-2xl font-semibold text-white sm:text-3xl">{c.place}</span>
                </div>
                <span className="max-w-[12rem] text-end text-sm leading-6 text-silver-500">{c.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
