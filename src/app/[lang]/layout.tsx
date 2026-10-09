import type { Metadata, Viewport } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { dirOf, hasLocale, LOCALES, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { BUSINESS_NAME, PHONE_E164, SITE_URL } from "@/lib/site";
import "../globals.css";

const plex = IBM_Plex_Sans_Arabic({
  variable: "--font-plex",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title, template: `%s | ${BUSINESS_NAME}` },
    description: meta.description,
    applicationName: BUSINESS_NAME,
    keywords: meta.keywords,
    alternates: {
      canonical: localePath(lang),
      languages: { ar: localePath("ar"), en: localePath("en"), "x-default": localePath("ar") },
    },
    openGraph: {
      type: "website",
      locale: lang === "ar" ? "ar_SA" : "en_US",
      alternateLocale: lang === "ar" ? "en_US" : "ar_SA",
      siteName: BUSINESS_NAME,
      title: meta.title,
      description: meta.description,
      url: localePath(lang),
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.jpg"],
    },
    icons: { icon: { url: "/icon.svg", type: "image/svg+xml" } },
    formatDetection: { telephone: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = getDictionary(lang);

  // Only verified details: name, phone and the service area named by the business.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: BUSINESS_NAME,
    description: meta.description,
    telephone: PHONE_E164,
    url: `${SITE_URL}${localePath(lang)}`,
    image: `${SITE_URL}/og-image.jpg`,
    areaServed: meta.areaServed.map((name) => ({ "@type": "City", name })),
    knowsLanguage: ["ar", "en"],
  };

  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      className={`${plex.variable} ${alexandria.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
