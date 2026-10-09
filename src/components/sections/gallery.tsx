import Image, { type StaticImageData } from "next/image";
import deck from "@/assets/photos/gallery-deck.jpg";
import elantra from "@/assets/photos/own-flatbed-elantra.jpg";
import luxury from "@/assets/photos/own-flatbed-luxury.jpg";
import sedan from "@/assets/photos/own-flatbed-sedan.jpg";
import { Reveal, SectionEyebrow } from "@/components/ui/reveal";
import type { Dictionary } from "@/i18n/dictionaries/ar";

// Layout per tile, in dictionary order (captions and alt text come from the dictionary).
const tiles: { image: StaticImageData; className: string; sizes: string; position?: string }[] = [
  {
    image: sedan,
    className: "md:col-span-5 md:row-span-2 aspect-[4/5] md:aspect-auto",
    sizes: "(min-width: 768px) 42vw, 100vw",
    position: "object-[30%_center]",
  },
  {
    image: luxury,
    className: "md:col-span-7 aspect-[16/10] md:aspect-auto",
    sizes: "(min-width: 768px) 58vw, 100vw",
    position: "object-[center_45%]",
  },
  {
    image: deck,
    className: "md:col-span-3 aspect-square md:aspect-auto",
    sizes: "(min-width: 768px) 25vw, 100vw",
    position: "object-[70%_center]",
  },
  {
    image: elantra,
    className: "md:col-span-4 aspect-[2/1] md:aspect-auto",
    sizes: "(min-width: 768px) 33vw, 100vw",
    position: "object-[25%_center]",
  },
];

export function Gallery({ dict }: { dict: Dictionary["gallery"] }) {
  return (
    <section aria-labelledby="gallery-title" className="border-t border-white/[0.06] bg-graphite-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionEyebrow index="04">{dict.eyebrow}</SectionEyebrow>
            <h2 id="gallery-title" className="mt-6 text-balance font-display text-4xl font-bold leading-[1.25] text-white sm:text-5xl">
              {dict.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-silver-600">{dict.note}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 sm:mt-16 md:auto-rows-[minmax(15rem,1fr)] md:grid-cols-12 md:gap-4 lg:auto-rows-[18rem]">
          {dict.items.map((item, i) => (
            <Reveal as="figure" key={item.caption} delay={i * 0.08} className={`group relative overflow-hidden bg-graphite-900 ${tiles[i].className}`}>
              <Image
                src={tiles[i].image}
                alt={item.alt}
                fill
                placeholder="blur"
                sizes={tiles[i].sizes}
                className={`grade object-cover transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05] ${tiles[i].position ?? ""}`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-obsidian/85 via-obsidian/5 to-transparent" />
              <figcaption className="absolute bottom-0 start-0 flex items-center gap-3 p-5 text-sm text-silver-100 sm:p-6">
                <span className="h-px w-6 bg-white/50" aria-hidden="true" />
                {item.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
