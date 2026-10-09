import { ArrowDown } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import heroImage from "@/assets/photos/hero-own-flatbed.jpg";
import { CallButton, WhatsAppButton } from "@/components/ui/buttons";
import type { Dictionary } from "@/i18n/dictionaries/ar";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/**
 * The business's own truck is the hero. Mobile: full-bleed portrait behind the copy.
 * Desktop: an editorial framed photograph beside the copy, with a gentle scroll drift.
 * Entrance motion is pure CSS, so the content never depends on JavaScript to appear.
 */
export function Hero({
  dict,
  common,
  message,
}: {
  dict: Dictionary["hero"];
  common: Dictionary["common"];
  message: string;
}) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-obsidian"
    >
      {/* Desktop backdrop: quiet light falling toward the photograph */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 hidden lg:block lg:bg-[radial-gradient(60%_70%_at_22%_45%,rgb(255_255_255/0.06),transparent_70%)] ltr:lg:bg-[radial-gradient(60%_70%_at_78%_45%,rgb(255_255_255/0.06),transparent_70%)]"
      />

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-end px-4 pb-10 pt-28 sm:px-6 sm:pb-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-10 lg:pb-20 lg:pt-32">
        <div className="max-w-2xl lg:col-span-7 lg:max-w-none">
          <p style={delay(0.1)} className="animate-rise mb-6 flex items-center gap-3 text-sm text-silver-300 sm:mb-8">
            <span className="h-px w-10 bg-silver-300/60" aria-hidden="true" />
            {common.location.a}
            <span className="text-emerald-bright" aria-hidden="true">•</span>
            {common.location.b}
          </p>

          <h1 id="hero-title" className="font-display">
            <span style={delay(0.18)} className="animate-rise mb-4 block text-lg font-medium text-silver-300 sm:text-xl">
              {dict.eyebrow}
            </span>
            <span
              style={delay(0.26)}
              className="animate-rise block text-[2.6rem] font-bold leading-[1.2] sm:text-6xl lg:text-[3.5rem] lg:leading-[1.18] xl:text-[3.9rem] ltr:text-[2.4rem] ltr:leading-[1.1] ltr:tracking-tight ltr:sm:text-6xl ltr:lg:text-[3.5rem] ltr:xl:text-[3.9rem] ltr:lg:leading-[1.06]"
            >
              <span className="text-metal">{dict.title[0]}</span>{" "}
              <span className="text-metal sm:block">{dict.title[1]}</span>
            </span>
          </h1>

          <p style={delay(0.4)} className="animate-rise mt-6 font-display text-xl font-medium text-white sm:text-2xl">
            {dict.subtitle}
          </p>

          <p style={delay(0.48)} className="animate-rise mt-4 max-w-xl text-base leading-8 text-silver-300 sm:text-lg sm:leading-9">
            {dict.body}
          </p>

          <div style={delay(0.6)} className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <WhatsAppButton message={message} newTabLabel={common.newTab}>
              {common.whatsappCta}
            </WhatsAppButton>
            <CallButton showNumber>{common.callNow}</CallButton>
          </div>

          <a
            style={delay(0.7)}
            href="#contact"
            className="animate-rise group mt-6 inline-flex items-center gap-2 text-sm text-silver-300 underline decoration-white/20 underline-offset-[6px] transition-colors hover:text-white hover:decoration-white/60"
          >
            {dict.formLink}
            <ArrowDown className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5" strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>

        {/* The photograph: full-bleed behind the copy on mobile, framed beside it on desktop */}
        <figure className="absolute inset-0 -z-20 lg:relative lg:inset-auto lg:z-0 lg:col-span-5 lg:self-center">
          <div
            style={delay(0.15)}
            className="animate-unveil absolute inset-0 lg:relative lg:aspect-[4/5] lg:max-h-[74vh] lg:w-full"
          >
            <div className="absolute inset-0 overflow-hidden lg:border lg:border-white/10">
              <div className="scroll-drift absolute inset-x-0 -inset-y-[6%]">
                <Image
                  src={heroImage}
                  alt={dict.imageAlt}
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="grade object-cover object-[30%_center] lg:object-center"
                />
              </div>
              {/* Mobile legibility overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/75 to-obsidian/25 lg:hidden" />
              <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-obsidian/80 to-transparent lg:hidden" />
              {/* Desktop: soft grade toward the base so the frame sits in the page */}
              <div className="absolute inset-0 hidden bg-linear-to-t from-obsidian/55 via-transparent to-transparent lg:block" />
            </div>
            <figcaption className="absolute bottom-5 start-5 hidden items-center gap-3 text-sm text-silver-100 lg:flex">
              <span className="size-1.5 rounded-full bg-emerald-bright" aria-hidden="true" />
              {dict.photoCaption}
            </figcaption>
          </div>
          {/* Offset hairline frame for depth */}
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-4 -end-4 -z-10 hidden h-full w-full border border-white/[0.07] lg:block" />
        </figure>
      </div>

      {/* Spec rail */}
      <div className="relative hidden border-t border-white/[0.08] bg-obsidian/40 backdrop-blur-md md:block">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1fr_1fr_auto] px-6 lg:px-10">
          {dict.specs.map((s) => (
            <div key={s.label} className="border-e border-white/[0.08] py-5 pe-6 ps-6 first:ps-0">
              <p className="text-xs text-silver-600">{s.label}</p>
              <p className="mt-1 text-[15px] text-silver-100">{s.value}</p>
            </div>
          ))}
          <a
            href="#highlights"
            className="flex items-center gap-3 ps-8 text-xs text-silver-500 transition-colors hover:text-white"
          >
            <span>{dict.more}</span>
            <span className="relative block h-10 w-px overflow-hidden bg-white/15" aria-hidden="true">
              <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-white" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
