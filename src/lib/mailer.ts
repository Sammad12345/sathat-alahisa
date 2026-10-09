import "server-only";
import nodemailer from "nodemailer";
import type { ContactInput } from "@/lib/contact";
import { BUSINESS_NAME } from "@/lib/site";

// SMTP delivery for service requests. Configure via environment variables (see .env.example).
function config() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!host || !user || !pass || !to) return null;
  const port = Number(process.env.SMTP_PORT ?? 465);
  return {
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user, pass },
    to,
    from: process.env.CONTACT_FROM_EMAIL ?? user,
  };
}

export const isMailerConfigured = () => config() !== null;

const LABELS: Record<keyof ContactInput, string> = {
  name: "الاسم / Name",
  phone: "رقم الهاتف / Phone",
  email: "البريد الإلكتروني / Email",
  service: "نوع الخدمة / Service",
  location: "موقع السيارة / Vehicle location",
  destination: "الوجهة المطلوبة / Destination",
  details: "تفاصيل إضافية / Additional details",
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendServiceRequest(input: ContactInput, locale: string) {
  const cfg = config();
  if (!cfg) throw new Error("Mailer is not configured");

  const rows = (Object.keys(LABELS) as (keyof ContactInput)[]).filter((k) => input[k]);
  const text = [
    `طلب خدمة جديد من الموقع — New service request (${locale.toUpperCase()})`,
    "",
    ...rows.map((k) => `${LABELS[k]}: ${input[k]}`),
  ].join("\n");
  const html = `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;font-size:15px;color:#111">
<h2 style="margin:0 0 12px">طلب خدمة جديد من الموقع</h2>
<table cellpadding="8" style="border-collapse:collapse">${rows
    .map(
      (k) =>
        `<tr><th align="right" style="border-bottom:1px solid #ddd;color:#555;font-weight:600">${LABELS[k]}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(input[k])}</td></tr>`,
    )
    .join("")}</table>
<p style="color:#777;font-size:12px">Language: ${locale.toUpperCase()}</p></div>`;

  const transport = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: cfg.auth,
  });

  await transport.sendMail({
    from: { name: BUSINESS_NAME, address: cfg.from },
    to: cfg.to,
    replyTo: input.email || undefined,
    subject: `طلب سطحة: ${input.service} — ${input.name}`,
    text,
    html,
  });
}
