"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappHref } from "@/lib/site";

/**
 * Appears once the hero (which has its own CTA) is scrolled past, and hides
 * again over the closing contact section and footer so it never covers them.
 */
export function FloatingWhatsApp({ label, message }: { label: string; message: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById("contact");
    const footer = document.querySelector("footer");
    const state = { pastHero: false, overEnd: new Set<Element>() };

    const update = () => setVisible(state.pastHero && state.overEnd.size === 0);

    const heroObserver = new IntersectionObserver(([entry]) => {
      state.pastHero = !entry.isIntersecting;
      update();
    }, { rootMargin: "-40% 0px 0px 0px" });

    const endObserver = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) state.overEnd.add(e.target);
        else state.overEnd.delete(e.target);
      }
      update();
    });

    if (hero) heroObserver.observe(hero);
    if (contact) endObserver.observe(contact);
    if (footer) endObserver.observe(footer);
    return () => {
      heroObserver.disconnect();
      endObserver.disconnect();
    };
  }, []);

  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 end-5 z-40 flex size-14 items-center justify-center rounded-full border border-white/15 bg-emerald-brand text-white shadow-[0_12px_32px_-10px_rgb(0_0_0/0.8)] transition-[opacity,transform,background-color] duration-500 ease-out-expo hover:bg-emerald-bright sm:bottom-8 sm:end-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
