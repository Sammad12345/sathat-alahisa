"use client";

import { AlertCircle, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { useId, useRef, useState, type FormEvent, type InputHTMLAttributes } from "react";
import { WhatsAppIcon } from "@/components/icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ar";
import {
  CONTACT_FIELDS,
  type ContactErrors,
  type ContactField,
  type ContactInput,
  isRequired,
  maxLengthOf,
  normalizeContact,
  validateContact,
} from "@/lib/contact";
import { whatsappHref } from "@/lib/site";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "failure"; reason: "notConfigured" | "rateLimited" | "generic" };

const EMPTY = Object.fromEntries(CONTACT_FIELDS.map((f) => [f, ""])) as ContactInput;

const inputBase =
  "w-full rounded-[3px] border bg-paper px-4 text-[15px] text-ink placeholder:text-slate-light transition-[border-color,background-color,box-shadow] duration-300 focus:outline-none focus-visible:outline-none";

export function ContactForm({
  lang,
  dict,
  services,
}: {
  lang: Locale;
  dict: Dictionary["form"];
  services: string[];
}) {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [summary, setSummary] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  const update = (field: ContactField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field] || errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateContact(normalizeContact(next))[field] }));
    }
  };

  const blur = (field: ContactField) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateContact(normalizeContact(values))[field] }));
  };

  /** Validates everything; on failure shows errors and focuses the first invalid field. */
  const checkAll = () => {
    const found = validateContact(normalizeContact(values));
    setErrors(found);
    setTouched(Object.fromEntries(CONTACT_FIELDS.map((f) => [f, true])));
    const first = CONTACT_FIELDS.find((f) => found[f]);
    setSummary(Boolean(first));
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return !first;
  };

  const whatsappMessage = () => {
    const v = normalizeContact(values);
    const label = (f: ContactField) => dict.fields[f].label.replace(/\s*\(.*\)\s*/, "");
    const lines = CONTACT_FIELDS.filter((f) => v[f]).map((f) => `${label(f)}: ${v[f]}`);
    return [dict.whatsappIntro, "", ...lines].join("\n");
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting" || !checkAll()) return;
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot.current?.value ?? "", locale: lang }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: ContactErrors };
      if (res.ok && data.ok) {
        setStatus({ kind: "success" });
        return;
      }
      if (res.status === 422 && data.fields) {
        setErrors(data.fields);
        setSummary(true);
        setStatus({ kind: "idle" });
        return;
      }
      setStatus({
        kind: "failure",
        reason: data.error === "not_configured" ? "notConfigured" : data.error === "rate_limited" ? "rateLimited" : "generic",
      });
    } catch {
      setStatus({ kind: "failure", reason: "generic" });
    }
  }

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setSummary(false);
    setStatus({ kind: "idle" });
  };

  if (status.kind === "success") {
    return (
      <div role="status" className="flex min-h-[28rem] flex-col items-start justify-center gap-6 py-6">
        <CheckCircle2 className="size-12 text-brand-blue" strokeWidth={1.2} aria-hidden="true" />
        <h3 className="font-display text-3xl font-semibold text-brand-blue">{dict.success.title}</h3>
        <p className="max-w-md text-base leading-8 text-slate">{dict.success.body}</p>
        <button
          type="button"
          onClick={reset}
          className="border-b border-brand-blue/40 pb-1 text-[15px] font-medium text-brand-blue transition-colors hover:border-brand-red hover:text-brand-red"
        >
          {dict.success.again}
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const errorId = (f: ContactField) => (errors[f] ? id(`${f}-error`) : undefined);
  const describedBy = (f: ContactField, extra?: string) => [extra, errorId(f)].filter(Boolean).join(" ") || undefined;
  const fieldClass = (f: ContactField) =>
    `${inputBase} ${
      errors[f]
        ? "border-brand-red focus:shadow-[0_0_0_3px_rgb(229_57_53/0.18)]"
        : "border-line hover:border-slate-light/60 focus:border-brand-blue focus:shadow-[0_0_0_3px_rgb(21_101_192/0.18)]"
    }`;

  const renderLabel = (field: ContactField) => (
    <label htmlFor={id(field)} className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-ink">
      {dict.fields[field].label}
      {isRequired(field) && (
        <span className="text-brand-red" aria-hidden="true">
          *
        </span>
      )}
      {isRequired(field) && <span className="sr-only">({dict.requiredMark})</span>}
    </label>
  );

  const renderError = (field: ContactField) =>
    errors[field] ? (
      <p id={id(`${field}-error`)} className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-brand-red-dark">
        <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
        {dict.errors[errors[field]!]}
      </p>
    ) : null;

  const text = (field: ContactField, props: InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      {renderLabel(field)}
      <input
        {...props}
        id={id(field)}
        name={field}
        value={values[field]}
        onChange={(e) => update(field, e.target.value)}
        onBlur={() => blur(field)}
        placeholder={dict.fields[field].placeholder}
        maxLength={maxLengthOf(field)}
        aria-invalid={errors[field] ? true : undefined}
        aria-required={isRequired(field) || undefined}
        aria-describedby={describedBy(field, props["aria-describedby"])}
        className={`${fieldClass(field)} h-12 ${props.dir === "ltr" ? "rtl:text-right" : ""}`}
      />
      {renderError(field)}
    </div>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={id("intro")} className="relative">
      <p id={id("intro")} className="mb-8 max-w-lg text-[15px] leading-7 text-slate">
        {dict.intro}
      </p>

      <div aria-live="assertive" className="empty:hidden">
        {summary && Object.values(errors).some(Boolean) && (
          <p className="mb-6 flex items-center gap-2 rounded-[3px] border border-brand-red/30 bg-brand-red/[0.06] px-4 py-3 text-sm font-medium text-brand-red-dark">
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            {dict.errors.summary}
          </p>
        )}
      </div>

      {/* Honeypot for bots: hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -start-[9999px] top-0 size-px overflow-hidden">
        <label htmlFor={id("company")}>Company</label>
        <input ref={honeypot} id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        {text("name", { autoComplete: "name" })}
        <div>
          {renderLabel("phone")}
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            placeholder={dict.fields.phone.placeholder}
            maxLength={maxLengthOf("phone")}
            aria-invalid={errors.phone ? true : undefined}
            aria-required
            aria-describedby={describedBy("phone", id("phone-hint"))}
            className={`${fieldClass("phone")} h-12 tabular-nums rtl:text-right`}
          />
          {errors.phone ? (
            renderError("phone")
          ) : (
            <p id={id("phone-hint")} className="mt-2 text-[12px] text-slate-light">
              {dict.fields.phone.hint}
            </p>
          )}
        </div>
        {text("email", { type: "email", inputMode: "email", autoComplete: "email", dir: "ltr" })}
        <div>
          {renderLabel("service")}
          <div className="relative">
            <select
              id={id("service")}
              name="service"
              value={values.service}
              onChange={(e) => update("service", e.target.value)}
              onBlur={() => blur("service")}
              aria-invalid={errors.service ? true : undefined}
              aria-required
              aria-describedby={describedBy("service")}
              className={`${fieldClass("service")} h-12 appearance-none pe-10 ${values.service ? "" : "text-slate-light"}`}
            >
              <option value="" disabled className="text-slate-light">
                {dict.fields.service.placeholder}
              </option>
              {[...services, dict.fields.service.other].map((s) => (
                <option key={s} value={s} className="text-ink">
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-brand-blue" aria-hidden="true" />
          </div>
          {renderError("service")}
        </div>
        {text("location", { autoComplete: "off" })}
        {text("destination", { autoComplete: "off" })}
        <div className="sm:col-span-2">
          {renderLabel("details")}
          <textarea
            id={id("details")}
            name="details"
            rows={4}
            value={values.details}
            onChange={(e) => update("details", e.target.value)}
            onBlur={() => blur("details")}
            placeholder={dict.fields.details.placeholder}
            maxLength={maxLengthOf("details")}
            aria-invalid={errors.details ? true : undefined}
            aria-describedby={describedBy("details")}
            className={`${fieldClass("details")} min-h-28 resize-y py-3 leading-7`}
          />
          {renderError("details")}
        </div>
      </div>

      {status.kind === "failure" && (
        <div role="alert" className="mt-8 rounded-[3px] border border-line border-s-4 border-s-brand-red bg-mist px-5 py-4 text-sm leading-7 text-ink">
          {dict.failure[status.reason]}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          className="group inline-flex h-14 items-center justify-center gap-3 rounded-[3px] bg-brand-red px-8 text-base font-semibold text-white shadow-[0_12px_28px_-14px_rgb(229_57_53/0.75)] transition-[background-color,transform] duration-300 ease-out-expo hover:bg-brand-red-dark active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
        >
          {submitting && <Loader2 className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />}
          {submitting ? dict.submitting : dict.submit}
        </button>
        <a
          href={whatsappHref(whatsappMessage())}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!checkAll()) e.preventDefault();
          }}
          aria-describedby={id("wa-note")}
          className={`inline-flex items-center gap-2.5 self-start border-b pb-1 text-[15px] font-medium transition-colors sm:self-auto ${
            status.kind === "failure"
              ? "border-brand-blue text-brand-blue"
              : "border-brand-blue/30 text-brand-blue hover:border-brand-blue"
          }`}
        >
          <WhatsAppIcon className="size-[18px] text-whatsapp" />
          {dict.whatsappAlt}
        </a>
      </div>
      <p id={id("wa-note")} className="mt-3 text-[12px] text-slate-light sm:text-end">
        {dict.whatsappReview}
      </p>
      <p role="status" className="sr-only">
        {submitting ? dict.submitting : ""}
      </p>
    </form>
  );
}
