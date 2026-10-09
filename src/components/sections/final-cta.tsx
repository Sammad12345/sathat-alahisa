import Image from "next/image";
import nightRoad from "@/assets/photos/cta-night-road.jpg";
import { WhatsAppButton } from "@/components/ui/buttons";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary } from "@/i18n/dictionaries/ar";
import { PHONE_DISPLAY, TEL_HREF } from "@/lib/site";

export function FinalCta({
  dict,
  common,
  message,
}: {
  dict: Dictionary["final"];
  common: Dictionary["common"];
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
      <div className="absolute inset-0 -z-10 bg-obsidian/55" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-obsidian via-transparent to-obsidian" />

      <div className="mx-auto flex min-h-[38rem] max-w-5xl flex-col items-center justify-center px-4 py-28 text-center sm:min-h-[44rem] sm:px-6">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-sm text-silver-300">
            <span className="h-px w-8 bg-white/40" aria-hidden="true" />
            {dict.eyebrow}
            <span className="h-px w-8 bg-white/40" aria-hidden="true" />
          </p>
          <h2 id="contact-title" className="mt-8 text-balance font-display text-4xl font-bold leading-[1.25] sm:text-6xl sm:leading-[1.2]">
            <span className="text-metal">{dict.title[0]}</span>
            <br />
            <span className="text-metal">{dict.title[1]}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-silver-300 sm:text-lg sm:leading-9">{dict.body}</p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex w-full flex-col items-center gap-8">
          <WhatsAppButton message={message} newTabLabel={common.newTab} className="w-full sm:w-auto">
            {dict.cta}
          </WhatsAppButton>
          <a href={TEL_HREF} className="group flex flex-col items-center gap-2">
            <span className="text-xs tracking-wide text-silver-500">{dict.orCall}</span>
            <span
              dir="ltr"
              className="font-display text-3xl font-semibold tabular-nums text-white transition-colors group-hover:text-silver-300 sm:text-4xl"
            >
              {PHONE_DISPLAY}
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
