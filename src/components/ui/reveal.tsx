"use client";

import { createElement, useEffect, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Reveals content once it scrolls into view ("rise" fades up, "unveil" wipes an image in).
 * Content is only hidden while the `js` class is present and motion is allowed (see globals.css),
 * so it stays visible without JavaScript and for reduced-motion users.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  variant = "rise",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "figure";
  variant?: "rise" | "unveil";
}) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = node;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [node]);

  return createElement(
    as,
    {
      ref: setNode,
      className,
      "data-reveal": variant,
      "data-shown": shown ? "" : undefined,
      style: { "--d": `${delay}s` } as CSSProperties,
    },
    children,
  );
}

export function SectionEyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[13px] font-medium tracking-wide text-silver-500">
      <span dir="ltr" className="font-display tabular-nums text-silver-300">
        {index}
      </span>
      <span className="h-px w-8 bg-white/25" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
