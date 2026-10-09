import Image from "next/image";
import type { CSSProperties } from "react";
import heroImage from "@/assets/photos/hero-flatbed.jpg";
import { CallButton, WhatsAppButton } from "@/components/ui/buttons";
import type { Dictionary } from "@/i18n/dictionaries/ar";

// Staggered CSS entrance (runs without JavaScript; disabled under reduced motion).
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

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
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* Photography. In LTR the frame shifts to the end side so the truck stays clear of the copy. */}
      {/* Scroll parallax via CSS scroll-driven animation where supported (see .hero-parallax). */}
      <div className="hero-parallax absolute inset-0 -z-20 ltr:lg:start-[28%]" style={{ transform: "scale(1.06)" }}>
        <Image
          src={heroImage}
          alt={dict.imageAlt}
          fill
          preload
          placeholder="blur"
          sizes="115vw"
          className="object-cover object-[24%_center] lg:object-[30%_center] ltr:lg:object-[18%_center]"
        />
        <div className="absolute inset-y-0 start-0 hidden w-1/3 bg-linear-to-r from-ink to-transparent ltr:lg:block" />
      </div>

      {/* Cinematic overlays: text side (start) is darkest, image side breathes */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/55 to-ink/30 lg:hidden" />
      <div className="absolute inset-0 -z-10 hidden bg-linear-to-l from-ink via-ink/75 to-ink/5 lg:block ltr:bg-linear-to-r ltr:via-ink/60" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-t from-ink to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-ink/80 to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-14 lg:justify-center lg:px-10 lg:pb-28 lg:pt-32">
        <div className="max-w-3xl ltr:max-w-2xl">
          <p style={delay(0.1)} className="animate-rise mb-6 flex items-center gap-3 text-sm text-white/80 sm:mb-8">
            <span className="h-0.5 w-10 bg-brand-blue" aria-hidden="true" />
            {common.location.a}
            <span className="text-brand-red" aria-hidden="true">•</span>
            {common.location.b}
          </p>

          <h1 id="hero-title" className="font-display">
            <span style={delay(0.2)} className="animate-rise mb-4 block text-lg font-medium text-white/80 sm:text-xl">
              {dict.eyebrow}
            </span>
            <span
              style={delay(0.3)}
              className="animate-rise block text-[2.6rem] font-bold leading-[1.2] sm:text-6xl lg:text-[4.25rem] lg:leading-[1.15] ltr:text-[2.4rem] ltr:leading-[1.1] ltr:tracking-tight ltr:sm:text-6xl ltr:lg:text-[3.6rem] ltr:lg:leading-[1.08]"
            >
              <span className="text-white">{dict.title[0]}</span>{" "}
              <span className="text-brand-red sm:block">{dict.title[1]}</span>
            </span>
          </h1>

          <p style={delay(0.45)} className="animate-rise mt-6 font-display text-xl font-medium text-white sm:text-2xl">
            {dict.subtitle}
          </p>

          <p style={delay(0.55)} className="animate-rise mt-4 max-w-xl text-base leading-8 text-white/80 sm:text-lg sm:leading-9">
            {dict.body}
          </p>

          <div id="hero-ctas" style={delay(0.7)} className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <WhatsAppButton message={message} newTabLabel={common.newTab}>
              {common.whatsappCta}
            </WhatsAppButton>
            <CallButton showNumber>{common.callNow}</CallButton>
          </div>
        </div>
      </div>

      {/* Spec rail */}
      <div className="relative hidden border-t-2 border-brand-blue bg-ink/70 backdrop-blur-md md:block">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1fr_1fr_auto] px-6 lg:px-10">
          {dict.specs.map((s) => (
            <div key={s.label} className="border-e border-white/[0.08] py-5 pe-6 ps-6 first:ps-0">
              <p className="text-xs text-white/55">{s.label}</p>
              <p className="mt-1 text-[15px] text-white">{s.value}</p>
            </div>
          ))}
          <a
            href="#highlights"
            className="flex items-center gap-3 ps-8 text-xs text-white/65 transition-colors hover:text-white"
          >
            <span>{dict.more}</span>
            <span className="relative block h-10 w-px overflow-hidden bg-white/15" aria-hidden="true">
              <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-brand-red" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
