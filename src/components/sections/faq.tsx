"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { Reveal, SectionEyebrow } from "@/components/ui/reveal";
import type { Dictionary } from "@/i18n/dictionaries/ar";

export function Faq({ dict }: { dict: Dictionary["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section aria-labelledby="faq-title" className="border-t border-line bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <Reveal className="lg:col-span-4">
          <SectionEyebrow index="06">{dict.eyebrow}</SectionEyebrow>
          <h2 id="faq-title" className="mt-6 text-balance font-display text-4xl font-bold leading-[1.25] text-navy sm:text-5xl">
            {dict.title}
          </h2>
          <p className="mt-6 max-w-sm text-base leading-8 text-slate">{dict.intro}</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-8">
          <ul className="border-t border-line">
            {dict.items.map((item, i) => {
              const isOpen = open === i;
              const buttonId = `${baseId}-q-${i}`;
              const panelId = `${baseId}-a-${i}`;
              return (
                <li key={item.q} className="border-b border-line">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-7 text-start font-display text-lg font-semibold text-navy transition-colors hover:text-brand-blue sm:text-xl"
                    >
                      {item.q}
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-500 ease-out-expo ${
                          isOpen ? "rotate-45 border-brand-red bg-brand-red text-white" : "border-brand-blue/30 text-brand-blue"
                        }`}
                        aria-hidden="true"
                      >
                        <Plus className="size-4" strokeWidth={1.6} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                    inert={!isOpen}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-8 text-base leading-8 text-slate">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
