import { CarFront, MapPinned, MessageCircle, Navigation } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary } from "@/i18n/dictionaries/ar";

const icons = [MessageCircle, Navigation, CarFront, MapPinned];

export function Highlights({ dict }: { dict: Dictionary["highlights"] }) {
  return (
    <section id="highlights" aria-labelledby="highlights-title" className="relative border-b border-white/[0.06] bg-obsidian">
      <h2 id="highlights-title" className="sr-only">{dict.label}</h2>
      <ul className="mx-auto grid max-w-7xl gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
        {dict.items.map(({ title, text }, i) => {
          const Icon = icons[i];
          return (
            <Reveal
              as="li"
              key={title}
              delay={i * 0.08}
              className="group relative bg-obsidian px-4 py-10 sm:px-6 sm:py-12 lg:px-10"
            >
              <div className="flex items-start justify-between">
                <Icon className="size-7 text-silver-300 transition-colors duration-500 group-hover:text-emerald-bright" strokeWidth={1.25} aria-hidden="true" />
                <span dir="ltr" className="font-display text-xs tabular-nums text-silver-600">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-8 font-display text-lg font-semibold text-silver-100">{title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-silver-500">{text}</p>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
