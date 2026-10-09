# سطحه الاحساء الهفوف — Landing page

Arabic (RTL) landing page for a vehicle towing and flatbed transport business in Al-Ahsa / Al-Hofuf.

Stack: Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Lucide icons, Nodemailer.
Motion is CSS-only (entrances, scroll reveals, scroll-driven drift) and fully disabled under `prefers-reduced-motion`.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build && npm start
```

## Languages

Arabic (default, RTL) is served at `/`, English (LTR) at `/en`. All copy lives in
`src/i18n/dictionaries/ar.ts` and `en.ts` (same shape, type-checked). `src/proxy.ts` remembers the
visitor's choice in a `lang` cookie for a year: the header switcher links to `/en…` or `/ar…`, and
`/ar…` saves Arabic and redirects back to the root URL.

## Contact form (email)

The service-request form posts to `POST /api/contact`, which validates the fields (same rules as the
browser, in `src/lib/contact.ts`), rejects cross-origin posts, drops bot submissions (honeypot), rate-limits
per IP, and emails the request through SMTP (`src/lib/mailer.ts`). Copy `.env.example` to `.env.local`
(or set the variables on your host) — at minimum `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`.

Until SMTP is configured the API answers `503 not_configured` and the form tells the visitor plainly that
the request was **not** sent, offering the same details via WhatsApp instead. Success is only shown after
the email server accepted the message.

## Configuration

- Business name, phone and WhatsApp number live in `src/lib/site.ts`; prefilled WhatsApp messages are in the dictionaries.
- Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.sa`) in production so canonical, Open Graph
  and structured-data URLs are absolute. On Vercel the production domain is detected automatically.

## Images

`src/assets/photos/own-*.jpg` are the business's own photos (from `public/`), cropped and lightly
finished; a customer's number plate is blurred. The other photos are illustrative Creative Commons
images, credited at `/credits` (keep that page while they are used). Replace them with the business's
own photography when available and update `src/app/[lang]/credits/page.tsx`.
