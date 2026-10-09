"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import heroImage from "@/assets/photos/hero-flatbed.jpg";
import { CallButton, WhatsAppButton } from "@/components/ui/buttons";
import type { Dictionary } from "@/i18n/dictionaries/ar";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({
  dict,
  common,
  message,
}: {
  dict: Dictionary["hero"];
  common: Dictionary["common"];
  message: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, reduce ? 1.06 : 1.14]);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, ease: EASE, delay },
        };

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-obsidian"
    >
      {/* Photography. In LTR the frame shifts to the end side so the truck stays clear of the copy. */}
      <motion.div
        className="absolute inset-0 -z-20 ltr:lg:start-[28%]"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={heroImage}
          alt={dict.imageAlt}
          fill
          preload
          placeholder="blur"
          sizes="115vw"
          className="grade object-cover object-[24%_center] lg:object-[30%_center] ltr:lg:object-[18%_center]"
        />
        <div className="absolute inset-y-0 start-0 hidden w-1/3 bg-linear-to-r from-obsidian to-transparent ltr:lg:block" />
      </motion.div>

      {/* Cinematic overlays: text side (start) is darkest, image side breathes */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-obsidian via-obsidian/55 to-obsidian/30 lg:hidden" />
      <div className="absolute inset-0 -z-10 hidden bg-linear-to-l from-obsidian via-obsidian/75 to-obsidian/5 lg:block ltr:bg-linear-to-r ltr:via-obsidian/60" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-t from-obsidian to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-obsidian/80 to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-14 lg:justify-center lg:px-10 lg:pb-28 lg:pt-32">
        <div className="max-w-3xl ltr:max-w-2xl">
          <motion.p {...enter(0.1)} className="mb-6 flex items-center gap-3 text-sm text-silver-300 sm:mb-8">
            <span className="h-px w-10 bg-silver-300/60" aria-hidden="true" />
            {common.location.a}
            <span className="text-emerald-bright" aria-hidden="true">•</span>
            {common.location.b}
          </motion.p>

          <h1 id="hero-title" className="font-display">
            <motion.span {...enter(0.2)} className="mb-4 block text-lg font-medium text-silver-300 sm:text-xl">
              {dict.eyebrow}
            </motion.span>
            <motion.span
              {...enter(0.3)}
              className="block text-[2.6rem] font-bold leading-[1.2] sm:text-6xl lg:text-[4.25rem] lg:leading-[1.15] ltr:text-[2.4rem] ltr:leading-[1.1] ltr:tracking-tight ltr:sm:text-6xl ltr:lg:text-[3.6rem] ltr:lg:leading-[1.08]"
            >
              <span className="text-metal">{dict.title[0]}</span>{" "}
              <span className="text-metal sm:block">{dict.title[1]}</span>
            </motion.span>
          </h1>

          <motion.p {...enter(0.45)} className="mt-6 font-display text-xl font-medium text-white sm:text-2xl">
            {dict.subtitle}
          </motion.p>

          <motion.p {...enter(0.55)} className="mt-4 max-w-xl text-base leading-8 text-silver-300 sm:text-lg sm:leading-9">
            {dict.body}
          </motion.p>

          <motion.div {...enter(0.7)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <WhatsAppButton message={message} newTabLabel={common.newTab}>
              {common.whatsappCta}
            </WhatsAppButton>
            <CallButton showNumber>{common.callNow}</CallButton>
          </motion.div>
        </div>
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
