import { ArrowUpLeft } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import pickup from "@/assets/photos/own-flatbed-pickup.jpg";
import accident from "@/assets/photos/service-accident.jpg";
import breakdown from "@/assets/photos/service-breakdown.jpg";
import intercity from "@/assets/photos/service-intercity.jpg";
import { WhatsAppIcon } from "@/components/icons";
import { Reveal, SectionEyebrow } from "@/components/ui/reveal";
import type { Dictionary } from "@/i18n/dictionaries/ar";
import { whatsappHref } from "@/lib/site";

// Visuals per service, in dictionary order.
const visuals: { image: StaticImageData; position?: string }[] = [
  { image: breakdown, position: "object-[40%_center]" },
  { image: pickup, position: "object-[center_40%]" },
  { image: accident, position: "object-[30%_center]" },
  { image: intercity, position: "object-[center_70%]" },
];

export function Services({
  dict,
  common,
  serviceMessage,
}: {
  dict: Dictionary["services"];
  common: Dictionary["common"];
  serviceMessage: (service: string) => string;
}) {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionEyebrow index="01">{dict.eyebrow}</SectionEyebrow>
            <h2 id="services-title" className="mt-6 text-balance font-display text-4xl font-bold leading-[1.25] text-navy sm:text-5xl">
              {dict.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-base leading-8 text-slate sm:text-lg sm:leading-9">{dict.intro}</p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:mt-20 md:grid-cols-2">
          {dict.items.map((service, i) => (
            <Reveal as="li" key={service.title} delay={(i % 2) * 0.1} className="bg-paper">
              <article className="group flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                  <Image
                    src={visuals[i].image}
                    alt={service.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
                    className={`grade object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.045] ${visuals[i].position ?? ""}`}
                  />
                  <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-ink/45 to-transparent" />
                  <span dir="ltr" className="absolute end-5 top-5 font-display text-xs tabular-nums text-white/85">
                    0{i + 1} / 04
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-6 pb-8 pt-7 sm:px-8 sm:pb-10">
                  <h3 className="font-display text-2xl font-semibold text-navy">{service.title}</h3>
                  <p className="mt-4 flex-1 text-[15px] leading-8 text-slate">{service.text}</p>
                  <a
                    href={whatsappHref(serviceMessage(service.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-3 self-start border-b border-brand-blue/30 pb-2 text-[15px] font-semibold text-brand-blue transition-colors hover:border-brand-red hover:text-brand-red"
                  >
                    <WhatsAppIcon className="size-[18px] text-whatsapp" />
                    {dict.cta}
                    <ArrowUpLeft
                      className="size-4 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 ltr:-scale-x-100 ltr:group-hover:translate-x-1"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <span className="sr-only">: {service.title} {common.newTab}</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
