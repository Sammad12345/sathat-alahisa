import { Reveal, SectionEyebrow } from "@/components/ui/reveal";
import type { Dictionary } from "@/i18n/dictionaries/ar";

export function WhyUs({ dict }: { dict: Dictionary["why"] }) {
  return (
    <section id="why" aria-labelledby="why-title" className="relative border-y border-line bg-mist py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-32">
            <SectionEyebrow index="02">{dict.eyebrow}</SectionEyebrow>
            <h2 id="why-title" className="mt-6 text-balance font-display text-4xl font-bold leading-[1.3] text-navy sm:text-5xl sm:leading-[1.25]">
              {dict.title[0]}
              <br />
              <span className="text-brand-blue">{dict.title[1]}</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-8 text-slate sm:text-lg sm:leading-9">{dict.body}</p>
          </Reveal>
        </div>

        <ol className="lg:col-span-7">
          {dict.items.map((r, i) => (
            <Reveal
              as="li"
              key={r.title}
              delay={i * 0.06}
              className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-line py-9 last:border-b sm:grid-cols-[5rem_1fr] sm:py-11"
            >
              <span dir="ltr" className="text-end font-display text-3xl font-light tabular-nums text-brand-red sm:text-start sm:text-4xl ltr:text-start">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-navy sm:text-2xl">{r.title}</h3>
                <p className="mt-3 max-w-lg text-[15px] leading-8 text-slate sm:text-base">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
