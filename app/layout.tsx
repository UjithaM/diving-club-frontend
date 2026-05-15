import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import type { LocalBusiness, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(localBusinessJsonLd) }}
        />
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
