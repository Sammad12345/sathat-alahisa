import { Phone } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { PHONE_DISPLAY, TEL_HREF, whatsappHref } from "@/lib/site";

const base =
  "group inline-flex items-center justify-center gap-3 rounded-[3px] font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.98]";

const sizes = {
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-base sm:px-8",
} as const;

type Size = keyof typeof sizes;

/** Primary action (brand red) that opens WhatsApp with a prepared message. */
export function WhatsAppButton({
  message,
  children,
  newTabLabel,
  size = "lg",
  className = "",
}: {
  message: string;
  children: ReactNode;
  newTabLabel: string;
  size?: Size;
  className?: string;
}) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizes[size]} bg-brand-red text-white shadow-[0_12px_28px_-14px_rgb(229_57_53/0.75)] hover:bg-brand-red-dark hover:shadow-[0_16px_32px_-14px_rgb(229_57_53/0.85)] ${className}`}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      <span>{children}</span>
      <span className="sr-only">{newTabLabel}</span>
    </a>
  );
}

/** Secondary call action: outlined white over dark imagery, brand blue on light surfaces. */
export function CallButton({
  children,
  size = "lg",
  showNumber = false,
  tone = "onDark",
  className = "",
}: {
  children: ReactNode;
  size?: Size;
  showNumber?: boolean;
  tone?: "onDark" | "onLight";
  className?: string;
}) {
  const toneClass =
    tone === "onDark"
      ? "border border-white/30 bg-white/[0.06] text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/[0.12]"
      : "border border-brand-blue bg-white text-brand-blue hover:bg-brand-blue hover:text-white";
  return (
    <a href={TEL_HREF} className={`${base} ${sizes[size]} ${toneClass} ${className}`}>
      <Phone className="size-[18px] shrink-0" strokeWidth={1.6} aria-hidden="true" />
      <span>{children}</span>
      {showNumber && (
        <span dir="ltr" className="hidden tabular-nums opacity-75 sm:inline">
          {PHONE_DISPLAY}
        </span>
      )}
    </a>
  );
}
