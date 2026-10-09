"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { WHATSAPP_NUMBER } from "@/lib/site";

/**
 * Fixed WhatsApp button, bottom-right in both RTL and LTR. Visible throughout the page,
 * stepping aside only while the request form is on screen so it never covers form controls.
 */
export function FloatingWhatsApp({
  label,
  tooltip,
  greeting,
}: {
  label: string;
  tooltip: string;
  greeting: string;
}) {
  const [overForm, setOverForm] = useState(false);

  useEffect(() => {
    const form = document.querySelector("#request form");
    if (!form) return;
    const io = new IntersectionObserver(([entry]) => setOverForm(entry.isIntersecting));
    io.observe(form);
    return () => io.disconnect();
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(greeting)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      aria-hidden={overForm || undefined}
      tabIndex={overForm ? -1 : 0}
      className={`group fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_14px_30px_-10px_rgb(0_0_0/0.45)] transition-[opacity,transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgb(0_0_0/0.5)] active:scale-95 sm:bottom-8 sm:right-8 sm:size-16 ${
        overForm ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100"
      }`}
    >
      {/* Soft breathing ring (disabled under reduced motion) */}
      <span aria-hidden="true" className="wa-ring absolute inset-0 rounded-full bg-whatsapp" />
      <WhatsAppIcon className="relative size-7 sm:size-8" />
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full top-1/2 me-0 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-[3px] bg-ink px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
      >
        {tooltip}
      </span>
    </a>
  );
}
