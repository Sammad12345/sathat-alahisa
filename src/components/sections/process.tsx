import { Handshake, MapPin, MessageCircle } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/buttons";
import { Reveal, SectionEyebrow } from "@/components/ui/reveal";
import type { Dictionary } from "@/i18n/dictionaries/ar";

const icons = [MessageCircle, MapPin, Handshake];

export function Process({
  dict,
  common,
  message,
}: {
  dict: Dictionary["process"];
  common: Dictionary["common"];
  message: string;
}) {
  return (
    <section aria-labelledby="process-title" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <SectionEyebrow index="03">{dict.eyebrow}</SectionEyebrow>
          <h2 id="process-title" className="mt-6 text-balance font-display text-4xl font-bold leading-[1.25] text-brand-blue sm:text-5xl">
            {dict.title}
          </h2>
        </Reveal>

        <ol className="relative mt-16 grid gap-0 sm:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
          {/* Connecting rail */}
          <span aria-hidden="true" className="absolute inset-x-0 top-[2.25rem] hidden h-px bg-linear-to-l from-brand-blue/40 via-brand-blue/15 to-transparent md:block ltr:bg-linear-to-r" />
          <span aria-hidden="true" className="absolute bottom-10 start-[2.25rem] top-10 w-px bg-linear-to-b from-brand-blue/40 via-brand-blue/15 to-transparent md:hidden" />

          {dict.steps.map(({ title, text }, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={title} delay={i * 0.12} className="relative flex gap-6 pb-12 last:pb-0 md:block md:pb-0">
                <div className="relative z-10 flex size-[4.5rem] shrink-0 items-center justify-center rounded-full border border-brand-blue/25 bg-paper">
                  <Icon className="size-6 text-brand-blue" strokeWidth={1.3} aria-hidden="true" />
                </div>
                <div className="pt-3 md:pt-10">
                  <p dir="ltr" className="text-end font-display text-sm tabular-nums tracking-widest text-brand-red md:text-start ltr:text-start">
                    <span className="sr-only">{dict.step} </span>0{i + 1}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-brand-blue sm:text-[1.75rem]">{title}</h3>
                  <p className="mt-3 max-w-xs text-base leading-8 text-slate">{text}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-16 flex flex-col items-start gap-5 border-t border-line pt-10 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[15px] leading-8 text-slate">{dict.note}</p>
          <WhatsAppButton message={message} size="md" newTabLabel={common.newTab}>
            {dict.cta}
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}
