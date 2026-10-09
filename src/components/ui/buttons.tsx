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
      className={`${base} ${sizes[size]} bg-emerald-brand text-white shadow-[0_10px_30px_-12px_rgb(31_157_92/0.6)] hover:bg-emerald-bright ${className}`}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      <span>{children}</span>
      <span className="sr-only">{newTabLabel}</span>
    </a>
  );
}

export function CallButton({
  children,
  size = "lg",
  showNumber = false,
  className = "",
}: {
  children: ReactNode;
  size?: Size;
  showNumber?: boolean;
  className?: string;
}) {
  return (
    <a
      href={TEL_HREF}
      className={`${base} ${sizes[size]} border border-white/20 bg-white/[0.03] text-silver-100 backdrop-blur-sm hover:border-white/45 hover:bg-white/[0.08] ${className}`}
    >
      <Phone className="size-[18px] shrink-0" strokeWidth={1.6} aria-hidden="true" />
      <span>{children}</span>
      {showNumber && (
        <span dir="ltr" className="hidden text-silver-500 tabular-nums sm:inline">
          {PHONE_DISPLAY}
        </span>
      )}
    </a>
  );
}
