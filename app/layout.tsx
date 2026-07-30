import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteChrome from "@/components/layout/SiteChrome";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import type { LocalBusiness, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";
import { getCourses } from "@/lib/api/courses";
import { getExperiences } from "@/lib/api/experiences";
import { getDiveSites } from "@/lib/api/dive-sites";
import type { NavItem } from "@/components/layout/Header";

// The nav dropdowns are w-60 with no scroll, so cap them — each has a "View All" link.
const NAV_MAX = 8;

const toNav = (list: { slug: string; name: string }[]): NavItem[] =>
  list.slice(0, NAV_MAX).map(({ slug, name }) => ({ slug, name }));

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Scuba Diving Trincomalee | PADI Courses & Dive Experiences | Diving Club",
    template: "%s | Diving Club",
  },
  description:
    "PADI certified diving center in Trincomalee, Sri Lanka. Open Water courses, fun diving, snorkeling, and whale watching in one of Asia's most beautiful dive destinations.",
  metadataBase: new URL("https://divingclub.lk"),
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Diving Club",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const localBusinessJsonLd: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://divingclub.lk",
  name: "Diving Club",
  description:
    "PADI certified dive centre in Trincomalee, Sri Lanka. Scuba diving courses, fun diving, snorkeling, and whale watching since 2010.",
  url: "https://divingclub.lk",
  telephone: "+94743945010",
  email: "info@divingclub.lk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "74/9, Sandy Cove",
    postalCode: "31000",
    addressLocality: "Trincomalee",
    addressRegion: "Eastern Province",
    addressCountry: "LK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 8.5609377,
    longitude: 81.2422479,
  },
  hasMap: "https://www.google.com/maps/place/Diving+Club/@8.5609627,81.2431568,341m/data=!3m1!1e3!4m6!3m5!1s0x3afbbdb47010bccd:0xade22adddd90b6c!8m2!3d8.5609377!4d81.2422479",
  openingHours: "Mo-Su 07:00-18:00",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card",
  areaServed: ["Trincomalee", "Nilaveli", "Uppuveli"],
  knowsAbout: ["Scuba Diving", "PADI Certification", "Wreck Diving", "Underwater Photography", "Marine Conservation"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "50",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=100092324331693",
    "https://www.instagram.com/diving_club_s30212/",
    "https://www.padi.com/dive-center/sri-lanka/diving-club/",
    "https://wa.me/94743945010",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ISR-cached and tagged, so /api/revalidate already keeps the nav in step with admin.
  // Empty on failure — a nav without dropdown items beats a site-wide 500.
  const [courses, experiences, diveSites] = await Promise.all([
    getCourses().catch(() => []),
    getExperiences().catch(() => []),
    getDiveSites().catch(() => []),
  ]);

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} antialiased`}
    >
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="JUJD0Ce1iIv72G6QYuIKdg" async />
        {/* Google Tag Manager — inline, not @next/third-parties: that component defers GTM
            until after hydration, which is too late for the /dive and /padi bridge pages. */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MGSS98BV');`,
          }}
        />
        {/* Google tag (gtag.js) — Google Ads AW-18356209738 */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18356209738" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18356209738');`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MGSS98BV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(localBusinessJsonLd) }}
        />
        <SmoothScrollProvider>
          <SiteChrome>
            <Header
              courseItems={toNav(courses)}
              experienceItems={toNav(experiences)}
              diveSiteItems={toNav(diveSites)}
            />
          </SiteChrome>
          <main className="flex-1">{children}</main>
          <SiteChrome>
            <Footer />
            <WhatsAppFab />
          </SiteChrome>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
