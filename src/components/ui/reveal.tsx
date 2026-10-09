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

export function SectionEyebrow({
  index,
  children,
  tone = "light",
}: {
  index: string;
  children: ReactNode;
  /** Surface the eyebrow sits on. */
  tone?: "light" | "dark" | "brand";
}) {
  return (
    <p className={`flex items-center gap-3 text-[13px] font-medium tracking-wide ${tone === "light" ? "text-slate" : "text-white/85"}`}>
      <span dir="ltr" className={`font-display tabular-nums ${tone === "brand" ? "text-white" : "text-brand-red"}`}>
        {index}
      </span>
      <span className={`h-0.5 w-8 ${tone === "light" ? "bg-brand-blue" : tone === "brand" ? "bg-white/50" : "bg-brand-blue"}`} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
